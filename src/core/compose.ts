import type { Card } from "./types";

export const ANSWER_SLOT = "{answer}";

/** The code that actually runs: the answer placed into the card's template at the slot's indentation. */
export function compose(card: Pick<Card, "template">, answer: string): string {
  if (!card.template) return answer;
  return card.template
    .split("\n")
    .map((line) => {
      if (!line.includes(ANSWER_SLOT)) return line;
      const indent = line.slice(0, line.indexOf(ANSWER_SLOT));
      return answer
        .split("\n")
        .map((l) => indent + l)
        .join("\n");
    })
    .join("\n");
}

/** The given code as shown on the card, with a blank where the answer goes. */
export function givenCode(card: Pick<Card, "setup" | "template">): string {
  return [card.setup, card.template?.replace(ANSWER_SLOT, "____")].filter(Boolean).join("\n");
}
