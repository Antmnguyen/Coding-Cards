# Recall audit: progress

The plan is `RECALL_AUDIT_PLAN.md`. Step numbers below are that file's steps. Section order (A1, A2, ...) is the section order of `CARD_PLAN.md`.

**State: every step is done.** What is left is listed under "Follow-up" in the gap section and under "Not done" at the end.

## Status

| Plan step | What | Status |
|---|---|---|
| 1 | Thinking label in the app (type, setting, Home chip, session filter) | **done**. `kind` on `Card`, `thinking` on `Settings`, `src/core/pool.ts`, `src/cards/thinking.ts`, chip in Home options row. `tsc` clean |
| 2 | Idea counter and audit list | **done**. `src/core/ideas.ts`, `scripts/audit.mjs` (writes `audit.tsv`, git-ignored). First run: 251 of 1,447 cards at 3+ |
| 3 | Label every card at 3+ ideas, section by section | **done**. 215 of 1,447 labelled (16 level 1, 133 level 2, 66 level 3). 1,232 recall cards left in the main deck |
| 4 | Variant check, gap list | **done**. Gap list below; filling gaps is follow-up work |
| 5 | Fix `level` wording | **done** for the meaning (types, Home chip now says `3 rare`, both docs). Individual skills were not re-levelled |
| 6 | Rules, card plan and tests updated | **done**. `CARD_RULES.md` (new "Two ideas at most" section, variant rule, `kind`), `CARD_PLAN.md` (goal, axis rule, decision log), `tests/cards.test.ts` (3 new tests), `tests/pool.test.ts` (new) |
| 7 | Tests, typecheck, build | tests green (5,690), `tsc` clean; **done**. `npm run dist` rebuilt `release/codingcards.exe` (2026-10-10 16:02) with the gap cards in |

## Step 3 sections

Filled in as each section is finished.

| Section | Topic tags | Cards | Labelled thinking | Status |
|---|---|---|---|---|
| A. Core language (A1-A7) | basics, conversion, conditionals, loops, functions, calling, comprehensions | 300 | 24 | done |
| B. Numbers (B1, B2) | math, bits | 73 | 5 | done |
| C. Sequences (C1-C6) | lists, slicing, grids, strings, tuples | 384 | 34 | done |
| D. Hashing (D1-D4) | dicts, defaultdict, sets, counter | 171 | 28 | done |
| E. Linear structures (E1-E3) | stack, deque, heaps | 96 | 11 | done |
| F. Ordering and searching (F1, F2) | sorting, bisect | 56 | 14 | done |
| G. Iteration tools (G1, G2) | iteration, itertools | 84 | 35 | done |
| H. Objects (H1, H2) | classes, objects | 77 | 10 | done |
| I. LeetCode structures (I1-I4) | linked-lists, trees, graphs, intervals | 110 | 34 | done |
| J. Technique lines (J1-J4) | two-pointers, prefix-sums, dp, backtracking | 83 | 19 | done |
| K. Cross-cutting (K2; K1 traps are tags on cards above) | misc | 13 | 0 | done |

## Step 4: gaps left in the main deck

Skills where every card went to thinking, so the main deck no longer drills them (cards in brackets):
`for-nested-three` (1), `for-pairs` (2), `slice-generate` (5), `stack-conditions` (3), `zip-compare` (4), `zip-longest` (1), `sort-multi-key` (3), `grid-bounds` (2), `tree-traversal` (4).

Skills with one recall card left:
`for-sorted`, `while-compound`, `str-rebuild`, `dict-sort`, `dd-create-custom`, `counter-sort`, `counter-sources`, `heap-build`, `iter-next`, `sort-comparator`, `sort-indexes`, `class-define`, `grid-aggregate`, `tree-recursion`, `tree-levels`, `itertools-combos`, `product`, `bt-loop`.

