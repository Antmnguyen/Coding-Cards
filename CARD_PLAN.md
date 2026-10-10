# Card expansion plan

Goal: if a line of Python can show up in a LeetCode solution, there is a card for it, from `for i in range(n):` up to a heap of objects with a tiebreaker. Today there are 96 cards in 11 topics. This plan takes that to roughly 2,000 cards in 38 sections across 11 groups.

Every card still follows `CARD_RULES.md`. This file says **what** to cover and **in what order**; that file says how a single card is written.

## 0. Progress log (read this first, update it after every section)

**Last updated:** 2026-10-10, end of work cycle 1. **Deck size: 288 cards.** `npm test` green.

### How to resume
1. Read `CARD_RULES.md` (how one card is written) and one finished section file as a model: `src/cards/python/loops.ts` for hand-written variants, `src/cards/python/slicing.ts` for generated variants.
2. Take the first row below that is not `done`. Its skill list is in section 2 of this file.
3. Write the section in `src/cards/python/<section>.ts` with `topic()` and `skill()` from `src/cards/topic.ts`. Add it to `cards` and to a group in `src/cards/index.ts`.
4. Run `npm test` until green, then `npx tsc --noEmit`.
5. Update the table and the notes below **before** starting the next section.
6. `npm run dist` rebuilds `release/codingcards.exe` (do it at the end of a cycle, not per section).

### Status

| Step | Section | File | Skills | Cards | Status |
|---|---|---|---|---|---|
| 0 | App changes (`skill`, `level`, `variants`, grouped Home, mastery, templates, tests) | — | — | — | **done** |
| 1 | Migrate original cards to skill/level shape | all older files | — | — | **done** (they default to `skill = id`, `level = 2`) |
| 2 | A4 Loops | `loops.ts` | 22 | 74 | **done, first pass** (plan target 140) |
| 2 | C2 Slicing | `slicing.ts` | 28 | 84 | **done, first pass** (plan target 110) |
| 2 | A6 Functions: calling | `calling.ts` | 11 | 43 | **done, first pass** (plan target 120) |
| 3 | C1 Lists: create and read | `lists.ts` | 10 | 10 | old single-variant cards only; **next up** |
| 3 | C3 Lists: change | `lists.ts` | — | — | not started (some old cards overlap) |
| 3 | C5 Strings | `strings.ts` | 14 | 14 | old single-variant cards only |
| 3 | C6 Tuples | `tuples.ts` | 5 | 5 | old single-variant cards only |
| 3 | A1 Variables and operators | — | — | — | not started |
| 3 | A2 Type conversion | — | — | — | not started |
| 3 | A3 Conditionals | — | — | — | not started |
| 3 | A5 Functions: defining | — | — | — | not started |
| 3 | A7 Comprehensions | — | — | — | not started |
| 4 | D1 Dicts | `dicts.ts` | 13 | 13 | old single-variant cards only |
| 4 | D2 defaultdict / OrderedDict | — | — | — | not started |
| 4 | D3 Sets | `sets.ts` | 9 | 9 | old single-variant cards only |
| 4 | D4 Counter | `collections.ts` | 5 | 5 | old single-variant cards only |
| 5 | G1 zip / enumerate / map | — | — | — | not started (loop-header forms are already in `loops.ts`) |
| 5 | F1 Sorting | `misc.ts` | 4 | 4 | old single-variant cards only |
| 5 | B1 Arithmetic and math | `misc.ts` | 8 | 8 | old single-variant cards only |
| 6 | E1 Stack | — | — | — | not started |
| 6 | E2 Queue and deque | `collections.ts` | 5 | 5 | old single-variant cards only |
| 6 | E3 Heaps (all variants) | `heaps.ts` | 8 | 8 | old single-variant cards only |
| 6 | H1 Classes | `misc.ts` | 6 | 6 | old single-variant cards only |
| 6 | H2 Objects inside other structures | — | — | — | not started |
| 7 | C4 Grids, I1 Linked lists, I2 Trees, I3 Graphs, I4 Tries/intervals | — | — | — | not started |
| 8 | F2 Bisect, G2 itertools/functools, B2 Bits, J1–J4 technique lines, K2 odds and ends | — | — | — | not started |
| 9 | K1 trap tagging pass, whole-deck duplicate review | — | — | — | not started |

