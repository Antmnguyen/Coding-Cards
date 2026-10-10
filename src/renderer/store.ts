import { create } from "zustand";
import { cards, tags as allTags } from "../cards";
import { drawSession, record } from "../core/history";
import { answer, createQueue, type QueueState } from "../core/queue";
import type { Card, History, Settings } from "../core/types";
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
}

const DEFAULT_SETTINGS: Settings = {
  tags: [],
  length: { kind: "count", n: 25 },
  levels: [],
  strict: false,
  forceCorrection: false,
};

interface State {
  loaded: boolean;
  screen: "home" | "drill" | "results";
  settings: Settings;
  history: History;
  pyReady: boolean;
  session: Session | null;
  init(): Promise<void>;
  updateSettings(patch: Partial<Settings>): void;
  start(): void;
  recordAnswer(id: string, correct: boolean, ms: number): void;
  finish(): void;
  goHome(): void;
}

function cleanSettings(raw: unknown): Settings {
  const s = { ...DEFAULT_SETTINGS, ...(raw && typeof raw === "object" ? (raw as Partial<Settings>) : {}) };
  s.tags = Array.isArray(s.tags) ? s.tags.filter((t) => allTags.includes(t)) : [];
  s.levels = Array.isArray(s.levels) ? s.levels.filter((l) => [1, 2, 3].includes(l)) : [];
  return s;
}

export const useStore = create<State>((set, get) => ({
  loaded: false,
  screen: "home",
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
    const pool = cards.filter(
      (c) =>
        (settings.tags.length === 0 || c.tags.some((t) => settings.tags.includes(t))) &&
        (settings.levels.length === 0 || settings.levels.includes(c.level)),
    );
    // A timed blitz draws the whole pool in weighted order and stops on the clock.
    const size = settings.length.kind === "count" ? settings.length.n : pool.length;
    const picked = drawSession(pool, history, size, now);
    if (picked.length === 0) return;
    set({
      screen: "drill",
      session: {
        id: now,
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
      },
    });
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
        q: answer(session.q, correct),
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
