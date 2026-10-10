import type { Card } from "../core/types";
import { calling } from "./python/calling";
import { counters, deques } from "./python/collections";
import { dicts } from "./python/dicts";
import { heaps } from "./python/heaps";
import { lists } from "./python/lists";
import { loops } from "./python/loops";
import { classes, maths, sorting } from "./python/misc";
import { sets } from "./python/sets";
import { slicing } from "./python/slicing";
import { strings } from "./python/strings";
import { tuples } from "./python/tuples";

export const cards: Card[] = [
  ...loops,
  ...calling,
  ...maths,
  ...lists,
  ...slicing,
  ...strings,
  ...tuples,
  ...dicts,
  ...sets,
  ...counters,
  ...deques,
  ...heaps,
  ...sorting,
  ...classes,
];

/** Topics as laid out on the Home screen. Every topic belongs to exactly one group. */
export const groups: { name: string; topics: string[] }[] = [
  { name: "core", topics: ["loops", "calling"] },
  { name: "numbers", topics: ["math"] },
  { name: "sequences", topics: ["lists", "slicing", "strings", "tuples"] },
  { name: "hashing", topics: ["dicts", "sets", "counter"] },
  { name: "linear", topics: ["deque", "heaps"] },
  { name: "ordering", topics: ["sorting"] },
  { name: "objects", topics: ["classes"] },
];

export const tags: string[] = groups.flatMap((g) => g.topics);
