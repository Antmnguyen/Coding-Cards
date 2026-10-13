import { skill, topic, v } from "../topic";
import { POINT, TREE_NODE } from "./given";

/**
 * Recall cards for skills whose cards were all (or nearly all) labelled thinking.
 * Each one is a 2-idea piece of the bigger line; the rest is in the given code.
 */

const IT = (names: string) => `from itertools import ${names}`;
const TREE = TREE_NODE + "\nroot = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))";
const POINTS = POINT + "\npoints = [Point(3, 1), Point(1, 2), Point(2, 0)]";

/** Runs a recursive tree function whose body has one slot, on `root`, into `result`. */
const treeFn = (name: string, body: string) => `def ${name}(node):\n${body}\n\nresult = ${name}(root)`;
const visit = (body: string) => `out = []\ndef dfs(node):\n    if not node:\n        return\n${body}\n\ndfs(root)`;

export const loopsRecall = topic("python", "loops", [
  skill("for-inner", 2, { explain: "The inner loop starts one past the outer index, so each pair is visited once and never with itself." }, [
    v("after-i", "`n` is an int. The outer loop over `i` is given. Write the inner `for` line so that `j` runs from one past `i` up to `n` - 1.", "n = 3", "out ends up [(0, 1), (0, 2), (1, 2)]", "for j in range(i + 1, n):", "out == [(0, 1), (0, 2), (1, 2)]", {
      template: "out = []\nfor i in range(n):\n    {answer}\n        out.append((i, j))",
    }),
    v("after-j", "`n` is an int. The loops over `i` and `j` are given. Write the innermost `for` line so that `k` runs from one past `j` up to `n` - 1.", "n = 4", "out ends up the 4 triples (0, 1, 2), (0, 1, 3), (0, 2, 3), (1, 2, 3)", "for k in range(j + 1, n):", "out == [(0, 1, 2), (0, 1, 3), (0, 2, 3), (1, 2, 3)]", {
      template: "out = []\nfor i in range(n):\n    for j in range(i + 1, n):\n        {answer}\n            out.append((i, j, k))",
    }),
    v("full", "`n` is an int. The outer loop over `i` is given. Write the inner `for` line so that `j` also runs over every index from 0 below `n`.", "n = 2", "out ends up [(0, 0), (0, 1), (1, 0), (1, 1)]", "for j in range(n):", "out == [(0, 0), (0, 1), (1, 0), (1, 1)]", {
      template: "out = []\nfor i in range(n):\n    {answer}\n        out.append((i, j))",
      explain: "The inner loop restarts from 0 for every value of the outer one.",
    }),
    v("cols", "`grid` is a list of lists with `rows` rows and `cols` columns. The loop over the row index `r` is given. Write the inner `for` line over the column index `c`.", "grid = [[1, 2], [3, 4]]\nrows = 2\ncols = 2", "out ends up [1, 2, 3, 4]", "for c in range(cols):", "out == [1, 2, 3, 4]", {
      template: "out = []\nfor r in range(rows):\n    {answer}\n        out.append(grid[r][c])",
      explain: "Rows are the outer loop and columns the inner one, matching grid[r][c].",
    }),
  ]),
]);

