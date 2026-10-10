import { skill, topic, v } from "../topic";

/** Runs a memoised `fib` whose decorator line is the answer. */
const FIB = "from functools import cache, lru_cache\n{answer}\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nresult = fib(10)";

export const twoPointers = topic("python", "two-pointers", [
  skill("tp-setup", 1, { explain: "Two pointers start either at both ends or both at the front, depending on the problem." }, [
    v("both-ends", "`nums` is a list. In one line, start `l` at its first index and `r` at its last.", "nums = [1, 2, 3, 4]", "l is 0, r is 3", "l, r = 0, len(nums) - 1", "(l, r) == (0, 3)"),
    v("string-ends", "`s` is a string. In one line, start `i` at its first index and `j` at its last.", 's = "level"', "i is 0, j is 4", "i, j = 0, len(s) - 1", "(i, j) == (0, 4)"),
    v("window-start", "In one line, create the left edge `l` of a sliding window at 0 and the best answer so far `best` at 0.", "", "l is 0, best is 0", "l = best = 0", "(l, best) == (0, 0)", {
      accepted: ["l, best = 0, 0"],
    }),
  ]),

  skill("tp-move", 2, { explain: "Each step moves one or both pointers towards the other, based on a comparison." }, [
    v("inward", "`l` and `r` are two pointers moving towards each other. Move both one step inward (2 lines).", "l = 0\nr = 5", "l is 1, r is 4", "l += 1\nr -= 1", "(l, r) == (1, 4)", {
      accepted: ["l, r = l + 1, r - 1"],
    }),
    v("swap-ends", "`nums` is a list and `l`, `r` are indexes at its two ends. Swap the two items they point at.", "nums = [1, 2, 3, 4]\nl = 0\nr = 3", "nums becomes [4, 2, 3, 1]", "nums[l], nums[r] = nums[r], nums[l]", "nums == [4, 2, 3, 1]"),
    v("sum-of-ends", "`nums` is a sorted list and `l`, `r` are indexes at its two ends. Store the sum of the two items they point at in `total`.", "nums = [1, 2, 7, 11]\nl = 0\nr = 3", "total is 12", "total = nums[l] + nums[r]", "total == 12"),
    v("skip-duplicates", "`nums` is a sorted list and `l`, `r` are two pointers. Write the `while` line that keeps advancing `l` while the pointers have not met and the item at `l` equals the item just before it.", "nums = [1, 1, 1, 2, 3]\nl = 1\nr = 4", "l ends up 3, the first item that differs", "while l < r and nums[l] == nums[l - 1]:", "l == 3", {
      template: "{answer}\n    l += 1",
    }),
    v("write-pointer", "`nums` is a list being compacted in place, `k` is the next position to write to, and `x` is an item to keep. Write `x` at position `k` and advance `k` (2 lines).", "nums = [0, 0, 0]\nk = 1\nx = 7", "nums becomes [0, 7, 0], and k is 2", "nums[k] = x\nk += 1", "nums == [0, 7, 0] and k == 2"),
    v("compare-ends", "`s` is a string and `l`, `r` are indexes at its two ends. Write the `if` line whose block runs when the two characters differ, meaning the string is not a palindrome.", 's = "abca"\nl = 1\nr = 2', 'out ends up "yes"', "if s[l] != s[r]:", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
    }),
  ]),

  skill("window", 2, { explain: "A sliding window grows on the right every step and shrinks from the left while it breaks the rule." }, [
    v("length", "`l` and `r` are the two ends of a window, both included. Get how many items the window holds.", "l = 2\nr = 5", "gives 4", "r - l + 1", "_ == 4", {
      explain: "Both ends are inside the window, hence the + 1.",
    }),
    v("count-entering", "`counts` is a plain dictionary of character counts for the window, `s` is the string and `r` is the right edge. Count the character entering the window.", 'counts = {}\ns = "abc"\nr = 1', 'counts becomes {"b": 1}', "counts[s[r]] = counts.get(s[r], 0) + 1", 'counts == {"b": 1}'),
    v("shrink-while-over", "`nums` is a list, `l` is the left edge of the current window and `total` is its sum, which must not exceed `target`. Write the `while` line that keeps shrinking as long as the window is over the limit.", "nums = [5, 1, 3]\ntotal = 9\ntarget = 4\nl = 0", "l ends up 1, and total is 4", "while total > target:", "l == 1 and total == 4", {
      template: "{answer}\n    total -= nums[l]\n    l += 1",
    }),
    v("shrink-body", "`nums` is a list, `total` is the sum of the current window and `l` is its left edge. Remove the leftmost item from the window: take it off the total and move the edge (2 lines).", "nums = [5, 1, 3]\ntotal = 9\nl = 0", "total is 4, and l is 1", "total -= nums[l]\nl += 1", "total == 4 and l == 1"),
    v("shrink-until-unique", "`s` is a string. `seen` is the set of characters in the window from `l` up to but not including `r`, and the character at `r` is already in it. Shrink from the left until that character is gone (3 lines).", 's = "abca"\nseen = {"a", "b", "c"}\nl = 0\nr = 3', 'seen becomes {"b", "c"}, and l is 1', "while s[r] in seen:\n    seen.remove(s[l])\n    l += 1", 'seen == {"b", "c"} and l == 1'),
    v("slide-fixed", "`nums` is a list and `total` is the sum of a window of fixed size `k` that ends just before index `r`. Slide the window one step right in one line: add the item entering at `r` and drop the item leaving.", "nums = [1, 2, 3, 4]\nk = 2\nr = 2\ntotal = 3", "total becomes 5", "total += nums[r] - nums[r - k]", "total == 5"),
  ]),
]);

