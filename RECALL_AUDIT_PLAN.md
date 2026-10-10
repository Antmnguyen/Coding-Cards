# Plan: get the deck back to quick syntax recall

This app is a **syntax builder, not a logic builder**. A card is read and typed in a few seconds. You either remember the syntax or you don't. Nothing is worked out.

Three rules fix the deck:

1. **A recall card stacks at most 2 ideas.** No exceptions.
2. **Every existing card with 3 or more ideas is labelled `thinking`.** Thinking cards are off by default. No card is rewritten or deleted.
3. **A variant is the same syntax on different data.** `nums` as a list of ints, `nums` as a list of tuples, `nums` as a list of objects. A variant never adds an idea.

## 1. The card that triggered this

`sort-objects--in-place-desc`, `src/cards/python/sorting.ts:58`, level 2:

> `points` is a list of `Point` objects. Sort it in place by the `y` field, largest first. Call each object `p`.
>
> `points.sort(key=lambda p: p.y, reverse=True)`

Three ideas: `.sort()` in place, `key=lambda`, `reverse=True`. Over the limit, so it becomes a thinking card. It was written as a "variant" of `sort-objects--by-field`, but it is not the same syntax on different data. It is the same data with two more ideas bolted on.

## 2. What counts as an idea

An idea is one piece of syntax you have to remember.

| Counts as 1 idea | Examples |
|---|---|
| a function or method call | `sorted(...)`, `.sort()`, `heapq.heappush(...)`, `"".join(...)` |
| a keyword argument, with its value | `reverse=True`, `key=len`, `key=lambda p: p.x`, `default=0` |
| a slice or a non-trivial index | `[:3]`, `[::-1]`, `[-k]` |
| a comprehension clause | the `for` part is 1, an `if` filter is 1 more, a second `for` is 1 more |
| a conditional expression | `a if cond else b` |
| a statement header | `for ... in ...:`, `while ...:`, `if ...:`, `def ...:` |
| each extra statement | a second line of logic is 1 more (an import line is free) |
| a tuple key or a negation trick | `(len(w), w)`, `-p[1]` |

**Free, never counted:** variable names, and reaching into the item you were given: `p.y`, `p[1]`, `x[0]`, `node.val`, `grid[r][c]`. That is exactly what a data variant changes, so it has to be free.

Counting the sorting cards:

| Card | Answer | Ideas | Verdict |
|---|---|---|---|
| `sort-basic--words` | `sorted(words)` | 1 | recall |
| `sort-basic--descending` | `sorted(nums, reverse=True)` | 2 | recall |
| `sort-key--second-of-pair` | `a.sort(key=lambda p: p[1])` | 2 | recall |
| `sort-objects--by-field` | `sorted(points, key=lambda p: p.x)` | 2 | recall |
| `sort-objects--in-place-desc` | `points.sort(key=lambda p: p.y, reverse=True)` | 3 | thinking |
| `sort-multi-key--second-desc` | `sorted(pairs, key=lambda p: p[1], reverse=True)` | 3 | thinking |
| `sort-multi-key--count-desc-then-alpha` | `sorted(pairs, key=lambda p: (-p[1], p[0]))` | 4 | thinking |
| `sort-objects--two-fields` | `sorted(points, key=lambda p: (p.x, p.y))` | 3 | thinking |
| `sort-basic--string-desc` | `"".join(sorted(s, reverse=True))` | 3 | thinking |
| `sort-pick--top-three` | `sorted(nums, reverse=True)[:3]` | 3 | thinking |
| `sort-indexes--argsort` | `sorted(range(len(nums)), key=lambda i: nums[i])` | 4 | thinking |
| `sort-comparator--largest-number` | `strs.sort(key=cmp_to_key(lambda a, b: -1 if a + b > b + a else 1))` | 5 | thinking |

## 3. What a variant is

A variant keeps the answer's syntax and swaps the data it runs on. The only part of the answer allowed to change is how you reach the value.

Good variants of "sort by one thing with `key=lambda`":

| Data | Answer |
|---|---|
| list of pairs | `sorted(a, key=lambda p: p[1])` |
| list of `[start, end]` lists | `sorted(intervals, key=lambda x: x[1])` |
| list of `Point` objects | `sorted(points, key=lambda p: p.y)` |
| list of strings | `sorted(words, key=lambda w: w[-1])` |

Same two ideas every time. That is the whole variant system.

Not a variant: adding `reverse=True`, switching to a tuple key, wrapping in `"".join`, taking a slice of the result. Each of those is a new idea. If the result is still 2 ideas it is its own skill with its own data variants; if it is 3 or more it is a thinking card.

## 4. Why the deck drifted

1. **`CARD_RULES.md` limits lines, not ideas.** "Never more than 3 lines" is the only size rule, and one line can hold five ideas.
2. **`CARD_PLAN.md` crosses variant axes.** Its axis table lists "Mutation", "Direction", "Call form" next to "Element type", and sections multiply them together. Its goal sentence asks for "a heap of objects with a tiebreaker". Only the data axes (element type, container shape, naming) are real variants.
3. **`level` is doing the wrong job.** Level 3 means "tricky or rare", all levels are on by default, and the trigger card is level 2 anyway.
4. **No test** counts ideas, so nothing stops the next one.

