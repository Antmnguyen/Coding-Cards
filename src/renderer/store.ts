import { create } from "zustand";
import { cards, tags as allTags } from "../cards";
import { drawSession, drawWeak, record } from "../core/history";
import { sessionPool } from "../core/pool";
import { answer, answerOnce, createQueue, MASTERY_STREAK, type QueueState } from "../core/queue";
import { buildPatterns, focusCards, type PatternFilters } from "../core/search";
import type { Card, History, Mode, Settings } from "../core/types";
import { startRunner } from "../runner/runner";

declare global {
  interface Window {
    api: {
      read(name: "history" | "settings"): Promise<unknown>;
      write(name: "history" | "settings", data: unknown): Promise<void>;
    };
  }
}

export interface Session {
  id: number;
  mode: Mode;
  cards: Record<string, Card>;
  q: QueueState;
  total: number;
  startedAt: number;
  /** Set for timed sessions. */
  endsAt: number | null;
  finishedAt: number | null;
  answers: number;
  correct: number;
  streak: number;
  bestStreak: number;
  /** Ids of cards missed at least once, in the order they were first missed. */
  missed: string[];
  /** Correct answers in a row that retire a card. */
  mastery: number;
  /** Set for a focused drill on chosen patterns. */
  focus: { skills: string[]; label: string } | null;
}

/** What the pattern browser is showing; kept so it is unchanged after a drill. */
export interface BrowseState extends PatternFilters {
  query: string;
}

export const FOCUS_ROUNDS = [3, 5, 10];
const MODES: Mode[] = ["standard", "once", "weak"];

const DEFAULT_SETTINGS: Settings = {
  mode: "standard",
  tags: [],
  length: { kind: "count", n: 25 },
  levels: [],
  thinking: false,
  focusRounds: 3,
  strict: false,
  forceCorrection: false,
};

interface State {
  loaded: boolean;
  screen: "home" | "browse" | "drill" | "results";
  browse: BrowseState;
  settings: Settings;
  history: History;
  pyReady: boolean;
  session: Session | null;
  init(): Promise<void>;
  updateSettings(patch: Partial<Settings>): void;
  start(): void;
  /** Drills every variant of the given patterns until each is right several times in a row. */
  startFocused(skillIds: string[]): void;
  openBrowse(): void;
  updateBrowse(patch: Partial<BrowseState>): void;
  recordAnswer(id: string, correct: boolean, ms: number): void;
  finish(): void;
  goHome(): void;
}

function cleanSettings(raw: unknown): Settings {
  const s = { ...DEFAULT_SETTINGS, ...(raw && typeof raw === "object" ? (raw as Partial<Settings>) : {}) };
  s.tags = Array.isArray(s.tags) ? s.tags.filter((t) => allTags.includes(t)) : [];
  s.levels = Array.isArray(s.levels) ? s.levels.filter((l) => [1, 2, 3].includes(l)) : [];
  s.mode = MODES.includes(s.mode) ? s.mode : DEFAULT_SETTINGS.mode;
  s.thinking = s.thinking === true;
  s.focusRounds = FOCUS_ROUNDS.includes(s.focusRounds) ? s.focusRounds : DEFAULT_SETTINGS.focusRounds;
  return s;
}

export const useStore = create<State>((set, get) => ({
  loaded: false,
  screen: "home",
  browse: { query: "", topics: [], levels: [], statuses: [] },
  settings: DEFAULT_SETTINGS,
  history: {},
  pyReady: false,
  session: null,

  async init() {
    const [history, settings] = await Promise.all([window.api.read("history"), window.api.read("settings")]);
    set({
      loaded: true,
      history: history && typeof history === "object" ? (history as History) : {},
      settings: cleanSettings(settings),
    });
    startRunner((pyReady) => set({ pyReady }));
  },

  updateSettings(patch) {
    const settings = { ...get().settings, ...patch };
    set({ settings });
    void window.api.write("settings", settings);
  },

  start() {
    const { settings, history } = get();
    const now = Date.now();
    const pool = sessionPool(cards, settings);
    // A timed blitz draws the whole pool in weighted order and stops on the clock.
    const size = settings.length.kind === "count" ? settings.length.n : pool.length;
    const picked = (settings.mode === "weak" ? drawWeak : drawSession)(pool, history, size, now);
    if (picked.length === 0) return;
    set({
      screen: "drill",
      session: {
        id: now,
        mode: settings.mode,
        cards: Object.fromEntries(picked.map((c) => [c.id, c])),
        q: createQueue(picked.map((c) => c.id)),
        total: picked.length,
        startedAt: now,
        endsAt: settings.length.kind === "timed" ? now + settings.length.seconds * 1000 : null,
        finishedAt: null,
        answers: 0,
        correct: 0,
        streak: 0,
        bestStreak: 0,
        missed: [],
        mastery: MASTERY_STREAK,
        focus: null,
      },
    });
  },

  startFocused(skillIds) {
    const { settings } = get();
    const now = Date.now();
    const pool = sessionPool(cards, { tags: [], levels: [], thinking: settings.thinking });
    const { cards: picked, padded } = focusCards(buildPatterns(pool), skillIds);
    if (picked.length === 0) return;
    for (let i = picked.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picked[i], picked[j]] = [picked[j]!, picked[i]!];
    }
    const name = skillIds.length === 1 ? skillIds[0]! : `${skillIds.length} patterns`;
    set({
      screen: "drill",
      session: {
        id: now,
        mode: "standard",
        cards: Object.fromEntries(picked.map((c) => [c.id, c])),
        q: createQueue(picked.map((c) => c.id)),
        total: picked.length,
        startedAt: now,
        endsAt: null,
        finishedAt: null,
        answers: 0,
        correct: 0,
        streak: 0,
        bestStreak: 0,
        missed: [],
        mastery: settings.focusRounds,
        focus: { skills: skillIds, label: `${name}${padded ? " + related" : ""} (${picked.length} cards, ${settings.focusRounds} in a row)` },
      },
    });
  },

  openBrowse() {
    set({ screen: "browse", session: null });
  },

  updateBrowse(patch) {
    set({ browse: { ...get().browse, ...patch } });
  },

  recordAnswer(id, correct, ms) {
    const { session, history } = get();
    if (!session || session.finishedAt) return;
    const nextHistory = record(history, id, correct, ms, Date.now());
    const streak = correct ? session.streak + 1 : 0;
    set({
      history: nextHistory,
      session: {
        ...session,
        q:
          session.mode === "once"
            ? answerOnce(session.q, correct)
            : answer(session.q, correct, Math.random, session.mastery),
        answers: session.answers + 1,
        correct: session.correct + (correct ? 1 : 0),
        streak,
        bestStreak: Math.max(session.bestStreak, streak),
        missed: correct || session.missed.includes(id) ? session.missed : [...session.missed, id],
      },
    });
    void window.api.write("history", nextHistory);
  },

  finish() {
    const { session } = get();
    if (!session || session.finishedAt) return;
    set({ screen: "results", session: { ...session, finishedAt: Date.now() } });
  },

  goHome() {
    set({ screen: "home", session: null });
  },
}));
