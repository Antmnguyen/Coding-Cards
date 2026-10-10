import { skill, topic, v } from "../topic";
import { LIST_NODE, POINT, TREE_NODE } from "./given";

/**
 * Second-pass variants: extra data shapes for sections whose first pass sits
 * furthest below the plan's targets. Each deck uses the same topic tag as the
 * section it extends.
 */

const HQ = "import heapq";
const collect = (expr: string, depth = 1) => `out = []\n{answer}\n${"    ".repeat(depth)}out.append(${expr})`;

export const callingMore = topic("python", "calling", [
  skill("call-arg-types", 2, { explain: "The call looks the same whatever the argument types are: values go in the order the parameters are declared." }, [
    v("list-and-set", "`count_new` is the function below. Call it with the list `nums` and the set `seen`.", "def count_new(items, seen):\n    return len([x for x in items if x not in seen])\nnums = [1, 2, 3]\nseen = {2}", "gives 2", "count_new(nums, seen)", "_ == 2"),
    v("dict-key-default", "`lookup` is the function below. Call it on the dictionary `d` for the key `k`, passing 0 as the default.", 'def lookup(table, key, default=None):\n    return table.get(key, default)\nd = {"a": 1}\nk = "z"', "gives 0", "lookup(d, k, 0)", "_ == 0", {
      accepted: ["lookup(d, k, default=0)"],
    }),
    v("two-tuples", "`dist` is the function below, taking two (x, y) tuples. Call it on `a` and `b`.", "def dist(p, q):\n    return abs(p[0] - q[0]) + abs(p[1] - q[1])\na = (0, 0)\nb = (3, 4)", "gives 7", "dist(a, b)", "_ == 7"),
    v("bool-flag", "`ordered` is the function below. Call it on `nums` with the `descending` flag turned on.", "def ordered(nums, descending=False):\n    return sorted(nums, reverse=descending)\nnums = [1, 3, 2]", "gives [3, 2, 1]", "ordered(nums, descending=True)", "_ == [3, 2, 1]", {
      accepted: ["ordered(nums, True)"],
      explain: "Passing a flag by name makes the call readable: descending=True.",
    }),
    v("none-argument", "`walk` is the function below, taking a node and its parent. Call it on `root`, which has no parent.", 'def walk(node, parent):\n    return (node, parent)\nroot = "r"', 'gives ("r", None)', "walk(root, None)", '_ == ("r", None)'),
    v("string-and-char", '`count_char` is the function below. Call it to count the letter "a" in the string `word`.', 'def count_char(s, c):\n    return s.count(c)\nword = "banana"', "gives 3", 'count_char(word, "a")', "_ == 3"),
    v("grid-argument", "`total` is the function below, taking a list of lists. Call it on `grid`.", "def total(rows):\n    return sum(sum(r) for r in rows)\ngrid = [[1, 2], [3, 4]]", "gives 10", "total(grid)", "_ == 10"),
    v("two-arg-callback", "`combine` is the function below; its third argument is a function of two values. Call it on `xs` and `ys` with an inline function of `a` and `b` that adds them.", "def combine(xs, ys, f):\n    return [f(a, b) for a, b in zip(xs, ys)]\nxs = [1, 2]\nys = [10, 20]", "gives [11, 22]", "combine(xs, ys, lambda a, b: a + b)", "_ == [11, 22]"),
    v("object-argument", "`norm` is the function below, taking a `Point`. Call it on `p`.", POINT + "\ndef norm(pt):\n    return abs(pt.x) + abs(pt.y)\np = Point(3, -4)", "gives 7", "norm(p)", "_ == 7"),
  ]),

  skill("call-arg-expressions", 2, { explain: "Any expression can be an argument; it is evaluated first and its value is passed." }, [
    v("slice", "`total` is the function below and `nums` is a list. Call it on everything except the first item.", "def total(items):\n    return sum(items)\nnums = [10, 1, 2]", "gives 3", "total(nums[1:])", "_ == 3"),
    v("comprehension", "`total` is the function below and `nums` is a list. Call it on a list of each item doubled. Call each item `x`.", "def total(items):\n    return sum(items)\nnums = [1, 2, 3]", "gives 12", "total([x * 2 for x in nums])", "_ == 12", {
      accepted: ["total(x * 2 for x in nums)"],
    }),
    v("length-bound", "`clamp` is the function below, `nums` is a list and `i` is an index that may be too large. Call `clamp` to limit `i` to the valid indexes of `nums`.", "def clamp(x, lo, hi):\n    return max(lo, min(x, hi))\nnums = [5, 6, 7]\ni = 9", "gives 2", "clamp(i, 0, len(nums) - 1)", "_ == 2"),
    v("tuple-literal", "`visit` is the function below, taking ONE argument that is a (row, col) tuple. Call it for row `r`, column `c`.", "def visit(cell):\n    return cell\nr = 1\nc = 2", "gives (1, 2)", "visit((r, c))", "_ == (1, 2)", {
      explain: "visit(r, c) would pass two arguments; the inner parentheses make the tuple.",
    }),
    v("neighbour-cell", "`cell` is the function below. Call it to read the cell one row below row `r`, in the same column `c` of `grid`.", "def cell(grid, r, c):\n    return grid[r][c]\ngrid = [[1, 2], [3, 4]]\nr = 0\nc = 1", "gives 4", "cell(grid, r + 1, c)", "_ == 4"),
    v("field-of-object", "`square` is the function below and `p` is a `Point`. Call `square` on the point's `x` field.", POINT + "\ndef square(n):\n    return n * n\np = Point(3, 4)", "gives 9", "square(p.x)", "_ == 9"),
  ]),

  skill("call-chain", 2, { explain: "A call's result can be used straight away: indexed, called, or given another method call." }, [
    v("two-methods", "`s` is a string with spaces around it and mixed case. In one expression, strip the spaces and then lowercase it.", 's = "  Hello "', 'gives "hello"', "s.strip().lower()", '_ == "hello"', {
      accepted: ["s.lower().strip()"],
    }),
    v("strip-then-split", "`line` is a string of comma-separated values with a newline at the end. In one expression, strip it and then split it on commas.", 'line = "a,b,c\\n"', 'gives ["a", "b", "c"]', 'line.strip().split(",")', '_ == ["a", "b", "c"]'),
    v("field-of-result", "`make_point` is the function below, which returns a `Point`. In one expression, call it with 1 and 2 and read the `x` field of what it returns.", POINT + "\ndef make_point(x, y):\n    return Point(x, y)", "gives 1", "make_point(1, 2).x", "_ == 1"),
    v("call-the-result", "`adder` is the function below, which RETURNS a function. In one expression, call `adder` with 5 and then call what it returns with 3.", "def adder(n):\n    return lambda x: x + n", "gives 8", "adder(5)(3)", "_ == 8"),
    v("method-on-result", "`words_in` is the function below, which returns a list. In one expression, call it on `s` and count how many times the word `w` appears in the result.", 'def words_in(text):\n    return text.split()\ns = "a b a"\nw = "a"', "gives 2", "words_in(s).count(w)", "_ == 2"),
  ]),

  skill("call-with-key-function", 2, { explain: "A named function is passed as key= exactly like a lambda: by name, without parentheses." }, [
    v("sorted-key", "`score` is the function below and `words` is a list of strings. Get a sorted copy of `words` ordered by `score`.", 'def score(w):\n    return w.count("a")\nwords = ["banana", "kiwi", "apple"]', 'gives ["kiwi", "apple", "banana"]', "sorted(words, key=score)", '_ == ["kiwi", "apple", "banana"]'),
    v("max-key", "`score` is the function below and `words` is a list of strings. Get the word with the highest `score`.", 'def score(w):\n    return w.count("a")\nwords = ["banana", "kiwi", "apple"]', 'gives "banana"', "max(words, key=score)", '_ == "banana"'),
    v("filter-predicate", "`is_even` is the function below and `nums` is a list. Using `filter`, get a list of the items for which `is_even` is true.", "def is_even(n):\n    return n % 2 == 0\nnums = [1, 2, 3, 4]", "gives [2, 4]", "list(filter(is_even, nums))", "_ == [2, 4]", {
      accepted: ["[x for x in nums if is_even(x)]"],
    }),
    v("sort-in-place-key", "`by_end` is the function below and `intervals` is a list of [start, end] lists. Sort `intervals` in place using `by_end` as the key.", "def by_end(iv):\n    return iv[1]\nintervals = [[1, 9], [2, 3]]", "intervals becomes [[2, 3], [1, 9]]", "intervals.sort(key=by_end)", "intervals == [[2, 3], [1, 9]]"),
  ]),

  skill("call-solution-class", 2, { explain: "LeetCode wraps everything in class Solution, so helpers are called through self and the entry point through an object." }, [
    v("entry-point", "`Solution` is the class below. Create an object and call its `twoSum` method with `nums` and `target`, in one expression.", "class Solution:\n    def twoSum(self, nums, target):\n        return [0, 1]\nnums = [2, 7]\ntarget = 9", "gives [0, 1]", "Solution().twoSum(nums, target)", "_ == [0, 1]"),
    v("existing-object", "`sol` is a `Solution` object. Call its `maxDepth` method on `root`.", 'class Solution:\n    def maxDepth(self, root):\n        return 0 if root is None else 1\nsol = Solution()\nroot = "r"', "gives 1", "sol.maxDepth(root)", "_ == 1"),
    v("self-recursion", "`root` is a tree of `TreeNode` objects. You are inside the method `depth` below, which calls itself. Write the recursive call on the node's left child.", TREE_NODE + "\nroot = TreeNode(1, TreeNode(2, TreeNode(3)))", "result ends up 3", "self.depth(node.left)", "result == 3", {
      template: "class Solution:\n    def depth(self, node):\n        if not node:\n            return 0\n        left = (\n            {answer}\n        )\n        return 1 + max(left, self.depth(node.right))\n\nresult = Solution().depth(root)",
      explain: "Inside a class, even a recursive call goes through self.",
    }),
    v("self-with-three-args", "You are inside the method `dfs` below, which takes a row, a column and the visited set. Write the recursive call for the cell one row down, same column, same set.", "", "result ends up 3", "self.dfs(r + 1, c, visited)", "result == 3", {
      template: "class Solution:\n    def dfs(self, r, c, visited):\n        if r == 3:\n            return len(visited)\n        visited.add((r, c))\n        return (\n            {answer}\n        )\n\nresult = Solution().dfs(0, 0, set())",
    }),
  ]),

  skill("call-recursive-shapes", 2, { explain: "Recursive calls differ only in how the arguments shrink towards the base case." }, [
    v("two-calls", "You are inside the recursive function `fib` below. Return the sum of the two recursive calls: one on `n - 1` and one on `n - 2`.", "", "result ends up 8", "return fib(n - 1) + fib(n - 2)", "result == 8", {
      template: "def fib(n):\n    if n < 2:\n        return n\n    {answer}\n\nresult = fib(6)",
    }),
    v("with-depth", "`root` is a tree of `TreeNode` objects. Inside `walk` below, `depth` is the current depth. Write the recursive call on the left child, one level deeper.", TREE_NODE + "\nroot = TreeNode(1, TreeNode(2, TreeNode(3)))", "best ends up 2, the deepest level reached", "walk(node.left, depth + 1)", "best == 2", {
      template: "best = 0\ndef walk(node, depth):\n    global best\n    if not node:\n        return\n    best = max(best, depth)\n    {answer}\n    walk(node.right, depth + 1)\n\nwalk(root, 0)",
    }),
    v("neighbour", "`grid` is a grid of 0s and 1s. Inside `dfs` below, the loop gives a direction `dr`, `dc`. Write the recursive call on the neighbouring cell in that direction.", "grid = [[1, 1], [0, 1]]", "seen ends up holding the 3 cells that contain 1", "dfs(r + dr, c + dc)", "seen == {(0, 0), (0, 1), (1, 1)}", {
      template: "seen = set()\ndef dfs(r, c):\n    if not (0 <= r < 2 and 0 <= c < 2) or grid[r][c] == 0 or (r, c) in seen:\n        return\n    seen.add((r, c))\n    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n        {answer}\n\ndfs(0, 0)",
    }),
    v("next-node", "`head` is a linked list of `ListNode` objects. You are inside the recursive function `length` below. Return 1 plus the length of the rest of the list.", LIST_NODE + "\nhead = ListNode(1, ListNode(2, ListNode(3)))", "result ends up 3", "return 1 + length(node.next)", "result == 3", {
      template: "def length(node):\n    if not node:\n        return 0\n    {answer}\n\nresult = length(head)",
    }),
  ]),
]);

