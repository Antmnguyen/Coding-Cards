import { skill, topic, v } from "../topic";

/** Second pass, batch 2: lists, slicing, sets, Counter and tuples. */

const CNT = "from collections import Counter";

export const listsMore = topic("python", "lists", [
  skill("list-questions", 2, { explain: "Most questions about a whole list are one built-in call, often with a generator inside." }, [
    v("second-largest", "`nums` is a list of distinct numbers. Using sorting, get the second largest.", "nums = [4, 9, 1, 7]", "gives 7", "sorted(nums)[-2]", "_ == 7", {
      accepted: ["sorted(nums, reverse=True)[1]"],
    }),
    v("kth-from-end", "`nums` is a list and `k` is a positive int. Get the item that is `k` places from the end, where 1 means the last item.", "nums = [5, 6, 7, 8]\nk = 2", "gives 7", "nums[-k]", "_ == 7"),
    v("index-after", "`nums` is a list. Get the index of the next occurrence of `x` AFTER index `i`.", "nums = [5, 6, 5, 6]\nx = 5\ni = 0", "gives 2", "nums.index(x, i + 1)", "_ == 2", {
      explain: "The second argument of index is where the search starts.",
    }),
    v("count-even", "`nums` is a list of ints. Count how many are even. Call each item `x`.", "nums = [1, 2, 4, 5]", "gives 2", "sum(x % 2 == 0 for x in nums)", "_ == 2", {
      accepted: ["sum(1 for x in nums if x % 2 == 0)", "len([x for x in nums if x % 2 == 0])"],
    }),
    v("all-equal", "`nums` is a non-empty list. Write an expression that is True when every item is the same.", "nums = [3, 3, 3]", "gives True", "len(set(nums)) == 1", "_ is True", {
      accepted: ["all(x == nums[0] for x in nums)", "nums.count(nums[0]) == len(nums)"],
    }),
    v("ends-equal", "`nums` is a non-empty list. Write an expression that is True when its first and last items are equal.", "nums = [4, 1, 4]", "gives True", "nums[0] == nums[-1]", "_ is True"),
    v("in-rest", "`nums` is a list. Write an expression that is True when `x` appears somewhere from index `i` onwards.", "nums = [7, 1, 2]\nx = 7\ni = 1", "gives False", "x in nums[i:]", "_ is False"),
    v("product", "The `math` module is imported and `nums` is a list of numbers. Get the product of all of them.", "import math\nnums = [1, 2, 3, 4]", "gives 24", "math.prod(nums)", "_ == 24"),
    v("sum-with-start", "`nums` is a list of numbers and `base` is a starting amount. Get `base` plus the total of the list, in one call.", "nums = [1, 2, 3]\nbase = 100", "gives 106", "sum(nums, base)", "_ == 106", {
      accepted: ["base + sum(nums)", "sum(nums) + base"],
      explain: "The second argument of sum is the starting value.",
    }),
    v("average-last-k", "`nums` is a list of numbers and `k` is an int. Get the average of the last `k` items.", "nums = [1, 2, 4, 6]\nk = 2", "gives 5.0", "sum(nums[-k:]) / k", "_ == 5.0"),
  ]),

  skill("list-edits", 2, { explain: "Assigning to nums[:] replaces the contents of the same list object, which is what in-place problems require." }, [
    v("remove-all", "`nums` is a list and `alias` is another name for it. Remove every occurrence of `val` so that `alias` sees the change too. Call each item `x`.", "nums = [3, 2, 3, 4]\nalias = nums\nval = 3", "nums and alias both show [2, 4]", "nums[:] = [x for x in nums if x != val]", "alias == [2, 4]", {
      explain: "nums = [...] would make a new list and leave the original untouched.",
    }),
    v("rotate-in-place", "`nums` is a list and `alias` is another name for it. Rotate it right by `k` places in place.", "nums = [1, 2, 3, 4]\nalias = nums\nk = 1", "nums and alias both show [4, 1, 2, 3]", "nums[:] = nums[-k:] + nums[:-k]", "alias == [4, 1, 2, 3]"),
    v("zero-fill", "`nums` is a list and `alias` is another name for it. Set every item to 0 in place, keeping the length.", "nums = [5, 6, 7]\nalias = nums", "nums and alias both show [0, 0, 0]", "nums[:] = [0] * len(nums)", "alias == [0, 0, 0]"),
    v("replace-negatives", "`nums` is a list of numbers. Rebuild it with every negative item replaced by 0. Call each item `x`.", "nums = [3, -1, 2]", "nums becomes [3, 0, 2]", "nums = [0 if x < 0 else x for x in nums]", "nums == [3, 0, 2]", {
      accepted: ["nums = [max(x, 0) for x in nums]", "nums = [x if x >= 0 else 0 for x in nums]"],
    }),
    v("drop-last", "`nums` is a list. Delete its last item without needing the value back.", "nums = [1, 2, 3]", "nums becomes [1, 2]", "del nums[-1]", "nums == [1, 2]", {
      accepted: ["nums.pop()"],
    }),
    v("swap-adjacent", "`nums` is a list and `i` is an index. Swap the item at `i` with the one right after it.", "nums = [1, 2, 3]\ni = 0", "nums becomes [2, 1, 3]", "nums[i], nums[i + 1] = nums[i + 1], nums[i]", "nums == [2, 1, 3]"),
    v("append-repeated", "`res` is a list. Add `count` copies of the value `x` to the end of it.", "res = [1]\nx = 7\ncount = 3", "res becomes [1, 7, 7, 7]", "res += [x] * count", "res == [1, 7, 7, 7]", {
      accepted: ["res.extend([x] * count)"],
    }),
    v("extend-range", "`nums` is a list and `n` is an int. Add the ints 0 up to `n - 1` to the end of it.", "nums = [9]\nn = 3", "nums becomes [9, 0, 1, 2]", "nums.extend(range(n))", "nums == [9, 0, 1, 2]", {
      accepted: ["nums += range(n)", "nums += list(range(n))"],
    }),
    v("reverse-segment", "`nums` is a list and `i`, `j` are indexes. Reverse just the stretch from `i` through `j`, both included, in place.", "nums = [1, 2, 3, 4, 5]\ni = 1\nj = 3", "nums becomes [1, 4, 3, 2, 5]", "nums[i:j + 1] = nums[i:j + 1][::-1]", "nums == [1, 4, 3, 2, 5]", {
      accepted: ["nums[i:j + 1] = reversed(nums[i:j + 1])"],
    }),
  ]),

  skill("list-of-lists", 2, { explain: "A result made of pairs is a list of small lists; each pair is appended as one list." }, [
    v("append-pair", "`res` is a list of 2-item lists. Add the pair of `a` and `b` as a new 2-item list.", "res = []\na = 1\nb = 2", "res becomes [[1, 2]]", "res.append([a, b])", "res == [[1, 2]]", {
      explain: "res.append(a, b) is an error; append takes one argument, here a list.",
    }),
    v("last-pair-first", "`res` is a list of 2-item lists. Get the first value of its LAST pair.", "res = [[1, 2], [5, 6]]", "gives 5", "res[-1][0]", "_ == 5"),
    v("row-lengths", "`rows` is a list of lists of different lengths. Get a list of the length of each. Call each inner list `r`.", "rows = [[1], [2, 3], []]", "gives [1, 2, 0]", "[len(r) for r in rows]", "_ == [1, 2, 0]", {
      accepted: ["list(map(len, rows))"],
    }),
    v("longest-row", "`rows` is a list of lists of different lengths. Get the longest inner list.", "rows = [[1], [2, 3], []]", "gives [2, 3]", "max(rows, key=len)", "_ == [2, 3]"),
    v("first-of-each", "`pairs` is a list of 2-item lists. Get a list of the first value of each. Call each pair `p`.", "pairs = [[1, 2], [3, 4]]", "gives [1, 3]", "[p[0] for p in pairs]", "_ == [1, 3]", {
      accepted: ["[a for a, b in pairs]", "[a for a, _ in pairs]"],
    }),
  ]),
]);

