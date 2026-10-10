import type { Card, Language } from "../core/types";

export type Seed = Omit<Card, "language" | "tags" | "skill" | "level"> & Partial<Pick<Card, "tags" | "skill" | "level">>;
type Variant = Partial<Seed> & { k: string };

/** Builds a deck where every card carries the topic tag unless it sets its own. */
export function topic(language: Language, tag: string, seeds: (Seed | Seed[])[]): Card[] {
  return seeds.flat().map((s) => ({ ...s, language, tags: s.tags ?? [tag], skill: s.skill ?? s.id, level: s.level ?? 2 }));
}

/**
 * One piece of syntax applied to several shapes of data.
 * `base` holds what the variants share; each variant overrides the rest.
 * Card ids are `<skill id>--<variant key>`.
 */
export function skill(id: string, level: Card["level"], base: Partial<Seed>, variants: Variant[]): Seed[] {
  return variants.map(({ k, ...v }) => ({ ...base, ...v, id: `${id}--${k}`, skill: id, level }) as Seed);
}