export const loopsMore = topic("python", "loops", [
  skill("for-windows", 2, { explain: "The last valid start of a window of size k is len(nums) - k, so the range stops at len(nums) - k + 1." }, [
    v("window-starts", "`nums` is a list and `k` is a window size. Loop `i` over every index at which a full window of `k` items can start. Write only the `for` line.", "nums = [1, 2, 3, 4]\nk = 3", "out ends up [[1, 2, 3], [2, 3, 4]]", "for i in range(len(nums) - k + 1):", "out == [[1, 2, 3], [2, 3, 4]]", {
      template: collect("nums[i:i + k]"),
    }),
    v("first-half", "`s` is a string. Loop `i` over the indexes of its first half only, for comparing each character with its mirror. Write only the `for` line.", 's = "abcba"', "out ends up [(0, 4), (1, 3)]", "for i in range(len(s) // 2):", "out == [(0, 4), (1, 3)]", {
      template: collect("(i, len(s) - 1 - i)"),
    }),
    v("back-by-two", "`n` is an int. Loop `i` downwards from `n - 1` in steps of 2, stopping before it goes below 0. Write only the `for` line.", "n = 6", "out ends up [5, 3, 1]", "for i in range(n - 1, -1, -2):", "out == [5, 3, 1]", {
      template: collect("i"),
    }),
    v("from-second-item", "`nums` is a list. Loop over its items from the SECOND one onwards, calling each `x`, without using indexes. Write only the `for` line.", "nums = [9, 1, 2]", "out ends up [1, 2]", "for x in nums[1:]:", "out == [1, 2]", {
      template: collect("x"),
    }),
  ]),

  skill("for-nested-three", 3, { explain: "Each inner loop starts just past the one outside it, so every combination appears once." }, [
    v("triples", "`n` is an int. Visit every triple of indexes `i`, `j`, `k` with `i` less than `j` less than `k`. Write the three nested `for` lines.", "n = 4", "out ends up the 4 triples (0, 1, 2), (0, 1, 3), (0, 2, 3), (1, 2, 3)", "for i in range(n):\n    for j in range(i + 1, n):\n        for k in range(j + 1, n):", "out == [(0, 1, 2), (0, 1, 3), (0, 2, 3), (1, 2, 3)]", {
      template: collect("(i, j, k)", 3),
    }),
  ]),

  skill("for-derived", 2, { explain: "The thing being looped over can be any expression: a sorted copy, a slice, a zip, an enumerate." }, [
    v("sorted-set", "`seen` is a set. Loop over its items in sorted order, calling each `x`. Write only the `for` line.", "seen = {3, 1, 2}", "out ends up [1, 2, 3]", "for x in sorted(seen):", "out == [1, 2, 3]", {
      template: collect("x"),
    }),
    v("items-by-value", "`d` is a dictionary. Loop over its (key, value) pairs ordered by value, unpacking into `k` and `v`. Call each pair `kv` in the sort key. Write only the `for` line.", 'd = {"a": 3, "b": 1}', 'out ends up ["b", "a"]', "for k, v in sorted(d.items(), key=lambda kv: kv[1]):", 'out == ["b", "a"]', {
      template: collect("k"),
    }),
    v("enumerate-objects", "`points` is a list of `Point` objects. Loop with the index `i` and the object `p`. Write only the `for` line.", POINT + "\npoints = [Point(5, 0), Point(7, 0)]", "out ends up [(0, 5), (1, 7)]", "for i, p in enumerate(points):", "out == [(0, 5), (1, 7)]", {
      template: collect("(i, p.x)"),
    }),
    v("adjacent-objects", "`points` is a list of `Point` objects. Loop over each pair of neighbouring points as `p` and `q`. Write only the `for` line.", POINT + "\npoints = [Point(1, 0), Point(4, 0), Point(9, 0)]", "out ends up [3, 5]", "for p, q in zip(points, points[1:]):", "out == [3, 5]", {
      template: collect("q.x - p.x"),
    }),
    v("copy-while-removing", "`nums` is a list and the loop body removes items from it. Loop over a COPY of the list, calling each item `x`, so removing is safe. Write only the `for` line.", "nums = [1, 2, 3, 4]", "nums becomes [1, 3]", "for x in nums[:]:", "nums == [1, 3]", {
      template: "{answer}\n    if x % 2 == 0:\n        nums.remove(x)",
      accepted: ["for x in list(nums):", "for x in nums.copy():"],
      explain: "Removing from a list while looping over that same list skips items.",
    }),
    v("ends-inward", "`n` is an int. In one loop, run `i` up from 0 and `j` down from `n - 1` together. Write only the `for` line.", "n = 3", "out ends up [(0, 2), (1, 1), (2, 0)]", "for i, j in zip(range(n), range(n - 1, -1, -1)):", "out == [(0, 2), (1, 1), (2, 0)]", {
      template: collect("(i, j)"),
      accepted: ["for i, j in zip(range(n), reversed(range(n))):"],
    }),
  ]),

  skill("while-more", 2, { explain: "A while condition is any expression; it is re-tested before every pass." }, [
    v("not-flag", "`done` is a boolean that the body eventually sets to True. Loop for as long as it is false. Write only the `while` line.", "done = False", "n ends up 3", "while not done:", "n == 3", {
      template: "n = 0\n{answer}\n    n += 1\n    done = n == 3",
    }),
    v("merge-two", "`a` and `b` are sorted lists with indexes `i` and `j`. Loop while BOTH indexes are still inside their lists. Write only the `while` line.", "a = [1, 4]\nb = [2, 3, 9]\ni = 0\nj = 0", "out ends up [1, 2, 3, 4]", "while i < len(a) and j < len(b):", "out == [1, 2, 3, 4]", {
      template: "out = []\n{answer}\n    if a[i] <= b[j]:\n        out.append(a[i])\n        i += 1\n    else:\n        out.append(b[j])\n        j += 1",
    }),
    v("half-open-search", "`lo` and `hi` bound a binary search where `hi` is one past the last candidate. Loop while the range is not empty. Write only the `while` line.", "lo = 0\nhi = 4", "out ends up [(0, 4), (3, 4)]", "while lo < hi:", "out == [(0, 4), (3, 4)]", {
      template: "out = []\n{answer}\n    out.append((lo, hi))\n    lo = (lo + hi) // 2 + 1",
    }),
    v("until-one", "`n` is a positive int that the body keeps halving. Loop until it reaches 1. Write only the `while` line.", "n = 8", "steps ends up 3", "while n > 1:", "steps == 3", {
      template: "steps = 0\n{answer}\n    n //= 2\n    steps += 1",
      accepted: ["while n != 1:"],
    }),
    v("heap-top-small", "`h` is a min-heap and `x` is a number. Loop while the heap is not empty and its smallest item is less than `x`. Write only the `while` line.", HQ + "\nh = [1, 3, 8]\nx = 5", "h ends up [8]", "while h and h[0] < x:", "h == [8]", {
      template: "{answer}\n    heapq.heappop(h)",
    }),
    v("walrus", "`it` is an iterator. Using the walrus operator, loop while the next item `x` taken from it is not None. Write only the `while` line.", "it = iter([5, 6])", "out ends up [5, 6]", "while (x := next(it, None)) is not None:", "out == [5, 6]", {
      template: collect("x"),
      explain: ":= assigns inside an expression; it needs its own parentheses here.",
    }),
  ]),
]);

