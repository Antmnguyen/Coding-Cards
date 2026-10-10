import { skill, topic } from "../topic";
import { LIST_NODE, POINT } from "./given";

/** A loop body that records `expr` on every pass, so a loop header can be run and checked. */
const collect = (expr: string, depth = 1) => `out = []\n{answer}\n${"    ".repeat(depth)}out.append(${expr})`;

const FOR_LINE = "Write only the `for` line.";
const WHILE_LINE = "Write only the `while` line.";

export const loops = topic("python", "loops", [
  skill("for-range-n", 1, { explain: "range(n) gives 0 up to n - 1; the stop is never included." }, [
    {
      k: "n",
      prompt: "`n` is an int. Loop `i` over 0, 1, 2 and so on, stopping before `n`. " + FOR_LINE,
      setup: "n = 4",
      template: collect("i"),
      expect: "out ends up [0, 1, 2, 3]",
      solution: "for i in range(n):",
      check: "out == [0, 1, 2, 3]",
    },
    {
      k: "literal",
      prompt: "Loop exactly 5 times, with `i` counting 0 through 4. " + FOR_LINE,
      template: collect("i"),
      expect: "out ends up [0, 1, 2, 3, 4]",
      solution: "for i in range(5):",
      check: "out == [0, 1, 2, 3, 4]",
    },
    {
      k: "len-list",
      prompt: "`a` is a list. Loop `i` over every valid index of it. " + FOR_LINE,
      setup: 'a = ["x", "y", "z"]',
      template: collect("i"),
      expect: "out ends up [0, 1, 2]",
      solution: "for i in range(len(a)):",
      check: "out == [0, 1, 2]",
      explain: "range needs an int, so wrap the list in len().",
    },
    {
      k: "len-str",
      prompt: "`s` is a string. Loop `i` over every valid index of it. " + FOR_LINE,
      setup: 's = "abcd"',
      template: collect("i"),
      expect: "out ends up [0, 1, 2, 3]",
      solution: "for i in range(len(s)):",
      check: "out == [0, 1, 2, 3]",
      explain: "len() works on strings the same way as on lists.",
    },
    {
      k: "unused",
      prompt:
        "`n` is an int. Repeat the body `n` times. The loop variable is never used, so give it the conventional throwaway name. " +
        FOR_LINE,
      setup: "n = 3",
      template: 'out = []\n{answer}\n    out.append("hi")',
      expect: 'out ends up ["hi", "hi", "hi"]',
      solution: "for _ in range(n):",
      check: 'out == ["hi", "hi", "hi"]',
      explain: "_ is the conventional name for a value you do not use.",
    },
  ]),

  skill("for-range-start-stop", 1, { explain: "range(start, stop): start is included, stop is not." }, [
    {
      k: "lo-hi",
      prompt: "`lo` and `hi` are ints. Loop `i` from `lo` up to but not including `hi`. " + FOR_LINE,
      setup: "lo = 2\nhi = 5",
      template: collect("i"),
      expect: "out ends up [2, 3, 4]",
      solution: "for i in range(lo, hi):",
      check: "out == [2, 3, 4]",
    },
    {
      k: "from-1",
      prompt: "`n` is an int. Loop `i` from 1 up to but not including `n`, skipping 0. " + FOR_LINE,
      setup: "n = 4",
      template: collect("i"),
      expect: "out ends up [1, 2, 3]",
      solution: "for i in range(1, n):",
      check: "out == [1, 2, 3]",
    },
    {
      k: "inclusive",
      prompt: "`n` is an int. Loop `i` from 1 through `n`, including `n` itself. " + FOR_LINE,
      setup: "n = 4",
      template: collect("i"),
      expect: "out ends up [1, 2, 3, 4]",
      solution: "for i in range(1, n + 1):",
      check: "out == [1, 2, 3, 4]",
      explain: "The stop is exclusive, so including n needs n + 1.",
    },
    {
      k: "after-i",
      prompt: "`a` is a list and `i` is an index into it. Loop `j` over every index after `i`, to the end of the list. " + FOR_LINE,
      setup: "a = [5, 6, 7, 8]\ni = 1",
      template: collect("j"),
      expect: "out ends up [2, 3]",
      solution: "for j in range(i + 1, len(a)):",
      check: "out == [2, 3]",
      explain: "Start at i + 1 so j never equals i.",
    },
    {
      k: "all-but-last",
      prompt: "`a` is a list. Loop `i` over every index except the last one. " + FOR_LINE,
      setup: "a = [5, 6, 7, 8]",
      template: collect("i"),
      expect: "out ends up [0, 1, 2]",
      solution: "for i in range(len(a) - 1):",
      check: "out == [0, 1, 2]",
      explain: "Stopping at len(a) - 1 keeps a[i + 1] in bounds.",
    },
  ]),

  skill("for-range-step", 2, { explain: "The third argument of range is the step." }, [
    {
      k: "even",
      prompt: "`n` is an int. Loop `i` over the even numbers 0, 2, 4 and so on below `n`. " + FOR_LINE,
      setup: "n = 7",
      template: collect("i"),
      expect: "out ends up [0, 2, 4, 6]",
      solution: "for i in range(0, n, 2):",
      check: "out == [0, 2, 4, 6]",
      explain: "A step needs all three arguments: range(0, n, 2).",
    },
    {
      k: "odd",
      prompt: "`n` is an int. Loop `i` over the odd numbers 1, 3, 5 and so on below `n`. " + FOR_LINE,
      setup: "n = 7",
      template: collect("i"),
      expect: "out ends up [1, 3, 5]",
      solution: "for i in range(1, n, 2):",
      check: "out == [1, 3, 5]",
    },
    {
      k: "k",
      prompt: "`n` and `k` are ints. Loop `i` from 0 below `n`, jumping `k` at a time. " + FOR_LINE,
      setup: "n = 10\nk = 3",
      template: collect("i"),
      expect: "out ends up [0, 3, 6, 9]",
      solution: "for i in range(0, n, k):",
      check: "out == [0, 3, 6, 9]",
    },
  ]),

  skill("for-range-reverse", 2, { explain: "Counting down needs a step of -1, and the stop is still exclusive." }, [
    {
      k: "n-to-0",
      prompt: "`n` is an int. Loop `i` downwards from `n - 1` to 0, including 0. " + FOR_LINE,
      setup: "n = 4",
      template: collect("i"),
      expect: "out ends up [3, 2, 1, 0]",
      solution: "for i in range(n - 1, -1, -1):",
      accepted: ["for i in reversed(range(n)):"],
      check: "out == [3, 2, 1, 0]",
      explain: "The stop is exclusive, so reaching 0 means stopping at -1.",
    },
    {
      k: "len",
      prompt: "`a` is a list. Loop `i` over its indexes from the last one down to 0. " + FOR_LINE,
      setup: 'a = ["x", "y", "z"]',
      template: collect("i"),
      expect: "out ends up [2, 1, 0]",
      solution: "for i in range(len(a) - 1, -1, -1):",
      accepted: ["for i in reversed(range(len(a))):"],
      check: "out == [2, 1, 0]",
      explain: "Start at len(a) - 1, the last valid index, and stop at -1 to include 0.",
    },
    {
      k: "n-to-1",
      prompt: "`n` is an int. Loop `i` downwards from `n` to 1, including both. " + FOR_LINE,
      setup: "n = 4",
      template: collect("i"),
      expect: "out ends up [4, 3, 2, 1]",
      solution: "for i in range(n, 0, -1):",
      check: "out == [4, 3, 2, 1]",
      explain: "Stopping at 0 excludes 0, so the last value is 1.",
    },
  ]),

  skill("for-each", 1, { explain: "Loop over the container itself when you do not need the index." }, [
    {
      k: "list",
      prompt: "`nums` is a list. Loop over its items directly, calling each one `x`. " + FOR_LINE,
      setup: "nums = [4, 5, 6]",
      template: collect("x"),
      expect: "out ends up [4, 5, 6]",
      solution: "for x in nums:",
      check: "out == [4, 5, 6]",
    },
    {
      k: "str",
      prompt: "`s` is a string. Loop over its characters, calling each one `ch`. " + FOR_LINE,
      setup: 's = "abc"',
      template: collect("ch"),
      expect: 'out ends up ["a", "b", "c"]',
      solution: "for ch in s:",
      check: 'out == ["a", "b", "c"]',
      explain: "Iterating a string gives one character at a time.",
    },
    {
      k: "words",
      prompt: "`words` is a list of strings. Loop over them, calling each one `word`. " + FOR_LINE,
      setup: 'words = ["hi", "yo"]',
      template: collect("len(word)"),
      expect: "out ends up [2, 2]",
      solution: "for word in words:",
      check: "out == [2, 2]",
    },
    {
      k: "set",
      prompt: "`seen` is a set. Loop over its items, calling each one `x`. " + FOR_LINE,
      setup: "seen = {3, 1, 2}",
      template: collect("x"),
      expect: "out holds 1, 2 and 3 in some order",
      solution: "for x in seen:",
      check: "sorted(out) == [1, 2, 3]",
      explain: "Same syntax as a list, but a set has no guaranteed order.",
    },
    {
      k: "tuple",
      prompt: "`t` is a tuple. Loop over its items, calling each one `x`. " + FOR_LINE,
      setup: "t = (7, 8)",
      template: collect("x"),
      expect: "out ends up [7, 8]",
      solution: "for x in t:",
      check: "out == [7, 8]",
    },
    {
      k: "objects",
      prompt: "`points` is a list of `Point` objects. Loop over them, calling each one `p`. " + FOR_LINE,
      setup: POINT + "\npoints = [Point(1, 2), Point(3, 4)]",
      template: collect("p.x"),
      expect: "out ends up [1, 3]",
      solution: "for p in points:",
      check: "out == [1, 3]",
      explain: "Each p is the object itself; read its fields with p.x.",
    },
  ]),

  skill("for-dict", 1, { explain: "A dict loops over its keys by default." }, [
    {
      k: "keys",
      prompt: "`d` is a dictionary. Loop over its keys, calling each one `k`. " + FOR_LINE,
      setup: 'd = {"a": 1, "b": 2}',
      template: collect("k"),
      expect: 'out ends up ["a", "b"]',
      solution: "for k in d:",
      accepted: ["for k in d.keys():"],
      check: 'out == ["a", "b"]',
    },
    {
      k: "values",
      prompt: "`d` is a dictionary. Loop over its values only, calling each one `v`. " + FOR_LINE,
      setup: 'd = {"a": 1, "b": 2}',
      template: collect("v"),
      expect: "out ends up [1, 2]",
      solution: "for v in d.values():",
      check: "out == [1, 2]",
      explain: "values() is a method; without it you get the keys.",
    },
    {
      k: "items",
      prompt: "`d` is a dictionary. Loop over each key `k` together with its value `v`. " + FOR_LINE,
      setup: 'd = {"a": 1, "b": 2}',
      template: collect("(k, v)"),
      expect: 'out ends up [("a", 1), ("b", 2)]',
      solution: "for k, v in d.items():",
      check: 'out == [("a", 1), ("b", 2)]',
      explain: "Looping over d alone gives only keys; items() gives (key, value) pairs.",
    },
    {
      k: "sorted-keys",
      prompt: "`d` is a dictionary. Loop over its keys in sorted order, calling each one `k`. " + FOR_LINE,
      setup: 'd = {"b": 2, "a": 1}',
      template: collect("k"),
      expect: 'out ends up ["a", "b"]',
      solution: "for k in sorted(d):",
      accepted: ["for k in sorted(d.keys()):"],
      check: 'out == ["a", "b"]',
      explain: "sorted(d) returns a sorted list of the keys.",
    },
    {
      k: "list-values",
      prompt:
        "`graph` is a dictionary mapping a node to a list of its neighbours. Loop over each node `node` together with its list `nbrs`. " +
        FOR_LINE,
      setup: "graph = {1: [2, 3], 2: [3]}",
      template: collect("(node, len(nbrs))"),
      expect: "out ends up [(1, 2), (2, 1)]",
      solution: "for node, nbrs in graph.items():",
      check: "out == [(1, 2), (2, 1)]",
      explain: "items() works the same whatever the values are.",
    },
  ]),

  skill("for-unpack", 2, { explain: "Name one variable per element and Python unpacks each item for you." }, [
    {
      k: "pairs",
      prompt: "`pairs` is a list of 2-value tuples. Loop over it, unpacking each tuple into `a` and `b`. " + FOR_LINE,
      setup: "pairs = [(1, 2), (3, 4)]",
      template: collect("a + b"),
      expect: "out ends up [3, 7]",
      solution: "for a, b in pairs:",
      check: "out == [3, 7]",
    },
    {
      k: "triples",
      prompt:
        "`edges` is a list of 3-value tuples: from-node, to-node, weight. Loop over it, unpacking each into `u`, `v` and `w`. " +
        FOR_LINE,
      setup: "edges = [(0, 1, 5), (1, 2, 7)]",
      template: collect("w"),
      expect: "out ends up [5, 7]",
      solution: "for u, v, w in edges:",
      check: "out == [5, 7]",
    },
    {
      k: "intervals",
      prompt:
        "`intervals` is a list of 2-item lists, each a start and an end. Loop over it, unpacking each into `start` and `end`. " +
        FOR_LINE,
      setup: "intervals = [[1, 3], [2, 6]]",
      template: collect("end - start"),
      expect: "out ends up [2, 4]",
      solution: "for start, end in intervals:",
      check: "out == [2, 4]",
      explain: "Unpacking works on inner lists exactly as on tuples.",
    },
    {
      k: "heap-triples",
      prompt: "`heap` is a list of 3-value tuples. Loop over it, unpacking each straight into `dist`, `x` and `y`. " + FOR_LINE,
      setup: "heap = [(5, 1, 2), (7, 0, 3)]",
      template: collect("[x, y]"),
      expect: "out ends up [[1, 2], [0, 3]]",
      solution: "for dist, x, y in heap:",
      check: "out == [[1, 2], [0, 3]]",
      explain: "Unpack directly in the loop; no temporary `item` is needed.",
    },
    {
      k: "enumerate-pairs",
      prompt:
        "`pairs` is a list of 2-value tuples. Loop with the index `i` and each tuple unpacked into `a` and `b`, all in the `for` line. " +
        FOR_LINE,
      setup: "pairs = [(1, 2), (3, 4)]",
      template: collect("(i, a, b)"),
      expect: "out ends up [(0, 1, 2), (1, 3, 4)]",
      solution: "for i, (a, b) in enumerate(pairs):",
      check: "out == [(0, 1, 2), (1, 3, 4)]",
      explain: "enumerate yields (i, item), so the inner tuple needs its own parentheses.",
    },
  ]),

  skill("for-enumerate", 1, { explain: "enumerate yields (index, value), index first." }, [
    {
      k: "list",
      prompt: "`a` is a list. Loop with both the index `i` and the value `v` of each item. " + FOR_LINE,
      setup: 'a = ["x", "y"]',
      template: collect("(i, v)"),
      expect: 'out ends up [(0, "x"), (1, "y")]',
      solution: "for i, v in enumerate(a):",
      check: 'out == [(0, "x"), (1, "y")]',
    },
    {
      k: "str",
      prompt: "`s` is a string. Loop with both the index `i` and the character `ch` at it. " + FOR_LINE,
      setup: 's = "ab"',
      template: collect("(i, ch)"),
      expect: 'out ends up [(0, "a"), (1, "b")]',
      solution: "for i, ch in enumerate(s):",
      check: 'out == [(0, "a"), (1, "b")]',
    },
    {
      k: "start-1",
      prompt: "`a` is a list. Loop with a counter `i` that starts at 1 instead of 0, and the value `v`. " + FOR_LINE,
      setup: 'a = ["x", "y"]',
      template: collect("(i, v)"),
      expect: 'out ends up [(1, "x"), (2, "y")]',
      solution: "for i, v in enumerate(a, 1):",
      accepted: ["for i, v in enumerate(a, start=1):"],
      check: 'out == [(1, "x"), (2, "y")]',
      explain: "The second argument of enumerate is the starting count.",
    },
    {
      k: "grid-rows",
      prompt: "`grid` is a list of lists. Loop with the row index `r` and the row itself `row`. " + FOR_LINE,
      setup: "grid = [[1, 2], [3, 4]]",
      template: collect("(r, row[0])"),
      expect: "out ends up [(0, 1), (1, 3)]",
      solution: "for r, row in enumerate(grid):",
      check: "out == [(0, 1), (1, 3)]",
    },
  ]),

  skill("for-zip", 2, { explain: "zip pairs items by position and stops at the shorter input." }, [
    {
      k: "two-lists",
      prompt: "`xs` and `ys` are lists of the same length. Loop over both together, `a` from `xs` and `b` from `ys`. " + FOR_LINE,
      setup: "xs = [1, 2]\nys = [10, 20]",
      template: collect("a + b"),
      expect: "out ends up [11, 22]",
      solution: "for a, b in zip(xs, ys):",
      check: "out == [11, 22]",
    },
    {
      k: "three-lists",
      prompt:
        "`xs`, `ys` and `zs` are lists of the same length. Loop over all three together as `a`, `b` and `c`. " + FOR_LINE,
      setup: "xs = [1, 2]\nys = [10, 20]\nzs = [100, 200]",
      template: collect("a + b + c"),
      expect: "out ends up [111, 222]",
      solution: "for a, b, c in zip(xs, ys, zs):",
      check: "out == [111, 222]",
      explain: "zip takes any number of iterables.",
    },
    {
      k: "two-strings",
      prompt: "`s` and `t` are strings. Loop over their characters in step, `a` from `s` and `b` from `t`. " + FOR_LINE,
      setup: 's = "abc"\nt = "abd"',
      template: collect("a == b"),
      expect: "out ends up [True, True, False]",
      solution: "for a, b in zip(s, t):",
      check: "out == [True, True, False]",
    },
    {
      k: "adjacent",
      prompt:
        "`nums` is a list. Loop over each pair of neighbouring items: `a` is an item and `b` is the one right after it. " + FOR_LINE,
      setup: "nums = [1, 4, 9]",
      template: collect("b - a"),
      expect: "out ends up [3, 5]",
      solution: "for a, b in zip(nums, nums[1:]):",
      check: "out == [3, 5]",
      explain: "Zipping a list with itself shifted by one gives adjacent pairs.",
    },
    {
      k: "with-index",
      prompt:
        "`xs` and `ys` are lists of the same length. Loop with the index `i` plus `a` from `xs` and `b` from `ys`. " + FOR_LINE,
      setup: 'xs = [1, 2]\nys = ["p", "q"]',
      template: collect("(i, a, b)"),
      expect: 'out ends up [(0, 1, "p"), (1, 2, "q")]',
      solution: "for i, (a, b) in enumerate(zip(xs, ys)):",
      check: 'out == [(0, 1, "p"), (1, 2, "q")]',
      explain: "enumerate wraps each zipped pair, so the pair needs parentheses.",
    },
  ]),

  skill("for-reversed", 2, { explain: "reversed() walks backwards without copying the container." }, [
    {
      k: "list",
      prompt: "`a` is a list. Loop over its items from last to first, calling each one `x`. " + FOR_LINE,
      setup: "a = [1, 2, 3]",
      template: collect("x"),
      expect: "out ends up [3, 2, 1]",
      solution: "for x in reversed(a):",
      accepted: ["for x in a[::-1]:"],
      check: "out == [3, 2, 1]",
    },
    {
      k: "str",
      prompt: "`s` is a string. Loop over its characters from last to first, calling each one `ch`. " + FOR_LINE,
      setup: 's = "abc"',
      template: collect("ch"),
      expect: 'out ends up ["c", "b", "a"]',
      solution: "for ch in reversed(s):",
      accepted: ["for ch in s[::-1]:"],
      check: 'out == ["c", "b", "a"]',
    },
  ]),

  skill("for-sorted", 2, { explain: "sorted() returns a new sorted list and leaves the original alone." }, [
    {
      k: "ascending",
      prompt: "`nums` is an unsorted list. Loop over its items from smallest to largest, calling each `x`, without changing `nums`. " + FOR_LINE,
      setup: "nums = [3, 1, 2]",
      template: collect("x"),
      expect: "out ends up [1, 2, 3], and nums stays [3, 1, 2]",
      solution: "for x in sorted(nums):",
      check: "out == [1, 2, 3] and nums == [3, 1, 2]",
    },
    {
      k: "descending",
      prompt: "`nums` is an unsorted list. Loop over its items from largest to smallest, calling each `x`, without changing `nums`. " + FOR_LINE,
      setup: "nums = [3, 1, 2]",
      template: collect("x"),
      expect: "out ends up [3, 2, 1], and nums stays [3, 1, 2]",
      solution: "for x in sorted(nums, reverse=True):",
      check: "out == [3, 2, 1] and nums == [3, 1, 2]",
    },
  ]),

  skill("for-grid", 2, { explain: "Rows are len(grid); columns are len(grid[0])." }, [
    {
      k: "rows",
      prompt: "`grid` is a list of lists. Loop over its rows, calling each one `row`. " + FOR_LINE,
      setup: "grid = [[1, 2], [3, 4]]",
      template: collect("sum(row)"),
      expect: "out ends up [3, 7]",
      solution: "for row in grid:",
      check: "out == [3, 7]",
    },
    {
      k: "cells-by-index",
      prompt:
        "`grid` is a list of lists. Visit every cell using a row index `r` and a column index `c`. Write the two nested `for` lines.",
      setup: "grid = [[1, 2, 3], [4, 5, 6]]",
      template: collect("grid[r][c]", 2),
      expect: "out ends up [1, 2, 3, 4, 5, 6]",
      solution: "for r in range(len(grid)):\n    for c in range(len(grid[0])):",
      check: "out == [1, 2, 3, 4, 5, 6]",
    },
    {
      k: "rows-cols",
      prompt:
        "`rows` and `cols` are the dimensions of a grid. Visit every cell with a row index `r` and a column index `c`. Write the two nested `for` lines.",
      setup: "rows = 2\ncols = 2",
      template: collect("(r, c)", 2),
      expect: "out ends up [(0, 0), (0, 1), (1, 0), (1, 1)]",
      solution: "for r in range(rows):\n    for c in range(cols):",
      check: "out == [(0, 0), (0, 1), (1, 0), (1, 1)]",
      explain: "Rows on the outside, columns on the inside.",
    },
    {
      k: "values",
      prompt:
        "`grid` is a list of lists. Visit every value without using indexes: `row` for each row, then `x` for each value in it. Write the two nested `for` lines.",
      setup: "grid = [[1, 2], [3, 4]]",
      template: collect("x", 2),
      expect: "out ends up [1, 2, 3, 4]",
      solution: "for row in grid:\n    for x in row:",
      check: "out == [1, 2, 3, 4]",
      explain: "The inner loop iterates the row variable, not the grid.",
    },
  ]),

  skill("for-pairs", 2, { explain: "Starting j at i + 1 visits each pair once and never pairs an item with itself." }, [
    {
      k: "i-lt-j",
      prompt:
        "`n` is an int. Visit every pair of indexes `i`, `j` with `i` less than `j`, each pair once. Write the two nested `for` lines.",
      setup: "n = 3",
      template: collect("(i, j)", 2),
      expect: "out ends up [(0, 1), (0, 2), (1, 2)]",
      solution: "for i in range(n):\n    for j in range(i + 1, n):",
      check: "out == [(0, 1), (0, 2), (1, 2)]",
    },
    {
      k: "all-ordered",
      prompt:
        "`n` is an int. Visit every combination of `i` and `j`, both from 0 below `n`, including `i` equal to `j`. Write the two nested `for` lines.",
      setup: "n = 2",
      template: collect("(i, j)", 2),
      expect: "out ends up [(0, 0), (0, 1), (1, 0), (1, 1)]",
      solution: "for i in range(n):\n    for j in range(n):",
      check: "out == [(0, 0), (0, 1), (1, 0), (1, 1)]",
      explain: "Both loops run the full range, so there are n * n passes.",
    },
  ]),

  skill("for-neighbors", 2, { explain: "Keep the four moves in a list of (dr, dc) tuples and unpack them in the loop." }, [
    {
      k: "define-dirs",
      prompt: "Create `dirs`, a list of the four (row change, column change) tuples for moving down, up, right and left in a grid.",
      expect: "dirs holds (1, 0), (-1, 0), (0, 1) and (0, -1)",
      solution: "dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]",
      check: "sorted(map(tuple, dirs)) == [(-1, 0), (0, -1), (0, 1), (1, 0)]",
    },
    {
      k: "loop-dirs",
      prompt:
        "`dirs` is a list of (row change, column change) tuples, and `r`, `c` is the current cell. Loop over the directions, unpacking each into `dr` and `dc`. " +
        FOR_LINE,
      setup: "dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]\nr = 1\nc = 1",
      template: collect("(r + dr, c + dc)"),
      expect: "out ends up [(2, 1), (0, 1), (1, 2), (1, 0)]",
      solution: "for dr, dc in dirs:",
      check: "out == [(2, 1), (0, 1), (1, 2), (1, 0)]",
    },
    {
      k: "next-cell",
      prompt:
        "Inside the loop over `dirs` below, `r`, `c` is the current cell and `dr`, `dc` is one direction. In one line, compute the neighbouring cell into `nr` and `nc`.",
      setup: "dirs = [(1, 0), (0, 1)]\nr = 1\nc = 1",
      template: "out = []\nfor dr, dc in dirs:\n    {answer}\n    out.append((nr, nc))",
      expect: "out ends up [(2, 1), (1, 2)]",
      solution: "nr, nc = r + dr, c + dc",
      check: "out == [(2, 1), (1, 2)]",
      explain: "Tuple assignment sets both at once.",
    },
    {
      k: "in-bounds",
      prompt:
        "`rows` and `cols` are the grid dimensions. `cells` is a list of cells to test, and inside the loop below `nr`, `nc` is one of them. Write an expression that is True only when that cell is inside the grid.",
      setup: "rows = 3\ncols = 3\ncells = [(0, 0), (3, 0), (2, 2), (0, -1)]",
      template: "out = []\nfor nr, nc in cells:\n    ok = (\n        {answer}\n    )\n    out.append(ok)",
      expect: "out ends up [True, False, True, False]",
      solution: "0 <= nr < rows and 0 <= nc < cols",
      check: "out == [True, False, True, False]",
      explain: "Python allows chained comparisons: 0 <= nr < rows.",
    },
  ]),

  skill("for-level", 3, { explain: "len(q) is read once, before the loop, so items added during the level wait for the next one." }, [
    {
      k: "bfs-level",
      prompt:
        "`q` is a deque used for BFS. Loop exactly once per item that is in `q` right now, even though the body adds more. The loop variable is unused. " +
        FOR_LINE,
      setup: "from collections import deque\nq = deque([1, 2])",
      template: "out = []\n{answer}\n    out.append(q.popleft())\n    q.append(0)",
      expect: "out ends up [1, 2], and q holds the two new items",
      solution: "for _ in range(len(q)):",
      check: "out == [1, 2] and list(q) == [0, 0]",
    },
  ]),

  skill("while-counter", 1, { explain: "A while loop repeats as long as its condition is true; you update the variable yourself." }, [
    {
      k: "less-than",
      prompt: "`i` starts at 0 and `n` is an int. Loop for as long as `i` is less than `n`. " + WHILE_LINE,
      setup: "n = 3\ni = 0",
      template: "out = []\n{answer}\n    out.append(i)\n    i += 1",
      expect: "out ends up [0, 1, 2]",
      solution: "while i < n:",
      check: "out == [0, 1, 2]",
    },
    {
      k: "less-or-equal",
      prompt: "`i` starts at 1 and `n` is an int. Loop for as long as `i` is at most `n`, so `n` itself is included. " + WHILE_LINE,
      setup: "n = 3\ni = 1",
      template: "out = []\n{answer}\n    out.append(i)\n    i += 1",
      expect: "out ends up [1, 2, 3]",
      solution: "while i <= n:",
      check: "out == [1, 2, 3]",
    },
    {
      k: "countdown",
      prompt: "`n` is a positive int that the body shrinks. Loop for as long as `n` is above 0. " + WHILE_LINE,
      setup: "n = 123",
      template: "out = []\n{answer}\n    out.append(n % 10)\n    n //= 10",
      expect: "out ends up [3, 2, 1], the digits from the right",
      solution: "while n > 0:",
      accepted: ["while n:"],
      check: "out == [3, 2, 1]",
      explain: "This is the standard digit-peeling loop: n % 10, then n //= 10.",
    },
  ]),

  skill("while-nonempty", 1, { explain: "Empty containers are falsy, so the container itself is the condition." }, [
    {
      k: "stack",
      prompt: "`stack` is a list used as a stack. Loop until it is empty. " + WHILE_LINE,
      setup: "stack = [1, 2, 3]",
      template: "out = []\n{answer}\n    out.append(stack.pop())",
      expect: "out ends up [3, 2, 1]",
      solution: "while stack:",
      accepted: ["while len(stack) > 0:"],
      check: "out == [3, 2, 1]",
    },
    {
      k: "deque",
      prompt: "`q` is a deque. Loop until it is empty. " + WHILE_LINE,
      setup: "from collections import deque\nq = deque([1, 2])",
      template: "out = []\n{answer}\n    out.append(q.popleft())",
      expect: "out ends up [1, 2]",
      solution: "while q:",
      accepted: ["while len(q) > 0:"],
      check: "out == [1, 2]",
    },
    {
      k: "heap",
      prompt: "`h` is a heap (a list). Loop until it is empty. " + WHILE_LINE,
      setup: "import heapq\nh = [1, 3, 2]",
      template: "out = []\n{answer}\n    out.append(heapq.heappop(h))",
      expect: "out ends up [1, 2, 3]",
      solution: "while h:",
      accepted: ["while len(h) > 0:"],
      check: "out == [1, 2, 3]",
    },
  ]),

  skill("while-two-pointers", 2, { explain: "l < r stops when the pointers meet; l <= r also handles the single middle item." }, [
    {
      k: "meet",
      prompt: "`l` and `r` are indexes at the two ends of a list. Loop until they meet, stopping when they are equal. " + WHILE_LINE,
      setup: "l = 0\nr = 4",
      template: "out = []\n{answer}\n    out.append((l, r))\n    l += 1\n    r -= 1",
      expect: "out ends up [(0, 4), (1, 3)]",
      solution: "while l < r:",
      check: "out == [(0, 4), (1, 3)]",
    },
    {
      k: "binary-search",
      prompt:
        "`lo` and `hi` are the bounds of a binary search, both inclusive. Loop while the range still holds at least one index, including when they are equal. " +
        WHILE_LINE,
      setup: "lo = 0\nhi = 2",
      template: "out = []\n{answer}\n    out.append((lo, hi))\n    lo += 1",
      expect: "out ends up [(0, 2), (1, 2), (2, 2)]",
      solution: "while lo <= hi:",
      check: "out == [(0, 2), (1, 2), (2, 2)]",
      explain: "With inclusive bounds the range is empty only when lo > hi.",
    },
  ]),

  skill("while-compound", 2, { explain: "Put the guard first: `and` stops at the first false part, so the second part never runs on bad input." }, [
    {
      k: "stack-top",
      prompt:
        "`stack` is a list used as a stack and `x` is a number. Loop while the stack is not empty and its top item is smaller than `x`. " +
        WHILE_LINE,
      setup: "stack = [5, 2, 1]\nx = 3",
      template: "out = []\n{answer}\n    out.append(stack.pop())",
      expect: "out ends up [1, 2], and stack keeps [5]",
      solution: "while stack and stack[-1] < x:",
      check: "out == [1, 2] and stack == [5]",
      explain: "Check `stack` first; stack[-1] on an empty list raises IndexError.",
    },
    {
      k: "pointers-match",
      prompt:
        "`s` is a string and `l`, `r` are indexes at its two ends. Loop while the pointers have not met and the characters at them are equal. " +
        WHILE_LINE,
      setup: 's = "abcda"\nl = 0\nr = 4',
      template: "out = []\n{answer}\n    out.append((l, r))\n    l += 1\n    r -= 1",
      expect: "out ends up [(0, 4)], stopping at the b / d mismatch",
      solution: "while l < r and s[l] == s[r]:",
      check: "out == [(0, 4)]",
    },
    {
      k: "skip-in-bounds",
      prompt:
        "`a` is a list and `i` is an index. Loop while `i` is still inside the list and the item at `i` is 0, to skip leading zeros. " +
        WHILE_LINE,
      setup: "a = [0, 0, 5, 0]\ni = 0",
      template: "{answer}\n    i += 1",
      expect: "i ends up 2, the first non-zero item",
      solution: "while i < len(a) and a[i] == 0:",
      check: "i == 2",
      explain: "The bounds check goes first so a[i] is never read past the end.",
    },
  ]),

  skill("while-node", 2, { explain: "A node is truthy and None is falsy, so the node itself is the loop condition." }, [
    {
      k: "walk",
      prompt: "`node` is the first `ListNode` of a linked list. Loop until you run off the end of the list. " + WHILE_LINE,
      setup: LIST_NODE + "\nnode = ListNode(1, ListNode(2, ListNode(3)))",
      template: "out = []\n{answer}\n    out.append(node.val)\n    node = node.next",
      expect: "out ends up [1, 2, 3]",
      solution: "while node:",
      accepted: ["while node is not None:"],
      check: "out == [1, 2, 3]",
    },
    {
      k: "to-last",
      prompt:
        "`node` is the first `ListNode` of a linked list. Loop so that it stops ON the last node, not after it. " + WHILE_LINE,
      setup: LIST_NODE + "\nnode = ListNode(1, ListNode(2, ListNode(3)))",
      template: "{answer}\n    node = node.next",
      expect: "node ends up as the node holding 3",
      solution: "while node.next:",
      accepted: ["while node.next is not None:"],
      check: "node is not None and node.val == 3",
      explain: "Testing node.next stops one step early, leaving node on the last node.",
    },
    {
      k: "slow-fast",
      prompt:
        "`slow` and `fast` both start at the head `ListNode`. `fast` moves two steps per pass. Loop while `fast` can still safely take two steps. " +
        WHILE_LINE,
      setup: LIST_NODE + "\nslow = fast = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))",
      template: "{answer}\n    slow = slow.next\n    fast = fast.next.next",
      expect: "slow ends up on the middle node, holding 3",
      solution: "while fast and fast.next:",
      check: "slow.val == 3",
      explain: "Check fast before fast.next, or an even-length list raises on None.next.",
    },
  ]),

  skill("while-true", 2, { explain: "while True runs forever; the exit is a break inside the body." }, [
    {
      k: "forever",
      prompt: "Write the `while` line of a loop that runs until the body breaks out of it.",
      template: "i = 0\n{answer}\n    i += 1\n    if i == 3:\n        break",
      expect: "i ends up 3",
      solution: "while True:",
      accepted: ["while 1:"],
      check: "i == 3",
    },
  ]),

  skill("loop-control", 1, { explain: "break leaves the loop; continue jumps to the next pass." }, [
    {
      k: "break",
      prompt:
        "`nums` is a list. Inside the loop below, stop the whole loop as soon as `x` is negative. Write the `if` line and the statement under it.",
      setup: "nums = [1, 2, -1, 3]",
      template: "out = []\nfor x in nums:\n    {answer}\n    out.append(x)",
      expect: "out ends up [1, 2]",
      solution: "if x < 0:\n    break",
      check: "out == [1, 2]",
    },
    {
      k: "continue",
      prompt:
        "`nums` is a list. Inside the loop below, skip just the negative values and carry on with the rest. Write the `if` line and the statement under it.",
      setup: "nums = [1, 2, -1, 3]",
      template: "out = []\nfor x in nums:\n    {answer}\n    out.append(x)",
      expect: "out ends up [1, 2, 3]",
      solution: "if x < 0:\n    continue",
      check: "out == [1, 2, 3]",
    },
    {
      k: "for-else",
      prompt:
        "`nums` is a list and `target` is a value not in it. A `for` loop can have a block that runs only when the loop finished without `break`. Write the line that starts that block.",
      setup: "nums = [1, 2, 3]\ntarget = 9",
      template: "found = None\nfor x in nums:\n    if x == target:\n        found = True\n        break\n{answer}\n    found = False",
      expect: "found ends up False",
      solution: "else:",
      check: "found is False",
      explain: "The else of a loop runs only if the loop was not ended by break.",
    },
  ]),
]);
