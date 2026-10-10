import { skill, topic, v } from "../topic";

/** Second pass, batch 4: sorting, iteration, itertools, bits, bisect and the technique sections. */

const IT = (names: string) => `from itertools import ${names}`;
const BI = "import bisect";
const IF = { template: 'out = "no"\n{answer}\n    out = "yes"' };

export const sortingMore = topic("python", "sorting", [
  skill("sort-custom-keys", 3, { explain: "Whatever the rule, sorting is a key function that returns something Python already knows how to compare." }, [
    v("numeric-strings", "`strs` is a list of digit strings. Get a sorted copy ordered by numeric value, not alphabetically.", 'strs = ["10", "9", "100"]', 'gives ["9", "10", "100"]', "sorted(strs, key=int)", '_ == ["9", "10", "100"]', {
      explain: 'Alphabetically "10" comes before "9"; key=int compares the numbers.',
    }),
    v("by-frequency", "`nums` is a list and `freq` maps each value to how often it appears. Get a sorted copy ordered by frequency, lowest first, and by larger value first among equal frequencies. Call each item `x`.", "nums = [1, 1, 2, 2, 3]\nfreq = {1: 2, 2: 2, 3: 1}", "gives [3, 2, 2, 1, 1]", "sorted(nums, key=lambda x: (freq[x], -x))", "_ == [3, 2, 2, 1, 1]"),
    v("chars-by-frequency", "`s` is a string and `freq` maps each character to its count. Build a string of its characters ordered by count, highest first, and alphabetically among equal counts. Call each character `c`.", 's = "tree"\nfreq = {"t": 1, "r": 1, "e": 2}', 'gives "eert"', '"".join(sorted(s, key=lambda c: (-freq[c], c)))', '_ == "eert"'),
    v("closest-first", "`nums` is a list and `x` is a number. Get a sorted copy ordered by distance from `x`, with the smaller value first on a tie. Call each item `n`.", "nums = [1, 2, 3, 4, 5]\nx = 3", "gives [3, 2, 4, 1, 5]", "sorted(nums, key=lambda n: (abs(n - x), n))", "_ == [3, 2, 4, 1, 5]"),
    v("dict-keys-two-rules", "`d` is a dictionary of counts. Get its keys ordered by count, highest first, and alphabetically among equal counts. Call each key `k`.", 'd = {"b": 2, "a": 2, "c": 5}', 'gives ["c", "a", "b"]', "sorted(d, key=lambda k: (-d[k], k))", '_ == ["c", "a", "b"]'),
    v("evens-first", "`nums` is a list of ints. Sort it in place so that all the even numbers come before the odd ones, otherwise keeping the original order. Call each item `x`.", "nums = [3, 2, 1, 4]", "nums becomes [2, 4, 3, 1]", "nums.sort(key=lambda x: x % 2)", "nums == [2, 4, 3, 1]", {
      explain: "Python's sort is stable: items with equal keys keep their original order.",
    }),
    v("alien-order", "`words` is a list of strings and `rank` maps each character to its position in a custom alphabet. Get a sorted copy in that alphabet's order. Use `w` for a word and `c` for a character.", 'words = ["ba", "ab", "aa"]\nrank = {"b": 0, "a": 1}', 'gives ["ba", "ab", "aa"]', "sorted(words, key=lambda w: [rank[c] for c in w])", '_ == ["ba", "ab", "aa"]', {
      explain: "A list of ranks compares item by item, exactly like a word in the custom alphabet.",
    }),
  ]),
]);

