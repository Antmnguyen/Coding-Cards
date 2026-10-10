import { describe, expect, it } from "vitest";
import { matches, normalise } from "../src/core/match";
import type { Card } from "../src/core/types";

const card = (solution: string, accepted?: string[]): Card => ({
  id: "t",
  language: "python",
  tags: ["t"],
  prompt: "",
  explain: "",
  solution,
  accepted,
});

describe("smart match", () => {
  it("ignores whitespace that carries no meaning", () => {
    expect(matches(card("d.get(k, 0)"), "d.get( k,0 )", false)).toBe(true);
    expect(matches(card("x = a[1:8]"), "  x=a[1 : 8]  ", false)).toBe(true);
  });

  it("keeps whitespace between words", () => {
    expect(matches(card("x not in seen"), "xnotinseen", false)).toBe(false);
    expect(matches(card("x not in seen"), "x  not   in seen", false)).toBe(true);
  });

  it("treats single and double quotes alike", () => {
    expect(matches(card('float("inf")'), "float('inf')", false)).toBe(true);
  });

  it("does not touch the inside of string literals", () => {
    expect(matches(card('"".join(path)'), '" ".join(path)', false)).toBe(false);
  });

  it("checks accepted alternates", () => {
    expect(matches(card("path[:]", ["list(path)"]), "list( path )", false)).toBe(true);
  });

  it("compares indentation by depth, not width", () => {
    const solution = "class Node:\n    def __init__(self, val):\n        self.val = val";
    expect(matches(card(solution), "class Node:\n  def __init__(self, val):\n    self.val = val", false)).toBe(true);
    expect(matches(card(solution), "class Node:\ndef __init__(self, val):\nself.val = val", false)).toBe(false);
  });

  it("is still case sensitive", () => {
    expect(normalise("x IN a")).not.toBe(normalise("x in a"));
  });
});

describe("strict match", () => {
  it("requires the exact characters", () => {
    expect(matches(card("d.get(k, 0)"), "d.get(k, 0)", true)).toBe(true);
    expect(matches(card("d.get(k, 0)"), "d.get(k,0)", true)).toBe(false);
    expect(matches(card('float("inf")'), "float('inf')", true)).toBe(false);
  });
});
