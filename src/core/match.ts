import type { Card } from "./types";

const isWord = (c: string | undefined) => c !== undefined && /\w/.test(c);

/**
 * Drops whitespace that carries no meaning and unifies quote style.
 * String literal contents are kept verbatim, so " ".join and "".join stay different.
 */
function squash(line: string): string {
  let out = "";
  let pendingSpace = false;
  let i = 0;
  while (i < line.length) {
    const c = line[i]!;
    if (c === " " || c === "\t") {
      pendingSpace = true;
      i++;
      continue;
    }
    // A space only matters between two word characters: `not in`, `for x`.
    if (pendingSpace && isWord(out[out.length - 1]) && isWord(c)) out += " ";
    pendingSpace = false;
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < line.length && line[j] !== c) j += line[j] === "\\" ? 2 : 1;
      out += '"' + line.slice(i + 1, j) + '"';
      i = j + 1;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

const indentOf = (line: string) => line.length - line.trimStart().length;

/** Indentation is reduced to its depth, so 2 spaces and 4 spaces compare equal. */
export function normalise(src: string): string {
  const lines = src
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l.trim() !== "");
  const depths = [...new Set(lines.map(indentOf))].sort((a, b) => a - b);
  return lines
    .map((l) => "\t".repeat(depths.indexOf(indentOf(l))) + squash(l.trim()))
    .join("\n");
}

const answersOf = (card: Card) => [card.solution, ...(card.accepted ?? [])];

export function strictMatch(card: Card, input: string): boolean {
  const given = input.replace(/\r/g, "").trimEnd();
  return answersOf(card).some((a) => a === given);
}

export function smartMatch(card: Card, input: string): boolean {
  const given = normalise(input);
  return answersOf(card).some((a) => normalise(a) === given);
}

export function matches(card: Card, input: string, strict: boolean): boolean {
  return strict ? strictMatch(card, input) : smartMatch(card, input);
}