export const iterationMore = topic("python", "iteration", [
  skill("iteration-combos", 2, { explain: "zip, map and enumerate combine freely; each one just reshapes what the next one receives." }, [
    v("elementwise-sum", "`a` and `b` are lists of numbers of the same length. Using `map` and `zip`, get a list of the sums at each position.", "a = [1, 2]\nb = [10, 20]", "gives [11, 22]", "list(map(sum, zip(a, b)))", "_ == [11, 22]", {
      accepted: ["[x + y for x, y in zip(a, b)]"],
    }),
    v("elementwise-min", "`xs` and `ys` are lists of the same length. Build a list of the smaller item at each position. Use `a` and `b`.", "xs = [1, 9]\nys = [5, 2]", "gives [1, 2]", "[min(a, b) for a, b in zip(xs, ys)]", "_ == [1, 2]", {
      accepted: ["list(map(min, xs, ys))"],
    }),
    v("sum-of-abs", "`nums` is a list of numbers. Using `map`, get the total of their absolute values.", "nums = [-3, 2, -1]", "gives 6", "sum(map(abs, nums))", "_ == 6", {
      accepted: ["sum(abs(x) for x in nums)"],
    }),
    v("fixed-points", "`nums` is a list. Count the positions at which the item equals its own index. Use `i` and `x`.", "nums = [0, 2, 2, 5]", "gives 2", "sum(i == x for i, x in enumerate(nums))", "_ == 2", {
      accepted: ["sum(1 for i, x in enumerate(nums) if i == x)"],
    }),
    v("no-adjacent-equal", "`s` is a string. Write an expression that is True when no character equals the one right after it. Use `a` and `b`.", 's = "abab"', "gives True", "all(a != b for a, b in zip(s, s[1:]))", "_ is True"),
    v("three-way-formula", "`xs`, `ys` and `zs` are lists of the same length. Build a list of x times y plus z at each position. Use `a`, `b` and `c`.", "xs = [1, 2]\nys = [3, 4]\nzs = [5, 6]", "gives [8, 14]", "[a * b + c for a, b, c in zip(xs, ys, zs)]", "_ == [8, 14]"),
    v("numbered-chars", "`s` is a string. Get a list of (position, character) tuples with positions starting at 1.", 's = "ab"', 'gives [(1, "a"), (2, "b")]', "list(enumerate(s, 1))", '_ == [(1, "a"), (2, "b")]', {
      accepted: ["list(enumerate(s, start=1))", "list(zip(range(1, len(s) + 1), s))"],
    }),
  ]),
]);

export const itertoolsMore = topic("python", "itertools", [
  skill("itertools-combos", 3, { explain: "The itertools results are ordinary iterables, so they feed straight into len, max, sum and comprehensions." }, [
    v("longest-run", "`groupby` is imported and `s` is a string. Get the length of the longest run of one repeated character. Use `_` for the character and `g` for the group.", IT("groupby") + '\ns = "aabbbbc"', "gives 4", "max(len(list(g)) for _, g in groupby(s))", "_ == 4"),
    v("count-runs", "`groupby` is imported and `s` is a string. Get how many runs of repeated characters it has.", IT("groupby") + '\ns = "aabbbbc"', "gives 3", "len(list(groupby(s)))", "_ == 3"),
    v("group-by-length", "`groupby` is imported and `words` is a list of strings. Build a dictionary mapping each length to the list of words of that length; the words must be sorted by length first. Use `k` and `g`.", IT("groupby") + '\nwords = ["hi", "hey", "yo"]', 'gives {2: ["hi", "yo"], 3: ["hey"]}', "{k: list(g) for k, g in groupby(sorted(words, key=len), key=len)}", '_ == {2: ["hi", "yo"], 3: ["hey"]}', {
      explain: "groupby only groups NEIGHBOURS, so the input has to be sorted by the same key.",
    }),
    v("pair-sums", "`combinations` is imported and `nums` is a list. Build a list of the sum of every unordered pair of items. Call each pair `c`.", IT("combinations") + "\nnums = [1, 2, 4]", "gives [3, 5, 6]", "[sum(c) for c in combinations(nums, 2)]", "_ == [3, 5, 6]", {
      accepted: ["[a + b for a, b in combinations(nums, 2)]"],
    }),
    v("distinct-arrangements", "`permutations` is imported and `s` is a string with a repeated letter. Count its DISTINCT rearrangements.", IT("permutations") + '\ns = "aab"', "gives 3", "len(set(permutations(s)))", "_ == 3"),
    v("running-product", "`accumulate` is imported, along with the `operator` module, and `nums` is a list of numbers. Get the list of running products.", IT("accumulate") + "\nimport operator\nnums = [1, 2, 3, 4]", "gives [1, 2, 6, 24]", "list(accumulate(nums, operator.mul))", "_ == [1, 2, 6, 24]", {
      accepted: ["list(accumulate(nums, lambda a, b: a * b))"],
    }),
    v("cycle-prefix", "`cycle` and `islice` are imported and `nums` is a list. Get the first 5 items of `nums` repeated endlessly.", IT("cycle, islice") + "\nnums = [1, 2]", "gives [1, 2, 1, 2, 1]", "list(islice(cycle(nums), 5))", "_ == [1, 2, 1, 2, 1]"),
  ]),
]);