export const prefixSums = topic("python", "prefix-sums", [
  skill("prefix-build", 2, { explain: "A prefix array with a leading 0 holds the total of the first i items at index i." }, [
    v("loop", "`nums` is a list of numbers and `prefix` starts as [0]. Extend `prefix` so that each new entry is the previous entry plus the next number (2 lines). Call each number `x`.", "nums = [1, 2, 3]\nprefix = [0]", "prefix becomes [0, 1, 3, 6]", "for x in nums:\n    prefix.append(prefix[-1] + x)", "prefix == [0, 1, 3, 6]"),
    v("range-sum", "`prefix` is a prefix-sum list with a leading 0. Get the sum of the original items from index `i` through index `j`, both included.", "prefix = [0, 1, 3, 6, 10]\ni = 1\nj = 2", "gives 5", "prefix[j + 1] - prefix[i]", "_ == 5", {
      explain: "With the leading 0, prefix[j + 1] covers items 0..j and prefix[i] covers items 0..i-1.",
    }),
    v("suffix", "`n` is the length of a list. Create `suffix`, a list of `n + 1` ones, ready to be filled with products from the right.", "n = 3", "suffix is [1, 1, 1, 1]", "suffix = [1] * (n + 1)", "suffix == [1, 1, 1, 1]"),
  ]),

  skill("running-value", 2, { explain: "Many one-pass solutions carry a single running value and update the best answer as they go." }, [
    v("running-total", "`total` is a running sum and `x` is the next number. Add it in.", "total = 10\nx = 4", "total becomes 14", "total += x", "total == 14"),
    v("lowest-so-far", "`lowest` is the lowest price seen so far and `price` is today's price. Update `lowest`.", "lowest = 7\nprice = 3", "lowest becomes 3", "lowest = min(lowest, price)", "lowest == 3"),
    v("best-profit", "`best` is the best profit so far, `lowest` is the lowest price seen so far and `price` is today's price. Update `best` with the profit from selling today.", "best = 2\nlowest = 1\nprice = 6", "best becomes 5", "best = max(best, price - lowest)", "best == 5"),
    v("kadane", "`cur` is the best sum of a run ending at the previous item and `x` is the next number. Update `cur` to the best sum of a run ending at `x`: either extend the run or start fresh at `x`.", "cur = -2\nx = 5", "cur becomes 5", "cur = max(x, cur + x)", "cur == 5", {
      accepted: ["cur = max(cur + x, x)"],
    }),
  ]),

  skill("prefix-hash", 3, { explain: "Storing running totals in a dict lets you find an earlier total that differs by exactly k in O(1)." }, [
    v("seed-count", "Create `count`, a dictionary of how many times each running total has been seen, seeded so that a total of 0 has been seen once.", "", "count is {0: 1}", "count = {0: 1}", "count == {0: 1}", {
      explain: "The seed counts subarrays that start at index 0.",
    }),
    v("add-matches", "`count` maps each earlier running total to how many times it occurred, `total` is the current running total and `k` is the target sum. Add to `res` the number of earlier totals that make a subarray summing to `k`.", "count = {0: 1, 3: 2}\ntotal = 8\nk = 5\nres = 0", "res becomes 2", "res += count.get(total - k, 0)", "res == 2", {
      explain: "An earlier total of total - k means everything since then sums to k.",
    }),
    v("record-total", "`count` maps each running total to how many times it has occurred and `total` is the current running total. Record this occurrence.", "count = {0: 1}\ntotal = 4", "count becomes {0: 1, 4: 1}", "count[total] = count.get(total, 0) + 1", "count == {0: 1, 4: 1}"),
    v("difference-array", "`diff` is a difference array of zeros. Record that every index from `l` through `r`, both included, should be increased by `val` (2 lines).", "diff = [0, 0, 0, 0, 0]\nl = 1\nr = 2\nval = 5", "diff becomes [0, 5, 0, -5, 0]", "diff[l] += val\ndiff[r + 1] -= val", "diff == [0, 5, 0, -5, 0]", {
      explain: "Add at the start and subtract just past the end; a prefix sum later turns it into the real values.",
    }),
  ]),
]);

