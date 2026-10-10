import { skill, topic, v } from "../topic";

const IMPORT = "from collections import Counter";
/** Given code for cards that start with a Counter already built from `items`. */
const withFreq = (items: string, more = "") => `${IMPORT}\nfreq = Counter(${items})${more ? "\n" + more : ""}`;

export const counters = topic("python", "counter", [
  skill("counter-create", 1, { explain: "Counter(iterable) counts every item; it lives in collections, with a capital C." }, [
    v("import", "Write the import line for `Counter`, the class that counts how often each item appears.", "", "Counter is available to use", IMPORT, 'Counter.__module__ == "collections"'),
    v("from-list", "`nums` is a list. Count how many times each item appears and store the result in `freq`. Include the import.", "nums = [1, 1, 2]", "freq is {1: 2, 2: 1}", IMPORT + "\nfreq = Counter(nums)", "type(freq).__name__ == 'Counter' and freq == {1: 2, 2: 1}"),
    v("from-string", "`s` is a string. Count how many times each character appears and store the result in `freq`. Include the import.", 's = "aab"', 'freq is {"a": 2, "b": 1}', IMPORT + "\nfreq = Counter(s)", "type(freq).__name__ == 'Counter' and freq == {'a': 2, 'b': 1}", {
      explain: "A string is an iterable of characters, so Counter(s) counts letters.",
    }),
    v("from-words", "`s` is a sentence as a string and `Counter` is already imported. Count how many times each WORD appears, into `freq`.", IMPORT + '\ns = "a b a"', 'freq is {"a": 2, "b": 1}', "freq = Counter(s.split())", "freq == {'a': 2, 'b': 1} and ' ' not in freq", {
      explain: "Counter(s) would count characters, spaces included; split into words first.",
    }),
    v("empty", "`Counter` is already imported. Create `window`, an empty Counter to fill in as you go.", IMPORT, "window is an empty Counter", "window = Counter()", "type(window).__name__ == 'Counter' and len(window) == 0"),
  ]),

  skill("counter-read", 1, { explain: "A Counter is a dict of counts, except that a missing key reads as 0 instead of raising." }, [
    v("count-of", "`freq` is a Counter. Get how many times `x` was counted.", withFreq("[1, 1, 2]", "x = 1"), "gives 2", "freq[x]", "_ == 2"),
    v("missing", "`freq` is a Counter and `x` never appeared. Get its count without any special handling.", withFreq("[1, 1]", "x = 9"), "gives 0", "freq[x]", "_ == 0", {
      explain: "No KeyError and no .get needed: missing keys count as 0.",
    }),
    v("distinct", "`freq` is a Counter. Get how many DISTINCT items it counted.", withFreq('"aabbbc"'), "gives 3", "len(freq)", "_ == 3"),
    v("total", "`freq` is a Counter. Get the total number of items it counted, duplicates included.", withFreq('"aabbbc"'), "gives 6", "sum(freq.values())", "_ == 6", {
      accepted: ["freq.total()"],
    }),
    v("highest-count", "`freq` is a Counter. Get the largest count of any item.", withFreq('"aabbbc"'), "gives 3", "max(freq.values())", "_ == 3"),
    v("items-loop", "`freq` is a Counter. Write only the `for` line of a loop over each item `x` together with its count `n`.", withFreq("[5, 5, 7]"), "out ends up [(5, 2), (7, 1)]", "for x, n in freq.items():", "out == [(5, 2), (7, 1)]", {
      template: "out = []\n{answer}\n    out.append((x, n))",
      explain: "Same as a dict: items() gives (key, count) pairs.",
    }),
    v("singles", "`freq` is a Counter. Build a list of the items that appeared exactly once. Use `x` for the item and `n` for its count.", withFreq("[5, 5, 7, 8]"), "gives [7, 8]", "[x for x, n in freq.items() if n == 1]", "_ == [7, 8]"),
  ]),

  skill("counter-most-common", 2, { explain: "most_common(k) returns a list of (item, count) tuples, most frequent first." }, [
    v("top-k", "`freq` is a Counter and `k` is an int. Get the `k` most frequent items, as a list of (item, count) pairs.", withFreq("[1, 1, 2, 3, 3, 3]", "k = 2"), "gives [(3, 3), (1, 2)]", "freq.most_common(k)", "_ == [(3, 3), (1, 2)]"),
    v("top-k-items", "`freq` is a Counter and `k` is an int. Get just the `k` most frequent ITEMS, without their counts. Use `x` for the item and `n` for its count.", withFreq("[1, 1, 2, 3, 3, 3]", "k = 2"), "gives [3, 1]", "[x for x, n in freq.most_common(k)]", "_ == [3, 1]", {
      accepted: ["[x for x, _ in freq.most_common(k)]"],
    }),
    v("single-most", "`freq` is a Counter. Get the single most frequent item itself, not its count.", withFreq('"aabbbc"'), 'gives "b"', "freq.most_common(1)[0][0]", '_ == "b"', {
      accepted: ["max(freq, key=freq.get)"],
      explain: "most_common(1) is a one-item list of a tuple, so it takes two indexes to reach the item.",
    }),
    v("all-sorted", "`freq` is a Counter. Get every (item, count) pair, most frequent first.", withFreq('"abb"'), 'gives [("b", 2), ("a", 1)]', "freq.most_common()", '_ == [("b", 2), ("a", 1)]', {
      explain: "With no argument, most_common returns everything in order.",
    }),
  ]),

  skill("counter-update", 2, { explain: "Counts are updated with ordinary += and -=; a key that drops to 0 stays in the Counter until deleted." }, [
    v("increment", "`window` is a Counter and `c` is a character entering a sliding window. Add 1 to its count.", IMPORT + '\nwindow = Counter()\nc = "a"', 'window becomes {"a": 1}', "window[c] += 1", "window == {'a': 1}"),
    v("decrement", "`window` is a Counter and `c` is a character leaving a sliding window. Take 1 off its count.", IMPORT + '\nwindow = Counter("aab")\nc = "a"', 'the count for "a" becomes 1', "window[c] -= 1", "window['a'] == 1 and window['b'] == 1"),
    v("delete-zero", "`window` is a Counter in which the count for `c` has dropped to 0. Remove that key so it no longer counts as a distinct item.", IMPORT + '\nwindow = Counter("ab")\nc = "a"\nwindow[c] -= 1', "len(window) becomes 1", "del window[c]", "len(window) == 1 and 'a' not in window", {
      accepted: ["window.pop(c)"],
    }),
    v("add-many", "`freq` is a Counter and `more` is a list of further items. Add all of them to the counts, in place.", withFreq("[1]", "more = [1, 2]"), "freq becomes {1: 2, 2: 1}", "freq.update(more)", "freq == {1: 2, 2: 1}", {
      explain: "On a Counter, update ADDS to the counts instead of replacing them.",
    }),
  ]),

  skill("counter-compare", 2, { explain: "Counters compare like dicts and also support -, +, & and | on their counts." }, [
    v("anagram", "`s` and `t` are strings and `Counter` is already imported. Write an expression that is True when they are anagrams of each other.", IMPORT + '\ns = "abc"\nt = "cab"', "gives True", "Counter(s) == Counter(t)", "_ is True"),
    v("subtract", "`have` and `need` are Counters. Get a Counter of what is still missing: the counts in `need` that `have` does not cover.", IMPORT + '\nhave = Counter("aab")\nneed = Counter("abbc")', 'gives {"b": 1, "c": 1}', "need - have", "_ == {'b': 1, 'c': 1}", {
      explain: "Counter subtraction drops zero and negative results.",
    }),
    v("covers", "`have` and `need` are Counters. Write an expression that is True when `have` contains at least as many of every item as `need` asks for.", IMPORT + '\nhave = Counter("aabc")\nneed = Counter("abc")', "gives True", "not need - have", "_ is True", {
      accepted: ["not (need - have)", "len(need - have) == 0", "all(have[k] >= n for k, n in need.items())", "need <= have"],
      explain: "If nothing is left after subtracting, every need is covered.",
    }),
    v("in-common", "`a` and `b` are Counters. Get a Counter of the items they share, with the smaller of the two counts for each.", IMPORT + '\na = Counter("aab")\nb = Counter("abb")', 'gives {"a": 1, "b": 1}', "a & b", "_ == {'a': 1, 'b': 1}"),
    v("combine", "`a` and `b` are Counters. Get a new Counter with their counts added together.", IMPORT + '\na = Counter("ab")\nb = Counter("a")', 'gives {"a": 2, "b": 1}', "a + b", "_ == {'a': 2, 'b': 1}"),
  ]),

  skill("counter-sort", 2, { explain: "A Counter sorts like any dict: sort the keys with the counts as the sort key." }, [
    v("items-by-count", "`freq` is a Counter. Get its items sorted by count, most frequent first, as a plain list of the items.", withFreq("[1, 2, 2, 3, 3, 3]"), "gives [3, 2, 1]", "sorted(freq, key=freq.get, reverse=True)", "_ == [3, 2, 1]", {
      accepted: ["[x for x, n in freq.most_common()]", "[x for x, _ in freq.most_common()]"],
    }),
    v("expand", "`freq` is a Counter. Get a list in which each item is repeated as many times as its count.", withFreq("[2, 1, 2]"), "gives [2, 2, 1]", "list(freq.elements())", "_ == [2, 2, 1]", {
      explain: "elements() is the reverse of counting; it returns an iterator.",
    }),
  ]),
]);
