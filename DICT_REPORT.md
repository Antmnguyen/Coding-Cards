# Report: what the dictionary cards actually ask for

Scope: the `dicts` topic (72 cards) and the `defaultdict` topic (21 cards). Read card by card on 2026-10-12. No card was changed.

Your saved settings are `dicts`, levels 1 and 2, thinking cards off. That gives a pool of **60 cards**. Everything below is about those 60 unless it says otherwise.

## The short version

- **37 of the 60 are one move.** `d[k]`, `d.get(k, 0)`, `del d[k]`, `k in d`. These are fine.
- **23 of the 60 are not one move.** That is about 4 cards in every 10-card session.
- **9 of those 23 are over the 2-idea limit or are plain problem logic**, and are still labelled `recall`. They got through because the idea counter does not count operators or assignments.
- **12 of the 23 are not dictionary syntax at all.** They are sorting or `sum` / `max` syntax with a dictionary used as the data.
- The 11 worst dict cards are already labelled `think` and are off for you. The problem is what is left in the recall deck.

So "all layered" is not literally true, but in 6 of the 14 patterns at least half the cards are layered, and the session draw takes one card per pattern before repeating, so they show up every session.

## The 23 cards that are more than one move

### A. Over the limit or logic, but labelled recall (9)

"Steps" is my own count of the things you have to produce. The app's counter scored every one of these 1 or 2.

| Card | Answer | Steps | What is stacked |
|---|---|---|---|
| `dict-patterns--two-sum-check` | `if target - x in seen:` ⏎ `return [seen[target - x], i]` | 5+ | `if`, subtract, `in`, `return`, build a list, look up. You also read a 6-line function first. This is the Two Sum solution, not syntax. |
| `dict-patterns--count-loop` | `for x in nums:` ⏎ `d[x] = d.get(x, 0) + 1` | 4 | loop header, store, `.get` with default, `+ 1` |
| `dict-write--increment-missing` | `d[k] = d.get(k, 0) + 1` | 3 | store, `.get` with default, `+ 1` |
| `dict-in--init-if-missing` | `if k not in d:` ⏎ `d[k] = []` | 3 | `if`, `not in`, store |
| `dict-remove--drop-when-zero` | `if d[k] == 0:` ⏎ `del d[k]` | 3 | `if`, compare, `del` |
| `dict-build--value-to-index` | `pos = {v: i for i, v in enumerate(a)}` | 3 | dict comprehension, `enumerate`, swap the pair round |
| `dict-build--char-to-index` | `rank = {c: i for i, c in enumerate(order)}` | 3 | same |
| `dict-queries--shared-keys` | `d1.keys() & d2.keys()` | 3 | `.keys()` twice, `&` |
| `dict-in--complement` | `target - x in seen` | 2 | Short answer, but the card makes you work out the Two Sum complement from a description. That is logic. |

### B. Another topic's syntax, with a dictionary as the data (12)

Each is 2 ideas, so each is inside the rule. But what you are recalling is `sorted(..., key=...)` or `sum(...)`, not anything about dictionaries.

| Card | Answer |
|---|---|
| `dict-sort-pieces--items-by-value` | `sorted(items, key=lambda kv: kv[1])` (no dictionary in the answer at all) |
| `dict-sort-pieces--keys-by-value` | `sorted(d, key=d.get)` |
| `dict-sort-pieces--keys-desc` | `sorted(d, reverse=True)` |
| `dict-value-shapes--sort-list-of-dicts` | `sorted(rows, key=lambda r: r["age"])` |
| `dict-queries--items-sorted-by-key` | `sorted(d.items())` |
| `dict-views--keys` | `list(d.keys())` |
| `dict-views--values` | `list(d.values())` |
| `dict-views--values-as-lists` | `list(groups.values())` |
| `dict-views--sum-values` | `sum(d.values())` |
| `dict-views--max-value` | `max(d.values())` |
| `dict-views--key-of-max` | `max(d, key=d.get)` |
| `dict-views--key-of-min` | `min(d, key=d.get)` |

