import { skill, topic, v } from "../topic";

const BI = "import bisect";
const IT = (names: string) => `from itertools import ${names}`;

export const bisects = topic("python", "bisect", [
  skill("bisect-basic", 2, { explain: "bisect does binary search on a list that is already sorted; _left lands before equal items, _right after them." }, [
    v("import-and-search", "`a` is a sorted list. Get the leftmost index where `x` could be inserted to keep it sorted. Include the import.", "a = [1, 3, 3, 5]\nx = 3", "gives 1", BI + "\nbisect.bisect_left(a, x)", "_ == 1"),
    v("left", "The `bisect` module is imported and `a` is a sorted list. Get the leftmost index where `x` could be inserted to keep it sorted.", BI + "\na = [1, 3, 3, 5]\nx = 3", "gives 1", "bisect.bisect_left(a, x)", "_ == 1"),
    v("right", "The `bisect` module is imported and `a` is a sorted list. Get the rightmost index where `x` could be inserted to keep it sorted, after any equal items.", BI + "\na = [1, 3, 3, 5]\nx = 3", "gives 3", "bisect.bisect_right(a, x)", "_ == 3", {
      accepted: ["bisect.bisect(a, x)"],
    }),
    v("insort", "The `bisect` module is imported and `a` is a sorted list. Insert `x` into it so that it stays sorted.", BI + "\na = [1, 3, 5]\nx = 4", "a becomes [1, 3, 4, 5]", "bisect.insort(a, x)", "a == [1, 3, 4, 5]", {
      explain: "insort finds the spot in O(log n), but the insert itself is O(n).",
    }),
    v("from-import", "Write the import line that lets you call `bisect_left` and `bisect_right` directly, without the module prefix.", "", "bisect_left and bisect_right are available", "from bisect import bisect_left, bisect_right", "bisect_left([1, 2], 2) == 1 and bisect_right([1, 2], 2) == 2"),
  ]),

  skill("bisect-queries", 3, { explain: "The two insertion points answer counting questions: how many are smaller, how many are equal, where is the first one at least x." }, [
    v("count-less", "The `bisect` module is imported and `a` is a sorted list. Get how many items are strictly LESS than `x`.", BI + "\na = [1, 3, 3, 5]\nx = 3", "gives 1", "bisect.bisect_left(a, x)", "_ == 1", {
      explain: "The left insertion point is exactly the number of smaller items.",
    }),
    v("count-at-most", "The `bisect` module is imported and `a` is a sorted list. Get how many items are less than OR EQUAL to `x`.", BI + "\na = [1, 3, 3, 5]\nx = 3", "gives 3", "bisect.bisect_right(a, x)", "_ == 3"),
    v("count-equal", "The `bisect` module is imported and `a` is a sorted list. Get how many items are equal to `x`.", BI + "\na = [1, 3, 3, 5]\nx = 3", "gives 2", "bisect.bisect_right(a, x) - bisect.bisect_left(a, x)", "_ == 2"),
    v("first-at-least", "The `bisect` module is imported and `a` is a sorted list containing something at least as big as `x`. Get the first VALUE that is at least `x`.", BI + "\na = [1, 4, 6, 9]\nx = 5", "gives 6", "a[bisect.bisect_left(a, x)]", "_ == 6"),
    v("last-at-most", "The `bisect` module is imported and `a` is a sorted list containing something no bigger than `x`. Get the last VALUE that is at most `x`.", BI + "\na = [1, 4, 6, 9]\nx = 5", "gives 4", "a[bisect.bisect_right(a, x) - 1]", "_ == 4"),
    v("contains", "The `bisect` module is imported, `a` is a sorted list, and `i` is the left insertion point of `x`. Write an expression that is True when `x` is actually in the list.", BI + "\na = [1, 4, 6, 9]\nx = 6\ni = bisect.bisect_left(a, x)", "gives True", "i < len(a) and a[i] == x", "_ is True", {
      explain: "Check i < len(a) first: the insertion point can be one past the end.",
    }),
    v("with-key", "The `bisect` module is imported and `pairs` is a list of (time, value) tuples sorted by time. Get the leftmost index whose time is at least `t`, comparing only the time. Call each tuple `p`.", BI + '\npairs = [(1, "a"), (4, "b"), (7, "c")]\nt = 4', "gives 1", "bisect.bisect_left(pairs, t, key=lambda p: p[0])", "_ == 1"),
  ]),

  skill("binary-search-lines", 2, { explain: "Hand-written binary search keeps two bounds and moves one of them past the midpoint each step." }, [
    v("closed-bounds", "`nums` is a sorted list. In one line, set up `lo` and `hi` as the first and last valid indexes.", "nums = [1, 3, 5, 7]", "lo is 0, hi is 3", "lo, hi = 0, len(nums) - 1", "(lo, hi) == (0, 3)"),
    v("half-open-bounds", "`nums` is a sorted list. In one line, set up `lo` as 0 and `hi` as one PAST the last index, for a search that uses lo < hi.", "nums = [1, 3, 5, 7]", "lo is 0, hi is 4", "lo, hi = 0, len(nums)", "(lo, hi) == (0, 4)"),
    v("go-right", "In a binary search with inclusive bounds `lo` and `hi`, the value at `mid` is too small. Move `lo` so the search continues to the right of `mid`.", "lo = 0\nhi = 7\nmid = 3", "lo becomes 4", "lo = mid + 1", "lo == 4", {
      explain: "mid itself is ruled out, so skip past it; lo = mid can loop forever.",
    }),
    v("go-left", "In a binary search with inclusive bounds `lo` and `hi`, the value at `mid` is too big. Move `hi` so the search continues to the left of `mid`.", "lo = 0\nhi = 7\nmid = 3", "hi becomes 2", "hi = mid - 1", "hi == 2 and lo == 0"),
    v("keep-mid", "In a binary search between `lo` and `hi` for the FIRST index that satisfies a condition, `mid` satisfies it and might be the answer. Shrink the range but keep `mid` in it.", "lo = 0\nhi = 7\nmid = 3", "hi becomes 3", "hi = mid", "hi == 3 and lo == 0"),
  ]),
]);

