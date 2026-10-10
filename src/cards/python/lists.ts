import { skill, topic, v } from "../topic";
import { POINT } from "./given";

export const lists = topic("python", "lists", [
  // ---- create ----

  skill("list-literal", 1, { explain: "Square brackets make a list; items are separated by commas." }, [
    v("ints", "Create `nums`, a list holding the ints 1, 2 and 3.", "", "nums is [1, 2, 3]", "nums = [1, 2, 3]", "nums == [1, 2, 3]"),
    v("empty", "Create an empty list named `res`.", "", "res is []", "res = []", "res == [] and type(res) is list", {
      accepted: ["res = list()"],
    }),
    v("strs", 'Create `words`, a list holding the strings "hi" and "yo".', "", 'words is ["hi", "yo"]', 'words = ["hi", "yo"]', 'words == ["hi", "yo"]'),
    v("nested", "Create `grid`, a list of two rows: the first row holds 1 and 2, the second holds 3 and 4.", "", "grid is [[1, 2], [3, 4]]", "grid = [[1, 2], [3, 4]]", "grid == [[1, 2], [3, 4]]", {
      explain: "A 2D list is a list whose items are lists.",
    }),
    v("tuples", "Create `pairs`, a list holding the two tuples (1, 2) and (3, 4).", "", "pairs is [(1, 2), (3, 4)]", "pairs = [(1, 2), (3, 4)]", "pairs == [(1, 2), (3, 4)] and type(pairs[0]) is tuple", {
      explain: "Round brackets for each tuple, square brackets for the list around them.",
    }),
  ]),

  skill("list-repeat", 1, { explain: "[value] * n makes a list of n copies; safe for immutable values like ints, bools and None." }, [
    v("zeros", "`n` is an int. Make a list of `n` zeros.", "n = 3", "gives [0, 0, 0]", "[0] * n", "_ == [0, 0, 0]"),
    v("false", "`n` is an int. Create `seen`, a list of `n` False values.", "n = 3", "seen is [False, False, False]", "seen = [False] * n", "seen == [False, False, False]"),
    v("none", "`n` is an int. Create `slots`, a list of `n` None values.", "n = 2", "slots is [None, None]", "slots = [None] * n", "slots == [None, None]"),
    v("inf", "`n` is an int. Create `dist`, a list of `n` copies of positive infinity.", "n = 2", "dist is [inf, inf]", 'dist = [float("inf")] * n', 'dist == [float("inf")] * 2', {
      explain: 'float("inf") is larger than any number, the usual start for shortest distances.',
    }),
    v("n-plus-1", "`n` is an int. Create `dp`, a list of zeros with one more slot than `n`, so that index `n` is valid.", "n = 3", "dp is [0, 0, 0, 0]", "dp = [0] * (n + 1)", "dp == [0, 0, 0, 0]", {
      explain: "The parentheses matter: [0] * n + 1 is an error.",
    }),
  ]),

  skill("list-from", 1, { explain: "list() turns any iterable into a list." }, [
    v("range", "`n` is an int. Make the list of ints from 0 up to `n - 1`.", "n = 4", "gives [0, 1, 2, 3]", "list(range(n))", "_ == [0, 1, 2, 3]", {
      explain: "range is lazy; wrap it in list() to get an actual list.",
    }),
    v("range-1-n", "`n` is an int. Make the list of ints from 1 through `n`, including `n`.", "n = 4", "gives [1, 2, 3, 4]", "list(range(1, n + 1))", "_ == [1, 2, 3, 4]"),
    v("str", "`s` is a string. Turn it into a list of its characters.", 's = "abc"', 'gives ["a", "b", "c"]', "list(s)", '_ == ["a", "b", "c"]', {
      explain: "list() iterates the string one character at a time.",
    }),
    v("tuple", "`t` is a tuple. Turn it into a list so it can be changed.", "t = (1, 2)", "gives [1, 2]", "list(t)", "_ == [1, 2] and type(_) is list"),
    v("set-sorted", "`seen` is a set. Get its items as a sorted list.", "seen = {3, 1, 2}", "gives [1, 2, 3]", "sorted(seen)", "_ == [1, 2, 3]", {
      explain: "sorted() always returns a list, whatever it is given.",
    }),
  ]),

  // ---- read ----

  skill("list-index", 1, { explain: "Indexes start at 0; negative indexes count back from the end." }, [
    v("first", "`nums` is a list. Get its first item.", "nums = [5, 6, 7]", "gives 5", "nums[0]", "_ == 5"),
    v("last", "`nums` is a list. Get its last item without removing it.", "nums = [5, 6, 7]", "gives 7", "nums[-1]", "_ == 7", {
      accepted: ["nums[len(nums) - 1]"],
      explain: "nums[-1] is the last item; no need for len(nums) - 1.",
    }),
    v("second-last", "`nums` is a list. Get the item just before the last one.", "nums = [5, 6, 7]", "gives 6", "nums[-2]", "_ == 6"),
    v("at-i", "`nums` is a list and `i` is an index. Get the item at that index.", "nums = [5, 6, 7]\ni = 1", "gives 6", "nums[i]", "_ == 6"),
    v("middle", "`nums` is a list. Get its middle item.", "nums = [5, 6, 7]", "gives 6", "nums[len(nums) // 2]", "_ == 6", {
      explain: "Use // so the index is an int; / gives a float and raises TypeError.",
    }),
    v("grid-cell", "`grid` is a list of lists. Get the value at row `r`, column `c`.", "grid = [[1, 2], [3, 4]]\nr = 1\nc = 0", "gives 3", "grid[r][c]", "_ == 3", {
      explain: "Row first, then column: grid[r][c], not grid[r, c].",
    }),
    v("grid-bottom-right", "`grid` is a list of lists. Get the value in its bottom-right corner.", "grid = [[1, 2], [3, 4]]", "gives 4", "grid[-1][-1]", "_ == 4"),
    v("pair-part", "`pairs` is a list of 2-value tuples and `i` is an index. Get the second value of the tuple at that index.", "pairs = [(1, 2), (3, 4)]\ni = 1", "gives 4", "pairs[i][1]", "_ == 4"),
    v("object-field", "`points` is a list of `Point` objects. Get the `x` field of the first one.", POINT + "\npoints = [Point(7, 8), Point(1, 2)]", "gives 7", "points[0].x", "_ == 7"),
  ]),

  skill("list-len", 1, { explain: "len() is a function, not a method or a .length field." }, [
    v("length", "`nums` is a list. Get how many items it has.", "nums = [5, 6, 7]", "gives 3", "len(nums)", "_ == 3"),
    v("last-index", "`nums` is a list. Get the index of its last item.", "nums = [5, 6, 7]", "gives 2", "len(nums) - 1", "_ == 2"),
    v("is-empty", "`nums` is a list. Write an expression that is True when it has no items.", "nums = []", "gives True", "not nums", "_ is True", {
      accepted: ["len(nums) == 0"],
      explain: "An empty list is falsy, so `not nums` is the idiomatic test.",
    }),
    v("if-nonempty", "`nums` is a list. Write the `if` line whose block runs only when the list has at least one item.", "nums = [1]", 'out ends up "has items"', "if nums:", 'out == "has items"', {
      template: 'out = "empty"\n{answer}\n    out = "has items"',
      accepted: ["if len(nums) > 0:"],
      explain: "A non-empty list is truthy; no comparison needed.",
    }),
    v("grid-columns", "`grid` is a list of lists. Get how many columns it has.", "grid = [[1, 2, 3], [4, 5, 6]]", "gives 3", "len(grid[0])", "_ == 3", {
      explain: "len(grid) is the number of rows; the columns are the length of one row.",
    }),
  ]),

  skill("list-in", 1, { explain: "`in` scans the list from the start, so it is O(n); use a set for many lookups." }, [
    v("in", "`nums` is a list. Write an expression that is True when `x` is one of its items.", "nums = [5, 6, 7]\nx = 6", "gives True", "x in nums", "_ is True"),
    v("not-in", "`path` is a list. Write an expression that is True when `x` is NOT one of its items.", "path = [5, 6]\nx = 9", "gives True", "x not in path", "_ is True", {
      explain: "`not in` is one lowercase operator.",
    }),
  ]),

  skill("list-find", 2, { explain: "index() gives the position of the first match and raises ValueError when there is none." }, [
    v("index", "`nums` is a list. Get the index of the first item equal to `x`.", "nums = [5, 6, 7, 6]\nx = 6", "gives 1", "nums.index(x)", "_ == 1"),
    v("count", "`nums` is a list. Get how many items are equal to `x`.", "nums = [5, 6, 7, 6]\nx = 6", "gives 2", "nums.count(x)", "_ == 2", {
      explain: "count() is a method on the list; len() is the total size.",
    }),
    v("index-or-minus-1", "`nums` is a list and `x` might not be in it. In one expression, get the index of `x`, or -1 when it is missing.", "nums = [5, 6, 7]\nx = 9", "gives -1", "nums.index(x) if x in nums else -1", "_ == -1", {
      explain: "Lists have no find(); guard index() with an `in` test.",
    }),
  ]),

  skill("list-aggregate", 1, { explain: "sum, min and max are built-in functions that take the list as an argument." }, [
    v("sum", "`nums` is a list of numbers. Get their total.", "nums = [1, 2, 3, 4]", "gives 10", "sum(nums)", "_ == 10"),
    v("min", "`nums` is a list of numbers. Get the smallest.", "nums = [4, 1, 9]", "gives 1", "min(nums)", "_ == 1"),
    v("max", "`nums` is a list of numbers. Get the largest.", "nums = [4, 1, 9]", "gives 9", "max(nums)", "_ == 9"),
    v("average", "`nums` is a list of numbers. Get their average.", "nums = [1, 2, 3, 4]", "gives 2.5", "sum(nums) / len(nums)", "_ == 2.5", {
      explain: "There is no built-in average; / keeps the fraction, // would drop it.",
    }),
    v("index-of-max", "`nums` is a list of numbers. Get the index of the largest one.", "nums = [4, 9, 1]", "gives 1", "nums.index(max(nums))", "_ == 1"),
    v("max-default", "`nums` is a list that may be empty. Get the largest item, or 0 when there are none.", "nums = []", "gives 0", "max(nums, default=0)", "_ == 0", {
      explain: "max() of an empty list raises ValueError unless default= is given.",
    }),
    v("longest-word", "`words` is a list of strings. Get the longest one.", 'words = ["hi", "hello", "yo"]', 'gives "hello"', "max(words, key=len)", '_ == "hello"', {
      explain: "key=len ranks by length; pass len itself, not len().",
    }),
    v("total-length", "`words` is a list of strings. Get the total number of characters across all of them. Call each string `w`.", 'words = ["hi", "hello"]', "gives 7", "sum(len(w) for w in words)", "_ == 7", {
      explain: "A generator expression inside sum() needs no extra brackets.",
    }),
    v("any", "`nums` is a list of numbers. Write an expression that is True when at least one item is negative. Call each item `x`.", "nums = [3, -1, 2]", "gives True", "any(x < 0 for x in nums)", "_ is True", {
      explain: "any() is True as soon as one item passes.",
    }),
    v("all", "`nums` is a list of numbers. Write an expression that is True only when every item is above 0. Call each item `x`.", "nums = [3, 1, 2]", "gives True", "all(x > 0 for x in nums)", "_ is True", {
      explain: "all() is True only if no item fails (and True for an empty list).",
    }),
  ]),

  // ---- change ----

  skill("list-append", 1, { explain: "append takes exactly one argument, adds it at the end, and returns None." }, [
    v("value", "`a` is a list. Add `x` to the end of it.", "a = [1, 2]\nx = 3", "a becomes [1, 2, 3]", "a.append(x)", "a == [1, 2, 3]"),
    v("tuple", "`res` is a list of tuples. Add the pair made of `i` and `x` to the end, as one tuple.", "res = []\ni = 0\nx = 5", "res becomes [(0, 5)]", "res.append((i, x))", "res == [(0, 5)]", {
      explain: "Double parentheses: the tuple is the single argument.",
    }),
    v("copy-of-path", "`res` is a list of results and `path` is a list that will keep changing. Add a COPY of `path` to `res`.", "res = []\npath = [1, 2]", "res becomes [[1, 2]], holding a separate copy", "res.append(path[:])", "res == [[1, 2]] and res[0] is not path", {
      accepted: ["res.append(path.copy())", "res.append(list(path))"],
      explain: "Appending plain `path` stores a reference that later pops will empty.",
    }),
    v("new-row", "`grid` is a list of lists. Add a new empty row to the end of it.", "grid = [[1]]", "grid becomes [[1], []]", "grid.append([])", "grid == [[1], []]"),
    v("to-row", "`grid` is a list of lists. Add `x` to the end of its last row.", "grid = [[1], [2]]\nx = 3", "grid becomes [[1], [2, 3]]", "grid[-1].append(x)", "grid == [[1], [2, 3]]"),
  ]),

  skill("list-extend", 2, { explain: "extend adds each item of another list; append would add the whole list as one item." }, [
    v("extend", "`a` and `b` are lists. Add every item of `b` to the end of `a`, in place.", "a = [1, 2]\nb = [3, 4]", "a becomes [1, 2, 3, 4]", "a.extend(b)", "a == [1, 2, 3, 4]", {
      accepted: ["a += b"],
    }),
    v("append-nests", "`a` and `b` are lists. Add `b` to the end of `a` as ONE nested item.", "a = [1, 2]\nb = [3, 4]", "a becomes [1, 2, [3, 4]]", "a.append(b)", "a == [1, 2, [3, 4]]", {
      explain: "append always adds exactly one item, even when that item is a list.",
    }),
    v("concat-new", "`a` and `b` are lists. Create `c`, a new list with the items of `a` followed by the items of `b`, leaving both unchanged.", "a = [1, 2]\nb = [3]", "c is [1, 2, 3], and a stays [1, 2]", "c = a + b", "c == [1, 2, 3] and a == [1, 2]", {
      explain: "+ builds a new list; extend and += change the left one.",
    }),
    v("repeat", "`a` is a list. Get a new list that is `a` repeated twice.", "a = [1, 2]", "gives [1, 2, 1, 2]", "a * 2", "_ == [1, 2, 1, 2]", {
      accepted: ["a + a"],
      explain: "* repeats the list; it does not multiply the numbers inside.",
    }),
  ]),

  skill("list-insert", 2, { explain: "insert(index, value): index first. Everything after shifts right, so it is O(n)." }, [
    v("at-i", "`a` is a list. Insert the value `val` at index `i`, pushing the rest to the right.", "a = [1, 2, 3]\ni = 1\nval = 9", "a becomes [1, 9, 2, 3]", "a.insert(i, val)", "a == [1, 9, 2, 3]"),
    v("front", "`a` is a list. Put `x` at the very front of it.", "a = [2, 3]\nx = 1", "a becomes [1, 2, 3]", "a.insert(0, x)", "a == [1, 2, 3]", {
      explain: "There is no prepend or appendleft on a list; insert at index 0.",
    }),
  ]),

  skill("list-pop", 1, { explain: "pop removes an item and returns it; with no argument it takes the last one." }, [
    v("last", "`a` is a list. Remove its last item and get that item back.", "a = [1, 2, 3]", "gives 3, and a becomes [1, 2]", "a.pop()", "_ == 3 and a == [1, 2]"),
    v("at-i", "`a` is a list. Remove the item at index `i` and get that item back.", "a = [1, 2, 3]\ni = 1", "gives 2, and a becomes [1, 3]", "a.pop(i)", "_ == 2 and a == [1, 3]"),
    v("first", "`a` is a list. Remove its first item and get that item back.", "a = [1, 2, 3]", "gives 1, and a becomes [2, 3]", "a.pop(0)", "_ == 1 and a == [2, 3]", {
      explain: "pop(0) shifts every other item, so it is O(n); use a deque for a real queue.",
    }),
    v("store", "`stack` is a list used as a stack. Remove its top item and store it in `top`.", "stack = [1, 2, 3]", "top is 3, and stack becomes [1, 2]", "top = stack.pop()", "top == 3 and stack == [1, 2]"),
  ]),

  skill("list-remove", 2, { explain: "remove(x) deletes by value (first match only); del a[i] deletes by position." }, [
    v("by-value", "`a` is a list. Remove the first item that is equal to `x`.", "a = [5, 6, 5]\nx = 5", "a becomes [6, 5]", "a.remove(x)", "a == [6, 5]", {
      explain: "remove takes a value, not an index, and raises ValueError if it is missing.",
    }),
    v("by-index", "`a` is a list. Delete the item at index `i` without needing its value.", "a = [5, 6, 7]\ni = 1", "a becomes [5, 7]", "del a[i]", "a == [5, 7]", {
      accepted: ["a.pop(i)"],
    }),
    v("clear", "`a` is a list and `alias` is another name for the same list. Empty the list so that `alias` sees it empty too.", "a = [1, 2]\nalias = a", "a and alias both show []", "a.clear()", "alias == [] and alias is a", {
      accepted: ["del a[:]", "a[:] = []"],
      explain: "a = [] would only rebind the name a; the original list would keep its items.",
    }),
  ]),

  skill("list-set", 1, { explain: "Assign to an index to replace that item in place." }, [
    v("at-i", "`a` is a list. Replace the item at index `i` with `x`.", "a = [1, 2, 3]\ni = 1\nx = 9", "a becomes [1, 9, 3]", "a[i] = x", "a == [1, 9, 3]"),
    v("last", "`a` is a list. Replace its last item with `x`.", "a = [1, 2, 3]\nx = 9", "a becomes [1, 2, 9]", "a[-1] = x", "a == [1, 2, 9]"),
    v("grid-cell", "`grid` is a list of lists. Set the cell at row `r`, column `c` to 0.", "grid = [[1, 2], [3, 4]]\nr = 0\nc = 1", "grid becomes [[1, 0], [3, 4]]", "grid[r][c] = 0", "grid == [[1, 0], [3, 4]]"),
    v("increment", "`counts` is a list of ints. Add 1 to the item at index `i`.", "counts = [0, 0, 0]\ni = 2", "counts becomes [0, 0, 1]", "counts[i] += 1", "counts == [0, 0, 1]"),
    v("swap", "`a` is a list. Swap the items at indexes `i` and `j` in one line.", "a = [1, 2, 3]\ni = 0\nj = 2", "a becomes [3, 2, 1]", "a[i], a[j] = a[j], a[i]", "a == [3, 2, 1]", {
      explain: "The right side is evaluated first, so no temp variable is needed.",
    }),
  ]),

  skill("list-reorder", 1, { explain: "sort() and reverse() change the list in place and return None." }, [
    v("reverse", "`a` is a list and `alias` is another name for it. Reverse the list in place, so `alias` sees it reversed.", "a = [1, 2, 3]\nalias = a", "a and alias both show [3, 2, 1]", "a.reverse()", "alias == [3, 2, 1]", {
      accepted: ["a[:] = a[::-1]"],
    }),
    v("sort", "`a` is a list of numbers. Sort it in place, smallest first.", "a = [3, 1, 2]", "a becomes [1, 2, 3]", "a.sort()", "a == [1, 2, 3]"),
    v("sort-desc", "`a` is a list of numbers. Sort it in place, largest first.", "a = [1, 3, 2]", "a becomes [3, 2, 1]", "a.sort(reverse=True)", "a == [3, 2, 1]", {
      explain: "reverse=True is a keyword argument, with a capital T.",
    }),
    v("sorted-copy", "`nums` is an unsorted list. Store a sorted copy in a new variable `res`, leaving `nums` unchanged.", "nums = [3, 1, 2]", "res is [1, 2, 3], and nums stays [3, 1, 2]", "res = sorted(nums)", "res == [1, 2, 3] and nums == [3, 1, 2]", {
      explain: "res = nums.sort() would set res to None.",
    }),
  ]),

  skill("list-copy", 2, { explain: "Assignment never copies a list; it gives the same list a second name." }, [
    v("shallow", "`path` is a list. Make a separate copy of it, so later changes to `path` do not affect the copy.", "path = [1, 2]", "gives a new list [1, 2]", "path[:]", "_ == path and _ is not path", {
      accepted: ["list(path)", "path.copy()"],
    }),
    v("alias", "`a` is a list. Create `b` as a second NAME for the very same list, not a copy.", "a = [1, 2]", "b is the same list object as a", "b = a", "b is a", {
      explain: "After b = a, changing b also changes a.",
    }),
    v("copy-rows", "`grid` is a list of lists. Create `g2`, a copy in which every row is also a separate copy. Call each row `row`.", "grid = [[1, 2], [3, 4]]", "g2 equals grid but shares no rows with it", "g2 = [row[:] for row in grid]", "g2 == grid and g2 is not grid and g2[0] is not grid[0]", {
      accepted: ["g2 = [list(row) for row in grid]", "g2 = [row.copy() for row in grid]"],
      explain: "grid[:] copies only the outer list; the rows inside would still be shared.",
    }),
  ]),

  skill("list-grid-build", 2, { explain: "[[0] * cols] * rows repeats the SAME row object, so one write changes every row." }, [
    v("zeros", "`rows` and `cols` are ints. Create `grid`, a 2D list of zeros with `rows` rows and `cols` columns, where every row is its own list.", "rows = 2\ncols = 3", "grid is [[0, 0, 0], [0, 0, 0]]", "grid = [[0] * cols for _ in range(rows)]", "grid == [[0, 0, 0], [0, 0, 0]] and grid[0] is not grid[1]"),
    v("visited", "`rows` and `cols` are ints. Create `visited`, a 2D list of False values with `rows` rows and `cols` columns, where every row is its own list.", "rows = 2\ncols = 2", "visited is [[False, False], [False, False]]", "visited = [[False] * cols for _ in range(rows)]", "visited == [[False, False], [False, False]] and visited[0] is not visited[1]"),
  ]),

  skill("list-comprehension", 2, { explain: "Comprehension: [expression for item in iterable]." }, [
    v("squares", "`a` is a list of numbers. Build a new list with every item squared. Call each item `x`.", "a = [1, 2, 3]", "gives [1, 4, 9]", "[x * x for x in a]", "_ == [1, 4, 9]", {
      accepted: ["[x ** 2 for x in a]"],
    }),
    v("filter", "`a` is a list of numbers. Build a new list holding only the even items. Call each item `x`.", "a = [1, 2, 3, 4]", "gives [2, 4]", "[x for x in a if x % 2 == 0]", "_ == [2, 4]", {
      explain: "The filter goes at the end: [x for x in a if condition].",
    }),
    v("lengths", "`words` is a list of strings. Build a list of the length of each one. Call each string `w`.", 'words = ["hi", "hello"]', "gives [2, 5]", "[len(w) for w in words]", "_ == [2, 5]", {
      accepted: ["list(map(len, words))"],
    }),
  ]),
]);
