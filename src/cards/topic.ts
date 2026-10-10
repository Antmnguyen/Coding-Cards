import type { Card, Language } from "../core/types";

type Seed = Omit<Card, "language" | "tags"> & { tags?: string[] };

/** Builds a deck where every card carries the topic tag unless it sets its own. */
export function topic(language: Language, tag: string, seeds: Seed[]): Card[] {
  return seeds.map((s) => ({ ...s, language, tags: s.tags ?? [tag] }));
}
