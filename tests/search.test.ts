import { describe, expect, it } from "vitest";
import { cards } from "../src/cards";
import { answer, createQueue } from "../src/core/queue";
import { buildPatterns, focusCards, patternStatus, searchPatterns, type PatternFilters } from "../src/core/search";
import type { CardHistory, History } from "../src/core/types";

const patterns = buildPatterns(cards);
const none: PatternFilters = { topics: [], levels: [], statuses: [] };
const ids = (query: string, filters = none, history: History = {}) =>
  searchPatterns(patterns, query, filters, history).map((p) => p.id);
const h = (streak: number, attempts = 3): CardHistory => ({ attempts, correct: 1, streak, lastSeen: 1, lastMiss: 0, avgMs: 0 });

describe("buildPatterns", () => {
  it("makes one pattern per skill and keeps every card", () => {
    expect(patterns.length).toBe(new Set(cards.map((c) => c.skill)).size);
    expect(patterns.flatMap((p) => p.cards).length).toBe(cards.length);
  });
});

describe("searchPatterns", () => {
  it("lists everything in deck order with no query", () => {
    expect(ids("")).toEqual(patterns.map((p) => p.id));
  });

  it("finds code regardless of spacing and case", () => {
    expect(ids("key = LAMBDA")).toContain("sort-key");
    expect(ids("[::-1]").length).toBeGreaterThan(0);
    expect(ids("heappop")).toContain("heap-pop");
  });

  it("needs every word, in any field", () => {
    const both = ids("sorted reverse=true");
    expect(both).toContain("sort-basic");
    expect(both.length).toBeLessThan(ids("sorted").length);
    expect(ids("zzzznotathing")).toEqual([]);
  });

  it("ranks a match in the answer above a match in the prompt", () => {
    const found = searchPatterns(patterns, "heapify", none, {});
    expect(found[0]!.fields[0]!.text).toContain("heapify");
  });

  it("filters by topic and level", () => {
    const found = searchPatterns(patterns, "", { topics: ["sorting"], levels: [1], statuses: [] }, {});
    expect(found.length).toBeGreaterThan(0);
    expect(found.every((p) => p.topic === "sorting" && p.level === 1)).toBe(true);
  });

  it("filters by status", () => {
    const p = patterns.find((x) => x.id === "sort-basic")!;
    const weak: History = { [p.cards[0]!.id]: h(0) };
    expect(ids("", { ...none, statuses: ["weak"] }, weak)).toEqual(["sort-basic"]);
    expect(ids("", { ...none, statuses: ["new"] }, weak)).not.toContain("sort-basic");
  });
});

describe("patternStatus", () => {
  const p = patterns.find((x) => x.id === "sort-basic")!;
  const all = (streak: number): History => Object.fromEntries(p.cards.map((c) => [c.id, h(streak)]));

  it("goes from new to weak, learning and mastered", () => {
    expect(patternStatus(p, {})).toBe("new");
    expect(patternStatus(p, { [p.cards[0]!.id]: h(0) })).toBe("weak");
    expect(patternStatus(p, { [p.cards[0]!.id]: h(1) })).toBe("learning");
    expect(patternStatus(p, all(2))).toBe("mastered");
  });
});

describe("focusCards", () => {
  it("takes every variant of the chosen pattern", () => {
    const p = patterns.find((x) => x.cards.length >= 4)!;
    expect(focusCards(patterns, [p.id])).toEqual({ cards: p.cards, padded: false });
  });

  it("pads a thin pattern with neighbours from the same topic", () => {
    const thin = patterns.find((x) => x.cards.length === 1)!;
    const { cards: picked, padded } = focusCards(patterns, [thin.id]);
    expect(padded).toBe(true);
    expect(picked.length).toBeGreaterThanOrEqual(4);
    expect(picked.slice(0, 1)).toEqual(thin.cards);
    expect(picked.every((c) => c.tags[0] === thin.topic)).toBe(true);
  });
});

describe("answer with a mastery target", () => {
  it("keeps a card in play until it is right that many times in a row", () => {
    let q = createQueue(["a"]);
    q = answer(q, true, () => 0, 3);
    q = answer(q, true, () => 0, 3);
    expect(q.mastered).toEqual([]);
    q = answer(q, true, () => 0, 3);
    expect(q.mastered).toEqual(["a"]);
  });
});
