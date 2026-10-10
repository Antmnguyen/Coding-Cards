import { skill, topic, v } from "../topic";

/** An `if` line is run by letting it flip `out` from "no" to "yes". */
const IF = { template: 'out = "no"\n{answer}\n    out = "yes"' };
const YES = 'out ends up "yes"';
const IS_YES = 'out == "yes"';
const IF_LINE = "Write only the `if` line.";

export const basics = topic("python", "basics", [
  skill("assign", 1, { explain: "A name is created by assigning to it; there are no declarations or types to write." }, [
    v("number", "Create a variable `count` holding 0.", "", "count is 0", "count = 0", "count == 0 and type(count) is int"),
    v("two-at-once", "In one line, create `lo` holding 0 and `hi` holding 9.", "", "lo is 0, hi is 9", "lo, hi = 0, 9", "(lo, hi) == (0, 9)", {
      explain: "Tuple assignment: names on the left, values on the right, matched by position.",
    }),
    v("same-value", "In one line, create `l` and `r`, both holding 0.", "", "l is 0, r is 0", "l = r = 0", "(l, r) == (0, 0)", {
      accepted: ["l, r = 0, 0"],
      explain: "Chained assignment is fine for immutable values like ints; avoid it for lists.",
    }),
    v("none", "Create a variable `best` that holds nothing yet.", "", "best is None", "best = None", "best is None", {
      explain: "None is Python's null; capital N.",
    }),
    v("bool", "Create a flag `found` that starts as false.", "", "found is False", "found = False", "found is False", {
      explain: "True and False are capitalised.",
    }),
    v("inf", "Create `best`, starting at positive infinity, ready to track a minimum.", "", "best is inf", 'best = float("inf")', 'best == float("inf")', {
      accepted: ["import math\nbest = math.inf"],
    }),
    v("neg-inf", "Create `best`, starting at negative infinity, ready to track a maximum.", "", "best is -inf", 'best = float("-inf")', 'best == float("-inf")', {
      accepted: ['best = -float("inf")', "import math\nbest = -math.inf"],
    }),
  ]),

  skill("augmented", 1, { explain: "x op= y is short for x = x op y. Python has no ++ or --." }, [
    v("add-1", "`count` is an int. Increase it by 1.", "count = 4", "count becomes 5", "count += 1", "count == 5", {
      explain: "There is no count++ in Python.",
    }),
    v("add-x", "`total` and `x` are numbers. Add `x` to `total`.", "total = 10\nx = 5", "total becomes 15", "total += x", "total == 15"),
    v("subtract-1", "`n` is an int. Decrease it by 1.", "n = 4", "n becomes 3", "n -= 1", "n == 3"),
    v("double", "`x` is a number. Double it in place.", "x = 6", "x becomes 12", "x *= 2", "x == 12"),
    v("drop-digit", "`n` is a positive int. Remove its last digit, keeping it an int.", "n = 123", "n becomes 12", "n //= 10", "n == 12 and type(n) is int", {
      explain: "//= keeps an int; /= would make it a float.",
    }),
    v("wrap", "`i` is an index and `n` is a length. Wrap `i` back into the range 0 to `n - 1`.", "i = 7\nn = 5", "i becomes 2", "i %= n", "i == 2"),
  ]),

  skill("none-check", 1, { explain: "Compare with None using `is`, not ==." }, [
    v("is-none", "`node` may be None. Write an expression that is True when it is None.", "node = None", "gives True", "node is None", "_ is True"),
    v("is-not-none", "`node` may be None. Write an expression that is True when it is NOT None.", "node = 5", "gives True", "node is not None", "_ is True", {
      explain: "`is not` is one operator; `not node is None` works but reads worse.",
    }),
    v("if-none", "`node` may be None. Write the `if` line whose block runs when there is no node.", "node = None", YES, "if not node:", IS_YES, {
      ...IF,
      accepted: ["if node is None:"],
      explain: "None is falsy, so `not node` is the usual guard for a missing node.",
    }),
    v("default", "`x` may be None. In one expression, get `x`, or 0 when it is None.", "x = None", "gives 0", "x if x is not None else 0", "_ == 0", {
      explain: "`x or 0` would also replace a legitimate 0 or empty value; the explicit test does not.",
    }),
  ]),

  skill("bool-ops", 1, { explain: "The logical operators are the words and, or, not; && || ! do not exist." }, [
    v("and", "`a` and `b` are booleans. Write an expression that is True only when both are true.", "a = True\nb = True", "gives True", "a and b", "_ is True"),
    v("or", "`a` and `b` are booleans. Write an expression that is True when at least one is true.", "a = False\nb = True", "gives True", "a or b", "_ is True"),
    v("not", "`done` is a boolean. Write an expression that is True when `done` is false.", "done = False", "gives True", "not done", "_ is True"),
    v("and-not", "`valid` and `seen` are booleans. Write an expression that is True when `valid` is true and `seen` is false.", "valid = True\nseen = False", "gives True", "valid and not seen", "_ is True"),
  ]),

  skill("chained-compare", 2, { explain: "Comparisons can be chained: a < b < c means a < b and b < c." }, [
    v("index-in-range", "`i` is an index and `n` is a length. Write an expression that is True when `i` is a valid index, from 0 up to but not including `n`.", "i = 3\nn = 5", "gives True", "0 <= i < n", "_ is True", {
      accepted: ["i >= 0 and i < n"],
    }),
    v("between", "`x`, `lo` and `hi` are numbers. Write an expression that is True when `x` is between `lo` and `hi`, including both ends.", "x = 5\nlo = 1\nhi = 5", "gives True", "lo <= x <= hi", "_ is True", {
      accepted: ["x >= lo and x <= hi"],
    }),
    v("all-equal", "`a`, `b` and `c` are values. Write an expression that is True when all three are equal.", "a = 2\nb = 2\nc = 2", "gives True", "a == b == c", "_ is True"),
  ]),

  skill("ternary", 1, { explain: "The conditional expression is: value_if_true if condition else value_if_false." }, [
    v("label", '`n` is an int. In one expression, get the string "even" when `n` is even and "odd" otherwise.', "n = 7", 'gives "odd"', '"even" if n % 2 == 0 else "odd"', '_ == "odd"', {
      explain: "There is no ?: operator; the true value comes first, then if, then else.",
    }),
    v("larger", "`a` and `b` are numbers. Without calling `max`, write one expression that gives the larger of the two.", "a = 3\nb = 8", "gives 8", "a if a > b else b", "_ == 8"),
    v("assign", "`x` is a number. Create `sign`: 1 when `x` is zero or positive, otherwise -1.", "x = -4", "sign is -1", "sign = 1 if x >= 0 else -1", "sign == -1"),
  ]),

  skill("truthiness", 2, { explain: "0, None, and every empty container are falsy; everything else is truthy." }, [
    v("empty-dict", "`d` is a dictionary. Write an expression that is True when it has no keys.", "d = {}", "gives True", "not d", "_ is True", {
      accepted: ["len(d) == 0"],
    }),
    v("empty-set", "`seen` is a set. Write the `if` line whose block runs only when the set has something in it.", "seen = {1}", YES, "if seen:", IS_YES, {
      ...IF,
      accepted: ["if len(seen) > 0:"],
    }),
    v("or-default", '`name` is a string that may be empty. In one expression, get `name`, or the string "anon" when it is empty.', 'name = ""', 'gives "anon"', 'name or "anon"', '_ == "anon"', {
      explain: "`a or b` gives a when a is truthy, otherwise b.",
    }),
  ]),

  skill("is-vs-eq", 2, { explain: "== asks whether two values are equal; `is` asks whether they are the very same object." }, [
    v("same-contents", "`a` and `b` are two separate lists with the same items. Write an expression that is True because their contents match.", "a = [1, 2]\nb = [1, 2]", "gives True", "a == b", "_ is True"),
    v("same-object", "`a` is a list and `b` is another name for that same list. Write an expression that is True only because they are the same object.", "a = [1, 2]\nb = a", "gives True", "a is b", "_ is True and a is b"),
    v("isinstance", "`x` is a value that might be an int or a list. Write an expression that is True when it is a list.", "x = [1]", "gives True", "isinstance(x, list)", "_ is True", {
      accepted: ["type(x) is list", "type(x) == list"],
      explain: "isinstance(value, type) is the standard type test.",
    }),
  ]),
]);