export const bitsMore = topic("python", "bits", [
  skill("bit-more", 3, { explain: "Most bit problems come down to counting set bits, comparing bit patterns, or walking the set bits one at a time." }, [
    v("hamming", "`x` and `y` are ints. Get the number of bit positions at which they differ.", "x = 1\ny = 4", "gives 2", 'bin(x ^ y).count("1")', "_ == 2", {
      accepted: ["(x ^ y).bit_count()"],
    }),
    v("count-by-clearing", "`x` is a positive int and `n` starts at 0. Count the set bits of `x` into `n` by repeatedly clearing its lowest set bit (3 lines).", "x = 0b1011\nn = 0", "n ends up 3", "while x:\n    x &= x - 1\n    n += 1", "n == 3 and x == 0"),
    v("bit-count-table", "`bits` is a table in which `bits[i]` is the number of set bits in `i`, filled in for everything below `i`. Fill in `bits[i]` from the entry for `i` shifted right by one.", "bits = [0, 1, 1, 0]\ni = 3", "bits[3] becomes 2", "bits[i] = bits[i >> 1] + (i & 1)", "bits[3] == 2", {
      accepted: ["bits[i] = bits[i // 2] + i % 2", "bits[i] = bits[i & (i - 1)] + 1"],
    }),
    v("same-sign", "`a` and `b` are ints. Using XOR, write an expression that is True when they have the same sign.", "a = -3\nb = -8", "gives True", "(a ^ b) >= 0", "_ is True", {
      explain: "The sign bit of a ^ b is set only when the two signs differ.",
    }),
    v("lowest-bit-index", "`x` is a positive int. Get the POSITION of its lowest set bit, counting from 0 at the right.", "x = 0b1100", "gives 2", "(x & -x).bit_length() - 1", "_ == 2"),
    v("next-submask", "`mask` is a bitmask and `sub` is one of its submasks. Step `sub` to the next smaller submask of `mask`.", "mask = 0b101\nsub = 0b100", "sub becomes 1 (binary 001)", "sub = (sub - 1) & mask", "sub == 1"),
    v("mask-without", "`mask` is an int used as a set of small numbers. Get the mask with the number `i` REMOVED from the set.", "mask = 0b0111\ni = 1", "gives 5 (binary 0101)", "mask & ~(1 << i)", "_ == 5", {
      accepted: ["mask ^ (1 << i)"],
    }),
  ]),
]);

export const bisectsMore = topic("python", "bisect", [
  skill("bisect-applied", 3, { explain: "Any sorted list can be searched with bisect, including a prefix-sum list or the tails list of an increasing subsequence." }, [
    v("on-prefix", "The `bisect` module is imported. `prefix` is an increasing list of running totals and `target` is a number. Get the index of the LAST running total that does not exceed `target`.", BI + "\nprefix = [0, 3, 7, 12]\ntarget = 8", "gives 2", "bisect.bisect_right(prefix, target) - 1", "_ == 2"),
    v("within-range", "The `bisect` module is imported and `a` is a sorted list. Search for `x` only between index `lo` and index `hi`, getting its leftmost insertion point.", BI + "\na = [1, 3, 5, 7, 9]\nx = 6\nlo = 1\nhi = 4", "gives 3", "bisect.bisect_left(a, x, lo, hi)", "_ == 3"),
    v("tails-position", "The `bisect` module is imported. `tails` is the sorted list of smallest tail values for increasing subsequences and `x` is the next number. Store the index where `x` belongs in `i`.", BI + "\ntails = [2, 5, 9]\nx = 6", "i is 2", "i = bisect.bisect_left(tails, x)", "i == 2"),
    v("tails-update", "`tails` is the sorted tails list of a longest-increasing-subsequence search, `x` is the next number and `i` is where it belongs, which may be one past the end. In ONE statement, put `x` at position `i`: overwrite the entry there, or append when `i` is past the end. Use slice assignment.", "tails = [2, 5, 9]\nx = 6\ni = 2", "tails becomes [2, 5, 6]", "tails[i:i + 1] = [x]", "tails == [2, 5, 6]", {
      explain: "Assigning a one-item list to tails[i:i + 1] replaces the entry at i, and appends when i equals len(tails).",
    }),
    v("insort-pair", "The `bisect` module is imported. `events` is a list of (time, name) tuples sorted by time. Insert a new event for `t` and `name`, keeping it sorted.", BI + '\nevents = [(1, "a"), (9, "c")]\nt = 5\nname = "b"', 'events becomes [(1, "a"), (5, "b"), (9, "c")]', "bisect.insort(events, (t, name))", 'events == [(1, "a"), (5, "b"), (9, "c")]'),
  ]),
]);

