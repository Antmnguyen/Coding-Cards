import { loadPyodide } from "pyodide";
import { beforeAll, describe, expect, it } from "vitest";
import { cards, tags } from "../src/cards";
import { COUNTED_BY_HAND, THINK_IDS } from "../src/cards/thinking";
import { TRAP_IDS } from "../src/cards/traps";
import { compose } from "../src/core/compose";
import { countIdeas } from "../src/core/ideas";
import { smartMatch } from "../src/core/match";
import { HARNESS, RUN_FN } from "../src/runner/harness";

// These enforce CARD_RULES.md.

let run: (setup: string, answer: string, check: string) => boolean;

beforeAll(async () => {
  const py = await loadPyodide();
  py.runPython(HARNESS);
  run = py.globals.get(RUN_FN);
}, 60_000);

/** Names assigned at the top level of the given code. */
const givenNames = (setup: string) => [...setup.matchAll(/^(\w+) = /gm)].map((m) => m[1]!);

describe("cards", () => {
  it("have unique ids", () => {
    const ids = cards.map((c) => c.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it("each belong to a topic shown on Home", () => {
    expect(cards.filter((c) => !c.tags.every((t) => tags.includes(t))).map((c) => c.id)).toEqual([]);
  });

  it("only tags real cards as traps", () => {
    const ids = new Set(cards.map((c) => c.id));
    expect([...TRAP_IDS].filter((id) => !ids.has(id))).toEqual([]);
  });

  it("only label real cards as thinking or counted by hand", () => {
    const ids = new Set(cards.map((c) => c.id));
    expect([...THINK_IDS, ...Object.keys(COUNTED_BY_HAND)].filter((id) => !ids.has(id))).toEqual([]);
  });

  // A recall card stacks at most 2 ideas; anything with 3 or more is a thinking card.
  const ideas = (c: (typeof cards)[number]) => COUNTED_BY_HAND[c.id] ?? countIdeas(c.solution);

  it("keep recall cards to 2 ideas", () => {
    expect(cards.filter((c) => c.kind === "recall" && ideas(c) > 2).map((c) => `${c.id} (${ideas(c)})`)).toEqual([]);
  });

  it("only label a card as thinking when it has 3 or more ideas", () => {
    expect(cards.filter((c) => c.kind === "think" && ideas(c) < 3).map((c) => `${c.id} (${ideas(c)})`)).toEqual([]);
  });

  it("never repeat the same prompt and given code", () => {
    const seen = cards.map((c) => `${c.prompt}|${c.setup}|${c.template}`);
    expect(cards.filter((_, i) => seen.indexOf(seen[i]!) !== i).map((c) => c.id)).toEqual([]);
  });

  it.each(cards)("$id is well formed", (card) => {
    expect(card.tags.length).toBeGreaterThan(0);
    expect(card.prompt.trim()).not.toBe("");
    expect(card.expect.trim()).not.toBe("");
    expect(card.explain.trim()).not.toBe("");
    expect(card.solution.split("\n").length).toBeLessThanOrEqual(3);
    expect(smartMatch(card, card.solution)).toBe(true);
  });

  it.each(cards.filter((c) => c.setup))("$id: the given code runs and the prompt names everything in it", (card) => {
    expect(run(card.setup!, "pass", "True")).toBe(true);
    for (const name of givenNames(card.setup!)) expect(card.prompt, name).toContain("`" + name + "`");
  });

  const checked = cards.filter((c) => c.check);

  it.each(checked)("$id: solution and alternates run on their own and pass the check", (card) => {
    for (const answer of [card.solution, ...(card.accepted ?? [])]) {
      expect(run(card.setup ?? "", compose(card, answer), card.check!), answer).toBe(true);
    }
  });

  it.each(checked)("$id: a wrong answer fails the check", (card) => {
    expect(run(card.setup ?? "", compose(card, "pass"), card.check!)).toBe(false);
    expect(run(card.setup ?? "", compose(card, "not valid python"), card.check!)).toBe(false);
  });
});