export const heapsMore = topic("python", "heaps", [
  skill("heap-two-heaps", 3, { explain: "A running median keeps the lower half in a max-heap (negated) and the upper half in a min-heap." }, [
    v("push-lower", "The `heapq` module is imported. `small` is the MAX-heap of the lower half, stored negated. Add the number `x` to it.", HQ + "\nsmall = []\nx = 4", "small becomes [-4]", "heapq.heappush(small, -x)", "small == [-4]"),
    v("move-across", "The `heapq` module is imported. `small` is a max-heap stored negated and `large` is a min-heap. Move the largest value of `small` over to `large`, in one line.", HQ + "\nsmall = [-7, -2]\nlarge = [9]", "small becomes [-2], and large holds 7 and 9", "heapq.heappush(large, -heapq.heappop(small))", "small == [-2] and sorted(large) == [7, 9]", {
      explain: "Pop gives the negated value; negate it back before pushing onto the min-heap.",
    }),
    v("median-even", "`small` is a max-heap stored negated and `large` is a min-heap, of equal size. Get the median: the average of the two middle values.", "small = [-4, -1]\nlarge = [6, 9]", "gives 5.0", "(-small[0] + large[0]) / 2", "_ == 5.0", {
      accepted: ["(large[0] - small[0]) / 2"],
    }),
    v("rebalance-test", "`small` and `large` are the two heaps of a running median. Write the `if` line whose block runs when `small` has more than one item extra.", "small = [-5, -4, -1]\nlarge = [9]", 'out ends up "yes"', "if len(small) > len(large) + 1:", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
    }),
  ]),

  skill("heap-simulations", 3, { explain: "Simulation problems pop the extreme items, combine them, and push the result back." }, [
    v("pop-two-largest", "The `heapq` module is imported. `h` is a MAX-heap stored negated. Pop the two largest values into `a` and `b` as positive numbers (2 lines).", HQ + "\nh = [-8, -7, -1]", "a is 8, b is 7", "a = -heapq.heappop(h)\nb = -heapq.heappop(h)", "(a, b) == (8, 7) and h == [-1]"),
    v("push-difference", "The `heapq` module is imported. `h` is a MAX-heap stored negated, and `a` and `b` are two values with `a` larger. Push their difference back onto the heap.", HQ + "\nh = [-1]\na = 8\nb = 7", "h holds -1 twice", "heapq.heappush(h, -(a - b))", "sorted(h) == [-1, -1]", {
      accepted: ["heapq.heappush(h, b - a)"],
    }),
    v("use-and-return", "The `heapq` module is imported. `h` is a max-heap of (negated count, task) tuples. Pop the most frequent task, use it once, and push it back if any uses remain (3 lines). Use `n` and `task`.", HQ + '\nh = [(-2, "a"), (-1, "b")]', 'h holds (-1, "a") and (-1, "b")', "n, task = heapq.heappop(h)\nif n + 1 < 0:\n    heapq.heappush(h, (n + 1, task))", 'sorted(h) == [(-1, "a"), (-1, "b")]', {
      explain: "Counts are negated, so using one up is n + 1, and work remains while that is still below 0.",
    }),
    v("replace-if-larger", "The `heapq` module is imported. `h` is a min-heap holding the k largest values seen, and `x` is a new value. When `x` beats the smallest of them, swap it in (2 lines).", HQ + "\nh = [4, 8]\nx = 6", "h ends up holding 6 and 8", "if x > h[0]:\n    heapq.heapreplace(h, x)", "sorted(h) == [6, 8]"),
    v("advance-list", "The `heapq` module is imported. `h` is a heap of (value, list index, node) tuples for merging linked lists, and `node` was just popped from list `i`. If it has a next node, push that one (2 lines).", HQ + "\n" + LIST_NODE + "\nh = []\nnode = ListNode(1, ListNode(5))\ni = 0", "h holds one tuple: (5, 0, the next node)", "if node.next:\n    heapq.heappush(h, (node.next.val, i, node.next))", "len(h) == 1 and h[0][:2] == (5, 0)"),
  ]),

  skill("heap-shapes", 2, { explain: "Whatever goes on the heap, the first element of the tuple is what it is ordered by." }, [
    v("by-length", "The `heapq` module is imported. `h` is a min-heap that should give the SHORTEST word first. Push `word` with its length as the priority.", HQ + '\nh = []\nword = "kiwi"', 'h becomes [(4, "kiwi")]', "heapq.heappush(h, (len(word), word))", 'h == [(4, "kiwi")]'),
    v("max-by-score", "The `heapq` module is imported. `h` is a heap that should give the HIGHEST score first. Push `name` with its `score`, negated so the largest comes out first.", HQ + '\nh = []\nname = "ann"\nscore = 90', 'h becomes [(-90, "ann")]', "heapq.heappush(h, (-score, name))", 'h == [(-90, "ann")]'),
    v("heap-sort", "The `heapq` module is imported and `nums` is a list. Turn it into a heap, then build `out` by popping until it is empty, giving the items in sorted order (2 lines).", HQ + "\nnums = [3, 1, 2]", "out is [1, 2, 3]", "heapq.heapify(nums)\nout = [heapq.heappop(nums) for _ in range(len(nums))]", "out == [1, 2, 3]"),
    v("largest-pairs", "The `heapq` module is imported. `pairs` is a list of (count, item) tuples and `k` is an int. Get the `k` pairs with the highest counts.", HQ + '\npairs = [(1, "a"), (5, "b"), (3, "c")]\nk = 2', 'gives [(5, "b"), (3, "c")]', "heapq.nlargest(k, pairs)", '_ == [(5, "b"), (3, "c")]', {
      explain: "Tuples compare by their first value, so no key is needed when the count comes first.",
    }),
    v("timed-out", "The `heapq` module is imported. `h` is a min-heap of (expiry time, name) tuples and `t` is the current time. Write only the `while` line that runs while the heap is not empty and its earliest entry has expired.", HQ + '\nh = [(1, "a"), (4, "b"), (9, "c")]\nt = 5', 'h ends up [(9, "c")]', "while h and h[0][0] <= t:", 'h == [(9, "c")]', {
      template: "{answer}\n    heapq.heappop(h)",
    }),
  ]),
]);