## 5. Size of the job

Deck: 1,447 cards, 344 skills. A rough automatic count of ideas per answer puts **232 cards at 3 or more**: 21 at level 1, 136 at level 2, 75 at level 3. The counter over-counts a little (it scores `key=lambda` as two), so treat 232 as the upper end and expect roughly 150 to 200 after reading them.

Share over budget by topic:

| Heavy, read every card | Some, read the flagged ones | Clean |
|---|---|---|
| sorting 23/34, backtracking 7/15, graphs 16/36, trees 14/34, iteration 22/54, itertools 11/30, intervals 4/11, classes 14/40, grids 11/34 | defaultdict 5/21, loops 21/91, heaps 10/53, counter 7/38, dicts 12/69, linked-lists 5/29, two-pointers 3/21, objects 5/37, strings 12/101 | dp, sets, deque, math, comprehensions, slicing, prefix-sums, bisect, bits, functions, lists, calling, tuples, basics, conditionals, conversion, stack, misc |

## 6. Steps

### Step 1. Add the thinking label to the app

- `src/core/types.ts`: add `kind: "recall" | "think"` to `Card`, and `thinking: boolean` to `Settings`.
- `src/cards/topic.ts`: `topic()` defaults `kind` to `"recall"`. A whole skill is labelled in `skill()`'s `base`, one variant in the last argument of `v()`.
- `src/renderer/store.ts`: default `thinking: false`. `start()` drops `think` cards from the pool unless it is on. `cleanSettings()` defaults it to false, so saved settings get the recall-only deck.
- `src/renderer/screens/Home.tsx`: a `thinking cards` chip in the `options` row, off by default. Topic counts and mastery count recall cards only while it is off.

Card ids, prompts and answers do not change, so history is kept.

### Step 2. Generate the audit list

`scripts/audit.mjs`: bundle `src/cards/index.ts` with esbuild, count ideas per answer using the table in section 2, and write `audit.tsv`: `id, topic, level, ideas, solution, verdict`. Sorted by topic, highest count first.

### Step 3. Label every card at 3+ ideas

Recount each flagged card by hand with section 2. Two outcomes only:

| Count | Action |
|---|---|
| 2 or fewer (the counter over-counted) | stays recall, add to `COUNTED_BY_HAND` in the test (step 6) |
| 3 or more | add `kind: "think"`. Nothing else about the card changes |

Order: the heavy column, then the flagged cards in the middle column, then a skim of the clean topics for anything the counter missed.

When every variant of a skill is over, label the skill once in its `base`. Expected: `sort-multi-key`, `sort-indexes`, `graph-weighted`, `graph-union-find`, `trie`, `heap-simulations`, `class-design-methods`, `prefix-more`, `dp-more-transitions`, `bt-more`, `tree-paths`, `tp-more`.

Multi-line answers follow the same count. The grid double loop (`for r in range(rows):` / `for c in range(cols):`) is two headers plus an extra line, so it is thinking.

### Step 4. Check the variants of every skill

After step 3, for each of the 344 skills put the recall variants' answers side by side:

- Same shape of answer, differing only in how the data is reached. Fine.
- A skill left with no recall variant, or only one data shape. Note it as a gap. New recall cards to fill gaps are data variants (ints, strings, tuples, objects) and are a follow-up, not part of this audit.

### Step 5. Fix `level`

Level goes back to meaning how common the syntax is: 1 = bare basics, 2 = everyday, 3 = rare. A rare 1-idea card is fine in the main deck. Nothing is level 3 just for being hard; hard is what `kind` is for.

### Step 6. Stop it coming back

- **`CARD_RULES.md`**
  - "What a card is": syntax builder, not logic builder; at most 2 ideas; the idea table from section 2.
  - "Skills, variants and levels": a variant is the same syntax on different data and never adds an idea; add `kind`.
- **`CARD_PLAN.md`**
  - Goal sentence: drop "up to a heap of objects with a tiebreaker".
  - Axis table: keep element type, container shape and naming as variant axes. Mutation, direction, call form and phrasing are separate skills, not variants.
  - Add the rule: axes are never crossed in one card.
  - Mark group J (technique lines) and tries as `think` by default.
  - Log this under "Decisions made while implementing".
- **`tests/cards.test.ts`**
  - Every `kind: "recall"` card scores 2 or fewer on the idea counter from `scripts/audit.mjs`.
  - Cards the counter gets wrong go in a short `COUNTED_BY_HAND` list in the test file, each with its real count.
  - A `think` card never appears in a session drawn with `thinking` off (add to the store/session tests).

### Step 7. Check and ship

1. `npm test` and `npx tsc --noEmit` green.
2. Rerun `scripts/audit.mjs`: no recall card at 3+ outside `COUNTED_BY_HAND`.
3. Drill 50 cards on the default deck. Anything that takes more than a few seconds to read and type gets recounted and labelled.
4. `npm run dist`.