export const twoPointersMore = topic("python", "two-pointers", [
  skill("tp-more", 3, { explain: "Variations on the same idea: several pointers, each moving in one direction, doing O(1) work per step." }, [
    v("three-pointers", "`nums` is a list to be partitioned into three groups. In one line, start `lo` and `mid` at 0 and `hi` at the last index.", "nums = [2, 0, 1]", "lo is 0, mid is 0, hi is 2", "lo, mid, hi = 0, 0, len(nums) - 1", "(lo, mid, hi) == (0, 0, 2)"),
    v("area", "`height` is a list of wall heights and `l`, `r` are two indexes. Get the area of water held between those two walls: the gap between them times the shorter wall.", "height = [1, 8, 6, 2, 5]\nl = 1\nr = 4", "gives 15", "(r - l) * min(height[l], height[r])", "_ == 15"),
    v("subsequence-step", "`s` and `t` are strings, with `i` an index into `s` and `j` an index into `t`. When the two characters match, advance `i` (2 lines).", 's = "ace"\nt = "abcde"\ni = 0\nj = 0', "i becomes 1", "if s[i] == t[j]:\n    i += 1", "i == 1"),
    v("write-from-back", "`nums1` has spare room at its end, `k` is the position being filled from the back, and `i` points at the largest remaining item of its real part. Copy that item into position `k`.", "nums1 = [1, 5, 0, 0]\nk = 3\ni = 1", "nums1 becomes [1, 5, 0, 5]", "nums1[k] = nums1[i]", "nums1 == [1, 5, 0, 5]"),
    v("window-too-many-changes", "`s` is a string, `counts` maps each character in its window from `l` to `r` to its count, and `k` is the number of changes allowed. Write the `while` line that keeps shrinking while the window would need more than `k` changes: its length minus its most common character's count is above `k`.", 's = "aabcc"\ncounts = {"a": 2, "b": 1, "c": 2}\nl = 0\nr = 4\nk = 1', "l ends up 2", "while r - l + 1 - max(counts.values()) > k:", "l == 2", {
      template: "{answer}\n    counts[s[l]] -= 1\n    l += 1",
    }),
    v("monotonic-push", "`q` is a deque of indexes into `nums` whose values are in decreasing order, and `i` is the next index. Pop from the back every index whose value is not bigger than the new one, then add `i` (3 lines).", "from collections import deque\nnums = [5, 3, 1, 4]\nq = deque([0, 1, 2])\ni = 3", "q becomes deque([0, 3])", "while q and nums[q[-1]] <= nums[i]:\n    q.pop()\nq.append(i)", "list(q) == [0, 3]"),
  ]),
]);