export const dictsMore = topic("python", "dicts", [
  skill("dict-value-shapes", 2, { explain: "A dict value can be anything; what you do after d[k] depends on what is stored there." }, [
    v("store-tuple", "`ranges` is a dictionary. Store the pair of `lo` and `hi` under the key `k`, as a tuple.", 'ranges = {}\nk = "a"\nlo = 1\nhi = 9', 'ranges becomes {"a": (1, 9)}', "ranges[k] = (lo, hi)", 'ranges == {"a": (1, 9)}'),
    v("unpack-tuple-value", "`ranges` is a dictionary whose values are (low, high) tuples. Read the value for `k` straight into `lo` and `hi`.", 'ranges = {"a": (1, 9)}\nk = "a"', "lo is 1, hi is 9", "lo, hi = ranges[k]", "(lo, hi) == (1, 9)"),
    v("object-field", "`by_name` is a dictionary whose values are `Point` objects. Get the `x` field of the point stored under `k`.", POINT + '\nby_name = {"p": Point(4, 5)}\nk = "p"', "gives 4", "by_name[k].x", "_ == 4"),
    v("list-length", "`graph` is a dictionary mapping a node to a list of its neighbours. Get how many neighbours `node` has.", "graph = {1: [2, 3, 4]}\nnode = 1", "gives 3", "len(graph[node])", "_ == 3"),
    v("total-list-lengths", "`graph` is a dictionary mapping a node to a list of its neighbours. Get the total number of entries across all the lists. Call each list `v`.", "graph = {1: [2, 3], 2: [3]}", "gives 3", "sum(len(v) for v in graph.values())", "_ == 3"),
    v("nested-safe-get", "`d` is a dictionary of dictionaries, and either level may be missing a key. Get the value under `a` then `b`, or 0 when anything is missing, without raising.", 'd = {"x": {"y": 7}}\na = "q"\nb = "y"', "gives 0", "d.get(a, {}).get(b, 0)", "_ == 0", {
      explain: "The first get falls back to an empty dict, so the second get is always safe.",
    }),
    v("dict-of-dicts-set", "`d` is a dictionary of dictionaries and `a` may not be a key yet. Store `val` under `a` then `b`, creating the inner dictionary if needed (3 lines).", 'd = {}\na = "x"\nb = "y"\nval = 7', 'd becomes {"x": {"y": 7}}', "if a not in d:\n    d[a] = {}\nd[a][b] = val", 'd == {"x": {"y": 7}}', {
      accepted: ["d.setdefault(a, {})[b] = val"],
    }),
    v("list-of-dicts", "`rows` is a list of dictionaries, each with a name and an age. Get the name stored in the row at index `i`.", 'rows = [{"name": "ann", "age": 30}, {"name": "bob", "age": 25}]\ni = 1', 'gives "bob"', 'rows[i]["name"]', '_ == "bob"'),
    v("sort-list-of-dicts", "`rows` is a list of dictionaries, each with a name and an age. Get a sorted copy ordered by age. Call each dictionary `r`.", 'rows = [{"name": "ann", "age": 30}, {"name": "bob", "age": 25}]', "gives bob's row first, then ann's", 'sorted(rows, key=lambda r: r["age"])', '[r["name"] for r in _] == ["bob", "ann"]'),
  ]),

  skill("dict-queries", 2, { explain: "Questions about a whole dict are comprehensions or generators over items(), keys() or values()." }, [
    v("keys-with-value", "`d` is a dictionary and `target` is a value. Build a list of every key whose value equals `target`. Use `k` and `v`.", 'd = {"a": 1, "b": 2, "c": 1}\ntarget = 1', 'gives ["a", "c"]', "[k for k, v in d.items() if v == target]", '_ == ["a", "c"]'),
    v("first-key-with-value", "`d` is a dictionary of counts, in insertion order. Get the first key whose count is 1. Use `k` and `v`.", 'd = {"a": 2, "b": 1, "c": 1}', 'gives "b"', "next(k for k, v in d.items() if v == 1)", '_ == "b"'),
    v("count-values", "`d` is a dictionary of counts. Count how many keys have a count of exactly 1. Call each count `v`.", 'd = {"a": 2, "b": 1, "c": 1}', "gives 2", "sum(v == 1 for v in d.values())", "_ == 2", {
      accepted: ["sum(1 for v in d.values() if v == 1)", "list(d.values()).count(1)"],
    }),
    v("largest-pair", "`d` is a dictionary of counts. Get the (key, count) PAIR with the largest count. Call each pair `kv`.", 'd = {"a": 1, "b": 5}', 'gives ("b", 5)', "max(d.items(), key=lambda kv: kv[1])", '_ == ("b", 5)'),
    v("smallest-then-alpha", "`d` is a dictionary of counts. Get the key with the smallest count, taking the alphabetically first key on a tie. Call each key `k`.", 'd = {"b": 1, "a": 1, "c": 5}', 'gives "a"', "min(d, key=lambda k: (d[k], k))", '_ == "a"'),
    v("shared-keys", "`d1` and `d2` are dictionaries. Get the set of keys that appear in both.", 'd1 = {"a": 1, "b": 2}\nd2 = {"b": 9, "c": 3}', 'gives {"b"}', "d1.keys() & d2.keys()", '_ == {"b"}', {
      accepted: ["set(d1) & set(d2)"],
      explain: "Key views support set operators directly.",
    }),
    v("equal", "`d1` and `d2` are dictionaries built in different orders. Write an expression that is True when they hold the same keys and values.", 'd1 = {"a": 1, "b": 2}\nd2 = {"b": 2, "a": 1}', "gives True", "d1 == d2", "_ is True", {
      explain: "Insertion order does not matter for dict equality.",
    }),
    v("items-sorted-by-key", "`d` is a dictionary. Get its (key, value) pairs as a list sorted by key.", 'd = {"b": 2, "a": 1}', 'gives [("a", 1), ("b", 2)]', "sorted(d.items())", '_ == [("a", 1), ("b", 2)]'),
  ]),

  skill("dict-patterns", 2, { explain: "Most hashmap solutions are one of two loops: count everything, or look up a complement while storing what has been seen." }, [
    v("count-loop", "`d` is an empty plain dictionary and `nums` is a list. Count how many times each item appears (2 lines). Call each item `x`.", "d = {}\nnums = [1, 1, 2]", "d becomes {1: 2, 2: 1}", "for x in nums:\n    d[x] = d.get(x, 0) + 1", "d == {1: 2, 2: 1}"),
    v("char-counts-comprehension", "`s` is a string. In one expression, build a dictionary mapping each distinct character `c` to how many times it appears.", 's = "aab"', 'gives {"a": 2, "b": 1}', "{c: s.count(c) for c in set(s)}", '_ == {"a": 2, "b": 1}'),
    v("two-sum-check", "Inside the function below, `seen` maps each earlier number to its index, and `x` is the number at index `i`. When the number needed to reach `target` has been seen, return its index and `i` as a list (2 lines).", "", "result ends up [0, 1]", "if target - x in seen:\n    return [seen[target - x], i]", "result == [0, 1]", {
      template: "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        {answer}\n        seen[x] = i\n\nresult = two_sum([2, 7, 11], 9)",
    }),
    v("popitem", "`d` is a dictionary. Remove its most recently added entry and get it back as a (key, value) tuple.", 'd = {"a": 1, "b": 2}', 'gives ("b", 2), and d becomes {"a": 1}', "d.popitem()", '_ == ("b", 2) and d == {"a": 1}'),
  ]),
]);