export const slicingMore = topic("python", "slicing", [
  skill("slice-negative-both", 2, { explain: "Both bounds can be negative; the stop is still excluded." }, [
    v("list", "`nums` is a list. Get the two items just before the last one: from third-last up to but not including the last.", "nums = [10, 20, 30, 40, 50]", "gives [30, 40]", "nums[-3:-1]", "_ == [30, 40]"),
    v("str", "`s` is a string. Get the two characters just before the last one: from third-last up to but not including the last.", 's = "abcde"', 'gives "cd"', "s[-3:-1]", '_ == "cd"'),
  ]),

  skill("slice-three-parts", 3, { explain: "x[start:stop:step] takes all three at once." }, [
    v("variables", "`nums` is a list. Get the items from index `i` up to but not including index `j`, taking every `k`-th one.", "nums = [0, 1, 2, 3, 4, 5, 6, 7]\ni = 1\nj = 7\nk = 2", "gives [1, 3, 5]", "nums[i:j:k]", "_ == [1, 3, 5]"),
    v("last-k-reversed", "`nums` is a list and `k` is an int. Get the last `k` items in reverse order.", "nums = [1, 2, 3, 4, 5]\nk = 2", "gives [5, 4]", "nums[-k:][::-1]", "_ == [5, 4]", {
      accepted: ["nums[:-k - 1:-1]", "nums[::-1][:k]"],
    }),
    v("delete-every-other", "`nums` is a list. Delete every other item in place, starting with the first.", "nums = [1, 2, 3, 4, 5]", "nums becomes [2, 4]", "del nums[::2]", "nums == [2, 4]"),
  ]),

  skill("slice-compare", 2, { explain: "A slice is a value like any other, so it can be compared with == directly." }, [
    v("prefix-test", "`s` and `p` are strings. Using a slice, write an expression that is True when `s` begins with `p`.", 's = "apple"\np = "app"', "gives True", "s[:len(p)] == p", "_ is True", {
      accepted: ["s.startswith(p)"],
    }),
    v("suffix-test", "`s` and `p` are non-empty strings. Using a slice, write an expression that is True when `s` ends with `p`.", 's = "apple"\np = "ple"', "gives True", "s[-len(p):] == p", "_ is True", {
      accepted: ["s.endswith(p)"],
    }),
    v("window-match", "`s` and `word` are strings and `i` is an index. Write an expression that is True when `word` appears in `s` starting exactly at index `i`.", 's = "hello"\nword = "ll"\ni = 2', "gives True", "s[i:i + len(word)] == word", "_ is True", {
      accepted: ["s.startswith(word, i)"],
    }),
    v("halves-equal", "`nums` is a list of even length. Write an expression that is True when its first half equals its second half.", "nums = [1, 2, 1, 2]", "gives True", "nums[:len(nums) // 2] == nums[len(nums) // 2:]", "_ is True"),
  ]),

  skill("slice-generate", 3, { explain: "A comprehension over start positions turns one slice expression into every window, prefix or chunk." }, [
    v("chunks", "`nums` is a list and `k` is a chunk size. Split it into consecutive chunks of `k` items, as a list of lists. Call the start index `i`.", "nums = [1, 2, 3, 4, 5]\nk = 2", "gives [[1, 2], [3, 4], [5]]", "[nums[i:i + k] for i in range(0, len(nums), k)]", "_ == [[1, 2], [3, 4], [5]]"),
    v("windows", "`s` is a string and `k` is a window size. Build the list of every substring of length `k`. Call the start index `i`.", 's = "abcd"\nk = 2', 'gives ["ab", "bc", "cd"]', "[s[i:i + k] for i in range(len(s) - k + 1)]", '_ == ["ab", "bc", "cd"]'),
    v("prefixes", "`s` is a string. Build the list of all its non-empty prefixes, shortest first. Call the end index `i`.", 's = "abc"', 'gives ["a", "ab", "abc"]', "[s[:i] for i in range(1, len(s) + 1)]", '_ == ["a", "ab", "abc"]'),
    v("suffixes", "`s` is a string. Build the list of all its non-empty suffixes, longest first. Call the start index `i`.", 's = "abc"', 'gives ["abc", "bc", "c"]', "[s[i:] for i in range(len(s))]", '_ == ["abc", "bc", "c"]'),
    v("swap-halves", "`s` is a string of even length. Build the string with its two halves swapped.", 's = "abcd"', 'gives "cdab"', "s[len(s) // 2:] + s[:len(s) // 2]", '_ == "cdab"'),
  ]),
]);

