import { skill, topic, v } from "../topic";
import { POINT } from "./given";

export const tuples = topic("python", "tuples", [
  skill("tuple-create", 1, { explain: "Commas make a tuple; the parentheses are just grouping." }, [
    v("pair", "`x` and `y` are numbers. Create `point`, a tuple holding `x` then `y`.", "x = 3\ny = 4", "point is (3, 4)", "point = (x, y)", "point == (3, 4) and type(point) is tuple", {
      accepted: ["point = x, y"],
    }),
    v("single", "Make a tuple that contains just the one value `x`.", "x = 1", "gives (1,)", "(x,)", "type(_) is tuple and _ == (1,)", {
      accepted: ["x,"],
      explain: "(x) is just x; the trailing comma makes the tuple.",
    }),
    v("empty", "Create `t`, an empty tuple.", "", "t is ()", "t = ()", "t == () and type(t) is tuple", {
      accepted: ["t = tuple()"],
    }),
    v("from-list", "`path` is a list. Convert it to a tuple, for example so it can be stored in a set.", "path = [1, 2]", "gives (1, 2)", "tuple(path)", "_ == (1, 2) and type(_) is tuple"),
    v("neighbor-cell", "`i` and `j` are the row and column of a grid cell. Write the cell one row below it, as a value that can be stored in a set.", "i = 1\nj = 2", "gives (2, 2)", "(i + 1, j)", "type(_) is tuple and _ == (2, 2)", {
      explain: "Use a tuple, not [i + 1, j]: lists cannot go in a set.",
    }),
  ]),

  skill("tuple-read", 1, { explain: "Tuples are read exactly like lists: index, slice, len, in." }, [
    v("first", "`pair` is a 2-value tuple. Get its first value.", "pair = (7, 8)", "gives 7", "pair[0]", "_ == 7"),
    v("last", "`t` is a tuple. Get its last value.", "t = (7, 8, 9)", "gives 9", "t[-1]", "_ == 9"),
    v("len", "`t` is a tuple. Get how many values it holds.", "t = (7, 8, 9)", "gives 3", "len(t)", "_ == 3"),
    v("in", "`t` is a tuple. Write an expression that is True when `x` is one of its values.", "t = (7, 8, 9)\nx = 8", "gives True", "x in t", "_ is True"),
  ]),

  skill("tuple-unpack", 1, { explain: "Unpacking assigns each value to its own name; the counts must match." }, [
    v("pair", "`point` is a 2-value tuple. Break it into two variables `x` and `y`.", "point = (3, 4)", "x is 3, y is 4", "x, y = point", "(x, y) == (3, 4)"),
    v("triple", "`item` is a tuple of 3 values. Break it into three separate variables `dist`, `x` and `y`.", "item = (5, 1, 2)", "dist is 5, x is 1, y is 2", "dist, x, y = item", "(dist, x, y) == (5, 1, 2)"),
    v("from-list", "`interval` is a 2-item list. Break it into two variables `start` and `end`.", "interval = [1, 5]", "start is 1, end is 5", "start, end = interval", "(start, end) == (1, 5)", {
      explain: "Unpacking works on any sequence, not only tuples.",
    }),
    v("nested", "`item` is a tuple holding a (row, col) tuple and then a distance. Break it into `r`, `c` and `d` in one line.", "item = ((2, 3), 7)", "r is 2, c is 3, d is 7", "(r, c), d = item", "(r, c, d) == (2, 3, 7)", {
      explain: "The left side mirrors the shape of the data, including inner parentheses.",
    }),
    v("ignore", "`item` is a tuple of 3 values. Keep only the middle one in `x`, using the throwaway name for the other two.", "item = (5, 1, 2)", "x is 1", "_, x, _ = item", "x == 1", {
      explain: "_ can be repeated for every value you do not need.",
    }),
  ]),

  skill("tuple-star-unpack", 2, { explain: "A starred name collects all the leftover values into a list." }, [
    v("first-rest", "`nums` is a list. Put its first item in `first` and all the remaining items in `rest`.", "nums = [1, 2, 3, 4]", "first is 1, rest is [2, 3, 4]", "first, *rest = nums", "first == 1 and rest == [2, 3, 4]"),
    v("init-last", "`nums` is a list. Put its last item in `last` and everything before it in `init`.", "nums = [1, 2, 3, 4]", "init is [1, 2, 3], last is 4", "*init, last = nums", "init == [1, 2, 3] and last == 4"),
    v("ends", "`nums` is a list. Put its first item in `first` and its last item in `last`, discarding the middle with the throwaway name.", "nums = [1, 2, 3, 4]", "first is 1, last is 4", "first, *_, last = nums", "(first, last) == (1, 4)"),
  ]),

  skill("tuple-swap", 1, { explain: "The right side is evaluated first, so no temp variable is needed." }, [
    v("two", "`a` and `b` are two variables. Swap their values in one line, without a temp variable.", "a = 1\nb = 2", "a is 2, b is 1", "a, b = b, a", "(a, b) == (2, 1)"),
    v("rotate-three", "`a`, `b` and `c` are three variables. In one line, give `a` the value of `b`, `b` the value of `c`, and `c` the old value of `a`.", "a = 1\nb = 2\nc = 3", "a is 2, b is 3, c is 1", "a, b, c = b, c, a", "(a, b, c) == (2, 3, 1)"),
    v("fibonacci-step", "`a` and `b` are two consecutive Fibonacci numbers. In one line, advance them: `a` becomes `b`, and `b` becomes their sum.", "a = 3\nb = 5", "a is 5, b is 8", "a, b = b, a + b", "(a, b) == (5, 8)", {
      explain: "Both right-hand values use the OLD a and b.",
    }),
    v("pointers", "`prev` and `curr` are two pointers walking a sequence. In one line, move both forward: `prev` becomes `curr`, and `curr` becomes `nxt`.", "prev = 1\ncurr = 2\nnxt = 3", "prev is 2, curr is 3", "prev, curr = curr, nxt", "(prev, curr) == (2, 3)"),
  ]),

  skill("tuple-return", 1, { explain: "return a, b sends back one tuple; the caller can unpack it." }, [
    v("two", "You are inside the function below, which has two numbers `lo` and `hi`. Return both of them at once.", "", "result ends up (1, 9)", "return lo, hi", "result == (1, 9)", {
      template: "def bounds(lo, hi):\n    {answer}\n\nresult = bounds(1, 9)",
      accepted: ["return (lo, hi)"],
    }),
    v("three", "You are inside the function below. Return the node, its depth, and whether it is a leaf, all at once, in that order.", "", 'result ends up ("n", 2, True)', "return node, depth, is_leaf", 'result == ("n", 2, True)', {
      template: 'def info(node, depth, is_leaf):\n    {answer}\n\nresult = info("n", 2, True)',
      accepted: ["return (node, depth, is_leaf)"],
    }),
  ]),

  skill("tuple-as-key", 2, { explain: "Tuples are hashable, so they can be dict keys and set members; lists cannot." }, [
    v("set-add", "`visited` is a set of grid cells. Mark the cell at row `r`, column `c` as visited.", "visited = set()\nr = 1\nc = 2", "visited becomes {(1, 2)}", "visited.add((r, c))", "visited == {(1, 2)}", {
      explain: "Double parentheses: the tuple is the single argument of add.",
    }),
    v("set-in", "`visited` is a set of (row, col) tuples. Write an expression that is True when the cell at row `r`, column `c` is in it.", "visited = {(1, 2)}\nr = 1\nc = 2", "gives True", "(r, c) in visited", "_ is True"),
    v("dict-key", "`memo` is a dictionary keyed by (i, j) pairs. Store `val` under the key made of `i` and `j`.", "memo = {}\ni = 1\nj = 2\nval = 9", "memo becomes {(1, 2): 9}", "memo[(i, j)] = val", "memo == {(1, 2): 9}", {
      accepted: ["memo[i, j] = val"],
    }),
    v("dict-lookup", "`memo` is a dictionary keyed by (i, j) pairs. Get the value stored for `i` and `j`.", "memo = {(1, 2): 9}\ni = 1\nj = 2", "gives 9", "memo[(i, j)]", "_ == 9", {
      accepted: ["memo[i, j]"],
    }),
  ]),

  skill("tuple-compare", 2, { explain: "Tuples compare item by item: first values decide, later values only break ties." }, [
    v("less-than", "`a` and `b` are 2-value tuples. Write an expression that is True when `a` sorts before `b`.", "a = (1, 9)\nb = (2, 0)", "gives True", "a < b", "_ is True"),
    v("max", "`pairs` is a list of (score, name) tuples. Get the tuple with the highest score.", 'pairs = [(3, "a"), (7, "b"), (5, "c")]', 'gives (7, "b")', "max(pairs)", '_ == (7, "b")', {
      explain: "max compares the first values, so put what you rank by first.",
    }),
    v("sorted", "`pairs` is a list of 2-value tuples. Get a sorted copy, ordered by first value and then by second.", "pairs = [(2, 1), (1, 9), (1, 3)]", "gives [(1, 3), (1, 9), (2, 1)]", "sorted(pairs)", "_ == [(1, 3), (1, 9), (2, 1)]"),
    v("min-by-second", "`pairs` is a list of 2-value tuples. Get the tuple whose SECOND value is smallest. Call each tuple `p`.", "pairs = [(1, 9), (2, 3), (3, 5)]", "gives (2, 3)", "min(pairs, key=lambda p: p[1])", "_ == (2, 3)", {
      explain: "key= changes what is compared without changing what is returned.",
    }),
  ]),

  skill("tuple-zip", 2, { explain: "zip yields tuples; zip(*pairs) turns a list of pairs back into separate sequences." }, [
    v("pair-up", "`xs` and `ys` are lists of the same length. Get a list of (x, y) tuples pairing them by position.", "xs = [1, 2]\nys = [3, 4]", "gives [(1, 3), (2, 4)]", "list(zip(xs, ys))", "_ == [(1, 3), (2, 4)]", {
      explain: "zip is lazy; wrap it in list() to see the pairs.",
    }),
    v("unzip", "`pairs` is a list of 2-value tuples. Split it into `xs`, all the first values, and `ys`, all the second values.", "pairs = [(1, 3), (2, 4)]", "xs is (1, 2), ys is (3, 4)", "xs, ys = zip(*pairs)", "tuple(xs) == (1, 2) and tuple(ys) == (3, 4)", {
      explain: "The star spreads the pairs out as separate arguments to zip.",
    }),
    v("to-dict", "`pairs` is a list of (key, value) tuples. Turn it into a dictionary.", 'pairs = [("a", 1), ("b", 2)]', 'gives {"a": 1, "b": 2}', "dict(pairs)", '_ == {"a": 1, "b": 2}'),
  ]),

  skill("tuple-objects", 3, { explain: "A tuple can hold any objects; unpacking gives the objects back, not copies." }, [
    v("from-fields", "`p` is a `Point` object. Build a tuple of its `x` and `y` fields, for example to store the point in a set.", POINT + "\np = Point(3, 4)", "gives (3, 4)", "(p.x, p.y)", "_ == (3, 4)", {
      explain: "Plain objects hash by identity; a tuple of their fields hashes by value.",
    }),
    v("to-object", "`t` is an (x, y) tuple. Create a `Point` from it, stored in `p`, spreading the tuple into the two constructor arguments.", POINT + "\nt = (3, 4)", "p.x is 3, p.y is 4", "p = Point(*t)", "(p.x, p.y) == (3, 4)", {
      accepted: ["p = Point(t[0], t[1])"],
    }),
    v("unpack-node-depth", "`item` is a tuple holding a `Point` object and then a depth. Break it into `node` and `depth`.", POINT + "\nitem = (Point(1, 2), 5)", "node is the Point, depth is 5", "node, depth = item", "node is item[0] and depth == 5"),
    v("list-inside", "`t` is a tuple whose second value is a list. Tuples cannot be reassigned, but the list inside can still change. Add `x` to that list.", "t = (1, [2])\nx = 3", "t becomes (1, [2, 3])", "t[1].append(x)", "t == (1, [2, 3])", {
      explain: "The tuple is fixed, but a mutable object inside it is not.",
    }),
  ]),
]);