export const itertoolsDeck = topic("python", "itertools", [
  skill("accumulate", 2, { explain: "accumulate yields running totals; like most of itertools it is lazy, so wrap it in list()." }, [
    v("prefix-sums", "`accumulate` is imported and `nums` is a list of numbers. Get the list of running totals.", IT("accumulate") + "\nnums = [1, 2, 3, 4]", "gives [1, 3, 6, 10]", "list(accumulate(nums))", "_ == [1, 3, 6, 10]"),
    v("with-zero", "`accumulate` is imported and `nums` is a list of numbers. Get the running totals with a leading 0, so the list is one longer than `nums`.", IT("accumulate") + "\nnums = [1, 2, 3]", "gives [0, 1, 3, 6]", "list(accumulate(nums, initial=0))", "_ == [0, 1, 3, 6]", {
      accepted: ["[0] + list(accumulate(nums))"],
      explain: "The leading 0 makes range sums prefix[j] - prefix[i] work without special cases.",
    }),
    v("running-max", "`accumulate` is imported and `nums` is a list of numbers. Get the list of the largest value seen so far at each position.", IT("accumulate") + "\nnums = [2, 1, 5, 3]", "gives [2, 2, 5, 5]", "list(accumulate(nums, max))", "_ == [2, 2, 5, 5]", {
      explain: "The second argument is the function that combines the running value with the next item.",
    }),
    v("import", "`nums` is a list of numbers. Get the list of running totals using itertools. Include the import.", "nums = [1, 2, 3]", "gives [1, 3, 6]", IT("accumulate") + "\nlist(accumulate(nums))", "_ == [1, 3, 6]"),
  ]),

  skill("permutations-combinations", 2, { explain: "permutations cares about order, combinations does not; both yield tuples." }, [
    v("all-orders", "`permutations` is imported and `nums` is a list. Get every ordering of its items, as a list of tuples.", IT("permutations") + "\nnums = [1, 2, 3]", "gives 6 tuples, starting (1, 2, 3)", "list(permutations(nums))", "len(_) == 6 and _[0] == (1, 2, 3) and (3, 2, 1) in _"),
    v("ordered-pairs", "`permutations` is imported and `nums` is a list. Get every ordered arrangement of 2 of its items, as a list of tuples.", IT("permutations") + "\nnums = [1, 2, 3]", "gives 6 tuples, including (1, 2) and (2, 1)", "list(permutations(nums, 2))", "len(_) == 6 and (2, 1) in _ and (1, 2) in _"),
    v("unordered-pairs", "`combinations` is imported and `nums` is a list. Get every way of choosing 2 of its items where order does not matter, as a list of tuples.", IT("combinations") + "\nnums = [1, 2, 3]", "gives [(1, 2), (1, 3), (2, 3)]", "list(combinations(nums, 2))", "_ == [(1, 2), (1, 3), (2, 3)]"),
    v("choose-k", "`combinations` is imported, `nums` is a list and `k` is an int. Get every way of choosing `k` of its items, as a list of tuples.", IT("combinations") + "\nnums = [1, 2, 3, 4]\nk = 3", "gives 4 tuples", "list(combinations(nums, k))", "len(_) == 4 and _[0] == (1, 2, 3)"),
    v("pairs-loop", "`combinations` is imported and `nums` is a list. Write only the `for` line that visits every unordered pair of items as `a` and `b`.", IT("combinations") + "\nnums = [1, 2, 3]", "out ends up [3, 4, 5]", "for a, b in combinations(nums, 2):", "out == [3, 4, 5]", {
      template: "out = []\n{answer}\n    out.append(a + b)",
    }),
    v("anagrams", "`permutations` is imported and `s` is a string. Get every rearrangement of its characters as a list of STRINGS. Call each tuple `p`.", IT("permutations") + '\ns = "ab"', 'gives ["ab", "ba"]', '["".join(p) for p in permutations(s)]', '_ == ["ab", "ba"]', {
      explain: "permutations yields tuples of characters; join each one back into a string.",
    }),
    v("with-replacement", "`combinations_with_replacement` is imported and `nums` is a list. Get every way of choosing 2 items where the same item may be chosen twice, as a list of tuples.", IT("combinations_with_replacement") + "\nnums = [1, 2]", "gives [(1, 1), (1, 2), (2, 2)]", "list(combinations_with_replacement(nums, 2))", "_ == [(1, 1), (1, 2), (2, 2)]"),
  ]),

  skill("product", 2, { explain: "product is nested for loops written as one call." }, [
    v("two-lists", "`product` is imported, and `xs` and `ys` are lists. Get every (x, y) combination, as a list of tuples.", IT("product") + '\nxs = [1, 2]\nys = ["a", "b"]', 'gives [(1, "a"), (1, "b"), (2, "a"), (2, "b")]', "list(product(xs, ys))", '_ == [(1, "a"), (1, "b"), (2, "a"), (2, "b")]'),
    v("repeat", "`product` is imported and `n` is an int. Get every tuple of `n` bits, each 0 or 1.", IT("product") + "\nn = 2", "gives [(0, 0), (0, 1), (1, 0), (1, 1)]", "list(product([0, 1], repeat=n))", "_ == [(0, 0), (0, 1), (1, 0), (1, 1)]", {
      accepted: ["list(product((0, 1), repeat=n))", "list(product(range(2), repeat=n))"],
    }),
    v("grid-cells", "`product` is imported, and `rows` and `cols` are the dimensions of a grid. Write only the `for` line that visits every cell as `r` and `c` in a single loop.", IT("product") + "\nrows = 2\ncols = 2", "out ends up [(0, 0), (0, 1), (1, 0), (1, 1)]", "for r, c in product(range(rows), range(cols)):", "out == [(0, 0), (0, 1), (1, 0), (1, 1)]", {
      template: "out = []\n{answer}\n    out.append((r, c))",
    }),
  ]),

  skill("chain-group", 3, { explain: "chain joins iterables end to end; groupby collects runs of equal neighbours; pairwise gives adjacent pairs." }, [
    v("chain", "`chain` is imported, and `a` and `b` are iterables of different kinds. Get one list with the items of `a` followed by the items of `b`.", IT("chain") + "\na = [1, 2]\nb = (3, 4)", "gives [1, 2, 3, 4]", "list(chain(a, b))", "_ == [1, 2, 3, 4]", {
      explain: "a + b fails for a list and a tuple; chain accepts any iterables.",
    }),
    v("flatten", "`chain` is imported and `grid` is a list of lists. Get one flat list of all its values.", IT("chain") + "\ngrid = [[1, 2], [3], [4, 5]]", "gives [1, 2, 3, 4, 5]", "list(chain.from_iterable(grid))", "_ == [1, 2, 3, 4, 5]", {
      accepted: ["list(chain(*grid))"],
    }),
    v("runs", "`groupby` is imported and `s` is a string. Get a list of (character, run length) tuples for each run of repeated characters. Use `k` for the character and `g` for the group.", IT("groupby") + '\ns = "aaabcc"', 'gives [("a", 3), ("b", 1), ("c", 2)]', "[(k, len(list(g))) for k, g in groupby(s)]", '_ == [("a", 3), ("b", 1), ("c", 2)]', {
      explain: "Each group is an iterator, so it has to be turned into a list before len().",
    }),
    v("pairwise", "`pairwise` is imported and `nums` is a list. Get a list of tuples of each item with the one after it.", IT("pairwise") + "\nnums = [1, 4, 9]", "gives [(1, 4), (4, 9)]", "list(pairwise(nums))", "_ == [(1, 4), (4, 9)]", {
      accepted: ["list(zip(nums, nums[1:]))"],
    }),
    v("islice", "`islice` is imported and `it` is an iterator that cannot be sliced with brackets. Get its first `k` items as a list.", IT("islice") + "\nit = iter([5, 6, 7, 8])\nk = 2", "gives [5, 6]", "list(islice(it, k))", "_ == [5, 6]"),
  ]),

  skill("functools", 3, { explain: "functools holds tools that work on functions: reduce folds a list, partial pre-fills arguments." }, [
    v("reduce-product", "`reduce` is imported and `nums` is a list of numbers. Get the product of all of them, using an inline function of `a` and `b`.", "from functools import reduce\nnums = [1, 2, 3, 4]", "gives 24", "reduce(lambda a, b: a * b, nums)", "_ == 24", {
      accepted: ["import math\nmath.prod(nums)"],
    }),
    v("reduce-xor", "`reduce` is imported and `nums` is a list of ints in which every value appears twice except one. Get the XOR of all of them, using an inline function of `a` and `b`.", "from functools import reduce\nnums = [4, 1, 2, 1, 2]", "gives 4", "reduce(lambda a, b: a ^ b, nums)", "_ == 4", {
      accepted: ["from operator import xor\nreduce(xor, nums)"],
    }),
    v("reduce-initial", "`reduce` is imported and `nums` is a list that may be empty. Get the product of all of them, starting from 1 so that an empty list gives 1. Use `a` and `b`.", "from functools import reduce\nnums = []", "gives 1", "reduce(lambda a, b: a * b, nums, 1)", "_ == 1", {
      explain: "Without the third argument, reduce raises TypeError on an empty list.",
    }),
    v("partial", "`partial` is imported and `power` is the function below. Create `square`, a version of it with `exp` fixed at 2.", "from functools import partial\ndef power(base, exp):\n    return base ** exp", "square(5) gives 25", "square = partial(power, exp=2)", "square(5) == 25"),
  ]),
]);