export const slicingRecall = topic("python", "slicing", [
  skill("slice-each", 2, { explain: "A slice inside a comprehension makes one piece per index; the stop is never included." }, [
    v("windows", "`s` is a string, `k` is a window size and `starts` holds every start index. Build the list of substrings of length `k`, one per start. Call each start `i`.", 's = "abcd"\nk = 2\nstarts = range(len(s) - k + 1)', 'gives ["ab", "bc", "cd"]', "[s[i:i + k] for i in starts]", '_ == ["ab", "bc", "cd"]'),
    v("chunks", "`nums` is a list, `k` is a chunk size and `starts` holds the start index of each chunk. Build the list of chunks. Call each start `i`.", "nums = [1, 2, 3, 4, 5]\nk = 2\nstarts = range(0, len(nums), k)", "gives [[1, 2], [3, 4], [5]]", "[nums[i:i + k] for i in starts]", "_ == [[1, 2], [3, 4], [5]]", {
      explain: "A slice that runs past the end just stops at the end, so the last chunk may be short.",
    }),
    v("prefixes", "`s` is a string and `ends` holds every end index from 1 up to its length. Build the list of prefixes, one per end. Call each end `i`.", 's = "abc"\nends = range(1, len(s) + 1)', 'gives ["a", "ab", "abc"]', "[s[:i] for i in ends]", '_ == ["a", "ab", "abc"]'),
    v("suffixes", "`s` is a string and `starts` holds every index into it. Build the list of suffixes, one per start. Call each start `i`.", 's = "abc"\nstarts = range(len(s))', 'gives ["abc", "bc", "c"]', "[s[i:] for i in starts]", '_ == ["abc", "bc", "c"]'),
  ]),
]);

export const stringsRecall = topic("python", "strings", [
  skill("words-rebuild", 2, { explain: "Work on the list of words, then join: join is called on the separator, not on the list." }, [
    v("join-reversed", "`words` is a list of strings. Build one string with the words in reverse order, separated by single spaces.", 'words = ["the", "sky", "is"]', 'gives "is sky the"', '" ".join(words[::-1])', '_ == "is sky the"', {
      accepted: ['" ".join(reversed(words))'],
    }),
    v("reverse-each", "`words` is a list of strings. Build the list with every word reversed. Call each word `w`.", 'words = ["ab", "cde"]', 'gives ["ba", "edc"]', "[w[::-1] for w in words]", '_ == ["ba", "edc"]', {
      explain: "[::-1] reverses a string; strings have no .reverse() method.",
    }),
    v("join-reversed-chars", "`chars` is a list of single characters. Build one string from them in reverse order.", 'chars = ["a", "b", "c"]', 'gives "cba"', '"".join(chars[::-1])', '_ == "cba"', {
      accepted: ['"".join(reversed(chars))'],
    }),
  ]),
]);

export const stacksRecall = topic("python", "stack", [
  skill("stack-top-test", 2, { explain: "Test the stack first: stack[-1] raises IndexError on an empty list, and `and` stops before reaching it." }, [
    v("smaller", "`stack` is a list used as a stack and `x` is a number. Write the condition (no `while` or `if`) that is true when the stack is not empty and its top is smaller than `x`.", "stack = [9, 2]\nx = 5", "gives True", "stack and stack[-1] < x", "_ is True"),
    v("equals-char", "`stack` is a stack of characters and `c` is a character. Write the condition (no `if`) that is true when the stack is not empty and its top equals `c`.", 'stack = ["a", "b"]\nc = "b"', "gives True", "stack and stack[-1] == c", "_ is True"),
    v("pair-value", "`stack` holds (value, index) tuples and `x` is a number. Write the condition (no `while`) that is true when the stack is not empty and the top entry's value is smaller than `x`.", "stack = [(9, 0), (2, 1)]\nx = 5", "gives True", "stack and stack[-1][0] < x", "_ is True"),
    v("top-index", "`nums` is a list and `stack` holds INDEXES into it. `x` is a number. Write the condition (no `while`) that is true when the stack is not empty and the value at the top index is smaller than `x`.", "nums = [5, 2, 1]\nstack = [0, 1, 2]\nx = 3", "gives True", "stack and nums[stack[-1]] < x", "_ is True"),
    v("empty", "`stack` is an EMPTY stack and `x` is a number. Write the condition that tests \"not empty and top smaller than `x`\" without raising an error.", "stack = []\nx = 3", "gives [] (falsy), with no IndexError", "stack and stack[-1] < x", "_ == []", {
      explain: "`and` returns the empty list itself and never evaluates stack[-1].",
    }),
  ]),
]);

