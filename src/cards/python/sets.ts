import { skill, topic, v } from "../topic";

export const sets = topic("python", "sets", [
  skill("set-create", 1, { explain: "{1, 2} is a set, but {} is an empty DICT; an empty set is set()." }, [
    v("empty", "Create an empty set named `seen`.", "", "seen is an empty set", "seen = set()", "seen == set() and type(seen) is set"),
    v("literal", "Create `primes`, a set holding 2, 3 and 5.", "", "primes is {2, 3, 5}", "primes = {2, 3, 5}", "primes == {2, 3, 5} and type(primes) is set"),
    v("from-list", "`a` is a list with duplicates. Get its unique items as a set.", "a = [1, 1, 2]", "gives {1, 2}", "set(a)", "_ == {1, 2} and type(_) is set"),
    v("vowels", "Create `vowels`, a set of the five lowercase vowel characters, built from a string.", "", 'vowels is {"a", "e", "i", "o", "u"}', 'vowels = set("aeiou")', 'vowels == {"a", "e", "i", "o", "u"} and type(vowels) is set', {
      accepted: ['vowels = {"a", "e", "i", "o", "u"}'],
      explain: "set() of a string gives a set of its characters.",
    }),
    v("start-cell", "Create `visited`, a set that starts out holding the single grid cell (0, 0).", "", "visited is {(0, 0)}", "visited = {(0, 0)}", "visited == {(0, 0)} and type(visited) is set", {
      accepted: ["visited = set([(0, 0)])"],
      explain: "set((0, 0)) would give {0}: it iterates the tuple. Use a set literal around the tuple.",
    }),
  ]),

  skill("set-add", 1, { explain: "A set uses add, not append, and silently ignores an item it already has." }, [
    v("value", "`seen` is a set. Put `x` into it.", "seen = set()\nx = 1", "seen becomes {1}", "seen.add(x)", "seen == {1}"),
    v("list-as-tuple", "`result` is a set and `path` is a list. Lists cannot go in a set, so add `path` to `result` in a form that can.", "result = set()\npath = [1, 2]", "result becomes {(1, 2)}", "result.add(tuple(path))", "result == {(1, 2)}", {
      explain: "Lists are unhashable; tuples are fine, and tuple() already copies.",
    }),
    v("many", "`seen` is a set and `nums` is a list. Add every item of `nums` to `seen`, in place.", "seen = {1}\nnums = [2, 3, 2]", "seen becomes {1, 2, 3}", "seen.update(nums)", "seen == {1, 2, 3}", {
      accepted: ["seen |= set(nums)"],
      explain: "update takes an iterable; add takes exactly one item.",
    }),
  ]),

  skill("set-remove", 2, { explain: "remove(x) raises KeyError when x is missing; discard(x) does not." }, [
    v("remove", "`s` is a set and `x` is definitely in it. Take `x` out.", "s = {1, 2}\nx = 2", "s becomes {1}", "s.remove(x)", "s == {1}", {
      accepted: ["s.discard(x)"],
    }),
    v("discard", "`s` is a set. The loop below tries two values of `x`, one that is in the set and one that is not. Inside it, remove `x` in a way that does not raise an error when it is missing.", "s = {1, 2}", "s becomes {1}, with no error for the missing 5", "s.discard(x)", "s == {1}", {
      template: "for x in [2, 5]:\n    {answer}",
    }),
    v("pop", "`s` is a set. Remove an arbitrary item from it and store that item in `x`.", "s = {7}", "x is 7, and s becomes empty", "x = s.pop()", "x == 7 and s == set()", {
      explain: "Sets are unordered, so pop() takes no index and returns whichever item it likes.",
    }),
  ]),

  skill("set-in", 1, { explain: "Membership in a set is O(1), which is the reason to use one." }, [
    v("in", "`seen` is a set. Write an expression that is True when `x` is in it.", "seen = {1, 2}\nx = 2", "gives True", "x in seen", "_ is True"),
    v("not-in", "`seen` is a set. Write an expression that is True when `x` is NOT in it.", "seen = {1}\nx = 2", "gives True", "x not in seen", "_ is True", {
      explain: "Lowercase `not in`, as one operator.",
    }),
    v("len", "`seen` is a set. Get how many items it holds.", "seen = {4, 5, 6}", "gives 3", "len(seen)", "_ == 3"),
    v("has-duplicates", "`nums` is a list. Using a set, write an expression that is True when the list contains a duplicate.", "nums = [1, 2, 1]", "gives True", "len(set(nums)) != len(nums)", "_ is True", {
      accepted: ["len(set(nums)) < len(nums)", "len(nums) != len(set(nums))", "len(nums) > len(set(nums))"],
    }),
    v("distinct-count", "`s` is a string. Get how many distinct characters it contains.", 's = "hello"', "gives 4", "len(set(s))", "_ == 4"),
  ]),

  skill("set-ops", 2, { explain: "& is intersection, | is union, - is difference, ^ is in exactly one. Sets do not support +." }, [
    v("intersection", "`a` and `b` are sets. Get the items that are in both.", "a = {1, 2}\nb = {2, 3}", "gives {2}", "a & b", "_ == {2}", {
      accepted: ["a.intersection(b)"],
    }),
    v("union", "`a` and `b` are sets. Get every item that is in either one.", "a = {1, 2}\nb = {2, 3}", "gives {1, 2, 3}", "a | b", "_ == {1, 2, 3}", {
      accepted: ["a.union(b)"],
    }),
    v("difference", "`a` and `b` are sets. Get the items of `a` that are not in `b`.", "a = {1, 2}\nb = {2, 3}", "gives {1}", "a - b", "_ == {1}", {
      accepted: ["a.difference(b)"],
    }),
    v("symmetric", "`a` and `b` are sets. Get the items that are in exactly one of them.", "a = {1, 2}\nb = {2, 3}", "gives {1, 3}", "a ^ b", "_ == {1, 3}", {
      accepted: ["a.symmetric_difference(b)"],
    }),
    v("lists-in-common", "`xs` and `ys` are lists. Get the set of values that appear in both.", "xs = [1, 2, 2]\nys = [2, 3]", "gives {2}", "set(xs) & set(ys)", "_ == {2}", {
      accepted: ["set(xs).intersection(ys)"],
      explain: "Operators need a set on both sides; the method form accepts any iterable.",
    }),
    v("in-place-union", "`a` and `b` are sets. Add every item of `b` into `a`, in place.", "a = {1, 2}\nb = {2, 3}", "a becomes {1, 2, 3}", "a |= b", "a == {1, 2, 3}", {
      accepted: ["a.update(b)"],
    }),
    v("in-place-difference", "`a` and `b` are sets. Remove from `a` every item that is also in `b`, in place.", "a = {1, 2}\nb = {2, 3}", "a becomes {1}", "a -= b", "a == {1}", {
      accepted: ["a.difference_update(b)"],
    }),
  ]),

  skill("set-compare", 2, { explain: "<= tests subset and >= tests superset, the same symbols as for numbers." }, [
    v("subset", "`a` and `b` are sets. Write an expression that is True when every item of `a` is also in `b`.", "a = {1, 2}\nb = {1, 2, 3}", "gives True", "a <= b", "_ is True", {
      accepted: ["a.issubset(b)"],
    }),
    v("superset", "`a` and `b` are sets. Write an expression that is True when `a` contains every item of `b`.", "a = {1, 2, 3}\nb = {2}", "gives True", "a >= b", "_ is True", {
      accepted: ["a.issuperset(b)"],
    }),
    v("disjoint", "`a` and `b` are sets. Write an expression that is True when they share no items.", "a = {1, 2}\nb = {3}", "gives True", "a.isdisjoint(b)", "_ is True", {
      accepted: ["not a & b", "not (a & b)", "len(a & b) == 0"],
    }),
    v("equal", "`a` and `b` are sets. Write an expression that is True when they hold exactly the same items.", "a = {1, 2}\nb = {2, 1}", "gives True", "a == b", "_ is True", {
      explain: "Order never matters for set equality.",
    }),
  ]),

  skill("set-convert", 2, { explain: "A set has no order and no indexes; convert it when you need either." }, [
    v("to-list-of-lists", "`result` is a set of tuples. Turn it into a list of lists. Call each tuple `t`.", "result = {(1, 2)}", "gives [[1, 2]]", "[list(t) for t in result]", "_ == [[1, 2]]"),
    v("max", "`seen` is a set of numbers. Get the largest one.", "seen = {4, 9, 1}", "gives 9", "max(seen)", "_ == 9"),
    v("dedupe-keep-order", "`nums` is a list with duplicates. Get a list with the duplicates removed that KEEPS the original order.", "nums = [3, 1, 3, 2, 1]", "gives [3, 1, 2]", "list(dict.fromkeys(nums))", "_ == [3, 1, 2]", {
      explain: "list(set(nums)) loses the order; dict keys are unique and keep insertion order.",
    }),
    v("frozenset", "`s` is a set that you want to use as a dictionary key or put inside another set. Convert it to the hashable kind of set.", "s = {1, 2}", "gives frozenset({1, 2})", "frozenset(s)", "_ == {1, 2} and type(_) is frozenset", {
      explain: "A regular set is mutable and unhashable; a frozenset is neither.",
    }),
  ]),
]);