"First pass" means every skill in the plan's list has cards and they pass, but the card count is below the plan's target. The second pass adds the remaining variants listed under "Still to add" below.

### Still to add in finished sections (second pass)
- **Loops:** `for` over a list of lists by index of pairs/triples (`for i in range(len(a))` with `a[i]`, `a[i + 1]`), three-level loop for triples, `while` with a `not` condition, `while i < n and j < m` merge loop, walrus in a `while`, eight-direction neighbours, `for child in node.children`, loops over `range` with a negative step other than -1.
- **Slicing:** slices with two negative bounds (`x[-3:-1]`), comparing two slices, palindrome via slice, prefix/suffix test via slice, `x[i:j:k]` with all three as variables, a copy with `x[:]` on each type.
- **Calling:** more signature shapes (set, dict, tuple, bool flag, callback with two arguments), calling with a slice or a comprehension as the argument, chaining method calls, calling a nested helper that reads an outer variable, `sorted`/`max`/`min` with `key=` and a named function.

### Decisions made while implementing (do not redo)
- **Lines that cannot run alone use `template`.** A loop header is placed into `out = []\n{answer}\n    out.append(...)` and the check looks at `out`. This means header cards are run-checked, not text-matched. `collect()` in `loops.ts` builds the common template.
- **Generated variants.** `seq()` in `slicing.ts` produces list / string / tuple cards from one definition. Reuse that pattern wherever a skill applies unchanged to several sequence types.
- **Shared class snippets** are in `src/cards/python/given.ts` (`LIST_NODE`, `TREE_NODE`, `POINT`). Add `NODE` and `INTERVAL` there when first needed.
- **Old cards replaced by a new section are deleted**, not kept alongside (done for the list/string/dict/tuple/deque/heap cards that the loops and slicing sections now cover). Do the same when rewriting `lists.ts`, `strings.ts` and the rest: the rewrite replaces the file.
- **Imports:** still required in the answer when the given code does not import the module (open decision 1 in section 5 is unresolved; ask before changing).
- **Packaging tip:** `npm run dist` hangs if `release/codingcards.exe` is open. Close the app first, or build beside it with `npx electron-builder --win portable -c.portable.artifactName=codingcards-new.exe` (run `npm run build` first).
- **Tests only run from `tests/`** (`vitest.config.ts`), so copies of the repo under `.claude/` are ignored.
- **Editing tip:** write card files with the editor tools, not shell heredocs; `\n` inside card strings gets mangled by the shell.

## 1. How coverage is built: skills and variants

A **skill** is one piece of syntax ("push onto a heap"). A **variant** is that skill applied to a different shape of data ("heap of ints", "heap of `(dist, node)` tuples", "heap of objects"). Variants are what stop you memorising one card instead of learning the syntax.

Each section below lists its skills. Each skill is then multiplied along whichever of these axes apply:

| Axis | Values |
|---|---|
| **Element type** | int, float, str, single char, bool, None, tuple, list, dict, object (`Node`, `ListNode`, `TreeNode`, `Interval`, a custom class) |
| **Container shape** | flat list, list of lists (grid), list of tuples, list of objects, dict of lists, dict of dicts, dict of sets, set of tuples, tuple of tuples |
| **Position** | first, last, index `i`, negative index, middle, out of range, empty container |
| **Direction** | forwards, backwards, every k-th, from both ends |
| **Mutation** | in place vs new copy; returns a value vs returns None |
| **Call form** | positional, keyword, default omitted, `*args`, `**kwargs`, unpacked from a list/tuple/dict |
| **Naming** | LeetCode-style names (`nums`, `s`, `grid`, `root`, `head`, `intervals`) and neutral ones (`a`, `x`), so no card is recognisable by its variable name |
| **Phrasing of the same result** | when two spellings are both idiomatic (`a[::-1]` and `reversed(a)`), each gets its own card that asks for it specifically |