export const iterationRecall = topic("python", "iteration", [
  skill("zip-neighbours", 2, { explain: "Zipping a sequence with itself shifted by one pairs every item with the next; zip stops at the shorter one." }, [
    v("list", "`nums` is a list. Pair every item with the one after it, using `zip`. Leave the result as a zip object.", "nums = [1, 4, 9]", "gives the pairs (1, 4), (4, 9)", "zip(nums, nums[1:])", "list(_) == [(1, 4), (4, 9)]"),
    v("string", "`s` is a string. Pair every character with the one after it, using `zip`. Leave the result as a zip object.", 's = "abc"', 'gives the pairs ("a", "b"), ("b", "c")', "zip(s, s[1:])", 'list(_) == [("a", "b"), ("b", "c")]'),
    v("tuple", "`t` is a tuple. Pair every item with the one after it, using `zip`. Leave the result as a zip object.", "t = (5, 6, 7)", "gives the pairs (5, 6), (6, 7)", "zip(t, t[1:])", "list(_) == [(5, 6), (6, 7)]"),
    v("objects", "`points` is a list of `Point` objects. Pair every point with the one after it, using `zip`. Leave the result as a zip object.", POINTS, "gives 2 pairs of neighbouring points", "zip(points, points[1:])", "[(p.x, q.x) for p, q in _] == [(3, 1), (1, 2)]"),
  ]),

  skill("pairs-reduce", 2, { explain: "A generator inside sum, all or max needs no extra brackets, and the pair is unpacked in the for part." }, [
    v("count-diff", "`s` and `t` are strings and `pairs` holds their characters paired by position. Count the pairs whose two characters differ. Use `a` and `b`.", 's = "abcd"\nt = "abxy"\npairs = list(zip(s, t))', "gives 2", "sum(a != b for a, b in pairs)", "_ == 2", {
      explain: "True counts as 1, so summing comparisons counts the matches.",
    }),
    v("is-sorted", "`nums` is a list and `pairs` holds each item with the one after it. Write an expression that is True when every pair is in non-decreasing order. Use `a` and `b`.", "nums = [1, 2, 2, 5]\npairs = list(zip(nums, nums[1:]))", "gives True", "all(a <= b for a, b in pairs)", "_ is True"),
    v("max-gap", "`nums` is a sorted list and `pairs` holds each item with the one after it. Get the largest difference within a pair. Use `a` and `b`.", "nums = [1, 4, 9]\npairs = list(zip(nums, nums[1:]))", "gives 5", "max(b - a for a, b in pairs)", "_ == 5"),
    v("dot-product", "`xs` and `ys` are lists of numbers and `pairs` holds their items paired by position. Get the sum of the products of each pair. Use `a` and `b`.", "xs = [1, 2]\nys = [3, 4]\npairs = list(zip(xs, ys))", "gives 11", "sum(a * b for a, b in pairs)", "_ == 11"),
  ]),

  skill("zip-longest-fill", 3, { explain: "zip stops at the shorter input; zip_longest keeps going and fills the gaps with fillvalue (None if not given)." }, [
    v("lists", "`zip_longest` is already imported. `a` is longer than `b`. Pair them by position without dropping the extra items, filling the gaps with 0. Leave the result as an iterator.", IT("zip_longest") + "\na = [1, 2, 3]\nb = [7]", "gives the pairs (1, 7), (2, 0), (3, 0)", "zip_longest(a, b, fillvalue=0)", "list(_) == [(1, 7), (2, 0), (3, 0)]"),
    v("strings", '`zip_longest` is already imported. `s` is longer than `t`. Pair their characters by position without dropping any, filling the gaps with "-". Leave the result as an iterator.', IT("zip_longest") + '\ns = "abc"\nt = "x"', 'gives the pairs ("a", "x"), ("b", "-"), ("c", "-")', 'zip_longest(s, t, fillvalue="-")', 'list(_) == [("a", "x"), ("b", "-"), ("c", "-")]'),
  ]),

  skill("map-filter-lambda", 2, { explain: "The function comes first and the data second; the result is a lazy iterator until something consumes it." }, [
    v("map", "`nums` is a list of numbers. Using `map` and a lambda, double every item. Leave the result as a map object. Call each item `x`.", "nums = [1, 2]", "gives the values 2, 4", "map(lambda x: x * 2, nums)", "list(_) == [2, 4]"),
    v("filter", "`nums` is a list of numbers. Using `filter` and a lambda, keep the items greater than 0. Leave the result as a filter object. Call each item `x`.", "nums = [3, -1, 2]", "gives the values 3, 2", "filter(lambda x: x > 0, nums)", "list(_) == [3, 2]"),
    v("map-words", "`words` is a list of strings. Using `map` and a lambda, get the first character of every word. Leave the result as a map object. Call each word `w`.", 'words = ["ab", "cd"]', 'gives the values "a", "c"', "map(lambda w: w[0], words)", 'list(_) == ["a", "c"]'),
  ]),
]);

