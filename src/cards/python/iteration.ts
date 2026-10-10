import { skill, topic, v } from "../topic";
import { POINT } from "./given";

export const iteration = topic("python", "iteration", [
  skill("zip-build", 2, { explain: "zip pairs items by position, stops at the shortest input, and is lazy until wrapped in list()." }, [
    v("three-lists", "`a`, `b` and `c` are lists of the same length. Get a list of 3-value tuples grouping them by position.", "a = [1, 2]\nb = [3, 4]\nc = [5, 6]", "gives [(1, 3, 5), (2, 4, 6)]", "list(zip(a, b, c))", "_ == [(1, 3, 5), (2, 4, 6)]"),
    v("unequal", "`xs` has three items and `ys` has two. Pair them by position into a list of tuples and see what happens to the extra item.", "xs = [1, 2, 3]\nys = [7, 8]", "gives [(1, 7), (2, 8)]: the unmatched 3 is dropped", "list(zip(xs, ys))", "_ == [(1, 7), (2, 8)]", {
      explain: "zip silently stops at the shorter input.",
    }),
    v("strings", "`s` and `t` are strings. Get a list of tuples pairing their characters by position.", 's = "ab"\nt = "xy"', 'gives [("a", "x"), ("b", "y")]', "list(zip(s, t))", '_ == [("a", "x"), ("b", "y")]'),
    v("value-index", "`nums` is a list. Build a list of (value, index) tuples, value first, so that sorting it sorts by value but remembers where each came from. Use `i` and `x`.", "nums = [30, 10]", "gives [(30, 0), (10, 1)]", "[(x, i) for i, x in enumerate(nums)]", "_ == [(30, 0), (10, 1)]", {
      accepted: ["list(zip(nums, range(len(nums))))"],
    }),
    v("adjacent-pairs", "`nums` is a list. Get a list of tuples of each item with the item right after it.", "nums = [1, 4, 9]", "gives [(1, 4), (4, 9)]", "list(zip(nums, nums[1:]))", "_ == [(1, 4), (4, 9)]", {
      explain: "Zipping a list with itself shifted by one gives every adjacent pair.",
    }),
  ]),

  skill("zip-star", 2, { explain: "zip(*rows) regroups by position: the first of every row, then the second of every row, and so on." }, [
    v("columns", "`grid` is a list of lists. Get its columns, as a list of tuples.", "grid = [[1, 2, 3], [4, 5, 6]]", "gives [(1, 4), (2, 5), (3, 6)]", "list(zip(*grid))", "_ == [(1, 4), (2, 5), (3, 6)]"),
    v("transpose", "`grid` is a list of lists. Get its transpose as a list of LISTS. Call each column `col`.", "grid = [[1, 2], [3, 4]]", "gives [[1, 3], [2, 4]]", "[list(col) for col in zip(*grid)]", "_ == [[1, 3], [2, 4]]", {
      accepted: ["list(map(list, zip(*grid)))"],
      explain: "zip yields tuples, so each column is converted with list().",
    }),
    v("column-sums", "`grid` is a list of lists of numbers. Get a list of the sum of each column. Call each column `col`.", "grid = [[1, 2], [3, 4]]", "gives [4, 6]", "[sum(col) for col in zip(*grid)]", "_ == [4, 6]", {
      accepted: ["list(map(sum, zip(*grid)))"],
    }),
    v("common-prefix-columns", "`words` is a list of strings. Get a list of tuples, each holding the characters at the same position across all the words.", 'words = ["ab", "ac"]', 'gives [("a", "a"), ("b", "c")]', "list(zip(*words))", '_ == [("a", "a"), ("b", "c")]', {
      explain: "The star spreads the list so each string is a separate argument to zip.",
    }),
  ]),

  skill("zip-sort-together", 3, { explain: "To sort two parallel lists together, zip them, sort the pairs, and unzip." }, [
    v("sort-pairs", "`position` and `speed` are parallel lists. Create `cars`, a list of (position, speed) tuples sorted by position.", "position = [10, 0, 5]\nspeed = [2, 4, 1]", "cars is [(0, 4), (5, 1), (10, 2)]", "cars = sorted(zip(position, speed))", "cars == [(0, 4), (5, 1), (10, 2)]", {
      explain: "sorted accepts the zip directly and compares the tuples by their first value.",
    }),
    v("sort-desc", "`position` and `speed` are parallel lists. Create `cars`, a list of (position, speed) tuples sorted by position, largest first.", "position = [10, 0, 5]\nspeed = [2, 4, 1]", "cars is [(10, 2), (5, 1), (0, 4)]", "cars = sorted(zip(position, speed), reverse=True)", "cars == [(10, 2), (5, 1), (0, 4)]"),
    v("split-back", "`pairs` is a sorted list of (name, score) tuples. Split it back into `names` and `scores`.", 'pairs = [("a", 3), ("b", 7)]', 'names is ("a", "b"), scores is (3, 7)', "names, scores = zip(*pairs)", 'tuple(names) == ("a", "b") and tuple(scores) == (3, 7)'),
    v("sort-by-other", "`names` and `scores` are parallel lists. Get the names ordered by their score, lowest first. Use `s` for the score and `n` for the name.", 'names = ["a", "b", "c"]\nscores = [7, 3, 5]', 'gives ["b", "c", "a"]', "[n for s, n in sorted(zip(scores, names))]", '_ == ["b", "c", "a"]', {
      explain: "Put the sort key first in the zip, then keep only the other part.",
    }),
  ]),

  skill("zip-compare", 2, { explain: "A generator over zip, fed to sum, all or any, compares two sequences position by position." }, [
    v("count-diff", "`s` and `t` are strings of the same length. Count the positions at which they differ. Use `a` and `b` for the two characters.", 's = "abcd"\nt = "abxy"', "gives 2", "sum(a != b for a, b in zip(s, t))", "_ == 2", {
      accepted: ["sum(1 for a, b in zip(s, t) if a != b)"],
    }),
    v("is-sorted", "`nums` is a list. Write an expression that is True when it is in non-decreasing order. Use `a` and `b` for neighbouring items.", "nums = [1, 2, 2, 5]", "gives True", "all(a <= b for a, b in zip(nums, nums[1:]))", "_ is True", {
      accepted: ["nums == sorted(nums)"],
    }),
    v("max-gap", "`nums` is a sorted list. Get the largest difference between neighbouring items. Use `a` and `b` for neighbouring items.", "nums = [1, 4, 9]", "gives 5", "max(b - a for a, b in zip(nums, nums[1:]))", "_ == 5"),
    v("dot-product", "`xs` and `ys` are lists of numbers of the same length. Get the sum of the products of items at the same position. Use `a` and `b`.", "xs = [1, 2]\nys = [3, 4]", "gives 11", "sum(a * b for a, b in zip(xs, ys))", "_ == 11"),
  ]),

  skill("zip-objects", 3, { explain: "zip does not care what it pairs; unpack each pair and use the object's fields as usual." }, [
    v("build-objects", "`xs` and `ys` are parallel lists of coordinates. Build a list of `Point` objects from them. Use `x` and `y`.", POINT + "\nxs = [1, 3]\nys = [2, 4]", "gives two Points: (1, 2) and (3, 4)", "[Point(x, y) for x, y in zip(xs, ys)]", "[(p.x, p.y) for p in _] == [(1, 2), (3, 4)]"),
    v("pair-with-field", "`names` is a list of strings and `points` is a parallel list of `Point` objects. Build a list of (name, x) tuples. Use `n` for the name and `p` for the point.", POINT + '\nnames = ["a", "b"]\npoints = [Point(1, 2), Point(3, 4)]', 'gives [("a", 1), ("b", 3)]', "[(n, p.x) for n, p in zip(names, points)]", '_ == [("a", 1), ("b", 3)]'),
    v("fields-to-lists", "`points` is a list of `Point` objects. Split it into `xs`, all the x fields, and `ys`, all the y fields, in one line. Call each point `p`.", POINT + "\npoints = [Point(1, 2), Point(3, 4)]", "xs is (1, 3), ys is (2, 4)", "xs, ys = zip(*[(p.x, p.y) for p in points])", "tuple(xs) == (1, 3) and tuple(ys) == (2, 4)", {
      accepted: ["xs, ys = zip(*((p.x, p.y) for p in points))"],
    }),
  ]),

  skill("zip-longest", 3, { explain: "zip_longest keeps going to the end of the longest input, filling the gaps with fillvalue." }, [
    v("fill-zero", "`a` is longer than `b`. Pair them by position WITHOUT dropping the extra item, filling the gap with 0. Include the import.", "a = [1, 2, 3]\nb = [7]", "gives [(1, 7), (2, 0), (3, 0)]", "from itertools import zip_longest\nlist(zip_longest(a, b, fillvalue=0))", "_ == [(1, 7), (2, 0), (3, 0)]"),
  ]),

  skill("enumerate-use", 2, { explain: "enumerate(iterable, start) yields (count, item) tuples." }, [
    v("numbered", "`words` is a list of strings. Get a list of (number, word) tuples with the numbering starting at 1.", 'words = ["a", "b"]', 'gives [(1, "a"), (2, "b")]', "list(enumerate(words, 1))", '_ == [(1, "a"), (2, "b")]', {
      accepted: ["list(enumerate(words, start=1))"],
    }),
    v("sorted-with-index", "`nums` is a list. Get a list of (value, original index) tuples sorted by value. Use `i` and `x`.", "nums = [30, 10, 20]", "gives [(10, 1), (20, 2), (30, 0)]", "sorted((x, i) for i, x in enumerate(nums))", "_ == [(10, 1), (20, 2), (30, 0)]", {
      accepted: ["sorted([(x, i) for i, x in enumerate(nums)])"],
    }),
    v("last-index-of-each", "`s` is a string. Build a dictionary mapping each character `c` to the LAST index `i` at which it appears.", 's = "abca"', 'gives {"a": 3, "b": 1, "c": 2}', "{c: i for i, c in enumerate(s)}", '_ == {"a": 3, "b": 1, "c": 2}', {
      explain: "Later entries overwrite earlier ones, so each key ends up with its last index.",
    }),
  ]),

  skill("map-use", 2, { explain: "map(function, iterable) applies the function to every item; the function is passed without parentheses." }, [
    v("lambda", "`nums` is a list of numbers. Using `map` and an inline function of `x`, get a list with each item doubled.", "nums = [1, 2, 3]", "gives [2, 4, 6]", "list(map(lambda x: x * 2, nums))", "_ == [2, 4, 6] and type(_) is list"),
    v("method", "`words` is a list of strings. Using `map`, get a list of each one in uppercase.", 'words = ["hi", "yo"]', 'gives ["HI", "YO"]', "list(map(str.upper, words))", '_ == ["HI", "YO"] and type(_) is list', {
      explain: "A method can be passed through its class: str.upper.",
    }),
    v("line-to-ints", "`line` is a string of whole numbers separated by spaces. Get them as a list of ints.", 'line = "3 14 15"', "gives [3, 14, 15]", "list(map(int, line.split()))", "_ == [3, 14, 15]", {
      accepted: ["[int(x) for x in line.split()]"],
    }),
    v("unpack-two", "`line` is a string holding two whole numbers separated by a space. Read them into the int variables `a` and `b` in one line.", 'line = "3 14"', "a is 3, b is 14", "a, b = map(int, line.split())", "(a, b) == (3, 14)", {
      explain: "A map can be unpacked directly; no list() needed.",
    }),
    v("sum-of-map", "`words` is a list of strings. Using `map`, get the total of their lengths.", 'words = ["hi", "hello"]', "gives 7", "sum(map(len, words))", "_ == 7", {
      accepted: ["sum(len(w) for w in words)"],
    }),
    v("two-iterables", "`xs` and `ys` are lists of the same length. Using `map` with the built-in `max`, get a list of the larger item at each position.", "xs = [1, 9]\nys = [5, 2]", "gives [5, 9]", "list(map(max, xs, ys))", "_ == [5, 9]", {
      accepted: ["[max(a, b) for a, b in zip(xs, ys)]"],
      explain: "With several iterables, map passes one item from each to the function.",
    }),
  ]),

  skill("filter-use", 2, { explain: "filter(function, iterable) keeps the items for which the function is truthy; like map, it is lazy." }, [
    v("lambda", "`nums` is a list of numbers. Using `filter` and an inline function of `x`, get a list of only the items above 0.", "nums = [3, -1, 2]", "gives [3, 2]", "list(filter(lambda x: x > 0, nums))", "_ == [3, 2] and type(_) is list"),
    v("digits-only", "`s` is a string. Using `filter`, build a string holding only its digit characters.", 's = "a1b22"', 'gives "122"', '"".join(filter(str.isdigit, s))', '_ == "122"', {
      accepted: ['"".join(c for c in s if c.isdigit())'],
    }),
    v("drop-falsy", "`items` is a list containing some empty strings and None values. Get a list with every falsy item removed.", 'items = ["a", "", None, "b"]', 'gives ["a", "b"]', "list(filter(None, items))", '_ == ["a", "b"]', {
      accepted: ["[x for x in items if x]"],
      explain: "filter(None, ...) keeps the truthy items.",
    }),
  ]),

  skill("reversed-use", 2, { explain: "reversed() returns an iterator, not a list or string; convert it if you need one." }, [
    v("to-list", "`a` is a list. Using `reversed`, get a new reversed list, leaving `a` unchanged.", "a = [1, 2, 3]", "gives [3, 2, 1], and a stays [1, 2, 3]", "list(reversed(a))", "_ == [3, 2, 1] and a == [1, 2, 3]", {
      accepted: ["a[::-1]"],
    }),
    v("to-string", "`s` is a string. Using `reversed`, get the reversed string.", 's = "abc"', 'gives "cba"', '"".join(reversed(s))', '_ == "cba"', {
      accepted: ["s[::-1]"],
      explain: 'reversed(s) is an iterator of characters; "".join turns it back into a string.',
    }),
  ]),

  skill("any-all", 2, { explain: "any stops at the first truthy item and all stops at the first falsy one." }, [
    v("any-in-set", "`nums` is a list and `seen` is a set. Write an expression that is True when at least one item of `nums` is in `seen`. Call each item `x`.", "nums = [4, 5, 6]\nseen = {6, 9}", "gives True", "any(x in seen for x in nums)", "_ is True"),
    v("all-same", "`s` is a non-empty string. Write an expression that is True when every character equals the first one. Call each character `c`.", 's = "aaa"', "gives True", "all(c == s[0] for c in s)", "_ is True", {
      accepted: ["len(set(s)) == 1"],
    }),
    v("grid-has-zero", "`grid` is a list of lists. Write an expression that is True when any row contains a 0. Call each row `row`.", "grid = [[1, 2], [0, 4]]", "gives True", "any(0 in row for row in grid)", "_ is True"),
    v("all-visited", "`visited` is a list of booleans. Write an expression that is True when every one of them is True.", "visited = [True, True, True]", "gives True", "all(visited)", "_ is True", {
      explain: "all() and any() accept a list of booleans directly.",
    }),
  ]),

  skill("min-max-key", 2, { explain: "key= changes how items are ranked; the original item is still what gets returned." }, [
    v("closest-to-zero", "`nums` is a list of numbers. Get the item closest to zero.", "nums = [-7, 2, -1, 5]", "gives -1", "min(nums, key=abs)", "_ == -1"),
    v("closest-to-target", "`nums` is a list of numbers and `target` is a number. Get the item closest to `target`. Call each item `x`.", "nums = [1, 6, 10]\ntarget = 7", "gives 6", "min(nums, key=lambda x: abs(x - target))", "_ == 6"),
    v("index-of-min", "`nums` is a list. Get the INDEX of its smallest item, using `min` over the indexes. Call each index `i`.", "nums = [4, 1, 9]", "gives 1", "min(range(len(nums)), key=lambda i: nums[i])", "_ == 1", {
      accepted: ["nums.index(min(nums))"],
    }),
    v("longest-then-alpha", "`words` is a list of strings. Get the longest one; among equally long words, the alphabetically last. Call each string `w`.", 'words = ["bb", "aa", "c"]', 'gives "bb"', "max(words, key=lambda w: (len(w), w))", '_ == "bb"', {
      explain: "A tuple key ranks by its first part and breaks ties with the next.",
    }),
    v("three-values", "`a`, `b` and `c` are numbers. Get the smallest of the three.", "a = 4\nb = 1\nc = 9", "gives 1", "min(a, b, c)", "_ == 1", {
      explain: "min and max take either one iterable or several separate arguments.",
    }),
  ]),

  skill("iter-next", 3, { explain: "next(iterator, default) takes one item, or gives the default when there are none left." }, [
    v("first-match", "`nums` is a list. Get the first item above 2, or None when there is none. Call each item `x`.", "nums = [1, 2, 5, 9]", "gives 5", "next((x for x in nums if x > 2), None)", "_ == 5", {
      explain: "The generator needs its own parentheses because next takes a second argument.",
    }),
    v("no-match", "`nums` is a list with no item above 100. Get the first item above 100, or -1 when there is none. Call each item `x`.", "nums = [1, 2, 5]", "gives -1", "next((x for x in nums if x > 100), -1)", "_ == -1"),
    v("manual-step", "`it` is an iterator over a list. Take the next item from it and store it in `x`.", "it = iter([7, 8, 9])", "x is 7", "x = next(it)", "x == 7 and list(it) == [8, 9]"),
  ]),
]);