Not every skill uses every axis. The rule is: **a skill gets a variant wherever the syntax actually changes or where people actually slip.** `len()` of a list vs a dict vs a string is three cheap variants. "Append to a list of ints vs a list of strs" is not a variant, because nothing changes.

### App changes this needs (do these first)

1. **`skill` field on a card.** Variants share a skill id (`heap-push`), each has its own card id (`heap-push--tuple-dist-node`). A session draws at most one variant per skill until every skill in the pool has appeared, so a 25-card session is 25 different things.
2. **Weighting by skill as well as card.** A miss on one variant raises the weight of its sibling variants a little, because the weakness is the skill.
3. **`variants()` helper** next to `topic()`: one base card plus a list of `{ key, setup, expect, solution, check, prompt? }` overrides, so 6 variants are 6 short entries and not 6 copies.
4. **Two-level topics on Home.** 38 sections will not fit in one chip row. The 11 groups become the chips; a selected group expands to its sections.
5. **`level` field (1 to 3).** 1 = bare basics, 2 = everyday LeetCode, 3 = tricky or rare. A Home toggle filters by level, so "the very basics" and "heap of objects with `__lt__`" do not have to be mixed.
6. **Shared given-code snippets** for the standard classes (`ListNode`, `TreeNode`, `Node`, `Interval`) so every card that uses them shows the same definition.
7. **Card tests extended**: every skill has at least 2 variants unless marked `single`, and no two cards share the same prompt + given code.

## 2. Sections

Counts are skills → cards after variants. They are targets for sizing, not quotas.

### A. Core language

**A1. Variables, values and operators** (25 → 60)
Assignment, multiple assignment, chained assignment, augmented operators (`+= -= *= //= %= **= |= &= ^= <<= >>=`), `None`, `True`/`False`, `is` vs `==`, `is None` / `is not None`, comparison chaining (`0 <= i < n`), `and`/`or`/`not`, short-circuit defaults (`x or 0`), truthiness of empty containers, ternary expression, walrus, `del`, `type()`/`isinstance()`.
Variants: by value type; the truthiness cards across `[]`, `""`, `0`, `None`, `{}`, `set()`.

**A2. Type conversion** (15 → 50)
`int()`, `float()`, `str()`, `bool()`, `list()`, `tuple()`, `set()`, `dict()`, `int(s, 2)`, `bin()`/`hex()`, `ord`/`chr`, digits of an int to a list and back, list of str to list of int (`map` and comprehension), char grid from list of strings.
Variants: every sensible from → to pair.

**A3. Conditionals** (12 → 30)
`if`/`elif`/`else` headers, compound conditions, membership (`in`, `not in`) across list/set/dict/str, range checks, parity, sign, `match` is skipped.

**A4. Loops** (35 → 140)
- `for` over `range`: `range(n)`, `range(a, b)`, with step, backwards, every other, `range(len(a))`, `range(1, n)`, `range(i + 1, n)`, down to and including 0.
- `for` over a container: list, string, tuple, set, dict (keys / values / items), list of tuples with unpacking, list of lists, list of objects reading an attribute, grid rows, grid cells with `r, c`.
- `enumerate` (with `start=`), `zip`, `reversed`, `sorted` in the loop header.
- `while`: counter, two pointers (`while l < r`), until empty (`while stack`, `while q`), compound conditions (`while l < r and s[l] == s[r]`), linked-list walk (`while node`, `while node and node.next`), binary search (`while lo <= hi`, `while lo < hi`), `while True` with `break`.
- Control: `break`, `continue`, loop `else`, `pass`.
- Nested: all pairs `i < j`, all triples, grid double loop, the four- and eight-direction neighbour loop, level loop `for _ in range(len(q))`.