export const dp = topic("python", "dp", [
  skill("memo", 2, { explain: "Memoisation stores each answer the first time it is computed; the cache decorators do it in one line." }, [
    v("cache", "`cache` is imported in the code below. Write the decorator line that makes `fib` remember every result it has computed.", "", "result ends up 55, with fib memoised", "@cache", 'result == 55 and hasattr(fib, "cache_info")', {
      template: FIB,
      accepted: ["@lru_cache(None)", "@lru_cache(maxsize=None)"],
    }),
    v("lru-cache", "`lru_cache` is imported in the code below. Using `lru_cache`, write the decorator line that makes `fib` remember results with no size limit.", "", "result ends up 55, with an unbounded cache", "@lru_cache(None)", 'result == 55 and hasattr(fib, "cache_info") and fib.cache_info().maxsize is None', {
      template: FIB,
      accepted: ["@lru_cache(maxsize=None)"],
      explain: "Plain @lru_cache defaults to 128 entries; None removes the limit.",
    }),
    v("dict-check", "`memo` is a dictionary of answers already computed. At the top of the function below, return the stored answer for `n` when there is one (2 lines).", "memo = {5: 99}", "result ends up 99, straight from the memo", "if n in memo:\n    return memo[n]", "result == 99", {
      template: "def solve(n):\n    {answer}\n    return n * 2\n\nresult = solve(5)",
    }),
    v("dict-store", "`memo` is a dictionary of answers already computed. In the function below, `res` holds the answer just worked out for `n`. Store it before returning.", "memo = {}", "memo becomes {4: 8}", "memo[n] = res", "memo == {4: 8}", {
      template: "def solve(n):\n    res = n * 2\n    {answer}\n    return res\n\nsolve(4)",
    }),
    v("list-to-tuple", "`solve` below is memoised with `cache`, which cannot take a list as an argument. Call it on the list `nums` by converting the list to something hashable.", "from functools import cache\n@cache\ndef solve(items):\n    return sum(items)\nnums = [1, 2, 3]", "gives 6", "solve(tuple(nums))", "_ == 6", {
      explain: "Cached arguments must be hashable; a list raises TypeError.",
    }),
  ]),

  skill("dp-table", 2, { explain: "Size the table one larger than the input so that index n (or amount) exists, and fill it with the identity for the operation." }, [
    v("base-case", "`dp` is a table of zeros in which `dp[i]` counts the ways to reach step `i`. Set the base case: there is one way to be at step 0.", "dp = [0, 0, 0]", "dp becomes [1, 0, 0]", "dp[0] = 1", "dp == [1, 0, 0]"),
    v("inf-table", "`amount` is a target amount. Create `dp`, a table of `amount + 1` entries all set to infinity, for a minimisation.", "amount = 3", "dp is [inf, inf, inf, inf]", 'dp = [float("inf")] * (amount + 1)', 'dp == [float("inf")] * 4'),
    v("bool-table", "`s` is a string. Create `dp`, a table of False values with one more entry than the string has characters.", 's = "abc"', "dp is [False, False, False, False]", "dp = [False] * (len(s) + 1)", "dp == [False] * 4"),
    v("two-d", "`m` and `n` are the lengths of two strings. Create `dp`, a table of zeros with `m + 1` rows and `n + 1` columns, where every row is its own list.", "m = 1\nn = 2", "dp is [[0, 0, 0], [0, 0, 0]]", "dp = [[0] * (n + 1) for _ in range(m + 1)]", "dp == [[0, 0, 0], [0, 0, 0]] and dp[0] is not dp[1]", {
      explain: "Columns go in the inner list and rows in the comprehension.",
    }),
    v("minus-one-memo", "`m` and `n` are the dimensions of a grid. Create `memo`, an `m` by `n` table filled with -1 to mean not computed yet, where every row is its own list.", "m = 2\nn = 2", "memo is [[-1, -1], [-1, -1]]", "memo = [[-1] * n for _ in range(m)]", "memo == [[-1, -1], [-1, -1]] and memo[0] is not memo[1]"),
  ]),

  skill("dp-transition", 2, { explain: "A transition writes one cell from cells already filled in." }, [
    v("fibonacci", "`dp` is a table and `i` is the cell being filled. Set it to the sum of the two cells before it.", "dp = [1, 1, 0]\ni = 2", "dp becomes [1, 1, 2]", "dp[i] = dp[i - 1] + dp[i - 2]", "dp == [1, 1, 2]"),
    v("min-coins", "`dp` is a table in which `dp[a]` is the fewest coins that make amount `a`, and `coin` is one coin value. Update `dp[a]` if using this coin gives fewer coins.", 'dp = [0, 1, 2, float("inf")]\na = 3\ncoin = 2', "dp[3] becomes 2", "dp[a] = min(dp[a], dp[a - coin] + 1)", "dp[3] == 2"),
    v("rob", "`dp` is a table in which `dp[i]` is the most that can be taken from the first `i + 1` houses, and `nums` holds each house's amount. Fill the cell at index `i`: either skip this house or take it plus the best from two houses back.", "nums = [2, 7, 9]\ndp = [2, 7, 0]\ni = 2", "dp[2] becomes 11", "dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])", "dp[2] == 11"),
    v("lcs-match", "`dp` is a 2D table for comparing two strings, and the characters for cell `i`, `j` match. Set the cell to one more than the diagonal cell above-left.", "dp = [[0, 0], [0, 0]]\ni = 1\nj = 1", "dp[1][1] becomes 1", "dp[i][j] = dp[i - 1][j - 1] + 1", "dp[1][1] == 1"),
    v("lcs-mismatch", "`dp` is a 2D table for comparing two strings, and the characters for cell `i`, `j` differ. Set the cell to the larger of the cell above and the cell to the left.", "dp = [[0, 2], [3, 0]]\ni = 1\nj = 1", "dp[1][1] becomes 3", "dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])", "dp[1][1] == 3"),
    v("grid-paths", "`dp` is a 2D table counting paths to each cell when you may only move right or down. Fill cell `r`, `c` from the cell above and the cell to the left.", "dp = [[1, 1], [1, 0]]\nr = 1\nc = 1", "dp[1][1] becomes 2", "dp[r][c] = dp[r - 1][c] + dp[r][c - 1]", "dp[1][1] == 2"),
  ]),

  skill("dp-rolling", 3, { explain: "When a cell only needs the last one or two cells, two variables replace the whole table." }, [
    v("fib-roll", "`prev` and `curr` are the last two values of a Fibonacci-style sequence. Advance one step in one line: `prev` becomes `curr`, and `curr` becomes their sum.", "prev = 2\ncurr = 3", "prev is 3, curr is 5", "prev, curr = curr, prev + curr", "(prev, curr) == (3, 5)"),
    v("rob-roll", "`prev` and `curr` are the best totals up to two houses back and one house back, and `x` is this house's amount. Advance one step in one line.", "prev = 2\ncurr = 7\nx = 9", "prev is 7, curr is 11", "prev, curr = curr, max(curr, prev + x)", "(prev, curr) == (7, 11)"),
  ]),

  skill("recursion-limit", 3, { explain: "Python stops at about 1000 nested calls by default; deep recursive solutions have to raise the limit." }, [
    v("raise-limit", "Raise Python's recursion limit to one million. Include the import.", "", "the recursion limit is 1000000", "import sys\nsys.setrecursionlimit(10 ** 6)", "(sys.getrecursionlimit() == 10 ** 6, sys.setrecursionlimit(1000))[0]", {
      accepted: ["import sys\nsys.setrecursionlimit(1000000)", "import sys\nsys.setrecursionlimit(1_000_000)"],
    }),
  ]),
]);

