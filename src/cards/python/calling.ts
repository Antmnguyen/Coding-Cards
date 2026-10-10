import { skill, topic } from "../topic";
import { TREE_NODE } from "./given";

const GREET = 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}"';
const MIN_MAX = "def min_max(nums):\n    return min(nums), max(nums)";
const SQUARE = "def square(x):\n    return x * x";
const APPLY = "def apply(f, x):\n    return f(x)";

export const calling = topic("python", "calling", [
  skill("call-positional", 1, { explain: "Positional arguments are matched to parameters in order." }, [
    {
      k: "one-arg",
      prompt: "`square` is the function below and `n` is a number. Call it on `n`.",
      setup: SQUARE + "\nn = 4",
      expect: "gives 16",
      solution: "square(n)",
      check: "_ == 16",
    },
    {
      k: "two-args",
      prompt: "`power` is the function below. Call it with `b` as the base and `e` as the exponent.",
      setup: "def power(base, exp):\n    return base ** exp\nb = 2\ne = 5",
      expect: "gives 32",
      solution: "power(b, e)",
      check: "_ == 32",
      explain: "Order matters: power(e, b) would compute 5 ** 2.",
    },
    {
      k: "three-literals",
      prompt: "`clamp` is the function below. Call it to limit the number 15 to the range 0 to 10.",
      setup: "def clamp(x, lo, hi):\n    return max(lo, min(x, hi))",
      expect: "gives 10",
      solution: "clamp(15, 0, 10)",
      check: "_ == 10",
    },
    {
      k: "list-arg",
      prompt: "`total` is the function below, which takes a list. `a` is a list. Call it on `a`.",
      setup: "def total(nums):\n    return sum(nums)\na = [1, 2, 3]",
      expect: "gives 6",
      solution: "total(a)",
      check: "_ == 6",
      explain: "Your variable does not need the same name as the parameter.",
    },
    {
      k: "str-and-int",
      prompt: "`repeat` is the function below. Call it so that the string `word` is repeated 3 times.",
      setup: 'def repeat(s, times):\n    return s * times\nword = "ab"',
      expect: 'gives "ababab"',
      solution: "repeat(word, 3)",
      check: '_ == "ababab"',
    },
    {
      k: "grid-and-cell",
      prompt: "`cell` is the function below. Call it to read row `r`, column `c` of `grid`.",
      setup: "def cell(grid, r, c):\n    return grid[r][c]\ngrid = [[1, 2], [3, 4]]\nr = 1\nc = 0",
      expect: "gives 3",
      solution: "cell(grid, r, c)",
      check: "_ == 3",
    },
  ]),

  skill("call-store-result", 1, { explain: "A call is an expression; assign it to keep what it returns." }, [
    {
      k: "one-value",
      prompt: "`rect_area` is the function below. Call it with `w` and `h` and store what it returns in `area`.",
      setup: "def rect_area(width, height):\n    return width * height\nw = 3\nh = 4",
      expect: "area is 12",
      solution: "area = rect_area(w, h)",
      check: "area == 12",
    },
    {
      k: "returns-none",
      prompt:
        "`add_item` is the function below; it changes the list and returns nothing. Call it to add `x` to `items`, without assigning the result.",
      setup: "def add_item(lst, value):\n    lst.append(value)\nitems = [1]\nx = 2",
      expect: "items becomes [1, 2]",
      solution: "add_item(items, x)",
      check: "items == [1, 2] and _ is None",
      explain: "Writing items = add_item(items, x) would replace the list with None.",
    },
  ]),

  skill("call-keyword", 2, { explain: "name=value passes an argument by parameter name, in any order." }, [
    {
      k: "keyword-only",
      prompt:
        "`make_range` is the function below; the `*` means both arguments must be passed by name. Call it for the numbers 2 up to but not including 5.",
      setup: "def make_range(*, start, stop):\n    return list(range(start, stop))",
      expect: "gives [2, 3, 4]",
      solution: "make_range(start=2, stop=5)",
      accepted: ["make_range(stop=5, start=2)"],
      check: "_ == [2, 3, 4]",
      explain: "Parameters after a bare * can only be passed as name=value.",
    },
    {
      k: "mixed",
      prompt: '`pad` is the function below. Call it on the string `s` with a width of 5, passing the fill character "0" by name.',
      setup: 'def pad(s, width, fill=" "):\n    return s.rjust(width, fill)\ns = "42"',
      expect: 'gives "00042"',
      solution: 'pad(s, 5, fill="0")',
      check: '_ == "00042"',
      explain: "Positional arguments come first, keyword arguments after them.",
    },
    {
      k: "optional-flag",
      prompt:
        "`search` is the function below; `start` can only be passed by name. Call it to find the value 5 in `nums`, starting the search at index 1.",
      setup: "def search(nums, target, *, start=0):\n    return nums.index(target, start)\nnums = [5, 3, 5]",
      expect: "gives 2",
      solution: "search(nums, 5, start=1)",
      check: "_ == 2",
    },
  ]),

  skill("call-defaults", 2, { explain: "A parameter with a default can be left out of the call." }, [
    {
      k: "use-default",
      prompt: "`greet` is the function below. Call it on `name`, keeping the default greeting.",
      setup: GREET + '\nname = "Ada"',
      expect: 'gives "Hello, Ada"',
      solution: "greet(name)",
      check: '_ == "Hello, Ada"',
    },
    {
      k: "override",
      prompt: '`greet` is the function below. Call it on `name` with the greeting "Hi" instead of the default.',
      setup: GREET + '\nname = "Ada"',
      expect: 'gives "Hi, Ada"',
      solution: 'greet(name, "Hi")',
      accepted: ['greet(name, greeting="Hi")'],
      check: '_ == "Hi, Ada"',
    },
    {
      k: "skip-middle",
      prompt:
        "`windows` is the function below, with two defaults. Call it on `nums`, keeping the default `size` but setting `step` to 2.",
      setup:
        "def windows(nums, size=2, step=1):\n    return [nums[i:i + size] for i in range(0, len(nums) - size + 1, step)]\nnums = [1, 2, 3, 4]",
      expect: "gives [[1, 2], [3, 4]]",
      solution: "windows(nums, step=2)",
      check: "_ == [[1, 2], [3, 4]]",
      explain: "To skip a default in the middle, pass the later one by name.",
    },
  ]),

  skill("call-unpack", 3, { explain: "* spreads a list or tuple into positional arguments; ** spreads a dict into keyword arguments." }, [
    {
      k: "star-list",
      prompt: "`add3` is the function below, taking three separate numbers. `args` is a list of three numbers. Call it with the list spread out into the three arguments.",
      setup: "def add3(a, b, c):\n    return a + b + c\nargs = [1, 2, 3]",
      expect: "gives 6",
      solution: "add3(*args)",
      check: "_ == 6",
    },
    {
      k: "star-tuple",
      prompt: "`manhattan` is the function below, taking two separate numbers. `point` is an (x, y) tuple. Call it with the tuple spread into the two arguments.",
      setup: "def manhattan(x, y):\n    return abs(x) + abs(y)\npoint = (3, -4)",
      expect: "gives 7",
      solution: "manhattan(*point)",
      check: "_ == 7",
    },
    {
      k: "double-star-dict",
      prompt: "`box` is the function below. `opts` is a dictionary whose keys match its parameter names. Call it with the dictionary spread into keyword arguments.",
      setup: 'def box(width, height):\n    return width * height\nopts = {"width": 2, "height": 5}',
      expect: "gives 10",
      solution: "box(**opts)",
      check: "_ == 10",
    },
    {
      k: "varargs-separate",
      prompt: "`total` is the function below; `*nums` means it accepts any number of separate arguments. Call it with the three numbers 1, 2 and 3.",
      setup: "def total(*nums):\n    return sum(nums)",
      expect: "gives 6",
      solution: "total(1, 2, 3)",
      check: "_ == 6",
      explain: "A *args function takes separate arguments, not one list.",
    },
    {
      k: "varargs-from-list",
      prompt: "`total` is the function below; `*nums` means it accepts any number of separate arguments. `a` is a list. Call it so each item of `a` becomes its own argument.",
      setup: "def total(*nums):\n    return sum(nums)\na = [4, 5, 6]",
      expect: "gives 15",
      solution: "total(*a)",
      check: "_ == 15",
      explain: "total(a) would pass the whole list as a single argument.",
    },
  ]),

  skill("call-multiple-returns", 1, { explain: "A function that returns a, b returns one tuple; unpack it on the left side." }, [
    {
      k: "unpack-two",
      prompt: "`min_max` is the function below; it returns two values. Call it on `nums` and store them in `lo` and `hi`.",
      setup: MIN_MAX + "\nnums = [4, 1, 9]",
      expect: "lo is 1, hi is 9",
      solution: "lo, hi = min_max(nums)",
      check: "(lo, hi) == (1, 9)",
    },
    {
      k: "ignore-first",
      prompt:
        "`min_max` is the function below; it returns two values. Call it on `nums` and keep only the second one in `hi`, using the throwaway name for the first.",
      setup: MIN_MAX + "\nnums = [4, 1, 9]",
      expect: "hi is 9",
      solution: "_, hi = min_max(nums)",
      check: "hi == 9",
      explain: "_ is the conventional name for a value you do not need.",
    },
    {
      k: "keep-tuple",
      prompt: "`min_max` is the function below; it returns two values. Call it on `nums` and store both together in one variable `result`.",
      setup: MIN_MAX + "\nnums = [4, 1, 9]",
      expect: "result is the tuple (1, 9)",
      solution: "result = min_max(nums)",
      check: "result == (1, 9)",
      explain: "Without unpacking you get the whole tuple.",
    },
    {
      k: "index-result",
      prompt: "`min_max` is the function below; it returns two values. In a single expression, call it on `nums` and take only the second value.",
      setup: MIN_MAX + "\nnums = [4, 1, 9]",
      expect: "gives 9",
      solution: "min_max(nums)[1]",
      check: "_ == 9",
      explain: "The result is a tuple, so it can be indexed straight away.",
    },
    {
      k: "unpack-three",
      prompt: "`stats` is the function below; it returns three values. Call it on `nums` and store them in `lo`, `hi` and `total`.",
      setup: "def stats(nums):\n    return min(nums), max(nums), sum(nums)\nnums = [4, 1, 9]",
      expect: "lo is 1, hi is 9, total is 14",
      solution: "lo, hi, total = stats(nums)",
      check: "(lo, hi, total) == (1, 9, 14)",
    },
  ]),

  skill("call-nested", 2, { explain: "Calls are evaluated inside out: the inner result becomes the outer argument." }, [
    {
      k: "result-as-arg",
      prompt: "`inc` and `double` are the functions below. Add one to `n` and then double that, in a single expression.",
      setup: "def inc(x):\n    return x + 1\ndef double(x):\n    return x * 2\nn = 3",
      expect: "gives 8",
      solution: "double(inc(n))",
      check: "_ == 8",
    },
    {
      k: "in-condition",
      prompt: "`is_even` is the function below and `n` is an int. Write the `if` line that runs its block when `is_even` says yes for `n`.",
      setup: "def is_even(x):\n    return x % 2 == 0\nn = 4",
      template: 'out = "odd"\n{answer}\n    out = "even"',
      expect: 'out ends up "even"',
      solution: "if is_even(n):",
      check: 'out == "even"',
      explain: "No == True needed; the returned bool is the condition.",
    },
    {
      k: "in-comprehension",
      prompt: "`square` is the function below and `nums` is a list. Build a list of `square` applied to every item, calling each item `x`.",
      setup: SQUARE + "\nnums = [1, 2, 3]",
      expect: "gives [1, 4, 9]",
      solution: "[square(x) for x in nums]",
      accepted: ["list(map(square, nums))"],
      check: "_ == [1, 4, 9]",
    },
    {
      k: "with-map",
      prompt: "`square` is the function below and `nums` is a list. Using `map`, get a list of `square` applied to every item.",
      setup: SQUARE + "\nnums = [1, 2, 3]",
      expect: "gives [1, 4, 9]",
      solution: "list(map(square, nums))",
      check: "_ == [1, 4, 9] and type(_) is list",
      explain: "map takes the function name without parentheses, and returns an iterator, so wrap it in list().",
    },
  ]),

  skill("call-function-arg", 2, { explain: "Pass a function by its name alone; adding () would call it first." }, [
    {
      k: "named-function",
      prompt: "`apply` is the function below; its first argument is itself a function. `neg` is another function. Call `apply` so that it runs `neg` on 5.",
      setup: APPLY + "\ndef neg(x):\n    return -x",
      expect: "gives -5",
      solution: "apply(neg, 5)",
      check: "_ == -5",
    },
    {
      k: "lambda",
      prompt: "`apply` is the function below; its first argument is itself a function. Call it on 5 with an inline function of `x` that adds 1.",
      setup: APPLY,
      expect: "gives 6",
      solution: "apply(lambda x: x + 1, 5)",
      check: "_ == 6",
      explain: "lambda arguments: expression, with no return keyword.",
    },
    {
      k: "builtin",
      prompt: "`apply` is the function below; its first argument is itself a function. `word` is a string. Call it so that it runs the built-in `len` on `word`.",
      setup: APPLY + '\nword = "hello"',
      expect: "gives 5",
      solution: "apply(len, word)",
      check: "_ == 5",
      explain: "Built-ins are passed the same way as your own functions.",
    },
  ]),

  skill("call-method", 2, { explain: "Inside a class, other methods are reached through self." }, [
    {
      k: "self-helper",
      prompt: "You are inside the `solve` method of the class below. Call the class's own `helper` method on `n`.",
      template:
        "class Solution:\n    def helper(self, x):\n        return x * 2\n\n    def solve(self, n):\n        return (\n            {answer}\n        )\n\nresult = Solution().solve(4)",
      expect: "result ends up 8",
      solution: "self.helper(n)",
      check: "result == 8",
      explain: "helper(n) alone is a NameError; methods live on self.",
    },
    {
      k: "on-instance",
      prompt: "`Stack` is the class below and `st` is one of its objects. Call its `push` method with `x`.",
      setup: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, value):\n        self.items.append(value)\nst = Stack()\nx = 5",
      expect: "st.items becomes [5]",
      solution: "st.push(x)",
      check: "st.items == [5]",
      explain: "self is filled in automatically; you pass only the remaining arguments.",
    },
    {
      k: "create-and-call",
      prompt: "`Solution` is the class below. In one expression, create a `Solution` object and call its `solve` method on `n`.",
      setup: "class Solution:\n    def solve(self, x):\n        return x + 1\nn = 4",
      expect: "gives 5",
      solution: "Solution().solve(n)",
      check: "_ == 5",
      explain: "Solution() makes the object; no `new` keyword.",
    },
  ]),

  skill("call-recursive", 2, { explain: "A recursive call is an ordinary call to the same function on a smaller input." }, [
    {
      k: "n-minus-1",
      prompt: "You are inside the recursive function `fact` below. Write the recursive call on the next smaller number.",
      template: "def fact(n):\n    if n <= 1:\n        return 1\n    return n * (\n        {answer}\n    )\n\nresult = fact(4)",
      expect: "result ends up 24",
      solution: "fact(n - 1)",
      check: "result == 24",
    },
    {
      k: "rest-of-list",
      prompt: "You are inside the recursive function `total` below, which adds up a list. Write the recursive call on the list without its first item.",
      template:
        "def total(nums):\n    if not nums:\n        return 0\n    return nums[0] + (\n        {answer}\n    )\n\nresult = total([1, 2, 3])",
      expect: "result ends up 6",
      solution: "total(nums[1:])",
      check: "result == 6",
    },
    {
      k: "next-index",
      prompt: "You are inside the recursive function `count` below, which walks a list by index. Write the recursive call for the next index.",
      template:
        "def count(nums, i):\n    if i == len(nums):\n        return 0\n    return 1 + (\n        {answer}\n    )\n\nresult = count([7, 8, 9], 0)",
      expect: "result ends up 3",
      solution: "count(nums, i + 1)",
      check: "result == 3",
      explain: "Every argument has to be passed again, including the ones that do not change.",
    },
    {
      k: "left-child",
      prompt: "`root` is a tree of `TreeNode` objects. You are inside the recursive function `depth` below. Write the recursive call on the left child.",
      setup: TREE_NODE + "\nroot = TreeNode(1, TreeNode(2, TreeNode(3)))",
      template:
        "def depth(node):\n    if not node:\n        return 0\n    left = (\n        {answer}\n    )\n    return 1 + max(left, depth(node.right))\n\nresult = depth(root)",
      expect: "result ends up 3",
      solution: "depth(node.left)",
      check: "result == 3",
    },
  ]),

  skill("call-typed-signature", 2, { explain: "Type hints only describe the arguments; the call is written the same as without them." }, [
    {
      k: "list-and-int",
      prompt: "`twoSum` is declared below the way LeetCode writes it. Call it with `nums` and `target`.",
      setup:
        "from typing import List\ndef twoSum(nums: List[int], target: int) -> List[int]:\n    return [i for i, x in enumerate(nums) if target - x in nums]\nnums = [2, 7, 11]\ntarget = 9",
      expect: "gives [0, 1]",
      solution: "twoSum(nums, target)",
      check: "_ == [0, 1]",
    },
    {
      k: "two-strings-bool",
      prompt: "`isAnagram` is declared below the way LeetCode writes it. Call it with `s` and `t`.",
      setup: 'def isAnagram(s: str, t: str) -> bool:\n    return sorted(s) == sorted(t)\ns = "abc"\nt = "cab"',
      expect: "gives True",
      solution: "isAnagram(s, t)",
      check: "_ is True",
    },
    {
      k: "grid",
      prompt: "`countRows` is declared below the way LeetCode writes it, taking a grid of strings. Call it on `grid`.",
      setup: 'from typing import List\ndef countRows(grid: List[List[str]]) -> int:\n    return len(grid)\ngrid = [["1", "0"], ["0", "1"]]',
      expect: "gives 2",
      solution: "countRows(grid)",
      check: "_ == 2",
    },
    {
      k: "optional-node",
      prompt: "`maxDepth` is declared below the way LeetCode writes it, taking a tree node or None. Call it on `root`.",
      setup:
        "from typing import Optional\n" +
        TREE_NODE +
        "\ndef maxDepth(root: Optional[TreeNode]) -> int:\n    return 0 if not root else 1 + max(maxDepth(root.left), maxDepth(root.right))\nroot = TreeNode(1, TreeNode(2))",
      expect: "gives 2",
      solution: "maxDepth(root)",
      check: "_ == 2",
    },
    {
      k: "five-params",
      prompt:
        "`schedule` is declared below with five parameters, three of them optional. Call it with `n` and `tasks`, keeping the default `limit` and `order` but setting `strict` to True.",
      setup:
        'from typing import List, Optional\ndef schedule(n: int, tasks: List[str], limit: int = 2, strict: bool = False, order: Optional[List[int]] = None) -> str:\n    return f"{n}-{len(tasks)}-{limit}-{strict}-{order}"\nn = 3\ntasks = ["a", "b"]',
      expect: 'gives "3-2-2-True-None"',
      solution: "schedule(n, tasks, strict=True)",
      check: '_ == "3-2-2-True-None"',
      explain: "Required arguments by position, then only the optional ones you want, by name.",
    },
  ]),
]);