export const sortingRecall = topic("python", "sorting", [
  skill("key-tuple", 2, { explain: "A key that returns a tuple sorts by its first part and uses the later parts only to break ties." }, [
    v("pairs", "`pairs` is a list of 2-value tuples. It is sorted below with `key`. Store in `key` a lambda that orders by the second value, then by the first to break ties. Call each tuple `p`.", "pairs = [(2, 5), (1, 9), (1, 5)]", "out ends up [(1, 5), (2, 5), (1, 9)]", "key = lambda p: (p[1], p[0])", "out == [(1, 5), (2, 5), (1, 9)]", {
      template: "{answer}\nout = sorted(pairs, key=key)",
    }),
    v("objects", "`points` is a list of `Point` objects. It is sorted below with `key`. Store in `key` a lambda that orders by `x`, then by `y` to break ties. Call each object `p`.", POINT + "\npoints = [Point(2, 5), Point(1, 9), Point(2, 1)]", "out ends up the points (1, 9), (2, 1), (2, 5)", "key = lambda p: (p.x, p.y)", "[(p.x, p.y) for p in out] == [(1, 9), (2, 1), (2, 5)]", {
      template: "{answer}\nout = sorted(points, key=key)",
    }),
    v("intervals", "`intervals` is a list of [start, end] lists. It is sorted below with `key`. Store in `key` a lambda that orders by end, then by start to break ties. Call each interval `x`.", "intervals = [[3, 6], [1, 9], [2, 6]]", "out ends up [[2, 6], [3, 6], [1, 9]]", "key = lambda x: (x[1], x[0])", "out == [[2, 6], [3, 6], [1, 9]]", {
      template: "{answer}\nout = sorted(intervals, key=key)",
    }),
  ]),

  skill("key-negate", 2, { explain: "Negating a number in the key sorts that part largest first without reverse=True." }, [
    v("pairs", "`pairs` is a list of 2-value tuples. It is sorted below with `key`. Store in `key` a lambda that puts the largest SECOND value first, by negating it. Call each tuple `p`.", "pairs = [(1, 3), (2, 9), (3, 5)]", "out ends up [(2, 9), (3, 5), (1, 3)]", "key = lambda p: -p[1]", "out == [(2, 9), (3, 5), (1, 3)]", {
      template: "{answer}\nout = sorted(pairs, key=key)",
    }),
    v("objects", "`points` is a list of `Point` objects. It is sorted below with `key`. Store in `key` a lambda that puts the largest `y` first, by negating it. Call each object `p`.", POINTS, "out ends up with y running 2, 1, 0", "key = lambda p: -p.y", "[p.y for p in out] == [2, 1, 0]", {
      template: "{answer}\nout = sorted(points, key=key)",
    }),
    v("dict-keys", "`d` maps names to counts. Its keys are sorted below with `key`. Store in `key` a lambda that puts the key with the largest count first, by negating the count. Call each key `k`.", 'd = {"a": 1, "b": 5, "c": 3}', 'out ends up ["b", "c", "a"]', "key = lambda k: -d[k]", 'out == ["b", "c", "a"]', {
      template: "{answer}\nout = sorted(d, key=key)",
    }),
  ]),

  skill("sort-by-lookup", 2, { explain: "The key can look each item up somewhere else, so one sequence is ordered by the values of another." }, [
    v("indexes", "`nums` is a list and `idx` holds its indexes. Get a sorted list of the indexes, ordered by the value in `nums` at each index. Call each index `i`.", "nums = [30, 10, 20]\nidx = range(len(nums))", "gives [1, 2, 0]", "sorted(idx, key=lambda i: nums[i])", "_ == [1, 2, 0]"),
    v("names-by-dict", "`names` is a list of strings and `age` maps each name to a number. Get a sorted copy of `names` ordered by age. Call each name `n`.", 'names = ["al", "bo", "cy"]\nage = {"al": 30, "bo": 10, "cy": 20}', 'gives ["bo", "cy", "al"]', "sorted(names, key=lambda n: age[n])", '_ == ["bo", "cy", "al"]'),
    v("chars-by-rank", "`s` is a string and `rank` maps each character to its position in a custom alphabet. Get a sorted list of the characters of `s`, ordered by rank. Call each character `c`.", 's = "abc"\nrank = {"c": 0, "a": 1, "b": 2}', 'gives ["c", "a", "b"]', "sorted(s, key=lambda c: rank[c])", '_ == ["c", "a", "b"]'),
  ]),
]);

