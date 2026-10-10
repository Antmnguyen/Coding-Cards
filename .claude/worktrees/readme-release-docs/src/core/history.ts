import type { Card, CardHistory, History } from "./types";
import type { Rng } from "./queue";

const DAY = 86_400_000;
const UNSEEN_WEIGHT = 3;
const MIN_WEIGHT = 0.15;
const SLOW_MS = 8000;

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

/** Weighted random sample without replacement, returned in drawn order. */
export function pickWeighted(cards: Card[], history: History, n: number, now: number, rng: Rng = Math.random): Card[] {
  return cards
    .map((card) => ({ card, key: rng() ** (1 / weight(history[card.id], now)) }))
    .sort((a, b) => b.key - a.key)
    .slice(0, n)
    .map((x) => x.card);
}

export interface TagStat {
  tag: string;
  total: number;
  seen: number;
  attempts: number;
  correct: number;
}

export function tagStats(cards: Card[], history: History): TagStat[] {
  const byTag = new Map<string, TagStat>();
  for (const card of cards) {
    const h = history[card.id];
    for (const tag of card.tags) {
      const s = byTag.get(tag) ?? { tag, total: 0, seen: 0, attempts: 0, correct: 0 };
      s.total++;
      if (h) {
        s.seen++;
        s.attempts += h.attempts;
        s.correct += h.correct;
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