**A5. Functions: defining** (25 → 90)
`def` with 0/1/many parameters, defaults, keyword-only, `*args`, `**kwargs`, type hints exactly as LeetCode writes them (`nums: List[int]`, `Optional[TreeNode]`, `-> int`, `-> List[List[int]]`, `-> bool`, `-> None`), return one / several / nothing / early, nested helper function, closure reading an outer variable, `nonlocal`, `global`, `lambda` with 1 and 2 arguments, recursive function header and base case, mutable default argument trap.
Variants: by parameter and return types.

**A6. Functions: calling** (20 → 120)
The given code is a function **declaration**; the card asks for the call. Positional, keyword, mixed, skipping a default, overriding a default, unpacking a list with `*`, a dict with `**`, passing a function, passing a lambda, calling a method on `self`, calling a nested helper, calling recursively on `node.left` / `i + 1` / a slice, capturing one result, unpacking several results, ignoring one with `_`, calling inside a comprehension, calling inside a condition.
Variants: this is the biggest variant section. Signatures vary across argument count (1 to 5) and types (int, str, list, grid, dict, set, tuple, node, function, bool flag, optional).

**A7. Comprehensions and generators** (20 → 70)
List / set / dict comprehension, with filter, with conditional expression, nested (flatten, grid build), over `enumerate`, over `zip`, over `dict.items()`, over a string, generator inside `sum` / `any` / `all` / `max` / `min` / `"".join`.
Variants: by source and result container.

### B. Numbers

**B1. Arithmetic and math** (35 → 90)
`/` vs `//`, `%`, negative floor division and modulo, `**`, `pow(a, b, mod)`, `divmod`, `abs`, `round`, `min`/`max` of two, of many, of a list, with `key=`, with `default=`; `sum`, average, `float("inf")` / `-inf` / `math.inf`, `math.ceil`, `math.floor`, `math.sqrt`, `math.isqrt`, `math.gcd`, `math.lcm`, `math.comb`, `math.perm`, `math.factorial`, `math.log2`, ceiling division without floats, digit extraction, digit sum, reverse an int, `10**9 + 7`, clamping to 32-bit.
Variants: int vs float inputs, positive vs negative.

**B2. Bit manipulation** (22 → 45)
`& | ^ ~ << >>`, test / set / clear / toggle bit `i`, lowest set bit, clear lowest set bit, power-of-two test, `bin(x)`, `bin(x).count("1")`, `x.bit_count()`, `x.bit_length()`, `int(s, 2)`, build a mask, iterate subsets of a mask, XOR of a list.

### C. Sequences

**C1. Lists: create and read** (25 → 80)
Literals, `[0] * n`, `[None] * n`, `list(range(n))`, from a string / set / tuple / dict, index, negative index, `len`, `in`, `index`, `count`, `min`/`max`/`sum`, average, `any`/`all`, first and last, empty check.
Variants: element types; empty list.

**C2. Slicing** (25 → 110)
One full section because it is where most syntax errors happen. Start only, stop only, both, step, negative start, negative stop, negative step, reverse, every other, first k, last k, all but first, all but last, middle, copy, slice assignment, slice deletion, slice out of range, slice to rotate, slice to split in half, slice a window `a[i:i + k]`, compare slices.
Variants: every slicing card exists for **list, string and tuple**, with the differences called out (a string slice is a string; slices cannot be assigned on str/tuple).

**C3. Lists: change** (25 → 80)
`append`, `extend` vs `append` of a list, `insert`, `pop()`, `pop(i)`, `remove`, `del a[i]`, `clear`, `reverse`, `a[i] = x`, swap two elements, `+` and `*`, `+=`, copy three ways, shallow copy trap, `copy.deepcopy`, aliasing trap (`b = a`).
Variants: element type where copying behaves differently (ints vs nested lists vs objects).

**C4. 2D lists and grids** (30 → 100)
Build `rows × cols` (and the `[[0] * c] * r` trap), dimensions `rows, cols = len(grid), len(grid[0])`, cell read/write, a row, a column, last row, diagonal, bounds check, direction list, neighbour loop, flatten, transpose with `zip(*grid)`, rotate, reverse rows, reverse each row, copy a grid, grid from list of strings, visited grid, `(r, c)` ↔ flat index, row sums, column sums, max of grid.
Variants: grid of ints, of chars (`List[str]` vs `List[List[str]]`), of bools.