The whole `dict-views` pattern (7 cards) is "a view, wrapped in something". There is no card that asks for `d.keys()`, `d.values()` or `d.items()` on its own.

### C. Two dictionary calls chained (2)

| Card | Answer |
|---|---|
| `dict-setdefault--append` | `d.setdefault(k, []).append(x)` |
| `dict-value-shapes--nested-safe-get` | `d.get(a, {}).get(b, 0)` |

## Where they sit

Share of each pattern's recall cards (levels 1 and 2) that are more than one move:

| Pattern | More than one move |
|---|---|
| `dict-views` | 7 of 7 |
| `dict-sort-pieces` | 3 of 3 |
| `dict-build` | 2 of 2 |
| `dict-queries` | 2 of 3 |
| `dict-patterns` | 2 of 3 |
| `dict-setdefault` | 1 of 2 |
| `dict-in` | 2 of 5 |
| `dict-value-shapes` | 2 of 7 |
| `dict-remove` | 1 of 4 |
| `dict-write` | 1 of 7 |
| `dict-create`, `dict-read`, `dict-merge`, `dict-sort` | 0 of 17 |

## Why the label is wrong on the 9

`src/core/ideas.ts` counts calls, keyword arguments, lambdas, comprehension clauses, slices and block headers. It gives nothing for:

- arithmetic and comparison: `+ 1`, `target - x`, `== 0`
- `in` and `not in`
- set operators: `&`
- storing into a key: `d[k] = ...`
- building a list or tuple in the answer

A whole line scores at least 1, so `d[x] = d.get(x, 0) + 1` scores 1 (one call) and the two-line Two Sum check scores 2 (one per line). `CARD_RULES.md` has the same gap: its table of what counts as an idea lists none of the above.

## Other things that add load

- **Story prompts.** Five recall cards describe a problem instead of naming the syntax: Two Sum (`dict-in--complement`, `dict-patterns--two-sum-check`), the prefix-sum seed (`dict-create--seeded`), graph neighbours (`dict-read--get-default-list`), index bookkeeping (`dict-write--index-of-value`). You translate the story before you type.
- **Templates to read.** Four cards drop the answer into surrounding code: `dict-read--get`, `dict-remove--pop-default`, `dict-patterns--two-sum-check`, `dict-iterate-trap--snapshot-keys`.
- **Two-line answers.** Four recall cards need an `if` or `for` line plus a body.
- **Near-duplicates across the think line.** `dict-sort-pieces--items-by-value` (recall) is `dict-sort--items-by-value` (think) with `.items()` moved into the given code.

## defaultdict (21 cards)

In much better shape. 12 are one move (`counts[x] += 1`, `graph[u].append(v)`, `defaultdict(list)`). 6 are two clean moves (`for c in s:` + `counts[c] += 1`, `defaultdict(lambda: -1)`, `cache.popitem(last=False)`). 3 are layered and already labelled `think`. Nothing here is mislabelled. `ordered-dict--first-key` (`next(iter(d))`) is filed under `defaultdict` but is about plain dictionaries.

## Already off for you

11 dict cards are labelled `think` (3 or 4 ideas each): the four `dict-sort` cards with `key=` and `reverse=`, five `dict-queries` comprehensions, `dict-value-shapes--total-list-lengths`, `dict-value-shapes--dict-of-dicts-set`, `dict-patterns--char-counts-comprehension`. These are not in your sessions.

## What I would do

1. Label the 9 cards in group A `think`. The recall pool drops to 51.
2. Make the counter and `CARD_RULES.md` count an operator, an `in` test and a store as an idea each, so this cannot come back in other topics.
3. Decide group B. Either move the five `sorted` cards to the `sorting` topic and leave `dict-views` as is, or add plain `d.keys()` / `d.values()` / `d.items()` cards and label the wrapped ones `think`.
4. Rewrite the five story prompts to name the syntax directly.