export const dictsRecall = topic("python", "dicts", [
  skill("dict-sort-pieces", 2, { tags: ["sorting"], explain: "Sorting a dict sorts its keys; key=d.get orders them by their values." }, [
    v("keys-by-value", "`d` is a dictionary of name to count. Get its keys as a list, ordered by count, smallest first.", 'd = {"a": 3, "b": 1, "c": 2}', 'gives ["b", "c", "a"]', "sorted(d, key=d.get)", '_ == ["b", "c", "a"]', {
      accepted: ["sorted(d, key=lambda k: d[k])"],
      explain: "Pass the method itself: d.get, not d.get().",
    }),
    v("keys-desc", "`d` is a dictionary with int keys. Get its keys as a list, largest key first.", "d = {2: 0, 9: 0, 4: 0}", "gives [9, 4, 2]", "sorted(d, reverse=True)", "_ == [9, 4, 2]"),
    v("items-by-value", "`d` is a dictionary and `items` is the list of its (key, value) pairs. Get a sorted copy of `items` ordered by value. Call each pair `kv`.", 'd = {"a": 3, "b": 1}\nitems = list(d.items())', 'gives [("b", 1), ("a", 3)]', "sorted(items, key=lambda kv: kv[1])", '_ == [("b", 1), ("a", 3)]'),
  ]),
]);

export const countersRecall = topic("python", "counter", [
  skill("counter-sort-pieces", 2, { explain: "A Counter is a dict, so sorting it sorts its keys and key=freq.get orders them by count." }, [
    v("keys-by-count", "`freq` is a `Counter` of characters. Get the characters as a list, ordered by count, rarest first.", 'from collections import Counter\nfreq = Counter("aabbbc")', 'gives ["c", "a", "b"]', "sorted(freq, key=freq.get)", '_ == ["c", "a", "b"]', {
      accepted: ["sorted(freq, key=lambda k: freq[k])"],
    }),
    v("counts", "`freq` is a `Counter` of characters. Get just the counts as a sorted list, smallest first.", 'from collections import Counter\nfreq = Counter("aabbbc")', "gives [1, 2, 3]", "sorted(freq.values())", "_ == [1, 2, 3]"),
  ]),
]);