**C5. Strings** (50 → 160)
Index, `len`, concatenate, repeat, `in` substring, `split` (default, separator, `maxsplit`), `join` (with separator, of ints via `map(str, ...)`), `strip`/`lstrip`/`rstrip` (with chars), `replace`, `find` vs `index`, `rfind`, `count`, `startswith`/`endswith`, `upper`/`lower`/`swapcase`/`capitalize`/`title`, `isdigit`/`isalpha`/`isalnum`/`isspace`/`isupper`/`islower`, `ord`/`chr`, letter ↔ 0–25, `zfill`, `ljust`/`rjust`, f-strings (value, expression, padding, decimals, binary), `sorted(s)` and `"".join(sorted(s))`, reverse, reverse words, palindrome, compare strings, char frequency array `[0] * 26`, build with a list then join, immutability trap, `str` ↔ `int`, digits, `string.ascii_lowercase`, iterate with index, iterate pairs, `s * n`, multi-char checks with `in "aeiou"`.
Variants: single char vs word vs sentence; digits vs letters.

**C6. Tuples** (20 → 60)
Create, single-element, unpack, star unpack (`first, *rest`), swap, return several values, tuple as dict key, tuple in a set, lexicographic comparison, `sorted` on tuples, immutability, tuple containing a list (mutable inside), concatenation, convert list ↔ tuple, `min`/`max` of tuples, nested unpack `for i, (a, b) in enumerate(pairs)`.
Variants: pairs, triples, nested; **tuples holding objects** (comparison falls through to the object and raises).

### D. Hashing

**D1. Dicts** (45 → 150)
Create (literal, `dict()`, from pairs, `dict(zip(...))`, comprehension, `fromkeys`), read (`[]`, `get`, `get` with default), write, update count, `in`, `del`, `pop` (with default), `popitem`, `setdefault`, `update`, merge `|`, `keys`/`values`/`items`, loop each way, `len`, sort by key, sort by value, key of max value, invert, group items, nested dict read/write, dict of lists append, dict of sets add, tuple keys, changing size while iterating trap, insertion order.
Variants: value type int / list / set / dict / tuple / object; key type str / int / tuple.

**D2. defaultdict and OrderedDict** (15 → 50)
`defaultdict(int)`, `(list)`, `(set)`, `(lambda: ...)`, nested `defaultdict(lambda: defaultdict(int))`, the "reading creates the key" trap, adjacency list build; `OrderedDict`, `move_to_end`, `popitem(last=False)` for LRU.

**D3. Sets** (30 → 80)
Create (the `{}` trap), from list / string, `add`, `remove` vs `discard`, `pop`, `in`, `len`, union / intersection / difference / symmetric difference as operators and methods, in-place versions, `update`, subset / superset / disjoint, set comprehension, set of tuples, `frozenset` as a key, dedupe a list keeping order, unhashable element trap.
Variants: ints, strs, tuples, chars of a string.

**D4. Counter** (18 → 50)
Create from list / string / words, read (missing → 0), increment, `most_common` (all, k, least common), `elements`, `total`, add / subtract / `&` / `|`, compare, `Counter` as an anagram test, delete zero counts, top-k frequent, iterate items.

### E. Linear structures

**E1. Stack** (12 → 40)
List as a stack: push, pop, peek, empty check, `while stack and ...`, stack of tuples `(value, index)`, monotonic stack lines, stack of chars for brackets with a pairs dict.
Variants: stack of ints, chars, indexes, tuples, nodes.

**E2. Queue and deque** (20 → 60)
Import, create (empty, from a list, with one item), `append`/`appendleft`/`pop`/`popleft`, peek both ends, `len`, empty loop, `extend`, `rotate`, `maxlen`, index access; BFS lines: seed queue, level loop, queue of `(node, depth)`, queue of `(r, c)`, queue of `(r, c, dist)`.
Variants: by what is queued.