export const backtracking = topic("python", "backtracking", [
  skill("bt-choose", 2, { explain: "Backtracking is choose, explore, un-choose: whatever is added before the recursive call is removed after it." }, [
    v("append-recurse-pop", "`nums` is a list. Inside `dfs` below, `path` is the current selection and `x` is the item being considered. Write the three lines that include `x`, explore further from `i + 1`, and then take `x` back out.", "nums = [1, 2]", "res ends up [[], [2], [1], [1, 2]]", "path.append(x)\ndfs(i + 1)\npath.pop()", "res == [[], [2], [1], [1, 2]]", {
      template: "res = []\npath = []\ndef dfs(i):\n    if i == len(nums):\n        res.append(path[:])\n        return\n    dfs(i + 1)\n    x = nums[i]\n    {answer}\n\ndfs(0)",
    }),
    v("pass-new-list", "`nums` is a list. Inside `dfs` below, `path` is passed as an argument. Write the recursive call that explores from `i + 1` with `nums[i]` added to a NEW list, so nothing has to be undone.", "nums = [1, 2]", "res ends up [[], [2], [1], [1, 2]]", "dfs(i + 1, path + [nums[i]])", "res == [[], [2], [1], [1, 2]]", {
      template: "res = []\ndef dfs(i, path):\n    if i == len(nums):\n        res.append(path)\n        return\n    dfs(i + 1, path)\n    {answer}\n\ndfs(0, [])",
      explain: "path + [x] builds a fresh list, so each branch has its own copy.",
    }),
    v("pass-new-string", "`digits` is a string of digits and `letters` maps each digit to its letters. Inside `dfs` below, `cur` is the string built so far and `c` is a letter choice. Write the recursive call for the next position with `c` added.", 'digits = "23"\nletters = {"2": "ab", "3": "d"}', 'res ends up ["ad", "bd"]', "dfs(i + 1, cur + c)", 'res == ["ad", "bd"]', {
      template: "res = []\ndef dfs(i, cur):\n    if i == len(digits):\n        res.append(cur)\n        return\n    for c in letters[digits[i]]:\n        {answer}\n\ndfs(0, \"\")",
    }),
  ]),

  skill("bt-loop", 2, { explain: "The start index keeps each combination in one order, which is what stops duplicates like [2, 1] after [1, 2]." }, [
    v("from-start", "`nums` is a list. Inside `dfs` below, `start` is the first index still allowed. Write only the `for` line that tries every index `j` from `start` to the end.", "nums = [1, 2, 3]", "res ends up [[1, 2], [1, 3], [2, 3]]", "for j in range(start, len(nums)):", "res == [[1, 2], [1, 3], [2, 3]]", {
      template: "res = []\npath = []\ndef dfs(start):\n    if len(path) == 2:\n        res.append(path[:])\n        return\n    {answer}\n        path.append(nums[j])\n        dfs(j + 1)\n        path.pop()\n\ndfs(0)",
    }),
    v("skip-equal-neighbour", "`nums` is a SORTED list with duplicates. Inside the loop of `dfs` below, skip index `j` when it is not the first choice at this level and its value equals the one before it (2 lines).", "nums = [1, 1, 2]", "res ends up [[1, 1], [1, 2]], with no repeated pair", "if j > start and nums[j] == nums[j - 1]:\n    continue", "res == [[1, 1], [1, 2]]", {
      template: "res = []\npath = []\ndef dfs(start):\n    if len(path) == 2:\n        res.append(path[:])\n        return\n    for j in range(start, len(nums)):\n        {answer}\n        path.append(nums[j])\n        dfs(j + 1)\n        path.pop()\n\ndfs(0)",
      explain: "j > start, not j > 0: the first choice at each level is always allowed.",
    }),
    v("skip-used", "`nums` is a list and `used` marks which indexes are already in the current permutation. Inside the loop of `dfs` below, skip index `j` when it is already used (2 lines).", "nums = [1, 2]\nused = [False, False]", "res ends up [[1, 2], [2, 1]]", "if used[j]:\n    continue", "res == [[1, 2], [2, 1]]", {
      template: "res = []\npath = []\ndef dfs():\n    if len(path) == len(nums):\n        res.append(path[:])\n        return\n    for j in range(len(nums)):\n        {answer}\n        used[j] = True\n        path.append(nums[j])\n        dfs()\n        path.pop()\n        used[j] = False\n\ndfs()",
    }),
  ]),

  skill("bt-stop", 2, { explain: "Record a finished path as a copy, and cut a branch off as soon as it cannot lead anywhere." }, [
    v("record-copy", "`nums` is a list. Inside `dfs` below, `path` has reached full length. Write the line that records it in `res` as a COPY.", "nums = [1, 2]", "res ends up [[1, 2], [2, 1]], each a separate list", "res.append(path[:])", "res == [[1, 2], [2, 1]]", {
      template: "res = []\npath = []\ndef dfs():\n    if len(path) == len(nums):\n        {answer}\n        return\n    for x in nums:\n        if x not in path:\n            path.append(x)\n            dfs()\n            path.pop()\n\ndfs()",
      accepted: ["res.append(list(path))", "res.append(path.copy())"],
      explain: "res.append(path) would store the same list every time, and it ends up empty.",
    }),
    v("record-string", "`path` is a list of characters forming a finished answer. Add it to `res` as a single string.", 'res = []\npath = ["a", "b"]', 'res becomes ["ab"]', 'res.append("".join(path))', 'res == ["ab"]'),
    v("prune", "`candidates` is a list of positive numbers. Inside `dfs` below, `total` is the sum chosen so far and `target` is the goal. Stop exploring this branch as soon as `total` has gone past `target` (2 lines).", "candidates = [2, 3]\ntarget = 5", "res ends up [[2, 3]]", "if total > target:\n    return", "res == [[2, 3]]", {
      template: "res = []\npath = []\ndef dfs(start, total):\n    {answer}\n    if total == target:\n        res.append(path[:])\n        return\n    for j in range(start, len(candidates)):\n        path.append(candidates[j])\n        dfs(j, total + candidates[j])\n        path.pop()\n\ndfs(0, 0)",
      explain: "Without the prune, this search never ends, because the same candidate can be reused forever.",
    }),
  ]),
]);
