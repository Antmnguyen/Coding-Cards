import { skill, topic, v } from "../topic";

const DD = "from collections import defaultdict";
const OD = "from collections import OrderedDict";

export const dicts = topic("python", "dicts", [
  skill("dict-create", 1, { explain: "Curly braces with key: value pairs make a dict; {} alone is an empty dict." }, [
    v("empty", "Create an empty dictionary (hashmap) named `d`.", "", "d is {}", "d = {}", "d == {} and type(d) is dict", {
      accepted: ["d = dict()"],
    }),
    v("literal", 'Create `ages`, a dictionary mapping "ann" to 30 and "bob" to 25.', "", 'ages is {"ann": 30, "bob": 25}', 'ages = {"ann": 30, "bob": 25}', 'ages == {"ann": 30, "bob": 25}'),
    v("int-keys", 'Create `names`, a dictionary mapping the int 1 to "one" and the int 2 to "two".', "", 'names is {1: "one", 2: "two"}', 'names = {1: "one", 2: "two"}', 'names == {1: "one", 2: "two"}'),
    v("brackets", 'Create `pairs`, a dictionary mapping each closing bracket to its opening bracket: ")" to "(" and "]" to "[".', "", 'pairs is {")": "(", "]": "["}', 'pairs = {")": "(", "]": "["}', 'pairs == {")": "(", "]": "["}'),
    v("fromkeys", "`keys` is a list. Create `d`, a dictionary with each of those keys mapped to 0.", 'keys = ["a", "b"]', 'd is {"a": 0, "b": 0}', "d = dict.fromkeys(keys, 0)", 'd == {"a": 0, "b": 0}', {
      accepted: ["d = {k: 0 for k in keys}"],
      explain: "dict.fromkeys(keys, value) gives every key the same value; do not use it with a list as the value.",
    }),
    v("seeded", "Create `first_seen`, a dictionary that starts with the single entry 0 mapped to -1 (the usual prefix-sum seed).", "", "first_seen is {0: -1}", "first_seen = {0: -1}", "first_seen == {0: -1}"),
  ]),

  skill("dict-read", 1, { explain: "d[k] raises KeyError when the key is missing; d.get(k) returns None instead." }, [
    v("subscript", "`d` is a dictionary and `k` is a key that is in it. Get the value stored under `k`.", 'd = {"a": 1, "b": 2}\nk = "a"', "gives 1", "d[k]", "_ == 1"),
    v("get", "`d` is a dictionary and `k` is a key that might be missing. Look it up in the way that gives None instead of an error.", 'd = {"a": 1}\nk = "z"', "gives None, with no error", "d.get(k)", "res is None and ran", {
      template: "ran = False\nres = (\n    {answer}\n)\nran = True",
    }),
    v("get-default", "`d` is a dictionary and `k` is a key that might not be in it. Get the value for `k`, or 0 if it is missing.", 'd = {"a": 1}\nk = "z"', "gives 0", "d.get(k, 0)", "_ == 0", {
      explain: "get never raises; the second argument is the fallback.",
    }),
    v("get-default-list", "`graph` is a dictionary mapping a node to a list of neighbours, and `node` may have no entry. Get its neighbours, or an empty list when it has none.", "graph = {1: [2]}\nnode = 5", "gives []", "graph.get(node, [])", "_ == []"),
    v("nested", "`d` is a dictionary whose values are dictionaries. Get the value stored under `a` and then `b`.", 'd = {"x": {"y": 7}}\na = "x"\nb = "y"', "gives 7", "d[a][b]", "_ == 7"),
    v("list-value-item", "`d` is a dictionary whose values are lists. Get the first item of the list stored under `k`.", 'd = {"a": [5, 6]}\nk = "a"', "gives 5", "d[k][0]", "_ == 5"),
    v("len", "`d` is a dictionary. Get how many keys it has.", 'd = {"a": 1, "b": 2}', "gives 2", "len(d)", "_ == 2"),
  ]),

  skill("dict-write", 1, { explain: "Assigning to d[k] adds the key or overwrites it; there is no add or put method." }, [
    v("set", "`d` is a dictionary. Store the value `val` under the key `k`.", 'd = {}\nk = "a"\nval = 1', 'd becomes {"a": 1}', "d[k] = val", 'd == {"a": 1}'),
    v("increment", "`d` is a dictionary of counts and `k` is a key already in it. Add 1 to its count.", 'd = {"a": 1}\nk = "a"', 'd becomes {"a": 2}', "d[k] += 1", 'd == {"a": 2}'),
    v("increment-missing", "`d` is a plain dictionary of counts. Add 1 to the count for key `k`, which may not be in the dictionary yet.", 'd = {}\nk = "a"', 'd becomes {"a": 1}', "d[k] = d.get(k, 0) + 1", 'd == {"a": 1}', {
      explain: "d[k] += 1 raises KeyError on a missing key in a plain dict.",
    }),
    v("append-to-list", "`d` is a dictionary whose values are lists, and `k` is already a key. Add `x` to the list stored under `k`.", 'd = {"a": [1]}\nk = "a"\nx = 2', 'd becomes {"a": [1, 2]}', "d[k].append(x)", 'd == {"a": [1, 2]}'),
    v("add-to-set", "`d` is a dictionary whose values are sets, and `k` is already a key. Add `x` to the set stored under `k`.", 'd = {"a": {1}}\nk = "a"\nx = 2', 'd becomes {"a": {1, 2}}', "d[k].add(x)", 'd == {"a": {1, 2}}'),
    v("nested", "`d` is a dictionary whose values are dictionaries, and `a` is already a key. Store `val` under `a` and then `b`.", 'd = {"x": {}}\na = "x"\nb = "y"\nval = 7', 'd becomes {"x": {"y": 7}}', "d[a][b] = val", 'd == {"x": {"y": 7}}'),
    v("index-of-value", "`seen` is a dictionary mapping a number to the index where it was found. Record that the number `x` was found at index `i`.", "seen = {}\nx = 7\ni = 3", "seen becomes {7: 3}", "seen[x] = i", "seen == {7: 3}", {
      explain: "The number is the key and the index is the value, so later lookups are by number.",
    }),
  ]),

  skill("dict-in", 1, { explain: "`in` checks the keys of a dict, in O(1)." }, [
    v("has-key", "`d` is a dictionary. Write an expression that is True when `k` is one of its keys.", 'd = {"a": 1}\nk = "a"', "gives True", "k in d", "_ is True", {
      explain: "There is no has_key or contains; `k in d.keys()` works but is unnecessary.",
    }),
    v("missing-key", "`d` is a dictionary. Write an expression that is True when `k` is NOT one of its keys.", 'd = {"a": 1}\nk = "z"', "gives True", "k not in d", "_ is True"),
    v("has-value", "`d` is a dictionary. Write an expression that is True when `x` is one of its VALUES.", 'd = {"a": 1, "b": 2}\nx = 2', "gives True", "x in d.values()", "_ is True", {
      explain: "Searching the values scans them all, so it is O(n).",
    }),
    v("complement", "`seen` is a dictionary keyed by numbers already visited. `target` and `x` are numbers. Write an expression that is True when the number that adds to `x` to make `target` has been seen.", "seen = {2: 0}\ntarget = 9\nx = 7", "gives True", "target - x in seen", "_ is True", {
      explain: "Arithmetic binds tighter than `in`, so no parentheses are needed.",
    }),
    v("init-if-missing", "`d` is a dictionary whose values are lists. When `k` is not yet a key, give it an empty list. Write the `if` line and the line under it.", 'd = {}\nk = "a"', 'd becomes {"a": []}', "if k not in d:\n    d[k] = []", 'd == {"a": []}'),
  ]),

  skill("dict-remove", 2, { explain: "del d[k] removes a key; d.pop(k) removes it and returns the value." }, [
    v("del", "`d` is a dictionary. Remove the key `k` and its value.", 'd = {"a": 1, "b": 2}\nk = "a"', 'd becomes {"b": 2}', "del d[k]", 'd == {"b": 2}', {
      accepted: ["d.pop(k)"],
      explain: "del is a statement, not a method.",
    }),
    v("pop", "`d` is a dictionary. Remove the key `k` and get its value back.", 'd = {"a": 1, "b": 2}\nk = "a"', 'gives 1, and d becomes {"b": 2}', "d.pop(k)", '_ == 1 and d == {"b": 2}'),
    v("pop-default", "`d` is a dictionary. The loop below tries two keys `k`, one that is in it and one that is not. Inside it, remove `k` without raising an error when it is missing.", 'd = {"a": 1, "b": 2}', 'd becomes {"b": 2}, with no error for the missing "z"', "d.pop(k, None)", 'd == {"b": 2}', {
      template: 'for k in ["a", "z"]:\n    {answer}',
      explain: "pop with a default never raises; del and plain pop raise KeyError.",
    }),
    v("drop-when-zero", "`d` is a dictionary of counts and the count for `k` has reached 0. Delete the key when its count is 0. Write the `if` line and the line under it.", 'd = {"a": 0, "b": 2}\nk = "a"', 'd becomes {"b": 2}', "if d[k] == 0:\n    del d[k]", 'd == {"b": 2}', {
      accepted: ["if d[k] == 0:\n    d.pop(k)", "if not d[k]:\n    del d[k]"],
      explain: "Removing zero counts keeps len(d) equal to the number of distinct items in a sliding window.",
    }),
  ]),

  skill("dict-views", 1, { explain: "keys(), values() and items() return live views, not lists." }, [
    v("keys", "`d` is a dictionary. Get all of its keys as a list.", 'd = {"a": 1, "b": 2}', 'gives ["a", "b"]', "list(d.keys())", '_ == ["a", "b"]', {
      accepted: ["list(d)"],
    }),
    v("values", "`d` is a dictionary. Get all of its values as a list.", 'd = {"a": 1, "b": 2}', "gives [1, 2]", "list(d.values())", "_ == [1, 2]"),
    v("sum-values", "`d` is a dictionary of counts. Get the total of all the counts.", 'd = {"a": 1, "b": 2}', "gives 3", "sum(d.values())", "_ == 3"),
    v("max-value", "`d` is a dictionary of counts. Get the largest count.", 'd = {"a": 1, "b": 5}', "gives 5", "max(d.values())", "_ == 5"),
    v("key-of-max", "`d` is a dictionary of counts. Get the KEY whose value is the largest.", 'd = {"a": 1, "b": 5}', 'gives "b"', "max(d, key=d.get)", '_ == "b"', {
      explain: "max iterates the keys and ranks them by d.get.",
    }),
    v("key-of-min", "`d` is a dictionary of counts. Get the KEY whose value is the smallest.", 'd = {"a": 4, "b": 5, "c": 2}', 'gives "c"', "min(d, key=d.get)", '_ == "c"'),
    v("values-as-lists", "`groups` is a dictionary whose values are lists. Get just those lists, as a list of lists.", 'groups = {"a": [1], "b": [2, 3]}', "gives [[1], [2, 3]]", "list(groups.values())", "_ == [[1], [2, 3]]", {
      explain: "This is the usual last line of a group-by problem.",
    }),
  ]),

  skill("dict-sort", 2, { explain: "A dict has no sort(); sort its keys or items with sorted() and a key function." }, [
    v("keys", "`d` is a dictionary. Get its keys as a sorted list.", 'd = {"b": 2, "a": 1}', 'gives ["a", "b"]', "sorted(d)", '_ == ["a", "b"]', {
      accepted: ["sorted(d.keys())"],
    }),
    v("items-by-value", "`d` is a dictionary. Get its (key, value) pairs sorted by value, smallest first. Call each pair `kv`.", 'd = {"a": 3, "b": 1}', 'gives [("b", 1), ("a", 3)]', "sorted(d.items(), key=lambda kv: kv[1])", '_ == [("b", 1), ("a", 3)]'),
    v("keys-by-value-desc", "`d` is a dictionary of counts. Get its keys sorted by count, largest count first.", 'd = {"a": 1, "b": 5, "c": 3}', 'gives ["b", "c", "a"]', "sorted(d, key=d.get, reverse=True)", '_ == ["b", "c", "a"]'),
    v("top-k", "`d` is a dictionary of counts and `k` is an int. Get the `k` keys with the largest counts, largest first.", 'd = {"a": 1, "b": 5, "c": 3}\nk = 2', 'gives ["b", "c"]', "sorted(d, key=d.get, reverse=True)[:k]", '_ == ["b", "c"]', {
      accepted: ["import heapq\nheapq.nlargest(k, d, key=d.get)"],
    }),
  ]),

  skill("dict-setdefault", 2, { explain: "setdefault(k, default) returns d[k], first storing the default if k is missing." }, [
    v("append", "`d` is a plain dictionary whose values are lists, and `k` may not be a key yet. In one line, add `x` to the list for `k`, creating the list if needed.", 'd = {}\nk = "a"\nx = 1', 'd becomes {"a": [1]}', "d.setdefault(k, []).append(x)", 'd == {"a": [1]}'),
    v("value", "`d` is a dictionary and `k` may not be a key yet. In one call, get the value for `k`, storing 0 under it first if it is missing.", 'd = {}\nk = "a"', 'gives 0, and d becomes {"a": 0}', "d.setdefault(k, 0)", '_ == 0 and d == {"a": 0}', {
      explain: "Unlike get, setdefault also writes the default into the dict.",
    }),
  ]),

  skill("dict-merge", 2, { explain: "update changes a dict in place; | builds a new one. Later keys win." }, [
    v("update", "`d` and `other` are dictionaries. Copy every entry of `other` into `d`, in place.", 'd = {"a": 1}\nother = {"b": 2}', 'd becomes {"a": 1, "b": 2}', "d.update(other)", 'd == {"a": 1, "b": 2}', {
      accepted: ["d |= other"],
    }),
    v("merge-new", "`d` and `other` are dictionaries. Build a new dictionary holding the entries of both, leaving the originals unchanged.", 'd = {"a": 1}\nother = {"b": 2}', 'gives {"a": 1, "b": 2}, and d stays {"a": 1}', "d | other", '_ == {"a": 1, "b": 2} and d == {"a": 1}', {
      accepted: ["{**d, **other}"],
    }),
    v("copy", "`d` is a dictionary. Make a separate shallow copy of it.", 'd = {"a": 1}', 'gives a new dict {"a": 1}', "d.copy()", "_ == d and _ is not d", {
      accepted: ["dict(d)"],
    }),
  ]),

  skill("dict-build", 2, { explain: "A dict comprehension is {key: value for ...}; the key goes before the colon." }, [
    v("value-to-index", "`a` is a list. In one line, build a dictionary `pos` that maps each value `v` to its index `i` in the list.", 'a = ["x", "y"]', 'pos is {"x": 0, "y": 1}', "pos = {v: i for i, v in enumerate(a)}", 'pos == {"x": 0, "y": 1}', {
      explain: "enumerate yields (index, value), so the names are i, v but the dict is v: i.",
    }),
    v("char-to-index", "`order` is a string giving a custom alphabet. Build `rank`, a dictionary mapping each character `c` to its position `i` in that string.", 'order = "cab"', 'rank is {"c": 0, "a": 1, "b": 2}', "rank = {c: i for i, c in enumerate(order)}", 'rank == {"c": 0, "a": 1, "b": 2}'),
  ]),

  skill("dict-iterate-trap", 3, { explain: "Adding or deleting keys while looping over a dict raises RuntimeError; loop over a copy of the keys." }, [
    v("snapshot-keys", "`d` is a dictionary, and the loop body below deletes keys. Write the `for` line so that it loops over a snapshot of the keys, calling each one `k`.", 'd = {"a": 1, "b": 0, "c": 0}', 'd becomes {"a": 1}', "for k in list(d):", 'd == {"a": 1}', {
      template: "{answer}\n    if d[k] == 0:\n        del d[k]",
      accepted: ["for k in list(d.keys()):"],
    }),
  ]),
]);

