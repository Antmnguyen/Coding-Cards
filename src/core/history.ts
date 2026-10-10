import { MASTERY_STREAK, type Rng } from "./queue";
import type { Card, CardHistory, History } from "./types";

const DAY = 86_400_000;
const UNSEEN_WEIGHT = 3;
const MIN_WEIGHT = 0.15;
const SLOW_MS = 8000;
/** How much of a card's weight comes from its skill as a whole. */
const SKILL_SHARE = 0.25;

export function record(history: History, id: string, correct: boolean, ms: number, now: number): History {
  const h: CardHistory = history[id] ?? { attempts: 0, correct: 0, streak: 0, lastSeen: 0, lastMiss: 0, avgMs: 0 };
  return {
    ...history,
    [id]: {
      attempts: h.attempts + 1,
      correct: h.correct + (correct ? 1 : 0),
      streak: correct ? h.streak + 1 : 0,
      lastSeen: now,
      lastMiss: correct ? h.lastMiss : now,
      avgMs: !correct ? h.avgMs : h.avgMs === 0 ? ms : Math.round(h.avgMs * 0.7 + ms * 0.3),
    },
  };
}

/** How strongly a card should be favoured when drawing a session. */
export function weight(h: CardHistory | undefined, now: number): number {
  if (!h || h.attempts === 0) return UNSEEN_WEIGHT;
  const missRate = (h.attempts - h.correct) / h.attempts;
  // A miss counts fully today and fades over the following weeks.
  const recency = h.lastMiss ? 1 / (1 + (now - h.lastMiss) / (7 * DAY)) : 0;
  let w = 1 + 4 * missRate * recency;
  w *= 0.6 ** h.streak;
  if (h.avgMs > SLOW_MS) w *= 1.3;
  return Math.max(MIN_WEIGHT, w);
}

/** History of each skill as a whole, pooled over the variants that have been seen. */
function skillHistories(cards: Card[], history: History): Map<string, CardHistory> {
  const bySkill = new Map<string, CardHistory>();
  for (const card of cards) {
    const h = history[card.id];
    if (!h) continue;
    const s = bySkill.get(card.skill);
    bySkill.set(
      card.skill,
      s
        ? {
            attempts: s.attempts + h.attempts,
            correct: s.correct + h.correct,
            streak: Math.min(s.streak, h.streak),
            lastSeen: Math.max(s.lastSeen, h.lastSeen),
            lastMiss: Math.max(s.lastMiss, h.lastMiss),
            avgMs: Math.max(s.avgMs, h.avgMs),
          }
        : h,
    );
  }
  return bySkill;
}

/**
 * Weighted random order of the whole pool. A card's weight is mostly its own
 * history, plus a share of its skill's, so a miss on one variant also brings
 * its siblings forward and a mastered skill holds its unseen variants back.
 */
export function pickWeighted(cards: Card[], history: History, n: number, now: number, rng: Rng = Math.random): Card[] {
  const skills = skillHistories(cards, history);
  return cards
    .map((card) => {
      const own = weight(history[card.id], now);
      const shared = skills.get(card.skill);
      const w = shared ? (1 - SKILL_SHARE) * own + SKILL_SHARE * weight(shared, now) : own;
      return { card, key: rng() ** (1 / w) };
    })
    .sort((a, b) => b.key - a.key)
    .slice(0, n)
    .map((x) => x.card);
}

/**
 * Draws a session: weighted like pickWeighted, but no skill appears twice
 * until every skill in the pool has appeared once.
 */
export function drawSession(cards: Card[], history: History, n: number, now: number, rng: Rng = Math.random): Card[] {
  const seen = new Map<string, number>();
  return pickWeighted(cards, history, cards.length, now, rng)
    .map((card, order) => {
      const round = seen.get(card.skill) ?? 0;
      seen.set(card.skill, round + 1);
      return { card, round, order };
    })
    .sort((a, b) => a.round - b.round || a.order - b.order)
    .slice(0, n)
    .map((x) => x.card);
}

export interface TagStat {
  tag: string;
  total: number;
  seen: number;
  /** Cards whose current streak has reached the mastery streak. */
  mastered: number;
  attempts: number;
  correct: number;
}

export function tagStats(cards: Card[], history: History): TagStat[] {
  const byTag = new Map<string, TagStat>();
  for (const card of cards) {
    const h = history[card.id];
    for (const tag of card.tags) {
      const s = byTag.get(tag) ?? { tag, total: 0, seen: 0, mastered: 0, attempts: 0, correct: 0 };
      s.total++;
      if (h) {
        s.seen++;
        s.attempts += h.attempts;
        s.correct += h.correct;
        if (h.streak >= MASTERY_STREAK) s.mastered++;
      }
      byTag.set(tag, s);
    }
  }
  return [...byTag.values()];
}

export function worstCards(cards: Card[], history: History, n: number): { card: Card; h: CardHistory }[] {
  return cards
    .flatMap((card) => {
      const h = history[card.id];
      return h && h.correct < h.attempts ? [{ card, h }] : [];
    })
    .sort((a, b) => a.h.correct / a.h.attempts - b.h.correct / b.h.attempts || b.h.attempts - a.h.attempts)
    .slice(0, n);
}