export const setsMore = topic("python", "sets", [
  skill("set-patterns", 2, { explain: "The standard set loop is: check membership, act on a hit, otherwise add." }, [
    v("seen-before", "Inside the function below, `seen` is a set of the items met so far and `x` is the current item. Return True if `x` was met before; otherwise remember it (3 lines).", "", "result ends up True", "if x in seen:\n    return True\nseen.add(x)", "result is True", {
      template: "def has_duplicate(nums):\n    seen = set()\n    for x in nums:\n        {answer}\n    return False\n\nresult = has_duplicate([1, 2, 1]) and not has_duplicate([1, 2])",
    }),
    v("sequence-start", "`s` is a set of ints and `x` is one of them. Write an expression that is True when `x` is the START of a run of consecutive numbers, meaning the number just below it is not in the set.", "s = {4, 5, 6, 9}\nx = 4", "gives True", "x - 1 not in s", "_ is True"),
    v("missing-numbers", "`nums` is a list holding some of the ints from 1 to `n`. Get the set of ints from 1 to `n` that are missing.", "nums = [1, 3]\nn = 4", "gives {2, 4}", "set(range(1, n + 1)) - set(nums)", "_ == {2, 4}"),
    v("allowed-chars", "`word` is a string and `allowed` is a set of characters. Write an expression that is True when every character of `word` is in `allowed`.", 'word = "abba"\nallowed = {"a", "b", "c"}', "gives True", "set(word) <= allowed", "_ is True", {
      accepted: ["all(c in allowed for c in word)", "set(word).issubset(allowed)"],
    }),
    v("any-common", "`a` and `b` are sets. Write an expression that is True when they share at least one item.", "a = {1, 2}\nb = {2, 3}", "gives True", "bool(a & b)", "_ is True", {
      accepted: ["not a.isdisjoint(b)", "len(a & b) > 0"],
    }),
    v("land-cells", "`grid` is a list of lists of 0s and 1s, `rows` by `cols`. Build the SET of (row, col) tuples of every cell that holds a 1. Use `r` and `c`.", "grid = [[1, 0], [0, 1]]\nrows = 2\ncols = 2", "gives {(0, 0), (1, 1)}", "{(r, c) for r in range(rows) for c in range(cols) if grid[r][c] == 1}", "_ == {(0, 0), (1, 1)} and type(_) is set"),
  ]),

  skill("set-more-ops", 3, { explain: "The method forms of the set operations accept several arguments, so a list of sets can be spread into them." }, [
    v("intersect-many", "`groups` is a list of sets. Get the set of items that appear in EVERY one of them.", "groups = [{1, 2, 3}, {2, 3}, {3, 4}]", "gives {3}", "set.intersection(*groups)", "_ == {3}", {
      accepted: ["groups[0].intersection(*groups[1:])"],
    }),
    v("union-many", "`groups` is a list of sets. Get the set of items that appear in ANY of them.", "groups = [{1}, {2}, {2, 3}]", "gives {1, 2, 3}", "set().union(*groups)", "_ == {1, 2, 3}", {
      accepted: ["set.union(*groups)"],
    }),
    v("frozen-member", "`groups` is a set of sets, which must be stored as frozensets. Add the pair of `a` and `b` as one unordered group.", "groups = set()\na = 1\nb = 2", "groups holds one frozenset of 1 and 2", "groups.add(frozenset((a, b)))", "groups == {frozenset({1, 2})}", {
      accepted: ["groups.add(frozenset([a, b]))", "groups.add(frozenset({a, b}))"],
      explain: "A plain set cannot be a member of a set; a frozenset can.",
    }),
    v("from-dict-values", "`d` is a dictionary. Get the set of its distinct values.", 'd = {"a": 1, "b": 1, "c": 2}', "gives {1, 2}", "set(d.values())", "_ == {1, 2}"),
    v("smallest", "`seen` is a set of numbers. Get the smallest one.", "seen = {4, 9, 1}", "gives 1", "min(seen)", "_ == 1"),
    v("copy", "`s` is a set. Make a separate copy of it.", "s = {1, 2}", "gives a new set {1, 2}", "s.copy()", "_ == s and _ is not s", {
      accepted: ["set(s)"],
    }),
  ]),
]);