export const defaultdicts = topic("python", "defaultdict", [
  skill("dd-create", 1, { explain: "defaultdict takes a function that makes the default; pass the type itself, such as int or list." }, [
    v("import", "Write the import line for `defaultdict`.", "", "defaultdict is available to use", DD, 'defaultdict.__module__ == "collections"', {
      explain: "It lives in collections, all lowercase.",
    }),
    v("int", "Create `counts`, a defaultdict where any missing key starts at 0. Include the import.", "", 'counts["anything"] starts out as 0', DD + "\ncounts = defaultdict(int)", "isinstance(counts, defaultdict) and counts.default_factory is int"),
    v("list", "Create `graph`, a defaultdict where any missing key starts out as an empty list. Include the import.", "", 'graph["anything"] starts out as []', DD + "\ngraph = defaultdict(list)", "isinstance(graph, defaultdict) and graph.default_factory is list", {
      explain: "Pass list, not list() or [].",
    }),
    v("set", "Create `groups`, a defaultdict where any missing key starts out as an empty set. Include the import.", "", 'groups["anything"] starts out as an empty set', DD + "\ngroups = defaultdict(set)", "isinstance(groups, defaultdict) and groups.default_factory is set"),
  ]),

  skill("dd-create-custom", 3, { explain: "For any other default, pass a lambda that returns it." }, [
    v("lambda", "`defaultdict` is already imported. Create `last`, a defaultdict where any missing key starts at -1.", DD, 'last["anything"] starts out as -1', "last = defaultdict(lambda: -1)", 'last["q"] == -1', {
      explain: "defaultdict(-1) is an error: the argument must be callable.",
    }),
    v("nested", "`defaultdict` is already imported. Create `table`, a defaultdict whose missing keys start out as another defaultdict of ints, so two-level counts work without setup.", DD, 'table["a"]["b"] starts out as 0', "table = defaultdict(lambda: defaultdict(int))", 'table["a"]["b"] == 0 and isinstance(table["a"], defaultdict)'),
  ]),

  skill("dd-use", 1, { explain: "With a defaultdict a missing key is created on first use, so no `if key not in d` check is needed." }, [
    v("count", "`counts` is a defaultdict of ints. Add 1 to the count for `x`, which has not been seen before.", DD + "\ncounts = defaultdict(int)\nx = 7", "counts[7] becomes 1", "counts[x] += 1", "dict(counts) == {7: 1}"),
    v("append", "`graph` is a defaultdict of lists. Record a directed edge from node `u` to node `v`.", DD + "\ngraph = defaultdict(list)\nu = 1\nv = 2", "graph becomes {1: [2]}", "graph[u].append(v)", "dict(graph) == {1: [2]}"),
    v("undirected", "`graph` is a defaultdict of lists. Record an undirected edge between `u` and `v`, so each lists the other (2 lines).", DD + "\ngraph = defaultdict(list)\nu = 1\nv = 2", "graph becomes {1: [2], 2: [1]}", "graph[u].append(v)\ngraph[v].append(u)", "dict(graph) == {1: [2], 2: [1]}"),
    v("weighted", "`graph` is a defaultdict of lists. Record a directed edge from `u` to `v` with weight `w`, stored as a (neighbour, weight) tuple.", DD + "\ngraph = defaultdict(list)\nu = 1\nv = 2\nw = 9", "graph becomes {1: [(2, 9)]}", "graph[u].append((v, w))", "dict(graph) == {1: [(2, 9)]}", {
      explain: "The tuple is one argument to append, so it needs its own parentheses.",
    }),
    v("add-to-set", "`groups` is a defaultdict of sets. Add `x` to the set for key `k`.", DD + '\ngroups = defaultdict(set)\nk = "a"\nx = 1', 'groups becomes {"a": {1}}', "groups[k].add(x)", 'dict(groups) == {"a": {1}}'),
    v("anagram-key", "`groups` is a defaultdict of lists and `word` is a string. File `word` under a key made of its letters in sorted order.", DD + '\ngroups = defaultdict(list)\nword = "tea"', 'groups becomes {"aet": ["tea"]}', 'groups["".join(sorted(word))].append(word)', 'list(groups.values()) == [["tea"]]', {
      accepted: ["groups[tuple(sorted(word))].append(word)"],
      explain: "sorted(word) is a list, which cannot be a key; join it to a string or make it a tuple.",
    }),
  ]),

  skill("dd-build", 2, { explain: "Filling a defaultdict is a loop with a single update line." }, [
    v("adjacency", "`graph` is a defaultdict of lists and `edges` is a list of (from, to) pairs. Fill `graph` with a directed edge for each pair, unpacking into `u` and `v` (2 lines).", DD + "\ngraph = defaultdict(list)\nedges = [(1, 2), (1, 3), (2, 3)]", "graph becomes {1: [2, 3], 2: [3]}", "for u, v in edges:\n    graph[u].append(v)", "dict(graph) == {1: [2, 3], 2: [3]}"),
    v("char-counts", "`counts` is a defaultdict of ints and `s` is a string. Count each character of `s`, calling it `c` (2 lines).", DD + '\ncounts = defaultdict(int)\ns = "aba"', 'counts becomes {"a": 2, "b": 1}', "for c in s:\n    counts[c] += 1", 'dict(counts) == {"a": 2, "b": 1}'),
    v("index-lists", "`where` is a defaultdict of lists and `nums` is a list. Record every index at which each value appears, using `i` and `x` (2 lines).", DD + "\nwhere = defaultdict(list)\nnums = [5, 3, 5]", "where becomes {5: [0, 2], 3: [1]}", "for i, x in enumerate(nums):\n    where[x].append(i)", "dict(where) == {5: [0, 2], 3: [1]}"),
  ]),

  skill("dd-trap", 3, { explain: "Merely reading d[k] on a defaultdict creates the key; use `in` or get() to look without creating." }, [
    v("check-without-creating", "`counts` is a defaultdict of ints. Check whether `k` is a key WITHOUT adding it to the dict.", DD + '\ncounts = defaultdict(int)\nk = "a"', "gives False, and counts stays empty", "k in counts", "_ is False and len(counts) == 0"),
    v("to-plain-dict", "`counts` is a defaultdict of ints. Convert it to an ordinary dict, for example before returning it.", DD + '\ncounts = defaultdict(int)\ncounts["a"] += 1', 'gives the plain dict {"a": 1}', "dict(counts)", '_ == {"a": 1} and type(_) is dict'),
  ]),

  skill("ordered-dict", 3, { explain: "OrderedDict adds move_to_end and popitem(last=False), which is exactly what an LRU cache needs." }, [
    v("create", "Create `cache`, an empty OrderedDict. Include the import.", "", "cache is an empty OrderedDict", OD + "\ncache = OrderedDict()", "type(cache).__name__ == 'OrderedDict' and len(cache) == 0"),
    v("move-to-end", "`cache` is an OrderedDict. Mark the key `k` as most recently used by moving it to the end.", OD + '\ncache = OrderedDict()\ncache["a"] = 1\ncache["b"] = 2\nk = "a"', 'the key order becomes "b", "a"', "cache.move_to_end(k)", 'list(cache) == ["b", "a"]'),
    v("evict-oldest", "`cache` is an OrderedDict. Remove its OLDEST entry, the one at the front.", OD + '\ncache = OrderedDict()\ncache["a"] = 1\ncache["b"] = 2', 'cache keeps only "b"', "cache.popitem(last=False)", 'list(cache) == ["b"]', {
      explain: "popitem() alone removes the newest entry; last=False removes the oldest.",
    }),
    v("first-key", "`d` is a dictionary (they keep insertion order). Get its first key without building a list.", 'd = {"x": 1, "y": 2}', 'gives "x"', "next(iter(d))", '_ == "x"', {
      accepted: ["list(d)[0]"],
    }),
  ]),
]);