**E3. Heaps** (25 → 110)
Import, `heapify`, `heappush`, `heappop`, peek, `heappushpop`, `heapreplace`, `nlargest`/`nsmallest` (with `key=`), size-k heap loop, `heapq.merge`, max-heap by negation (push, pop and peek each un-negating), `heapify_max` family where available.
Variants, each for push / pop / peek / heapify:
- heap of ints
- heap of negated ints (max-heap)
- heap of `(priority, value)` tuples
- heap of `(dist, r, c)` and `(dist, node)` (Dijkstra shapes)
- heap of `(freq, char)` and `(-freq, char)`
- heap of `(value, index, obj)` with an index tiebreaker
- heap of objects with `__lt__` defined (card asks for the `__lt__`)
- heap of objects **without** `__lt__` (trap card: why it raises, fix with a tiebreaker)
- heap of `ListNode` for merge-k-lists
- heap of strings

### F. Ordering and searching

**F1. Sorting** (30 → 110)
`sort` vs `sorted`, `reverse=True`, `key=len`, `key=lambda`, multi-key tuple, mixed direction with negation, `key=str.lower`, sort by dict value, sort dict items, sort a string, sort indexes by value (argsort), `functools.cmp_to_key`, stability, sort then dedupe, sort intervals by start / end, sort objects by attribute (`lambda` and `operator.attrgetter`), `operator.itemgetter`.
Variants: list of ints / strs / tuples / lists / objects / dict items.

**F2. Binary search and bisect** (15 → 45)
`bisect_left`, `bisect_right`, `insort`, with `lo`/`hi`, with `key=`, "is x present", count of x, first ≥ x, last ≤ x; hand-written lines: `mid`, the three loop conditions, both pointer updates.

### G. Iteration tools

**G1. zip, enumerate, map, filter** (25 → 110)
- `zip`: two lists, three lists, list with string, unequal lengths, `zip(a, a[1:])` adjacent pairs, `zip(*pairs)` to unzip, `list(zip(...))`, `dict(zip(keys, values))`, loop over zipped with unpacking, loop over `enumerate(zip(a, b))`, zip then sort, sort two lists together and split them back, `zip(*grid)` for columns, `zip_longest`.
- `enumerate`: default, `start=1`, over a string, over a grid row, building `value → index`.
- `map`: with `int`, `str`, `len`, a lambda, two iterables; why it needs `list()`.
- `filter`, `reversed`, `sorted`, `any`, `all`, `sum` with a start value, `min`/`max` with `key` and `default`, `iter`/`next`.
Variants: what is being zipped (ints, strs, tuples, **objects**), and what is done with the result.

**G2. itertools and functools** (22 → 60)
`accumulate` (sum, with `initial=`, with `max`), `permutations`, `combinations`, `combinations_with_replacement`, `product` (two lists, `repeat=`), `chain`, `chain.from_iterable`, `groupby`, `pairwise`, `count`, `cycle`, `islice`; `lru_cache(None)`, `cache`, `reduce`, `cmp_to_key`, `partial`.

### H. Objects

**H1. Classes** (30 → 100)
`class`, `__init__`, `self.x`, methods, calling a method, class vs instance attribute, `__repr__`/`__str__`, `__eq__`, `__hash__`, `__lt__`, `__len__`, `__getitem__`, `__contains__`, `@property` and setter, `@staticmethod`, `@classmethod`, inheritance and `super().__init__`, `@dataclass`, `__slots__`; LeetCode shapes: `class Solution` with a method, calling `self.helper(...)`, a design-problem class skeleton with state in `__init__`.
Variants: constructors with different argument lists and stored data types.

