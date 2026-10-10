import { describe, expect, it } from "vitest";
import { drawSession, pickWeighted, record, tagStats, weight } from "../src/core/history";
import type { Card, History } from "../src/core/types";

const NOW = 1_800_000_000_000;
const DAY = 86_400_000;

const replay = (answers: boolean[], at = NOW, ms = 2000): History =>
  answers.reduce<History>((h, ok) => record(h, "c", ok, ms, at), {});

describe("record", () => {
  it("tracks attempts, correct count, streak and last miss", () => {
    const h = replay([true, true, false, true])["c"]!;
    expect(h).toMatchObject({ attempts: 4, correct: 3, streak: 1, lastSeen: NOW, lastMiss: NOW });
  });

  it("averages time over correct answers only", () => {
    let h = record({}, "c", true, 1000, NOW);
    h = record(h, "c", false, 60_000, NOW);
    expect(h["c"]!.avgMs).toBe(1000);
  });
});

describe("weight", () => {
  const unseen = weight(undefined, NOW);

  it("starts unseen cards above a card that is going well", () => {
    expect(unseen).toBeGreaterThan(weight(replay([true])["c"], NOW));
  });

  it("raises the weight for misses, more so when recent", () => {
    const missed = replay([false], NOW)["c"];
    expect(weight(missed, NOW)).toBeGreaterThan(unseen);
    expect(weight(missed, NOW)).toBeGreaterThan(weight(missed, NOW + 30 * DAY));
  });

  it("lowers the weight with each consecutive correct answer, down to a floor", () => {
    const w1 = weight(replay([true])["c"], NOW);
    const w3 = weight(replay([true, true, true])["c"], NOW);
    const w50 = weight(replay(Array(50).fill(true))["c"], NOW);
    expect(w3).toBeLessThan(w1);
    expect(w50).toBeGreaterThan(0);
    expect(w50).toBe(weight(replay(Array(60).fill(true))["c"], NOW));
  });

  it("counts a slow correct answer as weaker than a fast one", () => {
    expect(weight(replay([true], NOW, 20_000)["c"], NOW)).toBeGreaterThan(weight(replay([true], NOW, 2000)["c"], NOW));
  });
});

describe("pickWeighted", () => {
  const deck: Card[] = ["a", "b", "c", "d"].map((id) => ({
    id,
    language: "python",
    skill: id,
    level: 2,
    tags: ["t"],
    prompt: "",
    expect: "",
    solution: "",
    explain: "",
  }));

  it("returns n distinct cards, or the whole pool when it is smaller", () => {
    expect(new Set(pickWeighted(deck, {}, 3, NOW).map((c) => c.id)).size).toBe(3);
    expect(pickWeighted(deck, {}, 10, NOW)).toHaveLength(4);
  });

  it("favours heavier cards", () => {
    let history: History = {};
    for (let i = 0; i < 10; i++) for (const id of ["b", "c", "d"]) history = record(history, id, true, 1000, NOW);
    history = record(history, "a", false, 1000, NOW);
    let first = 0;
    for (let i = 0; i < 200; i++) if (pickWeighted(deck, history, 1, NOW)[0]!.id === "a") first++;
    expect(first).toBeGreaterThan(150);
  });
});

describe("drawSession", () => {
  const variant = (id: string, skill: string): Card => ({
    id,
    language: "python",
    tags: ["t"],
    skill,
    level: 2,
    prompt: "",
    expect: "",
    solution: "",
    explain: "",
  });
  const deck = [variant("a1", "a"), variant("a2", "a"), variant("a3", "a"), variant("b1", "b"), variant("c1", "c")];

  it("shows every skill once before repeating any", () => {
    for (let i = 0; i < 50; i++) {
      const first = drawSession(deck, {}, 3, NOW).map((c) => c.skill);
      expect(new Set(first).size).toBe(3);
    }
    expect(drawSession(deck, {}, 10, NOW)).toHaveLength(5);
  });

  it("brings sibling variants forward after a miss on one of them", () => {
    let history: History = record({}, "a1", false, 1000, NOW);
    for (let i = 0; i < 6; i++) history = record(history, "b1", true, 1000, NOW);
    const withMiss = deck.map((c) => (c.id === "a2" ? 1 : 0));
    let a2First = 0;
    let plain = 0;
    for (let i = 0; i < 400; i++) {
      if (pickWeighted([deck[1]!, deck[4]!, deck[0]!], history, 1, NOW)[0]!.id === "a2") a2First++;
      if (pickWeighted([deck[1]!, deck[4]!], {}, 1, NOW)[0]!.id === "a2") plain++;
    }
    expect(withMiss).toContain(1);
    expect(a2First).toBeGreaterThan(0);
    expect(plain).toBeGreaterThan(0);
  });
});

describe("tagStats", () => {
  it("counts a card as mastered once its streak reaches 2", () => {
    const card: Card = { id: "c", language: "python", tags: ["t"], skill: "c", level: 1, prompt: "", expect: "", solution: "", explain: "" };
    expect(tagStats([card], replay([true]))[0]!.mastered).toBe(0);
    expect(tagStats([card], replay([true, true]))[0]!.mastered).toBe(1);
    expect(tagStats([card], replay([true, true, false]))[0]!.mastered).toBe(0);
  });
});