export const stringsMore = topic("python", "strings", [
  skill("str-pad-case", 2, { explain: "Padding and case methods all return new strings." }, [
    v("rjust", "`s` is a short string. Pad it with spaces on the LEFT to a width of 5, so the text sits on the right.", 's = "42"', 'gives "   42"', "s.rjust(5)", '_ == "   42"', {
      accepted: ['f"{s:>5}"'],
    }),
    v("ljust-fill", "`s` is a short string. Pad it with dots on the RIGHT to a width of 5.", 's = "ab"', 'gives "ab..."', 's.ljust(5, ".")', '_ == "ab..."'),
    v("capitalize", "`s` is a lowercase word. Get it with only its first letter in uppercase.", 's = "hello"', 'gives "Hello"', "s.capitalize()", '_ == "Hello"', {
      accepted: ["s[0].upper() + s[1:]", "s.title()"],
    }),
    v("title", "`s` is a lowercase sentence. Get it with the first letter of EVERY word in uppercase.", 's = "hello big world"', 'gives "Hello Big World"', "s.title()", '_ == "Hello Big World"'),
    v("swapcase", "`s` is a string in mixed case. Get it with every letter's case flipped.", 's = "aBc"', 'gives "AbC"', "s.swapcase()", '_ == "AbC"'),
    v("is-lower", "`c` is a single character. Check whether it is a lowercase letter.", 'c = "q"', "gives True", "c.islower()", "_ is True"),
  ]),

  skill("str-cut", 3, { explain: "Besides split there are tools for cutting once, cutting from the right, and trimming a known prefix." }, [
    v("partition", "`s` is a string with one equals sign. Cut it into the part before, the sign itself, and the part after, as a 3-value tuple.", 's = "key=val"', 'gives ("key", "=", "val")', 's.partition("=")', '_ == ("key", "=", "val")'),
    v("rsplit-once", "`s` is a sentence as a string. Split it ONCE, at its last space, into a 2-item list.", 's = "the quick fox"', 'gives ["the quick", "fox"]', 's.rsplit(" ", 1)', '_ == ["the quick", "fox"]'),
    v("splitlines", "`text` is a string holding several lines. Break it into a list of the lines.", 'text = "a\\nb\\nc"', 'gives ["a", "b", "c"]', "text.splitlines()", '_ == ["a", "b", "c"]', {
      accepted: ['text.split("\\n")'],
    }),
    v("strip-chars", "`s` is a string wrapped in round brackets. Remove the brackets from both ends.", 's = "(abc)"', 'gives "abc"', 's.strip("()")', '_ == "abc"', {
      accepted: ["s[1:-1]"],
      explain: "The argument of strip is a set of characters to remove, not a prefix.",
    }),
    v("removeprefix", "`s` is a string that may start with the prefix `p`. Get it with that prefix removed, if present.", 's = "unhappy"\np = "un"', 'gives "happy"', "s.removeprefix(p)", '_ == "happy"', {
      accepted: ["s[len(p):] if s.startswith(p) else s"],
    }),
    v("last-word-length", "`s` is a sentence as a string, possibly with spaces at the end. Get the length of its last word.", 's = "fly me to the moon  "', "gives 4", "len(s.split()[-1])", "_ == 4"),
    v("numeric-substring", "`s` is a string and `i`, `j` mark a stretch of digits inside it. Get that stretch as an int.", 's = "ab123cd"\ni = 2\nj = 5', "gives 123", "int(s[i:j])", "_ == 123"),
    v("version-parts", "`ver` is a version string with numbers separated by dots. Get the numbers as a list of ints.", 'ver = "1.20.3"', "gives [1, 20, 3]", 'list(map(int, ver.split(".")))', "_ == [1, 20, 3]", {
      accepted: ['[int(x) for x in ver.split(".")]'],
    }),
  ]),

  skill("str-scan", 2, { explain: "Counting and searching over characters is a generator inside sum, any or next." }, [
    v("count-vowels", "`s` is a lowercase string. Count how many of its characters are vowels. Call each character `c`.", 's = "education"', "gives 5", 'sum(c in "aeiou" for c in s)', "_ == 5", {
      accepted: ['sum(1 for c in s if c in "aeiou")'],
    }),
    v("adjacent-equal", "`s` is a string. Count the positions where a character equals the one right after it. Use `a` and `b`.", 's = "aabbbc"', "gives 3", "sum(a == b for a, b in zip(s, s[1:]))", "_ == 3"),
    v("first-unique", "`s` is a string. Get the index of the first character that appears only once, or -1 when there is none. Use `i` and `c`.", 's = "aabcb"', "gives 3", "next((i for i, c in enumerate(s) if s.count(c) == 1), -1)", "_ == 3"),
    v("any-digit", "`s` is a string. Write an expression that is True when it contains at least one digit. Call each character `c`.", 's = "ab3"', "gives True", "any(c.isdigit() for c in s)", "_ is True"),
    v("all-lower", "`s` is a string of letters. Write an expression that is True when it has no uppercase letters.", 's = "abc"', "gives True", "s == s.lower()", "_ is True", {
      accepted: ["s.islower()"],
    }),
  ]),

  skill("str-rebuild", 3, { explain: "Transforming a string is: break it into pieces, change each piece, join them back." }, [
    v("reverse-each-word", "`s` is a sentence as a string. Get the sentence with every word reversed but the word order kept. Call each word `w`.", 's = "ab cd"', 'gives "ba dc"', '" ".join(w[::-1] for w in s.split())', '_ == "ba dc"'),
    v("caesar-shift", "`c` is a lowercase letter and `k` is a shift. Get the letter `k` places later in the alphabet, wrapping round from z to a.", 'c = "y"\nk = 3', 'gives "b"', 'chr((ord(c) - ord("a") + k) % 26 + ord("a"))', '_ == "b"'),
    v("separator-line", "`n` is an int. Build a string of `n` dashes.", "n = 5", 'gives "-----"', '"-" * n', '_ == "-----"'),
    v("upper-each", "`s` is a string. Build a new string in which every character at an even index is uppercased and the rest are left alone. Use `i` and `c`.", 's = "abcd"', 'gives "AbCd"', '"".join(c.upper() if i % 2 == 0 else c for i, c in enumerate(s))', '_ == "AbCd"'),
  ]),
]);