export const countersMore = topic("python", "counter", [
  skill("counter-sources", 2, { explain: "Counter accepts any iterable, including a generator that computes what to count." }, [
    v("lengths", "`Counter` is imported and `words` is a list of strings. Count how many words there are of each LENGTH. Call each string `w`.", CNT + '\nwords = ["hi", "yo", "hey"]', "gives {2: 2, 3: 1}", "Counter(len(w) for w in words)", "_ == {2: 2, 3: 1}", {
      accepted: ["Counter(map(len, words))"],
    }),
    v("grid-values", "`Counter` is imported and `grid` is a list of lists. Count how many times each value appears anywhere in it. Use `row` and `x`.", CNT + "\ngrid = [[1, 2], [2, 2]]", "gives {2: 3, 1: 1}", "Counter(x for row in grid for x in row)", "_ == {1: 1, 2: 3}"),
    v("first-letters", "`Counter` is imported and `words` is a list of non-empty strings. Count how many words start with each letter. Call each string `w`.", CNT + '\nwords = ["apple", "avocado", "kiwi"]', 'gives {"a": 2, "k": 1}', "Counter(w[0] for w in words)", "_ == {'a': 2, 'k': 1}"),
  ]),

  skill("counter-questions", 2, { explain: "Questions about the counts are ordinary aggregate calls over freq.values() or freq.items()." }, [
    v("majority", "`freq` is a Counter built from the list `nums`. Write an expression that is True when the most common item appears more than half the time.", CNT + "\nnums = [3, 3, 4, 3]\nfreq = Counter(nums)", "gives True", "freq.most_common(1)[0][1] > len(nums) // 2", "_ is True", {
      accepted: ["max(freq.values()) > len(nums) // 2", "max(freq.values()) > len(nums) / 2"],
    }),
    v("all-top", "`freq` is a Counter. Build a list of EVERY item that has the highest count, in case of ties. Use `k` and `n`.", CNT + "\nfreq = Counter([1, 1, 2, 2, 3])", "gives [1, 2]", "[k for k, n in freq.items() if n == max(freq.values())]", "_ == [1, 2]"),
    v("counts-desc", "`freq` is a Counter. Get just the counts, largest first, as a list.", CNT + '\nfreq = Counter("aabbbc")', "gives [3, 2, 1]", "sorted(freq.values(), reverse=True)", "_ == [3, 2, 1]"),
    v("counts-unique", "`freq` is a Counter. Write an expression that is True when no two items share the same count.", CNT + '\nfreq = Counter("aabbbc")', "gives True", "len(set(freq.values())) == len(freq)", "_ is True"),
    v("odd-counts", "`freq` is a Counter of characters. Count how many characters appear an odd number of times. Call each count `n`.", CNT + '\nfreq = Counter("aabbbc")', "gives 2", "sum(n % 2 for n in freq.values())", "_ == 2", {
      accepted: ["sum(1 for n in freq.values() if n % 2 == 1)", "sum(n % 2 == 1 for n in freq.values())"],
    }),
    v("extra-letter", "`Counter` is imported. `t` is the string `s` with one extra letter added somewhere. Get that extra letter.", CNT + '\ns = "abc"\nt = "abxc"', 'gives "x"', "list(Counter(t) - Counter(s))[0]", '_ == "x"', {
      accepted: ["next(iter(Counter(t) - Counter(s)))"],
    }),
    v("window-matches", "`window` and `need` are Counters. Write an expression that is True when the window holds exactly the counts that are needed.", CNT + '\nwindow = Counter("abc")\nneed = Counter("cab")', "gives True", "window == need", "_ is True"),
    v("get-form", "`freq` is a Counter or a plain dictionary of counts, and you do not know which. Get the count for `x` in a way that is safe for both.", 'freq = {"a": 2}\nx = "z"', "gives 0", "freq.get(x, 0)", "_ == 0", {
      explain: "freq[x] is only safe on a Counter or defaultdict; get works on any dict.",
    }),
  ]),
]);

