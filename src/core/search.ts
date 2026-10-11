import { MASTERY_STREAK } from "./queue";
import type { Card, History } from "./types";

/** A skill and its variants, as one line in the pattern browser. */
export interface Pattern {
  id: string;
  topic: string;
  level: Card["level"];
  cards: Card[];
  /** Searchable text with its weight, lower-cased and with whitespace removed. */
  fields: { weight: number; text: string }[];
}

export type PatternStatus = "new" | "weak" | "learning" | "mastered";
export const STATUSES: PatternStatus[] = ["new", "weak", "learning", "mastered"];

export interface PatternFilters {
  /** Empty means every topic. */
  topics: string[];
  /** Empty means every level. */
  levels: number[];
  /** Empty means every status. */
  statuses: PatternStatus[];
}

/** Case and spacing never matter in a search, so `key = lambda` finds `key=lambda`. */
const squash = (s: string) => s.toLowerCase().replace(/\s+/g, "");

/** Groups cards by skill, keeping deck order. */
export function buildPatterns(cards: Card[]): Pattern[] {
  const bySkill = new Map<string, Card[]>();
  for (const card of cards) {
    const list = bySkill.get(card.skill);
    if (list) list.push(card);
    else bySkill.set(card.skill, [card]);
  }
  return [...bySkill].map(([id, list]) => ({
    id,
    topic: list[0]!.tags[0]!,
    level: list[0]!.level,
    cards: list,
    fields: [
      { weight: 3, text: squash(list.flatMap((c) => [c.solution, ...(c.accepted ?? [])]).join("\n")) },
      { weight: 2, text: squash(list.map((c) => c.explain).join("\n")) },
      { weight: 1, text: squash([id, ...new Set(list.flatMap((c) => c.tags)), ...list.map((c) => c.prompt)].join("\n")) },
    ],
  }));
}

export function masteredCount(pattern: Pattern, history: History): number {
  return pattern.cards.filter((c) => (history[c.id]?.streak ?? 0) >= MASTERY_STREAK).length;
}

export function patternStatus(pattern: Pattern, history: History): PatternStatus {
  const seen = pattern.cards.flatMap((c) => history[c.id] ?? []).filter((h) => h.attempts > 0);
  if (seen.length === 0) return "new";
  if (masteredCount(pattern, history) === pattern.cards.length) return "mastered";
  // A streak of 0 on a card that has been answered means its last answer was a miss.
  return seen.some((h) => h.streak === 0) ? "weak" : "learning";
}

/** Sum of the best field weight for each word; 0 when any word is missing. */
function score(pattern: Pattern, words: string[]): number {
  let total = 0;
  for (const word of words) {
    const best = Math.max(0, ...pattern.fields.filter((f) => f.text.includes(word)).map((f) => f.weight));
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

/**
 * Patterns that pass the filters and contain every word of the query, best match first.
 * With no query the patterns stay in deck order.
 */
export function searchPatterns(patterns: Pattern[], query: string, filters: PatternFilters, history: History): Pattern[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return patterns
    .filter(
      (p) =>
        (filters.topics.length === 0 || p.cards.some((c) => c.tags.some((t) => filters.topics.includes(t)))) &&
        (filters.levels.length === 0 || filters.levels.includes(p.level)) &&
        (filters.statuses.length === 0 || filters.statuses.includes(patternStatus(p, history))),
    )
    .map((p, order) => ({ p, order, s: words.length ? score(p, words) : 1 }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.order - b.order)
    .map((x) => x.p);
}

/**
 * The cards of a focused drill. A pattern with very few variants would repeat
 * the same card back to back, so its neighbours from the same topic are added
 * until there are at least `min` cards.
 */
export function focusCards(patterns: Pattern[], skillIds: string[], min = 4): { cards: Card[]; padded: boolean } {
  const chosen = patterns.filter((p) => skillIds.includes(p.id));
  const cards = chosen.flatMap((p) => p.cards);
  if (chosen.length === 0 || cards.length >= min) return { cards, padded: false };

  const topic = chosen[0]!.topic;
  const at = patterns.indexOf(chosen[0]!);
  const used = new Set(chosen);
  let padded = false;
  // Walk outwards from the chosen pattern: next, previous, two after, two before, ...
  for (let step = 1; cards.length < min && step < patterns.length; step++) {
    for (const p of [patterns[at + step], patterns[at - step]]) {
      if (!p || used.has(p) || p.topic !== topic || cards.length >= min) continue;
      used.add(p);
      cards.push(...p.cards);
      padded = true;
    }
  }
  return { cards, padded };
}