export const bits = topic("python", "bits", [
  skill("bit-operators", 2, { explain: "& is AND, | is OR, ^ is XOR, ~ is NOT, << and >> shift." }, [
    v("and", "`a` and `b` are ints. Get the bits that are set in BOTH.", "a = 0b1100\nb = 0b1010", "gives 8 (binary 1000)", "a & b", "_ == 8"),
    v("or", "`a` and `b` are ints. Get the bits that are set in EITHER.", "a = 0b1100\nb = 0b1010", "gives 14 (binary 1110)", "a | b", "_ == 14"),
    v("xor", "`a` and `b` are ints. Get the bits that are set in exactly ONE of them.", "a = 0b1100\nb = 0b1010", "gives 6 (binary 0110)", "a ^ b", "_ == 6", {
      explain: "^ is XOR, never a power.",
    }),
    v("shift-left", "`x` is an int. Shift its bits one place to the left, doubling it.", "x = 5", "gives 10", "x << 1", "_ == 10", {
      accepted: ["x * 2"],
    }),
    v("shift-right", "`x` is an int. Shift its bits one place to the right, halving it and dropping the last bit.", "x = 11", "gives 5", "x >> 1", "_ == 5", {
      accepted: ["x // 2"],
    }),
    v("power-of-two", "`k` is a small non-negative int. Using a shift, get 2 to the power `k`.", "k = 4", "gives 16", "1 << k", "_ == 16", {
      accepted: ["2 ** k"],
    }),
    v("last-bit", "`x` is an int. Get its lowest bit, which is 1 when `x` is odd and 0 when even.", "x = 7", "gives 1", "x & 1", "_ == 1", {
      accepted: ["x % 2"],
    }),
  ]),

  skill("bit-single", 2, { explain: "1 << i is a mask with only bit i set; combine it with |, & and ^ to set, test and flip that bit." }, [
    v("test", "`x` is an int and `i` is a bit position, counted from 0 at the right. Get the value of that bit, 0 or 1.", "x = 0b1010\ni = 3", "gives 1", "(x >> i) & 1", "_ == 1", {
      accepted: ["x >> i & 1"],
    }),
    v("set", "`x` is an int and `i` is a bit position. Get `x` with that bit turned ON.", "x = 0b1000\ni = 1", "gives 10 (binary 1010)", "x | (1 << i)", "_ == 10", {
      accepted: ["x | 1 << i"],
    }),
    v("clear", "`x` is an int and `i` is a bit position. Get `x` with that bit turned OFF.", "x = 0b1010\ni = 1", "gives 8 (binary 1000)", "x & ~(1 << i)", "_ == 8"),
    v("toggle", "`x` is an int and `i` is a bit position. Get `x` with that bit flipped.", "x = 0b1010\ni = 0", "gives 11 (binary 1011)", "x ^ (1 << i)", "_ == 11", {
      accepted: ["x ^ 1 << i"],
    }),
    v("add-to-mask", "`mask` is an int used as a set of small numbers. Add the number `i` to the set, in place.", "mask = 0b0001\ni = 2", "mask becomes 5 (binary 0101)", "mask |= 1 << i", "mask == 5", {
      accepted: ["mask |= (1 << i)", "mask = mask | (1 << i)"],
    }),
    v("in-mask", "`mask` is an int used as a set of small numbers. Write the `if` line whose block runs when the number `i` is in the set.", "mask = 0b0101\ni = 2", 'out ends up "yes"', "if mask & (1 << i):", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
      accepted: ["if mask & 1 << i:", "if (mask >> i) & 1:", "if mask >> i & 1:"],
    }),
  ]),

  skill("bit-tricks", 3, { explain: "x & (x - 1) removes the lowest set bit; x & -x isolates it." }, [
    v("clear-lowest", "`x` is a positive int. Get `x` with its lowest set bit removed.", "x = 0b1100", "gives 8 (binary 1000)", "x & (x - 1)", "_ == 8"),
    v("lowest-bit", "`x` is a positive int. Get just its lowest set bit, as a number.", "x = 0b1100", "gives 4 (binary 0100)", "x & -x", "_ == 4"),
    v("is-power-of-two", "`x` is an int. Write an expression that is True when it is a power of two.", "x = 16", "gives True", "x > 0 and x & (x - 1) == 0", "_ is True", {
      accepted: ["x > 0 and (x & (x - 1)) == 0", "x > 0 and not x & (x - 1)"],
      explain: "A power of two has exactly one set bit, so clearing it leaves 0. The x > 0 guard rules out 0.",
    }),
    v("count-ones", "`x` is a non-negative int. Get how many of its bits are 1.", "x = 0b1011", "gives 3", 'bin(x).count("1")', "_ == 3", {
      accepted: ["x.bit_count()"],
    }),
    v("bit-length", "`x` is a positive int. Get how many bits are needed to write it in binary.", "x = 5", "gives 3", "x.bit_length()", "_ == 3", {
      accepted: ["len(bin(x)) - 2"],
    }),
    v("xor-all", "`nums` is a list in which every value appears twice except one, and `res` starts at 0. XOR every item into `res` to find the odd one out (2 lines). Call each item `x`.", "nums = [4, 1, 2, 1, 2]\nres = 0", "res ends up 4", "for x in nums:\n    res ^= x", "res == 4", {
      explain: "x ^ x is 0, so the pairs cancel and only the single value is left.",
    }),
  ]),

  skill("bit-masks", 3, { explain: "The numbers 0 to 2^n - 1 are exactly the subsets of n items, one bit per item." }, [
    v("all-subsets-loop", "`n` is the number of items. Write only the `for` line that loops `mask` over every subset, from 0 up to but not including 2 to the `n`.", "n = 2", "out ends up [0, 1, 2, 3]", "for mask in range(1 << n):", "out == [0, 1, 2, 3]", {
      template: "out = []\n{answer}\n    out.append(mask)",
      accepted: ["for mask in range(2 ** n):"],
    }),
    v("subset-from-mask", "`nums` is a list of `n` items and `mask` is an int whose bits pick some of them. Build the list of the picked items. Call the index `i`.", 'nums = ["a", "b", "c"]\nn = 3\nmask = 0b101', 'gives ["a", "c"]', "[nums[i] for i in range(n) if mask & (1 << i)]", '_ == ["a", "c"]', {
      accepted: ["[nums[i] for i in range(n) if mask >> i & 1]", "[nums[i] for i in range(n) if (mask >> i) & 1]"],
    }),
    v("full-mask", "`n` is the number of items. Get the mask with all `n` low bits set, meaning every item picked.", "n = 4", "gives 15 (binary 1111)", "(1 << n) - 1", "_ == 15", {
      accepted: ["2 ** n - 1"],
      explain: "The parentheses matter: 1 << n - 1 shifts by n - 1.",
    }),
    v("padded-binary", "`x` is a small non-negative int. Format it as a string of exactly 8 binary digits, padded with leading zeros.", "x = 5", 'gives "00000101"', 'format(x, "08b")', '_ == "00000101"', {
      accepted: ['f"{x:08b}"', "bin(x)[2:].zfill(8)"],
    }),
  ]),
]);