export const tuplesMore = topic("python", "tuples", [
  skill("tuple-more", 2, { explain: "Tuples support the same read-only operations as lists: +, *, count, index, sum, min, max." }, [
    v("concat", "`t` and `u` are tuples. Get one tuple with the values of `t` followed by the values of `u`.", "t = (1, 2)\nu = (3,)", "gives (1, 2, 3)", "t + u", "_ == (1, 2, 3)"),
    v("repeat", "`t` is a tuple. Get a tuple that is `t` repeated twice.", "t = (0, 1)", "gives (0, 1, 0, 1)", "t * 2", "_ == (0, 1, 0, 1)"),
    v("count", "`t` is a tuple. Get how many of its values equal `x`.", "t = (1, 2, 1)\nx = 1", "gives 2", "t.count(x)", "_ == 2"),
    v("index", "`t` is a tuple. Get the index of the first value equal to `x`.", "t = (5, 6, 7)\nx = 6", "gives 1", "t.index(x)", "_ == 1"),
    v("sum", "`t` is a tuple of numbers. Get their total.", "t = (1, 2, 3)", "gives 6", "sum(t)", "_ == 6"),
    v("inner-value", "`t` is a tuple of tuples. Get the first value of its second inner tuple.", "t = ((1, 2), (3, 4))", "gives 3", "t[1][0]", "_ == 3"),
    v("flip-pair", "`p` is a 2-value tuple. Get a new tuple with its two values in the opposite order.", "p = (1, 2)", "gives (2, 1)", "p[::-1]", "_ == (2, 1)", {
      accepted: ["(p[1], p[0])"],
    }),
    v("equals-list", "`t` is a tuple and `a` is a list holding the same values. Write an expression that is True by comparing them as the same type.", "t = (1, 2)\na = [1, 2]", "gives True, although t == a is False", "tuple(a) == t", "_ is True", {
      accepted: ["list(t) == a", "t == tuple(a)", "a == list(t)"],
      explain: "A tuple and a list are never equal, even with identical contents.",
    }),
    v("cell-in-list", "`cells` is a list of (row, col) tuples. Write an expression that is True when the cell at row `r`, column `c` is in it.", "cells = [(0, 1), (2, 2)]\nr = 2\nc = 2", "gives True", "(r, c) in cells", "_ is True"),
    v("pair-sums-with-index", "`pairs` is a list of 2-value tuples. Build a list of (index, sum of the pair) tuples. Use `i`, `a` and `b`.", "pairs = [(1, 2), (3, 4)]", "gives [(0, 3), (1, 7)]", "[(i, a + b) for i, (a, b) in enumerate(pairs)]", "_ == [(0, 3), (1, 7)]"),
  ]),
]);
