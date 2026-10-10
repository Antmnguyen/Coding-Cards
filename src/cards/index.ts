import type { Card } from "../core/types";
import { THINK_IDS } from "./thinking";
import { TRAP_IDS, TRAPS_TAG } from "./traps";
import { basics, conditionals, conversion } from "./python/basics";
import { calling } from "./python/calling";
import { classes, objects } from "./python/classes";
import { counters } from "./python/counter";
import { defaultdicts, dicts } from "./python/dicts";
import { comprehensions, functions } from "./python/functions";
import { graphs, intervals } from "./python/graphs";
import { heaps } from "./python/heaps";
import { deques, stacks } from "./python/linear";
import { lists } from "./python/lists";
import { loops } from "./python/loops";
import { iteration } from "./python/iteration";
import { maths } from "./python/math";
import { sorting } from "./python/sorting";
import { callingMore, dictsMore, heapsMore, loopsMore, stringsMore } from "./python/pass2";
import { countersMore, listsMore, setsMore, slicingMore, tuplesMore } from "./python/pass3";
import { classesMore, graphsMore, gridsMore, linkedListsMore, objectsMore, treesMore } from "./python/pass4";
import {
  backtrackingMore,
  bisectsMore,
  bitsMore,
  dpMore,
  iterationMore,
  itertoolsMore,
  prefixSumsMore,
  sortingMore,
  twoPointersMore,
} from "./python/pass5";
import {
  loopsRecall,
  slicingRecall,
  stringsRecall,
  stacksRecall,
  iterationRecall,
  sortingRecall,
  dictsRecall,
  countersRecall,
  heapsRecall,
  classesRecall,
  gridsRecall,
  treesRecall,
  itertoolsRecall,
  backtrackingRecall,
} from "./python/pass6";
import { sets } from "./python/sets";
import { slicing } from "./python/slicing";
import { grids, linkedLists, trees } from "./python/structures";
import { strings } from "./python/strings";
import { backtracking, dp, prefixSums, twoPointers } from "./python/techniques";
import { bisects, bits, itertoolsDeck, misc } from "./python/tools";
import { tuples } from "./python/tuples";

const decks: Card[] = [
  ...basics,
  ...conditionals,
  ...loops,
  ...functions,
  ...calling,
  ...comprehensions,
  ...conversion,
  ...maths,
  ...lists,
  ...slicing,
  ...strings,
  ...tuples,
  ...dicts,
  ...defaultdicts,
  ...sets,
  ...counters,
  ...stacks,
  ...deques,
  ...heaps,
  ...iteration,
  ...sorting,
  ...classes,
  ...objects,
  ...grids,
  ...linkedLists,
  ...trees,
  ...graphs,
  ...intervals,
  ...bisects,
  ...itertoolsDeck,
  ...bits,
  ...twoPointers,
  ...prefixSums,
  ...dp,
  ...backtracking,
  ...misc,
  ...callingMore,
  ...loopsMore,
  ...heapsMore,
  ...dictsMore,
  ...stringsMore,
  ...listsMore,
  ...slicingMore,
  ...setsMore,
  ...countersMore,
  ...tuplesMore,
  ...classesMore,
  ...objectsMore,
  ...gridsMore,
  ...linkedListsMore,
  ...treesMore,
  ...graphsMore,
  ...sortingMore,
  ...iterationMore,
  ...itertoolsMore,
  ...bitsMore,
  ...bisectsMore,
  ...twoPointersMore,
  ...prefixSumsMore,
  ...dpMore,
  ...backtrackingMore,
  ...loopsRecall,
  ...slicingRecall,
  ...stringsRecall,
  ...stacksRecall,
  ...iterationRecall,
  ...sortingRecall,
  ...dictsRecall,
  ...countersRecall,
  ...heapsRecall,
  ...classesRecall,
  ...gridsRecall,
  ...treesRecall,
  ...itertoolsRecall,
  ...backtrackingRecall,
];

export const cards: Card[] = decks
  .map((c) => (TRAP_IDS.has(c.id) ? { ...c, tags: [...c.tags, TRAPS_TAG] } : c))
  .map((c) => (THINK_IDS.has(c.id) ? { ...c, kind: "think" as const } : c));

/** Topics as laid out on the Home screen. Every topic belongs to exactly one group. */
export const groups: { name: string; topics: string[] }[] = [
  { name: "core", topics: ["basics", "conditionals", "loops", "functions", "calling", "comprehensions", "conversion"] },
  { name: "numbers", topics: ["math", "bits"] },
  { name: "sequences", topics: ["lists", "slicing", "strings", "tuples"] },
  { name: "hashing", topics: ["dicts", "defaultdict", "sets", "counter"] },
  { name: "linear", topics: ["stack", "deque", "heaps"] },
  { name: "iterating", topics: ["iteration", "itertools"] },
  { name: "ordering", topics: ["sorting", "bisect"] },
  { name: "objects", topics: ["classes", "objects"] },
  { name: "structures", topics: ["grids", "linked-lists", "trees", "graphs", "intervals"] },
  { name: "techniques", topics: ["two-pointers", "prefix-sums", "dp", "backtracking"] },
  { name: "extras", topics: ["misc", TRAPS_TAG] },
];

export const tags: string[] = groups.flatMap((g) => g.topics);