export const heapsRecall = topic("python", "heaps", [
  skill("heap-list-build", 2, { explain: "Build the list in the shape the heap needs first; heapify then orders it in place." }, [
    v("negated", "`heapq` is already imported and `nums` is a list of numbers. Store in `h` a list of every number negated, so that it can be heapified into a max-heap below. Call each number `x`.", "import heapq\nnums = [3, 9, 4]", "h[0] ends up -9", "h = [-x for x in nums]", "h[0] == -9 and sorted(h) == [-9, -4, -3]", {
      template: "{answer}\nheapq.heapify(h)",
    }),
    v("negated-counts", "`heapq` is already imported and `pairs` is a list of (char, count) tuples. Store in `h` a list of (negated count, char) tuples, to be heapified below. Call the parts `c` and `n`.", 'import heapq\npairs = [("a", 2), ("b", 5)]', 'h[0] ends up (-5, "b")', "h = [(-n, c) for c, n in pairs]", 'h[0] == (-5, "b") and len(h) == 2', {
      template: "{answer}\nheapq.heapify(h)",
      explain: "The count goes first in the tuple because tuples compare by their first item.",
    }),
    v("by-length", "`heapq` is already imported and `words` is a list of strings. Store in `h` a list of (length, word) tuples, to be heapified below. Call each word `w`.", 'import heapq\nwords = ["ccc", "a", "bb"]', 'h[0] ends up (1, "a")', "h = [(len(w), w) for w in words]", 'h[0] == (1, "a") and len(h) == 3', {
      template: "{answer}\nheapq.heapify(h)",
    }),
  ]),
]);

export const classesRecall = topic("python", "classes", [
  skill("class-headers", 1, { explain: "The constructor is always named __init__ and its first parameter is self." }, [
    v("one-field", "Write the `class` line and the `__init__` header for a class named `Node` whose constructor takes `val`. The body is given.", "", "Node(5).val is 5", "class Node:\n    def __init__(self, val):", "Node(5).val == 5", {
      template: "{answer}\n        self.val = val",
    }),
    v("two-fields", "Write the `class` line and the `__init__` header for a class named `Point` whose constructor takes `x` and `y`. The body is given.", "", "Point(1, 2).y is 2", "class Point:\n    def __init__(self, x, y):", "Point(1, 2).y == 2", {
      template: "{answer}\n        self.x, self.y = x, y",
    }),
    v("no-args", "Write the `class` line and the `__init__` header for a class named `Trie` whose constructor takes no arguments. The body is given.", "", "Trie().children is {}", "class Trie:\n    def __init__(self):", "Trie().children == {}", {
      template: "{answer}\n        self.children = {}",
      explain: "Even with no arguments the header still needs self.",
    }),
  ]),

  skill("class-decorated-headers", 3, { explain: "The decorator goes on its own line directly above the header it changes." }, [
    v("property", "Inside the class below, write the decorator line and the method header that make `val` readable as an attribute (`box.val`, no brackets). The body is given.", "", "box.val is 3", "@property\ndef val(self):", "box.val == 3", {
      template: "class Box:\n    def __init__(self):\n        self._val = 3\n    {answer}\n        return self._val\n\nbox = Box()",
    }),
    v("setter", "Inside the class below, `val` is already a property. Write the decorator line and the method header that let `box.val = 9` assign to it. Call the new value `v`. The body is given.", "", "box._val ends up 9", "@val.setter\ndef val(self, v):", "box._val == 9", {
      template: "class Box:\n    def __init__(self):\n        self._val = 3\n    @property\n    def val(self):\n        return self._val\n    {answer}\n        self._val = v\n\nbox = Box()\nbox.val = 9",
      explain: "The setter is named after the property: @val.setter, and the method is called val again.",
    }),
    v("dataclass", "`dataclass` is already imported. Write the decorator line and the `class` line for a dataclass named `Point`. Its fields are given.", "from dataclasses import dataclass", "p is Point(x=1, y=2)", "@dataclass\nclass Point:", "(p.x, p.y) == (1, 2)", {
      template: "{answer}\n    x: int\n    y: int\n\np = Point(1, 2)",
      explain: "@dataclass writes __init__, __repr__ and __eq__ from the annotated fields.",
    }),
  ]),
]);

