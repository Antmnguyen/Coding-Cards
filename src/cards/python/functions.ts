import { skill, topic, v } from "../topic";
import { POINT, TREE_NODE } from "./given";

const HEADER = "Write only the `def` line.";

/** A `class Solution` shell so a LeetCode-style method header can be run. */
const solutionMethod = (body: string, call: string) =>
  `from typing import List, Optional\nclass TreeNode:\n    pass\n\nclass Solution:\n    {answer}\n        ${body}\n\nresult = Solution().${call}`;

export const functions = topic("python", "functions", [
  skill("def-header", 1, { explain: "def name(parameters): the parentheses and the colon are both required." }, [
    v("one-param", "Write the header of a function named `double` that takes one parameter, `x`. " + HEADER, "", "result ends up 8", "def double(x):", "result == 8", {
      template: "{answer}\n    return x * 2\n\nresult = double(4)",
    }),
    v("two-params", "Write the header of a function named `add` that takes two parameters, `a` and `b`. " + HEADER, "", "result ends up 5", "def add(a, b):", "result == 5", {
      template: "{answer}\n    return a + b\n\nresult = add(2, 3)",
    }),
    v("no-params", "Write the header of a function named `make_list` that takes no parameters. " + HEADER, "", "result ends up []", "def make_list():", "result == []", {
      template: "{answer}\n    return []\n\nresult = make_list()",
      explain: "The parentheses stay even when there are no parameters.",
    }),
    v("three-params", "Write the header of a function named `clamp` that takes `x`, `lo` and `hi`, in that order. " + HEADER, "", "result ends up 10", "def clamp(x, lo, hi):", "result == 10", {
      template: "{answer}\n    return max(lo, min(x, hi))\n\nresult = clamp(15, 0, 10)",
    }),
  ]),

  skill("def-default", 2, { explain: "A default is written name=value in the header; parameters with defaults come after those without." }, [
    v("string", 'Write the header of a function named `greet` that takes `name`, and `greeting` which defaults to "Hello". ' + HEADER, "", 'result ends up "Hello, Ada"', 'def greet(name, greeting="Hello"):', 'result == "Hello, Ada"', {
      template: '{answer}\n    return f"{greeting}, {name}"\n\nresult = greet("Ada")',
    }),
    v("zero", "Write the header of a function named `dfs` that takes `node`, and `depth` which defaults to 0. " + HEADER, "", "result ends up 0", "def dfs(node, depth=0):", "result == 0", {
      template: '{answer}\n    return depth\n\nresult = dfs("root")',
    }),
    v("none", "Write the header of a function named `walk` that takes `node`, and `path` which defaults to None. " + HEADER, "", "result ends up None", "def walk(node, path=None):", "result is None and ran", {
      template: 'ran = False\n{answer}\n    return path\n\nresult = walk("root")\nran = True',
      explain: "Use None as the default for a list parameter, never [] itself.",
    }),
  ]),

  skill("def-typed", 2, { explain: "Type hints go after a colon for parameters and after -> for the return type; methods take self first." }, [
    v("list-int", "You are inside `class Solution`. Write the header of the method `twoSum`, with type hints: it takes a list of ints `nums` and an int `target`, and returns a list of ints. " + HEADER, "", "result ends up [0, 1]", "def twoSum(self, nums: List[int], target: int) -> List[int]:", "result == [0, 1]", {
      template: solutionMethod("return [0, 1]", "twoSum([2, 7], 9)"),
    }),
    v("str-bool", "You are inside `class Solution`. Write the header of the method `isValid`, with type hints: it takes a string `s` and returns a bool. " + HEADER, "", "result ends up True", "def isValid(self, s: str) -> bool:", "result is True", {
      template: solutionMethod("return len(s) % 2 == 0", 'isValid("()")'),
    }),
    v("grid-int", "You are inside `class Solution`. Write the header of the method `numIslands`, with type hints: it takes `grid`, a list of lists of strings, and returns an int. " + HEADER, "", "result ends up 1", "def numIslands(self, grid: List[List[str]]) -> int:", "result == 1", {
      template: solutionMethod("return len(grid)", 'numIslands([["1"]])'),
    }),
    v("optional-node", "You are inside `class Solution`. Write the header of the method `maxDepth`, with type hints: it takes `root`, which is a `TreeNode` or None, and returns an int. " + HEADER, "", "result ends up 0", "def maxDepth(self, root: Optional[TreeNode]) -> int:", "result == 0", {
      template: solutionMethod("return 0 if root is None else 1", "maxDepth(None)"),
      explain: "Optional[X] means X or None.",
    }),
    v("returns-none", "You are inside `class Solution`. Write the header of the method `reverse`, with type hints: it takes a list of ints `nums`, changes it in place, and returns nothing. " + HEADER, "", "result ends up None", "def reverse(self, nums: List[int]) -> None:", "result is None and ran", {
      template: "ran = False\n" + solutionMethod("nums.reverse()", "reverse([1, 2])") + "\nran = True",
    }),
  ]),

  skill("def-return", 1, { explain: "return ends the function and hands back the value; with no value it hands back None." }, [
    v("value", "You are inside the function below. Return `x` multiplied by itself.", "", "result ends up 9", "return x * x", "result == 9", {
      template: "def square(x):\n    {answer}\n\nresult = square(3)",
      accepted: ["return x ** 2"],
    }),
    v("bool", "You are inside the function below. Return whether `n` is even, as a bool, in one line.", "", "result ends up True", "return n % 2 == 0", "result is True", {
      template: "def is_even(n):\n    {answer}\n\nresult = is_even(4)",
      explain: "Return the comparison directly; no if/else needed to produce True or False.",
    }),
    v("list", "You are inside the function below. Return `lo` and `hi` together as a 2-item list.", "", "result ends up [1, 9]", "return [lo, hi]", "result == [1, 9]", {
      template: "def bounds(lo, hi):\n    {answer}\n\nresult = bounds(1, 9)",
    }),
    v("either", "You are inside the function below. In one line, return `a` when it is larger than `b`, otherwise return `b`.", "", "result ends up 8", "return a if a > b else b", "result == 8", {
      template: "def larger(a, b):\n    {answer}\n\nresult = larger(3, 8)",
      accepted: ["return max(a, b)"],
    }),
    v("early-exit", "You are inside the function below, which changes a list in place and returns nothing. Write the statement that leaves the function immediately, with no value.", "", "items stays [1], because the function left early", "return", "items == [1]", {
      template: "items = [1]\ndef maybe_add(x):\n    if x < 0:\n        {answer}\n    items.append(x)\n\nmaybe_add(-5)",
    }),
  ]),

  skill("def-whole", 1, { explain: "A function is a def line plus an indented body." }, [
    v("area", "Write a whole function named `area` that takes `w` and `h` and returns their product (2 lines).", "", "area(3, 4) gives 12", "def area(w, h):\n    return w * h", "area(3, 4) == 12"),
    v("is-even", "Write a whole function named `is_even` that takes `n` and returns True when it is even (2 lines).", "", "is_even(4) gives True, is_even(3) gives False", "def is_even(n):\n    return n % 2 == 0", "is_even(4) is True and is_even(3) is False"),
  ]),

  skill("def-varargs", 3, { explain: "*name collects extra positional arguments into a tuple; **name collects keyword arguments into a dict." }, [
    v("star-args", "Write the header of a function named `total` that accepts any number of positional arguments, collected as `nums`. " + HEADER, "", "result ends up 6", "def total(*nums):", "result == 6", {
      template: "{answer}\n    return sum(nums)\n\nresult = total(1, 2, 3)",
    }),
    v("star-kwargs", "Write the header of a function named `config` that accepts any keyword arguments, collected as `opts`. " + HEADER, "", 'result ends up {"a": 1}', "def config(**opts):", 'result == {"a": 1}', {
      template: "{answer}\n    return opts\n\nresult = config(a=1)",
    }),
  ]),

  skill("lambda", 2, { explain: "lambda parameters: expression. One expression only, and no return keyword." }, [
    v("one-arg", "Create `square`, an inline function of `x` that gives `x` times itself.", "", "square(3) gives 9", "square = lambda x: x * x", "square(3) == 9", {
      accepted: ["square = lambda x: x ** 2"],
    }),
    v("two-args", "Create `add`, an inline function of `a` and `b` that gives their sum.", "", "add(2, 3) gives 5", "add = lambda a, b: a + b", "add(2, 3) == 5"),
    v("key-second", "Create `key`, an inline function of a pair `p` that gives the pair's second value, ready to be used for sorting.", "", "key((1, 9)) gives 9", "key = lambda p: p[1]", "key((1, 9)) == 9"),
    v("no-args", "Create `make`, an inline function that takes no arguments and gives 0, for example as a default-value factory.", "", "make() gives 0", "make = lambda: 0", "make() == 0", {
      explain: "With no parameters, the colon follows lambda directly.",
    }),
    v("negate", "Create `key`, an inline function of `x` that gives `x` negated, for sorting largest first.", "", "key(5) gives -5", "key = lambda x: -x", "key(5) == -5"),
  ]),

  skill("scope", 2, { explain: "Assigning to an outer variable inside a function needs nonlocal (enclosing function) or global (module level)." }, [
    v("nonlocal", "In the nested function `bump` below, `count` belongs to the enclosing function. Write the line that lets `bump` reassign it.", "", "result ends up 2", "nonlocal count", "result == 2", {
      template: "def count_up():\n    count = 0\n    def bump():\n        {answer}\n        count += 1\n    bump()\n    bump()\n    return count\n\nresult = count_up()",
      explain: "Without nonlocal, count += 1 raises UnboundLocalError.",
    }),
    v("global", "In the function `add` below, `total` is a module-level variable. Write the line that lets `add` reassign it.", "", "total ends up 5", "global total", "total == 5", {
      template: "total = 0\ndef add(x):\n    {answer}\n    total += x\n\nadd(5)",
    }),
    v("helper", "Inside `solve` below, write the header of a nested helper function named `dfs` that takes one parameter, `i`. " + HEADER, "", "result ends up 3", "def dfs(i):", "result == 3", {
      template: "def solve(nums):\n    {answer}\n        if i == len(nums):\n            return 0\n        return 1 + dfs(i + 1)\n    return dfs(0)\n\nresult = solve([7, 8, 9])",
      explain: "A nested function can read the outer function's variables, such as nums, directly.",
    }),
  ]),

  skill("base-case", 2, { explain: "A recursive function checks its stopping condition first and returns without recursing." }, [
    v("number", "You are inside the recursive function `fact` below. Write the base case: when `n` is 1 or less, return 1. Write the `if` line and the line under it.", "", "result ends up 24", "if n <= 1:\n    return 1", "result == 24", {
      template: "def fact(n):\n    {answer}\n    return n * fact(n - 1)\n\nresult = fact(4)",
    }),
    v("empty-node", "`root` is a tree of `TreeNode` objects. You are inside the recursive function `depth` below. Write the base case: when there is no node, return 0. Write the `if` line and the line under it.", TREE_NODE + "\nroot = TreeNode(1, TreeNode(2))", "result ends up 2", "if not node:\n    return 0", "result == 2", {
      template: "def depth(node):\n    {answer}\n    return 1 + max(depth(node.left), depth(node.right))\n\nresult = depth(root)",
      accepted: ["if node is None:\n    return 0"],
    }),
    v("index-at-end", "You are inside the recursive function `total` below, which walks `nums` by index `i`. Write the base case: when `i` has reached the end of the list, return 0. Write the `if` line and the line under it.", "", "result ends up 6", "if i == len(nums):\n    return 0", "result == 6", {
      template: "def total(nums, i):\n    {answer}\n    return nums[i] + total(nums, i + 1)\n\nresult = total([1, 2, 3], 0)",
      accepted: ["if i >= len(nums):\n    return 0"],
    }),
  ]),

  skill("mutable-default", 3, { explain: "A default like items=[] is created once and shared by every call; use None and create the list inside." }, [
    v("none-guard", "The function below uses None as the default for `items`. Write the two lines that give it a fresh empty list when no list was passed.", "", "result ends up [2], not [1, 2]", "if items is None:\n    items = []", "result == [2]", {
      template: "def add(x, items=None):\n    {answer}\n    items.append(x)\n    return items\n\nadd(1)\nresult = add(2)",
      accepted: ["if not items:\n    items = []"],
    }),
  ]),
]);

