import type { Card } from "../core/types";
import { lists } from "./python/lists";
import { strings } from "./python/strings";
import { dicts } from "./python/dicts";
import { sets } from "./python/sets";
import { tuples } from "./python/tuples";
import { heaps } from "./python/heaps";
import { counters, deques } from "./python/collections";
import { classes, maths, sorting } from "./python/misc";

export const cards: Card[] = [
  ...lists,
  ...strings,
  ...dicts,
  ...sets,
  ...tuples,
  ...heaps,
  ...deques,
  ...counters,
  ...maths,
  ...classes,
  ...sorting,
];

/** Topics in deck order. */
export const tags: string[] = [...new Set(cards.flatMap((c) => c.tags))];