**H2. Objects inside other structures** (20 → 90)
This is the "how objects interact with everything else" section. Given a small class definition:
- list of objects: build, loop reading an attribute, sum / max / min by attribute, sort by attribute, filter, find the first that matches.
- object ↔ tuple: build a tuple from an object's fields, build an object from a tuple with `*`, unpack `(obj, depth)`, list of `(obj, value)` pairs, why `(priority, obj)` breaks in a heap.
- objects in a set / as dict keys (identity hashing by default, what `__eq__` + `__hash__` change).
- dict of objects by id, grouping objects by an attribute.
- objects in a heap and a deque.
- comparing with `is` vs `==`, `None` checks, `getattr` with a default.
Variants: `Node`, `ListNode`, `TreeNode`, `Interval(start, end)`, `Point(x, y)`, plain `[start, end]` lists next to the object form of the same data.

### I. LeetCode structures

**I1. Linked lists** (22 → 60)
Given `ListNode`: create a node, link two, dummy head, walk, walk to the last node, length, insert after, delete next, reverse-pointer lines (the 4-line loop, one card per line and one for the tuple-assignment form), slow/fast pointers, cycle test, `while a and b`, return `dummy.next`, list ↔ linked list.

**I2. Trees** (28 → 80)
Given `TreeNode`: create, attach children, leaf test, `None` guard, recursive DFS header and base case, height line, return two values from recursion, pre/in/post-order line order, iterative stack DFS lines, BFS level order lines, stack of `(node, depth)`, `nonlocal` best answer, `self.ans` pattern, BST walk left/right, path as list with append/pop, N-ary `for child in node.children`.

**I3. Graphs** (25 → 75)
Adjacency list from an edge list (directed, undirected, weighted), from a grid, indegree array, `visited` set / list / grid, DFS and BFS seed lines, neighbour loop, topological sort lines, union-find (`parent = list(range(n))`, `find` with path compression, `union`, rank), Dijkstra lines (seed heap, pop, skip stale, relax, push), `dist = [inf] * n`, edge unpacking `for u, v, w in edges`.
Variants: nodes as ints vs strs vs `(r, c)` cells; unweighted vs weighted.

**I4. Tries and intervals** (12 → 30)
Trie node as a dict and as a class, insert / search loops; intervals: sort by start, overlap test, merge line, `[start, end]` unpacking, last interval in result.

### J. Technique lines

One-line idioms of the standard techniques. Still syntax, not problem solving: the card gives the situation and asks for the line.

**J1. Two pointers and sliding window** (18 → 45): pointer init both ends, move inward, window grow/shrink, window length `r - l + 1`, window counts dict, shrink-while loop, best-so-far update.

**J2. Prefix sums and running values** (12 → 30): prefix array by loop and by `accumulate`, range sum from prefix, running max/min, prefix-sum → index dict seeded with `{0: -1}`, difference array.

**J3. Recursion, memo and DP** (25 → 70): `@cache`, `@lru_cache(None)`, memo dict check/store, 1D and 2D table init (with 0, `inf`, `False`, `-1`), `n + 1` sizing, fill order loops, read `dp[i - 1][j - 1]`, rolling two variables, `sys.setrecursionlimit`, cache with list argument trap (convert to tuple).

**J4. Backtracking** (12 → 30): append / recurse / pop, `res.append(path[:])`, start index parameter, `used` list or set, skip duplicates line, join a path, prune condition.

### K. Cross-cutting

**K1. Micro-traps** (60 → 60)
Tag only, no new files: every trap card above also carries `traps`, so "drill only the traps" is one chip. Includes `{}` vs `set()`, `sort()` returning None, `[[0] * c] * r`, `pop(0)` vs `popleft()`, `remove` vs `discard`, `^` vs `**`, `/` vs `//`, negative `//` and `%`, string immutability, mutable default args, aliasing, `append` vs `extend`, tuple-in-heap comparison, `is` vs `==`, modifying while iterating, `find` vs `index`, late-binding lambdas, `range` stop exclusivity, `reversed` returning an iterator, `map` returning an iterator, integer vs float results.

**K2. Odds and ends** (15 → 30)
`random.randint` / `choice` / `shuffle` / `random()`, `try`/`except` for `KeyError`/`ValueError`/`IndexError`, `assert`, `print` with `sep`/`end` for debugging, `string` constants, `sys.maxsize`, `collections.namedtuple`, `id()`.