Recall + thinking per topic after the audit:
basics 33+0, conditionals 23+0, loops 75+16, functions 32+1, calling 74+1, comprehensions 24+6, conversion 15+0, math 40+3, bits 28+2, lists 99+4, slicing 92+6, strings 87+14, tuples 48+0, dicts 58+11, defaultdict 18+3, sets 39+4, counter 28+10, stack 16+3, deque 24+0, heaps 45+8, iteration 30+24, itertools 19+11, sorting 20+14, bisect 22+0, classes 32+8, objects 35+2, grids 23+11, linked-lists 23+6, trees 21+13, graphs 27+9, intervals 5+6, two-pointers 17+4, prefix-sums 14+3, dp 25+5, backtracking 8+7, misc 13+0.

### Gap cards (done)

`src/cards/python/pass6.ts` adds 69 recall cards in 21 new skills, each a 2-idea piece of a bigger line with the rest in the given code. Deck is now 1,516 cards: 1,301 recall, 215 thinking. Tests green (5,961).

| Gap | New skill(s) |
|---|---|
| `for-pairs`, `for-nested-three`, grid double loop | `for-inner` (inner header with the outer loop given) |
| `slice-generate` | `slice-each` |
| `stack-conditions`, `while-compound` | `stack-top-test` |
| `zip-compare` | `zip-neighbours`, `pairs-reduce` |
| `zip-longest` | `zip-longest-fill` |
| map/filter with a lambda | `map-filter-lambda` |
| `sort-multi-key`, `sort-indexes` | `key-tuple`, `key-negate`, `sort-by-lookup` |
| `dict-sort`, `counter-sort` | `dict-sort-pieces`, `counter-sort-pieces` |
| `heap-build` | `heap-list-build` |
| `class-define`, property, dataclass | `class-headers`, `class-decorated-headers` |
| `grid-bounds`, `grid-aggregate` | `grid-in-bounds`, `grid-fold` |
| `tree-traversal`, `tree-recursion` | `tree-visit-lines`, `tree-return-combined` |
| `itertools-combos` | `groupby-keys` |
| `bt-loop` | `for-from-start` |
| `str-rebuild` | `words-rebuild` |

Still with one recall card and no new ones: `for-sorted`, `dd-create-custom`, `counter-sources`, `iter-next`, `sort-comparator`, `tree-levels`, `product`. Their thinking cards need 3 ideas to mean anything, or the 2-idea piece already exists elsewhere.

## Notes and decisions

- **Labels live in one list, not on each card.** `src/cards/thinking.ts` holds `THINK_IDS`, applied in `src/cards/index.ts` the same way `traps.ts` is. The plan said to mark cards in `skill()`/`v()`; a list is safer (no card text is touched) and is the audit trail. A card can still set `kind` itself.
- **How to audit a section:** `node scripts/audit.mjs <topic>` prints every card of the topic with its count. Add ids at 3+ to `THINK_IDS`. If the counter is wrong for a card, put the real count in `COUNTED_BY_HAND` in the same file.
- **Counter conventions:** a header line is 1; every other line after the first is 1; each call, keyword argument, lambda, comprehension `for`/`if`, `and`/`or`, unary minus, and computed/negative/slice index is 1. `range(len(x))` is one call. Imports are free.
- **Counter refinements made during the audit:** every statement is at least 1 (so `a()` / `b()` is 2, not 3); `key=attrgetter("x")` is one keyword argument; indexing inside a lambda is free; an f-string counts as a call.
- **Counted by hand (5 cards, in `COUNTED_BY_HAND`):** `call-keyword--keyword-only` = 2, `class-init--header-defaults` = 2, `tree-create--with-children` = 2 (counter said 3); `counter-questions--majority` = 3, `ll-reverse--whole-loop` = 3, `list-edits--reverse-segment` = 3 (counter said 2).
- **Basic cards that are now thinking because they are 3+ ideas by the rule:** the grid double loop, `for j in range(i + 1, len(a)):`, `class Node:` with `__init__` (3 lines), `@property` with its method, the three tree traversal orders, `list(map(lambda ...))`. To bring one back, add its id with a hand count of 2 to `COUNTED_BY_HAND` and remove it from `THINK_IDS`.
- **Trap cards:** thinking cards that are also tagged `traps` follow the same switch, so the `traps` chip shows only recall traps unless thinking is on.
- **Not done:** the app was not opened to click the new chip by hand; nothing is committed.
