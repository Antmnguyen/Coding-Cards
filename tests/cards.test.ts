import { loadPyodide } from "pyodide";
import { beforeAll, describe, expect, it } from "vitest";
import { cards } from "../src/cards";
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
      expect(run(card.setup ?? "", answer, card.check!), answer).toBe(true);
    }
  });

  it.each(checked)("$id: a wrong answer fails the check", (card) => {
    expect(run(card.setup ?? "", "pass", card.check!)).toBe(false);
    expect(run(card.setup ?? "", "not valid python", card.check!)).toBe(false);
  });
});
