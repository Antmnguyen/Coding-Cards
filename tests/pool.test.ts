import { describe, expect, it } from "vitest";
import { cards } from "../src/cards";
import { sessionPool } from "../src/core/pool";

describe("sessionPool", () => {
  const all = { tags: [], levels: [], thinking: false };

  it("leaves thinking cards out by default", () => {
    const pool = sessionPool(cards, all);
    expect(pool.length).toBeGreaterThan(0);
    expect(pool.filter((c) => c.kind === "think")).toEqual([]);
  });

  it("adds them when thinking is on", () => {
    const pool = sessionPool(cards, { ...all, thinking: true });
    expect(pool.length).toBe(cards.length);
    expect(pool.some((c) => c.kind === "think")).toBe(true);
  });

  it("still filters by topic and level", () => {
    const pool = sessionPool(cards, { tags: ["sorting"], levels: [1], thinking: false });
    expect(pool.length).toBeGreaterThan(0);
    expect(pool.every((c) => c.tags.includes("sorting") && c.level === 1 && c.kind === "recall")).toBe(true);
  });
});