export const gridsRecall = topic("python", "grids", [
  skill("grid-in-bounds", 2, { explain: "Chained comparisons check both ends at once: 0 <= r < rows. Test the bounds before reading the cell." }, [
    v("if-line", "The grid is `rows` by `cols`. In the loop below `nr`, `nc` is a candidate cell. Write the `if` line whose block runs only when the cell is on the grid.", "rows = 2\ncols = 3", "out ends up [(0, 0), (1, 2)]", "if 0 <= nr < rows and 0 <= nc < cols:", "out == [(0, 0), (1, 2)]", {
      template: "out = []\nfor nr, nc in [(0, 0), (-1, 0), (1, 2), (2, 1), (0, 3)]:\n    {answer}\n        out.append((nr, nc))",
    }),
    v("m-n", "The matrix is `m` by `n`. In the loop below `i`, `j` is a candidate cell. Write the `if` line whose block runs only when the cell is inside the matrix.", "m = 3\nn = 2", "out ends up [(2, 1), (0, 0)]", "if 0 <= i < m and 0 <= j < n:", "out == [(2, 1), (0, 0)]", {
      template: "out = []\nfor i, j in [(2, 1), (3, 0), (0, 0), (0, 2), (-1, 1)]:\n    {answer}\n        out.append((i, j))",
    }),
    v("off-grid", "The grid is `rows` by `cols`. In the loop below `r`, `c` is a candidate cell. Write the `if` line whose block runs when the cell is OFF the grid, by negating the on-grid test.", "rows = 2\ncols = 2", "out ends up [(0, 0), (1, 1)]", "if not (0 <= r < rows and 0 <= c < cols):", "out == [(0, 0), (1, 1)]", {
      template: "out = []\nfor r, c in [(0, 0), (-1, 0), (0, 2), (1, 1), (2, 1)]:\n    {answer}\n        continue\n    out.append((r, c))",
      explain: "The brackets matter: not binds tighter than and.",
    }),
  ]),

  skill("grid-fold", 2, { explain: "map applies a function to every row; the outer call then combines the per-row results." }, [
    v("total", "`grid` is a list of lists of numbers. Get the sum of every cell, using `map`.", "grid = [[1, 2], [3, 4]]", "gives 10", "sum(map(sum, grid))", "_ == 10"),
    v("max", "`grid` is a list of lists of numbers. Get the largest cell, using `map`.", "grid = [[1, 7], [3, 4]]", "gives 7", "max(map(max, grid))", "_ == 7"),
    v("min", "`grid` is a list of lists of numbers. Get the smallest cell, using `map`.", "grid = [[5, 7], [3, 4]]", "gives 3", "min(map(min, grid))", "_ == 3"),
  ]),
]);