export const prefixSumsMore = topic("python", "prefix-sums", [
  skill("prefix-more", 3, { explain: "The prefix idea extends to products, to two dimensions, and to remembering where each total first appeared." }, [
    v("product-pass", "`res` is being filled so that `res[i]` is the product of everything BEFORE index `i` in `nums`. Fill in `res[i]` from the previous entry.", "nums = [2, 3, 4]\nres = [1, 2, 1]\ni = 2", "res[2] becomes 6", "res[i] = res[i - 1] * nums[i - 1]", "res[2] == 6"),
    v("first-seen", "`first` maps each running total to the index where it FIRST appeared, `total` is the current running total and `i` the current index. Record it only if this total has not been seen (2 lines).", "first = {0: -1}\ntotal = 4\ni = 2", "first becomes {0: -1, 4: 2}", "if total not in first:\n    first[total] = i", "first == {0: -1, 4: 2}", {
      accepted: ["first.setdefault(total, i)"],
      explain: "Keeping the earliest index gives the longest subarray later.",
    }),
    v("pivot-test", "`nums` is a list, `total` is its sum, `left` is the sum of everything before index `i`. Write an expression that is True when the sums on the two sides of index `i` are equal.", "nums = [1, 7, 3, 6, 5, 6]\ntotal = 28\nleft = 11\ni = 3", "gives True", "left == total - left - nums[i]", "_ is True"),
    v("remainder-key", "`total` is a running sum and `k` is a divisor. Get the key under which to file this total when looking for subarrays whose sum divides by `k`.", "total = 23\nk = 6", "gives 5", "total % k", "_ == 5"),
    v("two-d-build", "`grid` is a grid of numbers and `pre` is its 2D prefix table, one larger in each direction with a border of zeros. Fill the entry for cell `r`, `c`: the cell itself plus the entries above and to the left, minus the overlap.", "grid = [[1, 2], [3, 4]]\npre = [[0, 0, 0], [0, 1, 3], [0, 4, 0]]\nr = 1\nc = 1", "pre[2][2] becomes 10", "pre[r + 1][c + 1] = grid[r][c] + pre[r][c + 1] + pre[r + 1][c] - pre[r][c]", "pre[2][2] == 10"),
    v("two-d-query", "`pre` is a 2D prefix table with a border of zeros. Get the sum of the rectangle from row `r1`, column `c1` through row `r2`, column `c2`, all included.", "pre = [[0, 0, 0], [0, 1, 3], [0, 4, 10]]\nr1 = 1\nc1 = 0\nr2 = 1\nc2 = 1", "gives 7", "pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1]", "_ == 7"),
  ]),
]);

export const dpMore = topic("python", "dp", [
  skill("dp-loops", 3, { explain: "The direction of a DP loop decides whether an item can be reused: backwards uses each item once, forwards allows repeats." }, [
    v("knapsack-backwards", "`cap` is a knapsack capacity and `weight` is one item's weight. Write only the `for` line that runs `w` DOWN from `cap` to `weight`, both included, so the item is used at most once.", "cap = 5\nweight = 3", "out ends up [5, 4, 3]", "for w in range(cap, weight - 1, -1):", "out == [5, 4, 3]", {
      template: "out = []\n{answer}\n    out.append(w)",
    }),
    v("unbounded-forwards", "`amount` is a target and `coin` is one coin value that may be used any number of times. Write only the `for` line that runs `a` UP from `coin` through `amount`.", "amount = 5\ncoin = 3", "out ends up [3, 4, 5]", "for a in range(coin, amount + 1):", "out == [3, 4, 5]", {
      template: "out = []\n{answer}\n    out.append(a)",
    }),
    v("interval-lengths", "`n` is the length of a string in an interval DP. Write only the `for` line that runs `length` over every substring length from 2 through `n`.", "n = 4", "out ends up [2, 3, 4]", "for length in range(2, n + 1):", "out == [2, 3, 4]", {
      template: "out = []\n{answer}\n    out.append(length)",
    }),
    v("interval-end", "In an interval DP, `i` is the start of a substring and `length` its length. Store the index of its last character in `j`.", "i = 2\nlength = 3", "j is 4", "j = i + length - 1", "j == 4"),
    v("first-row", "`dp` is a 2D edit-distance table and `n` is the length of the second string, so each row has `n + 1` columns. Fill its first row so that `dp[0][j]` is `j` (2 lines).", "dp = [[0, 0, 0], [0, 0, 0]]\nn = 2", "dp[0] becomes [0, 1, 2]", "for j in range(n + 1):\n    dp[0][j] = j", "dp[0] == [0, 1, 2]"),
  ]),

  skill("dp-more-transitions", 3, { explain: "Transitions look different per problem, but each one is a single assignment from earlier cells." }, [
    v("lis", "`dp` is a table in which `dp[i]` is the length of the longest increasing subsequence ending at index `i` of `nums`, and `j` is an earlier index. When the item at `j` is smaller, extend that subsequence if it is longer (2 lines).", "nums = [1, 5, 2, 7]\ndp = [1, 2, 2, 1]\ni = 3\nj = 1", "dp[3] becomes 3", "if nums[j] < nums[i]:\n    dp[i] = max(dp[i], dp[j] + 1)", "dp[3] == 3"),
    v("edit-distance", "`dp` is a 2D edit-distance table and the characters for cell `i`, `j` differ. Set the cell to 1 plus the smallest of the cell above, the cell to the left, and the diagonal cell.", "dp = [[0, 1], [1, 0]]\ni = 1\nj = 1", "dp[1][1] becomes 1", "dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])", "dp[1][1] == 1"),
    v("word-break", "`dp` is a table in which `dp[j]` says whether the first `j` characters of `s` can be split into words from the set `words`. Fill the entry for `i`: True when some earlier split point `j` works and the piece from `j` to `i` is a word.", 's = "catsdog"\nwords = {"cats", "dog"}\ndp = [True, False, False, False, True, False, False, False]\ni = 7', "dp[7] becomes True", "dp[i] = any(dp[j] and s[j:i] in words for j in range(i))", "dp[7] is True"),
    v("two-digit-valid", "`s` is a string of digits and `i` is a position in it. Write an expression that is True when the two digits ending just before position `i` form a number from 10 to 26.", 's = "226"\ni = 2', "gives True", "10 <= int(s[i - 2:i]) <= 26", "_ is True"),
    v("answer-or-minus-one", "`dp` is a table of minimum costs in which unreachable amounts are still infinity. Get the answer for `amount`, or -1 when it is unreachable.", 'dp = [0, 1, float("inf")]\namount = 2', "gives -1", 'dp[amount] if dp[amount] != float("inf") else -1', "_ == -1", {
      accepted: ['-1 if dp[amount] == float("inf") else dp[amount]'],
    }),
    v("best-anywhere", "`dp` is a table in which `dp[i]` is the best answer ending at index `i`. Get the best answer ending anywhere.", "dp = [1, 3, 2]", "gives 3", "max(dp)", "_ == 3", {
      explain: "When the answer can end at any index, it is max(dp), not dp[-1].",
    }),
  ]),
]);

