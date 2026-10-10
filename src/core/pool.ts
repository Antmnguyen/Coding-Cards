import type { Card, Settings } from "./types";

/** The cards a session may draw from. Thinking cards are left out unless the setting is on. */
export function sessionPool(cards: Card[], settings: Pick<Settings, "tags" | "levels" | "thinking">): Card[] {
  return cards.filter(
    (c) =>
      (settings.thinking || c.kind === "recall") &&
      (settings.tags.length === 0 || c.tags.some((t) => settings.tags.includes(t))) &&
      (settings.levels.length === 0 || settings.levels.includes(c.level)),
  );
}