### Totals

| Group | Skills | Cards |
|---|---|---|
| A. Core language | 152 | 560 |
| B. Numbers | 57 | 135 |
| C. Sequences | 175 | 590 |
| D. Hashing | 108 | 330 |
| E. Linear structures | 57 | 210 |
| F. Ordering and searching | 45 | 155 |
| G. Iteration tools | 47 | 170 |
| H. Objects | 50 | 190 |
| I. LeetCode structures | 87 | 245 |
| J. Technique lines | 67 | 175 |
| K. Cross-cutting | 15 | 30 |
| **Total** | **about 860** | **about 2,800** |

Expect about 2,000 to survive review: some planned variants will turn out not to change the syntax and get cut.

## 3. How each section gets written

One section at a time, same four steps every time:

1. **Checklist.** Expand the section's skill list above into a concrete list of skill ids with the variants each one gets. Cross-check it against outside sources (below) so nothing is missed. This list is reviewed before any card is written.
2. **Cards.** Write them with `variants()`, following `CARD_RULES.md`: named and typed prompt, given code with example values, expected result, runnable solution, run-check, one-line trap.
3. **Tests.** `npm test` runs every solution against its own check, confirms a do-nothing answer fails, and enforces the rules. A section is not done until it is green.
4. **Drill pass.** Run the section in the app once end to end. Anything where the right answer was marked wrong, the prompt was unclear, or two cards felt the same gets fixed or cut.

### Sources for coverage

Used as checklists of what exists, not copied as cards; every card is rewritten into this app's format with its own given code and check.

- Python docs: built-in functions, built-in types, `collections`, `heapq`, `bisect`, `itertools`, `functools`, `math`, `operator`.
- LeetCode's own Python reference and the class definitions it supplies (`ListNode`, `TreeNode`, `Node`).
- Public Python-for-interviews cheat sheets (NeetCode, the LeetCode discuss "Python cheatsheet" threads) for which idioms people actually reach for.
- Accepted solutions to the common problem lists (Blind 75, NeetCode 150), scanned line by line for syntax not yet covered.
- `requirementsdump.md`: every example line in it must map to a card.

## 4. Order of work

| Step | What | Why here |
|---|---|---|
| 0 | App changes from section 1 (`skill`, `variants()`, two-level topics, `level`, shared class snippets, new tests) | Everything after depends on them |
| 1 | Migrate the existing 96 cards into the skill/variant shape | Proves the format before writing 2,000 more |
| 2 | A4 Loops, C2 Slicing, A6 Calling functions | The basics you named, and the heaviest variant sections; they shake out the variant system |
| 3 | C1, C3, C5, C6 (lists, strings, tuples) and A1–A3, A5, A7 | Rest of the core language |
| 4 | D1–D4 (dicts, defaultdict, sets, Counter) | Most-used LeetCode structures |
| 5 | G1 zip/enumerate/map, F1 sorting, B1 math | High-frequency helpers |
| 6 | E1–E3 (stack, deque, heaps with all variants), H1–H2 (classes, objects in structures) | Depends on the object snippets |
| 7 | C4 grids, I1–I4 (linked lists, trees, graphs, tries, intervals) | Depends on classes and deque/heap cards |
| 8 | F2, G2, B2, J1–J4, K2 | Rarer and technique-specific |
| 9 | K1 trap tagging pass and a whole-deck duplicate review | Needs everything else in place |

Each step ends with tests green and a rebuilt exe, so the app is usable throughout and grows section by section.

## 5. Open decisions

1. **Imports in answers.** With about 110 heap cards, typing `import heapq` on each will be a lot. Recommendation: require the import only on level-1 cards of each module and show it in the given code on the rest.
2. **Technique lines (group J).** These are the closest the deck gets to "problem solving". They are in because they are still single lines of syntax, but they can be dropped or left to last.
3. **Size.** 2,000 cards is the full version. Steps 0–5 alone give roughly 1,700 planned cards and cover everything you listed by name.