export const misc = topic("python", "misc", [
  skill("random", 3, { explain: "The random module is needed for the few LeetCode problems about shuffling and sampling." }, [
    v("randint", "The `random` module is imported. Get a random whole number from 1 to 6, including both ends.", "import random", "gives a whole number from 1 to 6", "random.randint(1, 6)", "type(_) is int and 1 <= _ <= 6", {
      explain: "randint includes BOTH ends, unlike range.",
    }),
    v("choice", "The `random` module is imported and `nums` is a list. Pick one of its items at random.", "import random\nnums = [10, 20, 30]", "gives one of the items", "random.choice(nums)", "_ in nums"),
    v("shuffle", "The `random` module is imported and `nums` is a list. Put it into a random order, in place.", "import random\nnums = [1, 2, 3]", "nums still holds 1, 2 and 3, in some order", "random.shuffle(nums)", "res is None and sorted(nums) == [1, 2, 3]", {
      template: "res = (\n    {answer}\n)",
      explain: "shuffle works in place and returns None.",
    }),
    v("random-index", "The `random` module is imported and `nums` is a non-empty list. Get a random valid index into it.", "import random\nnums = [10, 20, 30]", "gives 0, 1 or 2", "random.randrange(len(nums))", "type(_) is int and 0 <= _ < 3", {
      accepted: ["random.randint(0, len(nums) - 1)"],
    }),
  ]),

  skill("exceptions", 3, { explain: "except takes the exception class to catch; raise creates and throws one." }, [
    v("key-error", "`d` is a dictionary and `k` is a key that is not in it. Write the line that catches the error raised by the lookup below.", 'd = {"a": 1}\nk = "z"', "val ends up 0", "except KeyError:", "val == 0", {
      template: "try:\n    val = d[k]\n{answer}\n    val = 0",
    }),
    v("value-error", "`s` is a string that is not a number. Write the line that catches the error raised by the conversion below.", 's = "abc"', "val ends up -1", "except ValueError:", "val == -1", {
      template: "try:\n    val = int(s)\n{answer}\n    val = -1",
    }),
    v("index-error", "`nums` is a list and `i` is an index past its end. Write the line that catches the error raised by the lookup below.", "nums = [1, 2]\ni = 5", "val ends up None", "except IndexError:", "val is None and ran", {
      template: "ran = False\ntry:\n    val = nums[i]\n{answer}\n    val = None\nran = True",
    }),
    v("raise", 'Inside the `try` block below, throw a ValueError carrying the message "bad".', "", 'msg ends up "bad"', 'raise ValueError("bad")', 'msg == "bad"', {
      template: "msg = None\ntry:\n    {answer}\nexcept ValueError as e:\n    msg = str(e)",
    }),
  ]),

  skill("std-constants", 3, { explain: "A few standard-library constants save typing out alphabets and limits." }, [
    v("lowercase", "Get the string of all 26 lowercase letters from the standard library. Include the import.", "", 'gives "abcdefghijklmnopqrstuvwxyz"', "import string\nstring.ascii_lowercase", '_ == "abcdefghijklmnopqrstuvwxyz"'),
    v("digits", "The `string` module is imported. Get the string of the ten digit characters from it.", "import string", 'gives "0123456789"', "string.digits", '_ == "0123456789"'),
    v("maxsize", "Get the largest ordinary int the platform uses for sizes, from the standard library. Include the import.", "", "gives a very large int", "import sys\nsys.maxsize", "type(_) is int and _ >= 2 ** 31 - 1"),
  ]),

  skill("std-helpers", 3, { explain: "namedtuple gives a tuple with named fields; deepcopy copies every level of a nested structure." }, [
    v("namedtuple", '`namedtuple` is imported. Create `Point`, a named tuple type with the fields "x" and "y".', "from collections import namedtuple", "Point(1, 2).x gives 1, and Point(1, 2) equals (1, 2)", 'Point = namedtuple("Point", ["x", "y"])', "Point(1, 2).x == 1 and Point(1, 2) == (1, 2)", {
      accepted: ['Point = namedtuple("Point", "x y")'],
    }),
    v("deepcopy", "`grid` is a list of lists. Create `g2`, a fully independent copy of it, using the copy module. Include the import.", "grid = [[1, 2], [3, 4]]", "g2 equals grid but shares no rows with it", "import copy\ng2 = copy.deepcopy(grid)", "g2 == grid and g2 is not grid and g2[0] is not grid[0]"),
  ]),
]);