export const backtrackingMore = topic("python", "backtracking", [
  skill("bt-more", 3, { explain: "Each backtracking problem adds its own validity test before choosing and its own bookkeeping around the recursive call." }, [
    v("queen-attacked", "`cols`, `diag1` and `diag2` are sets recording occupied columns and diagonals. Write the `if` line whose block runs when placing a queen at row `r`, column `c` would be attacked: the column, or `r - c`, or `r + c` is already taken.", "cols = {0}\ndiag1 = {2}\ndiag2 = set()\nr = 3\nc = 1", 'out ends up "yes", because diagonal 2 is taken', "if c in cols or r - c in diag1 or r + c in diag2:", 'out == "yes"', IF),
    v("queen-place", "`cols`, `diag1` and `diag2` are sets recording occupied columns and diagonals. Record a queen at row `r`, column `c` in all three (3 lines).", "cols = set()\ndiag1 = set()\ndiag2 = set()\nr = 1\nc = 3", "cols is {3}, diag1 is {-2}, diag2 is {4}", "cols.add(c)\ndiag1.add(r - c)\ndiag2.add(r + c)", "(cols, diag1, diag2) == ({3}, {-2}, {4})"),
    v("palindrome-piece", "`s` is a string and `start`, `end` mark a piece of it, with `end` excluded. Write the `if` line whose block runs when that piece is a palindrome.", 's = "aab"\nstart = 0\nend = 2', 'out ends up "yes"', "if s[start:end] == s[start:end][::-1]:", 'out == "yes"', IF),
    v("open-bracket-allowed", "In generating balanced brackets, `opened` is how many opening brackets have been used and `n` is how many pairs are wanted. Write the `if` line whose block runs when another opening bracket may still be added.", "opened = 1\nn = 2", 'out ends up "yes"', "if opened < n:", 'out == "yes"', IF),
    v("close-bracket-allowed", "In generating balanced brackets, `opened` and `closed` count the brackets used so far. Write the `if` line whose block runs when a closing bracket may be added.", "opened = 2\nclosed = 1", 'out ends up "yes"', "if closed < opened:", 'out == "yes"', IF),
    v("count-both-branches", "`nums` is a list. Inside `ways` below, each number is either added to or subtracted from `total`. Return the number of ways from both choices combined.", "nums = [1, 1]", "result ends up 2: the ways to reach 0", "return ways(i + 1, total + nums[i]) + ways(i + 1, total - nums[i])", "result == 2", {
      template: "def ways(i, total):\n    if i == len(nums):\n        return 1 if total == 0 else 0\n    {answer}\n\nresult = ways(0, 0)",
    }),
  ]),
]);
