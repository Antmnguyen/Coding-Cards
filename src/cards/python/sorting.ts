import { skill, topic, v } from "../topic";
import { POINT } from "./given";

const POINTS = POINT + "\npoints = [Point(3, 1), Point(1, 2), Point(2, 0)]";

export const sorting = topic("python", "sorting", [
  skill("sort-basic", 1, { explain: "sorted() returns a new list; .sort() sorts in place and returns None." }, [
    v("words", "`words` is a list of strings. Get a new list of them in alphabetical order.", 'words = ["pear", "apple", "fig"]', 'gives ["apple", "fig", "pear"]', "sorted(words)", '_ == ["apple", "fig", "pear"]'),
    v("descending", "`nums` is a list of numbers. Get a new list sorted largest first.", "nums = [1, 3, 2]", "gives [3, 2, 1]", "sorted(nums, reverse=True)", "_ == [3, 2, 1]"),
    v("string-desc", "`s` is a string. Get a new string with its characters sorted in reverse alphabetical order.", 's = "bca"', 'gives "cba"', '"".join(sorted(s, reverse=True))', '_ == "cba"'),
    v("unique-sorted", "`nums` is a list with duplicates. Get a sorted list of its distinct values.", "nums = [3, 1, 3, 2]", "gives [1, 2, 3]", "sorted(set(nums))", "_ == [1, 2, 3]"),
  ]),

  skill("sort-pick", 2, { explain: "After sorting, positions answer rank questions: [-k] is the k-th largest, [k - 1] the k-th smallest." }, [
    v("kth-largest", "`nums` is a list and `k` is an int. Using sorting, get the `k`-th largest item.", "nums = [3, 2, 1, 5, 6, 4]\nk = 2", "gives 5", "sorted(nums)[-k]", "_ == 5", {
      accepted: ["sorted(nums, reverse=True)[k - 1]"],
    }),
    v("kth-smallest", "`nums` is a list and `k` is an int. Using sorting, get the `k`-th smallest item.", "nums = [3, 2, 1, 5]\nk = 2", "gives 2", "sorted(nums)[k - 1]", "_ == 2", {
      explain: "The k-th item is at index k - 1.",
    }),
    v("top-three", "`nums` is a list. Get its three largest items, largest first.", "nums = [4, 9, 1, 7, 3]", "gives [9, 7, 4]", "sorted(nums, reverse=True)[:3]", "_ == [9, 7, 4]"),
  ]),

  skill("sort-key", 2, { explain: "key takes a function of ONE item and sorts by what it returns; there is no comparator argument." }, [
    v("len", "`words` is a list of strings. Get a sorted copy with the shortest string first.", 'words = ["ccc", "a", "bb"]', 'gives ["a", "bb", "ccc"]', "sorted(words, key=len)", '_ == ["a", "bb", "ccc"]', {
      explain: "Pass the function itself: len, not len().",
    }),
    v("len-in-place", "`words` is a list of strings. Sort it in place, shortest string first.", 'words = ["ccc", "a", "bb"]', 'words becomes ["a", "bb", "ccc"]', "words.sort(key=len)", 'words == ["a", "bb", "ccc"]'),
    v("abs", "`nums` is a list of numbers. Get a sorted copy ordered by distance from zero.", "nums = [-5, 2, -1]", "gives [-1, 2, -5]", "sorted(nums, key=abs)", "_ == [-1, 2, -5]"),
    v("ignore-case", "`words` is a list of strings in mixed case. Get a sorted copy that ignores upper and lower case.", 'words = ["b", "A", "c"]', 'gives ["A", "b", "c"]', "sorted(words, key=str.lower)", '_ == ["A", "b", "c"]', {
      accepted: ["sorted(words, key=lambda w: w.lower())"],
      explain: "By default all capitals sort before all lowercase letters.",
    }),
    v("second-of-pair", "`a` is a list of pairs (2-value tuples). Sort it in place by the SECOND value of each pair. Call each pair `p`.", "a = [(1, 9), (2, 3)]", "a becomes [(2, 3), (1, 9)]", "a.sort(key=lambda p: p[1])", "a == [(2, 3), (1, 9)]"),
    v("last-char", "`words` is a list of strings. Get a sorted copy ordered by each word's last character. Call each string `w`.", 'words = ["ab", "ca", "bc"]', 'gives ["ca", "ab", "bc"]', "sorted(words, key=lambda w: w[-1])", '_ == ["ca", "ab", "bc"]'),
  ]),

  skill("sort-intervals", 2, { explain: "Lists of lists sort by their first item by default; give a key to sort by any other position." }, [
    v("by-start", "`intervals` is a list of [start, end] lists. Sort it in place by start.", "intervals = [[5, 6], [1, 9], [3, 4]]", "intervals becomes [[1, 9], [3, 4], [5, 6]]", "intervals.sort()", "intervals == [[1, 9], [3, 4], [5, 6]]", {
      accepted: ["intervals.sort(key=lambda x: x[0])"],
    }),
    v("by-end", "`intervals` is a list of [start, end] lists. Sort it in place by END. Call each interval `x`.", "intervals = [[5, 6], [1, 9], [3, 4]]", "intervals becomes [[3, 4], [5, 6], [1, 9]]", "intervals.sort(key=lambda x: x[1])", "intervals == [[3, 4], [5, 6], [1, 9]]"),
    v("by-length", "`intervals` is a list of [start, end] lists. Get a sorted copy ordered by interval length, shortest first. Call each interval `x`.", "intervals = [[1, 9], [3, 4], [5, 8]]", "gives [[3, 4], [5, 8], [1, 9]]", "sorted(intervals, key=lambda x: x[1] - x[0])", "_ == [[3, 4], [5, 8], [1, 9]]"),
  ]),

  skill("sort-multi-key", 3, { explain: "Return a tuple from the key to sort by several things; negate a number to reverse just that part." }, [
    v("len-then-alpha", "`words` is a list of strings. Get a sorted copy ordered by length, and alphabetically among words of the same length. Call each string `w`.", 'words = ["bb", "a", "ab"]', 'gives ["a", "ab", "bb"]', "sorted(words, key=lambda w: (len(w), w))", '_ == ["a", "ab", "bb"]'),
    v("count-desc-then-alpha", "`pairs` is a list of (word, count) tuples. Get a sorted copy with the highest count first, and alphabetical order among equal counts. Call each tuple `p`.", 'pairs = [("b", 2), ("a", 2), ("c", 5)]', 'gives [("c", 5), ("a", 2), ("b", 2)]', "sorted(pairs, key=lambda p: (-p[1], p[0]))", '_ == [("c", 5), ("a", 2), ("b", 2)]', {
      explain: "reverse=True would also reverse the alphabetical part; negating the count reverses only that.",
    }),
    v("second-desc", "`pairs` is a list of 2-value tuples. Get a sorted copy ordered by the second value, largest first. Call each tuple `p`.", "pairs = [(1, 3), (2, 9), (3, 5)]", "gives [(2, 9), (3, 5), (1, 3)]", "sorted(pairs, key=lambda p: p[1], reverse=True)", "_ == [(2, 9), (3, 5), (1, 3)]", {
      accepted: ["sorted(pairs, key=lambda p: -p[1])"],
    }),
  ]),

  skill("sort-objects", 2, { explain: "Objects have no natural order; give sorted a key that reads the field to sort by." }, [
    v("by-field", "`points` is a list of `Point` objects. Get a sorted copy ordered by the `x` field. Call each object `p`.", POINTS, "gives the points with x = 1, 2, 3 in that order", "sorted(points, key=lambda p: p.x)", "[p.x for p in _] == [1, 2, 3]"),
    v("in-place-desc", "`points` is a list of `Point` objects. Sort it in place by the `y` field, largest first. Call each object `p`.", POINTS, "points is reordered so y runs 2, 1, 0", "points.sort(key=lambda p: p.y, reverse=True)", "[p.y for p in points] == [2, 1, 0]"),
    v("two-fields", "`points` is a list of `Point` objects. Get a sorted copy ordered by `x`, then by `y` to break ties. Call each object `p`.", POINT + "\npoints = [Point(2, 5), Point(1, 9), Point(2, 1)]", "gives the points (1, 9), (2, 1), (2, 5)", "sorted(points, key=lambda p: (p.x, p.y))", "[(p.x, p.y) for p in _] == [(1, 9), (2, 1), (2, 5)]"),
    v("attrgetter", "`points` is a list of `Point` objects. Get a sorted copy ordered by the `x` field, using `attrgetter` instead of a lambda. Include the import.", POINTS, "gives the points with x = 1, 2, 3 in that order", 'from operator import attrgetter\nsorted(points, key=attrgetter("x"))', "[p.x for p in _] == [1, 2, 3]", {
      explain: 'attrgetter("x") is a ready-made function that returns item.x.',
    }),
  ]),

  skill("sort-indexes", 3, { explain: "Sorting the indexes by the values they point at gives the order without moving the data." }, [
    v("argsort", "`nums` is a list. Get the list of its INDEXES, ordered by the value at each index. Call each index `i`.", "nums = [30, 10, 20]", "gives [1, 2, 0]", "sorted(range(len(nums)), key=lambda i: nums[i])", "_ == [1, 2, 0]"),
    v("itemgetter", "`pairs` is a list of 2-value tuples. Get a sorted copy ordered by the second value, using `itemgetter` instead of a lambda. Include the import.", "pairs = [(1, 9), (2, 3)]", "gives [(2, 3), (1, 9)]", "from operator import itemgetter\nsorted(pairs, key=itemgetter(1))", "_ == [(2, 3), (1, 9)]"),
  ]),

  skill("sort-comparator", 3, { explain: "Python has no comparator argument; wrap a compare function with functools.cmp_to_key." }, [
    v("cmp-to-key", "`compare` is a two-argument comparison function that returns a negative, zero or positive number, and `cmp_to_key` is already imported. Sort `nums` in place using it.", "from functools import cmp_to_key\ndef compare(a, b):\n    return b - a\nnums = [1, 3, 2]", "nums becomes [3, 2, 1]", "nums.sort(key=cmp_to_key(compare))", "nums == [3, 2, 1]"),
    v("largest-number", '`strs` is a list of digit strings and `cmp_to_key` is already imported. Sort it in place so that joining the strings gives the largest number: `a` goes before `b` when a + b is bigger than b + a.', 'from functools import cmp_to_key\nstrs = ["3", "30", "34"]', 'strs becomes ["34", "3", "30"]', "strs.sort(key=cmp_to_key(lambda a, b: -1 if a + b > b + a else 1))", 'strs == ["34", "3", "30"]', {
      accepted: ["strs.sort(key=cmp_to_key(lambda a, b: int(b + a) - int(a + b)))"],
      explain: "The comparator returns a negative number when a should come first.",
    }),
  ]),
]);