export const comprehensions = topic("python", "comprehensions", [
  skill("comp-map", 1, { explain: "[expression for item in iterable] builds a list by transforming each item." }, [
    v("double", "`nums` is a list of numbers. Build a list with each item doubled. Call each item `x`.", "nums = [1, 2, 3]", "gives [2, 4, 6]", "[x * 2 for x in nums]", "_ == [2, 4, 6]"),
    v("range", "`n` is an int. Build the list of squares of 0 up to `n - 1`. Call the loop variable `i`.", "n = 4", "gives [0, 1, 4, 9]", "[i * i for i in range(n)]", "_ == [0, 1, 4, 9]", {
      accepted: ["[i ** 2 for i in range(n)]"],
    }),
    v("method", "`words` is a list of strings. Build a list of each one in uppercase. Call each string `w`.", 'words = ["hi", "yo"]', 'gives ["HI", "YO"]', "[w.upper() for w in words]", '_ == ["HI", "YO"]'),
    v("chars-to-ints", "`s` is a string of digits. Build a list of its digits as ints. Call each character `c`.", 's = "407"', "gives [4, 0, 7]", "[int(c) for c in s]", "_ == [4, 0, 7]", {
      accepted: ["list(map(int, s))"],
    }),
    v("attribute", "`points` is a list of `Point` objects. Build a list of the `x` field of each. Call each object `p`.", POINT + "\npoints = [Point(1, 2), Point(3, 4)]", "gives [1, 3]", "[p.x for p in points]", "_ == [1, 3]"),
    v("unpack", "`pairs` is a list of 2-value tuples. Build a list of just the first value of each, unpacking each tuple into `a` and `b`.", "pairs = [(1, 2), (3, 4)]", "gives [1, 3]", "[a for a, b in pairs]", "_ == [1, 3]", {
      accepted: ["[p[0] for p in pairs]"],
    }),
  ]),

  skill("comp-filter", 2, { explain: "A filter goes at the end: [x for x in items if condition]." }, [
    v("positive", "`nums` is a list of numbers. Build a list of only the items above 0. Call each item `x`.", "nums = [3, -1, 2]", "gives [3, 2]", "[x for x in nums if x > 0]", "_ == [3, 2]"),
    v("non-empty", "`words` is a list of strings, some empty. Build a list of only the non-empty ones. Call each string `w`.", 'words = ["a", "", "b"]', 'gives ["a", "b"]', "[w for w in words if w]", '_ == ["a", "b"]', {
      accepted: ['[w for w in words if w != ""]', "[w for w in words if len(w) > 0]"],
    }),
    v("indexes", "`nums` is a list and `target` is a value. Build a list of every index at which `target` appears. Use `i` for the index and `x` for the item.", "nums = [5, 3, 5]\ntarget = 5", "gives [0, 2]", "[i for i, x in enumerate(nums) if x == target]", "_ == [0, 2]"),
    v("filter-and-map", "`nums` is a list of ints. Build a list of the squares of only the odd items. Call each item `x`.", "nums = [1, 2, 3]", "gives [1, 9]", "[x * x for x in nums if x % 2 == 1]", "_ == [1, 9]", {
      accepted: ["[x ** 2 for x in nums if x % 2 == 1]", "[x * x for x in nums if x % 2 != 0]"],
    }),
  ]),

  skill("comp-conditional", 2, { explain: "An if/else that chooses the VALUE goes before the for; an if that filters goes after it." }, [
    v("clip", "`nums` is a list of numbers. Build a list of the same length where every negative item is replaced by 0. Call each item `x`.", "nums = [3, -1, 2]", "gives [3, 0, 2]", "[x if x > 0 else 0 for x in nums]", "_ == [3, 0, 2]", {
      accepted: ["[max(x, 0) for x in nums]", "[x if x >= 0 else 0 for x in nums]"],
    }),
    v("labels", '`nums` is a list of ints. Build a list holding "even" or "odd" for each item. Call each item `x`.', "nums = [1, 2]", 'gives ["odd", "even"]', '["even" if x % 2 == 0 else "odd" for x in nums]', '_ == ["odd", "even"]'),
  ]),

  skill("comp-nested", 3, { explain: "Multiple for clauses read left to right, in the same order as nested loops." }, [
    v("flatten", "`grid` is a list of lists. Build one flat list of all its values. Use `row` for each inner list and `x` for each value.", "grid = [[1, 2], [3, 4]]", "gives [1, 2, 3, 4]", "[x for row in grid for x in row]", "_ == [1, 2, 3, 4]", {
      explain: "The outer loop comes first: for row in grid, then for x in row.",
    }),
    v("all-pairs", "`xs` and `ys` are lists. Build a list of every (a, b) tuple with `a` from `xs` and `b` from `ys`.", 'xs = [1, 2]\nys = ["p", "q"]', 'gives [(1, "p"), (1, "q"), (2, "p"), (2, "q")]', "[(a, b) for a in xs for b in ys]", '_ == [(1, "p"), (1, "q"), (2, "p"), (2, "q")]', {
      explain: "The tuple needs its own parentheses inside a comprehension.",
    }),
    v("grid-map", "`grid` is a list of lists of numbers. Build a new grid of the same shape with every value doubled. Use `row` for each inner list and `x` for each value.", "grid = [[1, 2], [3, 4]]", "gives [[2, 4], [6, 8]]", "[[x * 2 for x in row] for row in grid]", "_ == [[2, 4], [6, 8]]", {
      explain: "A comprehension inside a comprehension keeps the nesting; two for clauses in one would flatten it.",
    }),
  ]),

  skill("comp-set", 2, { explain: "Curly braces with a single expression make a set comprehension." }, [
    v("remainders", "`nums` is a list of ints. Build the SET of their remainders when divided by 3. Call each item `x`.", "nums = [1, 4, 5]", "gives {1, 2}", "{x % 3 for x in nums}", "_ == {1, 2} and type(_) is set"),
    v("letters", "`s` is a string. Build the set of its characters that are letters. Call each character `c`.", 's = "a1b!a"', 'gives {"a", "b"}', "{c for c in s if c.isalpha()}", '_ == {"a", "b"}'),
    v("lengths", "`words` is a list of strings. Build the set of their distinct lengths. Call each string `w`.", 'words = ["hi", "yo", "hey"]', "gives {2, 3}", "{len(w) for w in words}", "_ == {2, 3}", {
      accepted: ["set(len(w) for w in words)", "set(map(len, words))"],
    }),
  ]),

  skill("comp-dict", 2, { explain: "{key: value for item in iterable} builds a dict; the key goes before the colon." }, [
    v("squares", "`nums` is a list of ints. Build a dictionary mapping each item to its square. Call each item `x`.", "nums = [1, 2, 3]", "gives {1: 1, 2: 4, 3: 9}", "{x: x * x for x in nums}", "_ == {1: 1, 2: 4, 3: 9}", {
      accepted: ["{x: x ** 2 for x in nums}"],
    }),
    v("word-lengths", "`words` is a list of strings. Build a dictionary mapping each word to its length. Call each string `w`.", 'words = ["hi", "hey"]', 'gives {"hi": 2, "hey": 3}', "{w: len(w) for w in words}", '_ == {"hi": 2, "hey": 3}'),
    v("from-two-lists", "`keys` and `vals` are lists of the same length. Build a dictionary pairing them up by position.", 'keys = ["a", "b"]\nvals = [1, 2]', 'gives {"a": 1, "b": 2}', "dict(zip(keys, vals))", '_ == {"a": 1, "b": 2}', {
      accepted: ["{k: v for k, v in zip(keys, vals)}"],
    }),
    v("filter", "`d` is a dictionary of counts. Build a new dictionary keeping only the entries whose count is above 1. Use `k` and `v` for key and value.", 'd = {"a": 1, "b": 2, "c": 3}', 'gives {"b": 2, "c": 3}', "{k: v for k, v in d.items() if v > 1}", '_ == {"b": 2, "c": 3}'),
    v("invert", "`d` is a dictionary with unique values. Build the reverse dictionary, mapping each value back to its key. Use `k` and `v` for key and value.", 'd = {"a": 1, "b": 2}', 'gives {1: "a", 2: "b"}', "{v: k for k, v in d.items()}", '_ == {1: "a", 2: "b"}'),
  ]),

  skill("comp-zip", 2, { explain: "zip and enumerate work inside a comprehension exactly as in a for line." }, [
    v("pair-sums", "`xs` and `ys` are lists of the same length. Build a list of the sums of the items at the same position. Use `a` and `b` for the two items.", "xs = [1, 2]\nys = [10, 20]", "gives [11, 22]", "[a + b for a, b in zip(xs, ys)]", "_ == [11, 22]"),
    v("differences", "`nums` is a list of numbers. Build a list of the differences between each item and the one before it. Use `a` for the earlier item and `b` for the later.", "nums = [1, 4, 9]", "gives [3, 5]", "[b - a for a, b in zip(nums, nums[1:])]", "_ == [3, 5]"),
    v("index-pairs", "`nums` is a list. Build a list of (index, value) tuples for it.", "nums = [7, 8]", "gives [(0, 7), (1, 8)]", "list(enumerate(nums))", "_ == [(0, 7), (1, 8)]", {
      accepted: ["[(i, x) for i, x in enumerate(nums)]"],
    }),
  ]),

  skill("generator-arg", 2, { explain: "A comprehension passed straight to a function needs no square brackets." }, [
    v("sum-squares", "`nums` is a list of numbers. Get the sum of their squares. Call each item `x`.", "nums = [1, 2, 3]", "gives 14", "sum(x * x for x in nums)", "_ == 14", {
      accepted: ["sum(x ** 2 for x in nums)"],
    }),
    v("max-length", "`words` is a list of strings. Get the length of the longest one. Call each string `w`.", 'words = ["hi", "hello"]', "gives 5", "max(len(w) for w in words)", "_ == 5", {
      accepted: ["max(map(len, words))", "len(max(words, key=len))"],
    }),
    v("count-matching", "`nums` is a list and `target` is a value. Count the items that are larger than `target`. Call each item `x`.", "nums = [1, 5, 9]\ntarget = 4", "gives 2", "sum(1 for x in nums if x > target)", "_ == 2", {
      accepted: ["sum(x > target for x in nums)", "len([x for x in nums if x > target])"],
    }),
    v("join", "`words` is a list of strings. Build one string from the first character of each. Call each string `w`.", 'words = ["hello", "big", "world"]', 'gives "hbw"', '"".join(w[0] for w in words)', '_ == "hbw"'),
  ]),
]);