export const conditionals = topic("python", "conditionals", [
  skill("if-line", 1, { explain: "An if line needs no parentheses and ends with a colon." }, [
    v("greater", "`x` is a number. The block should run when `x` is above 0. " + IF_LINE, "x = 3", YES, "if x > 0:", IS_YES, IF),
    v("equal", "`a` and `b` are values. The block should run when they are equal. " + IF_LINE, "a = 4\nb = 4", YES, "if a == b:", IS_YES, {
      ...IF,
      explain: "== compares; a single = is assignment and is a syntax error here.",
    }),
    v("not-equal", "`a` and `b` are values. The block should run when they differ. " + IF_LINE, "a = 4\nb = 5", YES, "if a != b:", IS_YES, IF),
    v("in-set", "`seen` is a set. The block should run when `x` is already in it. " + IF_LINE, "seen = {1, 2}\nx = 2", YES, "if x in seen:", IS_YES, IF),
    v("not-in-dict", "`d` is a dictionary. The block should run when `key` is NOT one of its keys. " + IF_LINE, 'd = {"a": 1}\nkey = "b"', YES, "if key not in d:", IS_YES, IF),
    v("and", "`x` and `y` are numbers. The block should run only when both are above 0. " + IF_LINE, "x = 1\ny = 2", YES, "if x > 0 and y > 0:", IS_YES, IF),
    v("or", "`x` is a number. The block should run when `x` is below 0 or above 9. " + IF_LINE, "x = 12", YES, "if x < 0 or x > 9:", IS_YES, IF),
    v("not-flag", "`found` is a boolean. The block should run when `found` is false. " + IF_LINE, "found = False", YES, "if not found:", IS_YES, {
      ...IF,
      accepted: ["if found == False:", "if found is False:"],
      explain: "`not found` is the idiomatic form; no comparison with False needed.",
    }),
    v("even", "`n` is an int. The block should run when `n` is even. " + IF_LINE, "n = 6", YES, "if n % 2 == 0:", IS_YES, IF),
    v("compare-items", "`nums` is a list and `i` is an index. The block should run when the item at `i` is larger than the item right after it. " + IF_LINE, "nums = [5, 3, 8]\ni = 0", YES, "if nums[i] > nums[i + 1]:", IS_YES, IF),
  ]),

  skill("elif-else", 1, { explain: "elif is one word; else takes no condition. Both end with a colon." }, [
    v("else", "`x` is a number. Write the line that starts the block to run when the `if` condition below was false.", "x = -2", 'out ends up "not positive"', "else:", 'out == "not positive"', {
      template: 'if x > 0:\n    out = "positive"\n{answer}\n    out = "not positive"',
    }),
    v("elif", "In the chain below, add the middle branch: it should run when `x` equals 0. Write only that line.", "x = 0", 'out ends up "zero"', "elif x == 0:", 'out == "zero"', {
      template: 'if x > 0:\n    out = "positive"\n{answer}\n    out = "zero"\nelse:\n    out = "negative"',
      explain: "elif, not else if.",
    }),
  ]),

  skill("number-tests", 1, { explain: "% gives the remainder, which is how parity and divisibility are tested." }, [
    v("even", "`n` is an int. Write an expression that is True when it is even.", "n = 10", "gives True", "n % 2 == 0", "_ is True"),
    v("odd", "`n` is an int. Write an expression that is True when it is odd.", "n = 7", "gives True", "n % 2 == 1", "_ is True", {
      accepted: ["n % 2 != 0"],
    }),
    v("divisible", "`n` and `k` are ints. Write an expression that is True when `n` divides evenly by `k`.", "n = 12\nk = 4", "gives True", "n % k == 0", "_ is True"),
    v("negative", "`x` is a number. Write an expression that is True when it is negative.", "x = -3", "gives True", "x < 0", "_ is True"),
    v("opposite-signs", "`a` and `b` are non-zero numbers. Write an expression that is True when one is positive and the other negative.", "a = -3\nb = 4", "gives True", "a * b < 0", "_ is True", {
      accepted: ["(a < 0) != (b < 0)"],
    }),
  ]),

  skill("update-best", 2, { explain: "max and min take two values and return one, which makes running-best updates one line." }, [
    v("max", "`best` is the largest value seen so far and `x` is a new value. Update `best` so it is the larger of the two.", "best = 5\nx = 9", "best becomes 9", "best = max(best, x)", "best == 9"),
    v("min", "`best` is the smallest value seen so far and `x` is a new value. Update `best` so it is the smaller of the two.", "best = 5\nx = 2", "best becomes 2", "best = min(best, x)", "best == 2"),
    v("if-form", "`best` is the largest value seen so far and `x` is a new value. Without calling `max`, update `best` when `x` is larger. Write the `if` line and the line under it.", "best = 5\nx = 9", "best becomes 9", "if x > best:\n    best = x", "best == 9"),
    v("window-length", "`best` is the longest window seen so far and `l`, `r` are the two ends of the current window, both inclusive. Update `best` with the current window's length if that is longer.", "best = 2\nl = 3\nr = 6", "best becomes 4", "best = max(best, r - l + 1)", "best == 4", {
      explain: "An inclusive window from l to r holds r - l + 1 items.",
    }),
  ]),

  skill("guard", 2, { explain: "Handle the edge case first and return early, so the rest of the function can assume valid input." }, [
    v("empty-list", "You are inside the function below. `nums` may be empty. Return 0 straight away when it is. Write the `if` line and the line under it.", "", "result ends up 0", "if not nums:\n    return 0", "result == 0", {
      template: "def first(nums):\n    {answer}\n    return nums[0]\n\nresult = first([])",
      accepted: ["if len(nums) == 0:\n    return 0"],
    }),
    v("none-node", "You are inside the function below. `node` may be None. Return None straight away when it is. Write the `if` line and the line under it.", "", "result ends up None, with no error", "if not node:\n    return None", "result is None and ran", {
      template: "ran = False\ndef value(node):\n    {answer}\n    return node.val\n\nresult = value(None)\nran = True",
      accepted: ["if node is None:\n    return None", "if not node:\n    return", "if node is None:\n    return"],
    }),
  ]),
]);