export const treesRecall = topic("python", "trees", [
  skill("tree-visit-lines", 2, { explain: "The three orders differ only in where the node itself is handled relative to the two recursive calls." }, [
    v("inorder-middle", "`root` is a tree of `TreeNode` objects and `out` collects values. Inside `dfs` below, write the line that records this node's value BETWEEN the two recursive calls (in-order).", TREE, "out ends up [4, 2, 1, 3]", "out.append(node.val)", "out == [4, 2, 1, 3]", {
      template: visit("    dfs(node.left)\n    {answer}\n    dfs(node.right)"),
    }),
    v("preorder-children", "`root` is a tree of `TreeNode` objects and `out` collects values. Inside `dfs` below this node is recorded first (pre-order). Write the two lines that visit the left subtree, then the right.", TREE, "out ends up [1, 2, 4, 3]", "dfs(node.left)\ndfs(node.right)", "out == [1, 2, 4, 3]", {
      template: visit("    out.append(node.val)\n    {answer}"),
    }),
    v("postorder-children", "`root` is a tree of `TreeNode` objects and `out` collects values. Inside `dfs` below this node is recorded last (post-order). Write the two lines that visit the left subtree, then the right.", TREE, "out ends up [4, 2, 3, 1]", "dfs(node.left)\ndfs(node.right)", "out == [4, 2, 3, 1]", {
      template: visit("    {answer}\n    out.append(node.val)"),
    }),
  ]),

  skill("tree-return-combined", 2, { explain: "Store the two subtree answers first; the return line then combines them with this node." }, [
    v("depth", "`root` is a tree of `TreeNode` objects. Inside `depth` below, `left` and `right` hold the depths of the two subtrees. Return 1 plus the larger of them.", TREE, "result ends up 3", "return 1 + max(left, right)", "result == 3", {
      template: treeFn("depth", "    if not node:\n        return 0\n    left = depth(node.left)\n    right = depth(node.right)\n    {answer}"),
    }),
    v("count", "`root` is a tree of `TreeNode` objects. Inside `count` below, `left` and `right` hold the node counts of the two subtrees. Return the count including this node.", TREE, "result ends up 4", "return 1 + left + right", "result == 4", {
      template: treeFn("count", "    if not node:\n        return 0\n    left = count(node.left)\n    right = count(node.right)\n    {answer}"),
    }),
    v("total", "`root` is a tree of `TreeNode` objects. Inside `total` below, `left` and `right` hold the sums of the two subtrees. Return the sum including this node's value.", TREE, "result ends up 10", "return node.val + left + right", "result == 10", {
      template: treeFn("total", "    if not node:\n        return 0\n    left = total(node.left)\n    right = total(node.right)\n    {answer}"),
    }),
    v("either", "`root` is a tree of `TreeNode` objects. Inside `has4` below, `left` and `right` say whether each subtree contains the value 4. Return True when either does.", TREE, "result ends up True", "return left or right", "result is True", {
      template: treeFn("has4", "    if not node:\n        return False\n    if node.val == 4:\n        return True\n    left = has4(node.left)\n    right = has4(node.right)\n    {answer}"),
    }),
  ]),
]);

export const itertoolsRecall = topic("python", "itertools", [
  skill("groupby-keys", 3, { explain: "groupby yields a (key, group) pair for each run of equal neighbours; it does not sort first." }, [
    v("string", "`groupby` is already imported and `s` is a string. Build the list of its runs' characters, one entry per run of equal neighbours. Call the pair `k`, `g`.", IT("groupby") + '\ns = "aabccc"', 'gives ["a", "b", "c"]', "[k for k, g in groupby(s)]", '_ == ["a", "b", "c"]'),
    v("list", "`groupby` is already imported and `nums` is a list. Build the list with neighbouring duplicates collapsed to one entry. Call the pair `k`, `g`.", IT("groupby") + "\nnums = [1, 1, 2, 1]", "gives [1, 2, 1]", "[k for k, g in groupby(nums)]", "_ == [1, 2, 1]", {
      explain: "Only neighbours are grouped, so the second run of 1 is a separate group.",
    }),
  ]),
]);

export const backtrackingRecall = topic("python", "backtracking", [
  skill("for-from-start", 2, { explain: "Starting the loop at `start` instead of 0 is what stops a combination being built twice in a different order." }, [
    v("choices", "`nums` is a list, `n` is its length and `start` is the first index still allowed. Write the `for` line that tries every index `j` from `start` to the end.", "nums = [5, 6, 7, 8]\nn = len(nums)\nstart = 1", "out ends up [1, 2, 3]", "for j in range(start, n):", "out == [1, 2, 3]", {
      template: "out = []\n{answer}\n    out.append(j)",
    }),
    v("ends", "`s` is a string, `n` is its length and `start` is where the next piece begins. Write the `for` line that tries every end index `end`, from one past `start` up to and including `n`.", 's = "abc"\nn = len(s)\nstart = 0', 'out ends up ["a", "ab", "abc"]', "for end in range(start + 1, n + 1):", 'out == ["a", "ab", "abc"]', {
      template: "out = []\n{answer}\n    out.append(s[start:end])",
      explain: "The end of a slice is not included, so it has to run one past the last index.",
    }),
  ]),
]);