export const conversion = topic("python", "conversion", [
  skill("to-number", 1, { explain: "int() truncates towards zero; round() rounds to the nearest." }, [
    v("float-to-int", "`x` is a float. Convert it to an int by dropping the fraction.", "x = 3.9", "gives 3", "int(x)", "_ == 3 and type(_) is int", {
      explain: "int(3.9) is 3: it cuts off, it does not round.",
    }),
    v("round", "`x` is a float. Get the nearest whole number as an int.", "x = 3.7", "gives 4", "round(x)", "_ == 4 and type(_) is int"),
    v("str-to-float", "`s` is a string holding a decimal number. Convert it to a float.", 's = "2.5"', "gives 2.5", "float(s)", "_ == 2.5"),
    v("int-to-float", "`a` and `b` are ints. Divide `a` by `b` and keep the fraction.", "a = 7\nb = 2", "gives 3.5", "a / b", "_ == 3.5", {
      explain: "/ always produces a float; no cast is needed.",
    }),
    v("count-true", "`nums` is a list of numbers. Count how many are above 0, using the fact that True counts as 1. Call each item `x`.", "nums = [3, -1, 2]", "gives 2", "sum(x > 0 for x in nums)", "_ == 2", {
      accepted: ["sum(1 for x in nums if x > 0)", "len([x for x in nums if x > 0])"],
      explain: "Booleans are ints: True is 1 and False is 0, so sum() counts them.",
    }),
  ]),

  skill("between-containers", 1, { explain: "list(), tuple(), set() and dict() each accept any iterable and build that container from it." }, [
    v("list-to-set", "`nums` is a list with duplicates. Convert it to a set.", "nums = [1, 1, 2]", "gives {1, 2}", "set(nums)", "_ == {1, 2} and type(_) is set"),
    v("dedupe-to-list", "`nums` is a list with duplicates. Get a list with the duplicates removed (any order).", "nums = [1, 1, 2]", "gives a list holding 1 and 2", "list(set(nums))", "sorted(_) == [1, 2] and type(_) is list"),
    v("list-to-tuple", "`nums` is a list. Convert it to a tuple.", "nums = [1, 2]", "gives (1, 2)", "tuple(nums)", "_ == (1, 2)"),
    v("str-to-set", "`s` is a string. Get the set of distinct characters in it.", 's = "hello"', "gives a set of 4 characters", "set(s)", '_ == {"h", "e", "l", "o"}'),
    v("dict-to-pairs", "`d` is a dictionary. Get a list of its (key, value) pairs.", 'd = {"a": 1, "b": 2}', 'gives [("a", 1), ("b", 2)]', "list(d.items())", '_ == [("a", 1), ("b", 2)]', {
      explain: "items() is a view; wrap it in list() to index or sort it.",
    }),
    v("pairs-to-dict", "`pairs` is a list of [key, value] lists. Turn it into a dictionary.", 'pairs = [["a", 1], ["b", 2]]', 'gives {"a": 1, "b": 2}', "dict(pairs)", '_ == {"a": 1, "b": 2}'),
  ]),

  skill("convert-each", 2, { explain: "To convert every item, map the conversion over the list or use a comprehension." }, [
    v("strs-to-ints", "`strs` is a list of digit strings. Get a list of the same values as ints.", 'strs = ["1", "20"]', "gives [1, 20]", "list(map(int, strs))", "_ == [1, 20]", {
      accepted: ["[int(x) for x in strs]", "[int(s) for s in strs]"],
      explain: "map returns an iterator; wrap it in list().",
    }),
    v("ints-to-strs", "`nums` is a list of ints. Get a list of the same values as strings.", "nums = [1, 20]", 'gives ["1", "20"]', "list(map(str, nums))", '_ == ["1", "20"]', {
      accepted: ["[str(x) for x in nums]", "[str(n) for n in nums]"],
    }),
    v("rows-to-char-lists", "`board` is a list of strings, one per row. Convert it to a list of lists of single characters so cells can be changed. Call each string `row`.", 'board = ["ab", "cd"]', 'gives [["a", "b"], ["c", "d"]]', "[list(row) for row in board]", '_ == [["a", "b"], ["c", "d"]]', {
      accepted: ["list(map(list, board))"],
      explain: "Strings are immutable, so a grid given as strings must be converted before editing.",
    }),
    v("rows-to-strings", "`board` is a list of lists of single characters. Convert it back to a list of strings, one per row. Call each inner list `row`.", 'board = [["a", "b"], ["c", "d"]]', 'gives ["ab", "cd"]', '["".join(row) for row in board]', '_ == ["ab", "cd"]'),
  ]),
]);
