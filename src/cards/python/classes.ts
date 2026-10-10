import { skill, topic, v } from "../topic";
import { INTERVAL, LIST_NODE, POINT } from "./given";

const NODE_CLASS = "class Node:\n    def __init__(self, val):\n        self.val = val";
const POINTS = POINT + "\npoints = [Point(1, 5), Point(3, 2), Point(2, 5)]";

/** A class body with a slot, followed by code that uses the class to produce `result`. */
const inClass = (name: string, before: string, after: string) =>
  `class ${name}:\n${before ? before + "\n" : ""}    {answer}\n\n${after}`;

export const classes = topic("python", "classes", [
  skill("class-define", 1, { explain: "class Name: then an indented body. The constructor is the method named __init__." }, [
    v("empty", "Define a class named `Node` with nothing in it, on a single line.", "", "Node() creates an object", "class Node: pass", "isinstance(Node, type) and Node() is not None", {
      explain: "A body is required; pass is the empty statement.",
    }),
    v("one-field", "Write a whole class named `Node` whose constructor takes `val` and saves it on the object (3 lines).", "", "Node(7).val gives 7", NODE_CLASS, "Node(7).val == 7"),
    v("two-fields", "Write a whole class named `Point` whose constructor takes `x` and `y` and saves both on the object, using one assignment line (3 lines).", "", "Point(1, 2) has x = 1 and y = 2", "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y", "(Point(1, 2).x, Point(1, 2).y) == (1, 2)"),
  ]),

  skill("class-init", 1, { explain: "__init__ has double underscores on both sides and takes self as its first parameter." }, [
    v("header", "You are writing the class below. Write only the header line of its constructor, which takes two arguments: `k` and `nums`.", "", "result ends up 3", "def __init__(self, k, nums):", "result == 3", {
      template: "class KthLargest:\n    {answer}\n        self.k = k\n        self.nums = nums\n\nresult = KthLargest(3, [4, 5]).k",
    }),
    v("header-defaults", "You are writing the `ListNode` class below. Write only the header line of its constructor: it takes `val`, defaulting to 0, and `next`, defaulting to None.", "", "result ends up (0, None)", "def __init__(self, val=0, next=None):", "result == (0, None)", {
      template: "class ListNode:\n    {answer}\n        self.val = val\n        self.next = next\n\nnode = ListNode()\nresult = (node.val, node.next)",
    }),
    v("store-arg", "You are inside the constructor below. Save the argument `k` on the object so other methods can use it later.", "", "result ends up 3", "self.k = k", "result == 3", {
      template: "class KthLargest:\n    def __init__(self, k, nums):\n        {answer}\n\nresult = KthLargest(3, [4, 5]).k",
      explain: "Members live on self; other methods read self.k, not k.",
    }),
    v("empty-list-field", "You are inside the constructor below. Give the object an empty list named `items`.", "", "result ends up []", "self.items = []", "result == []", {
      template: "class Stack:\n    def __init__(self):\n        {answer}\n\nresult = Stack().items",
    }),
    v("two-structures", "You are inside the constructor of a min-stack below. In one line, give the object two empty lists named `stack` and `mins`.", "", "result ends up ([], [])", "self.stack, self.mins = [], []", "result == ([], []) and ms.stack is not ms.mins", {
      template: "class MinStack:\n    def __init__(self):\n        {answer}\n\nms = MinStack()\nresult = (ms.stack, ms.mins)",
      accepted: ["self.stack = []; self.mins = []"],
      explain: "self.stack = self.mins = [] would make both names point at the SAME list.",
    }),
    v("dict-field", "You are inside the constructor of a cache below. Save the argument `capacity` on the object and give it an empty dictionary named `data` (2 lines).", "", "result ends up (2, {})", "self.capacity = capacity\nself.data = {}", "result == (2, {})", {
      template: "class Cache:\n    def __init__(self, capacity):\n        {answer}\n\nc = Cache(2)\nresult = (c.capacity, c.data)",
    }),
  ]),

  skill("class-instance", 1, { explain: "Calling the class creates an object; there is no `new` keyword. Fields are read and written with a dot." }, [
    v("create", "The class `Node` is defined below. Create a Node holding the value 5 and store it in `n`.", NODE_CLASS, "n.val gives 5", "n = Node(5)", "isinstance(n, Node) and n.val == 5"),
    v("read-field", "`n` is a `Node` object. Get the value stored in its `val` field.", NODE_CLASS + "\nn = Node(5)", "gives 5", "n.val", "_ == 5"),
    v("write-field", "`n` is a `Node` object. Change its `val` field to 9.", NODE_CLASS + "\nn = Node(5)", "n.val becomes 9", "n.val = 9", "n.val == 9"),
    v("link", "`a` and `b` are `ListNode` objects. Make `b` the node that follows `a`.", LIST_NODE + "\na = ListNode(1)\nb = ListNode(2)", "a.next is b", "a.next = b", "a.next is b"),
    v("create-linked", "`ListNode` is defined below. In one expression, create a node holding 1 whose next node holds 2, and store it in `head`.", LIST_NODE, "head.val is 1, head.next.val is 2", "head = ListNode(1, ListNode(2))", "head.val == 1 and head.next.val == 2 and head.next.next is None"),
    v("field-of-field", "`head` is a `ListNode` with at least two nodes. Get the value held by the SECOND node.", LIST_NODE + "\nhead = ListNode(1, ListNode(2))", "gives 2", "head.next.val", "_ == 2"),
  ]),

  skill("class-method", 1, { explain: "Every method takes self first, and reaches the object's data through self." }, [
    v("header", "You are writing the `Stack` class below. Write only the header line of a method named `push` that takes one argument, `x`.", "", "result ends up [5]", "def push(self, x):", "result == [5]", {
      template: inClass("Stack", "    def __init__(self):\n        self.items = []", "s = Stack()\ns.push(5)\nresult = s.items").replace("    {answer}", "    {answer}\n        self.items.append(x)"),
    }),
    v("use-field", "You are inside the `size` method below. Return how many items the object's `items` list holds.", "", "result ends up 2", "return len(self.items)", "result == 2", {
      template: "class Stack:\n    def __init__(self):\n        self.items = [1, 2]\n    def size(self):\n        {answer}\n\nresult = Stack().size()",
      explain: "items alone is a NameError inside a method; it is self.items.",
    }),
    v("change-field", "You are inside the `hit` method below. Add 1 to the object's `count` field.", "", "result ends up 2", "self.count += 1", "result == 2", {
      template: "class Counter:\n    def __init__(self):\n        self.count = 0\n    def hit(self):\n        {answer}\n\nc = Counter()\nc.hit()\nc.hit()\nresult = c.count",
    }),
    v("call-other-method", "You are inside the `solve` method of the class below. Call the class's own `helper` method on `n` and return what it gives.", "", "result ends up 8", "return self.helper(n)", "result == 8", {
      template: "class Solution:\n    def helper(self, x):\n        return x * 2\n    def solve(self, n):\n        {answer}\n\nresult = Solution().solve(4)",
    }),
    v("answer-field", "You are inside the nested function `dfs` below, in a LeetCode-style solution that keeps its running answer on the object. Update `self.ans` to be the larger of itself and `depth`.", "", "result ends up 3", "self.ans = max(self.ans, depth)", "result == 3", {
      template: "class Solution:\n    def solve(self):\n        self.ans = 0\n        def dfs(depth):\n            {answer}\n        dfs(3)\n        dfs(1)\n        return self.ans\n\nresult = Solution().solve()",
      explain: "Keeping the answer on self avoids needing nonlocal in the nested function.",
    }),
  ]),

  skill("class-dunder", 3, { explain: "Double-underscore methods plug an object into built-in behaviour: printing, ==, hashing, len()." }, [
    v("repr", "Inside the `Point` class below, write the method that controls how the object prints, returning the text Point( then x, a comma and space, y, and a closing bracket (2 lines).", "", 'result ends up "Point(1, 2)"', 'def __repr__(self):\n    return f"Point({self.x}, {self.y})"', 'result == "Point(1, 2)"', {
      template: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    {answer}\n\nresult = repr(Point(1, 2))",
    }),
    v("eq", "Inside the `Point` class below, write the method that makes two points count as equal when both their `x` and `y` match (2 lines).", "", "result ends up True", "def __eq__(self, other):\n    return self.x == other.x and self.y == other.y", "result is True", {
      template: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    {answer}\n\nresult = Point(1, 2) == Point(1, 2) and not (Point(1, 2) == Point(1, 3))",
      accepted: ["def __eq__(self, other):\n    return (self.x, self.y) == (other.x, other.y)"],
      explain: "Without __eq__, two separate objects are never equal, whatever they hold.",
    }),
    v("hash", "The `Point` class below already defines equality. Write the method that lets points be used in a set or as dict keys, hashing on the pair of fields (2 lines).", "", "result ends up 1: the two equal points count as one", "def __hash__(self):\n    return hash((self.x, self.y))", "result == 1", {
      template: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __eq__(self, other):\n        return (self.x, self.y) == (other.x, other.y)\n    {answer}\n\nresult = len({Point(1, 2), Point(1, 2)})",
      explain: "Defining __eq__ removes the default hash, so __hash__ must be added to use the object in a set.",
    }),
    v("len", "Inside the `Stack` class below, write the method that makes the built-in `len()` work on a stack, giving the size of its `items` list (2 lines).", "", "result ends up 3", "def __len__(self):\n    return len(self.items)", "result == 3", {
      template: "class Stack:\n    def __init__(self):\n        self.items = [1, 2, 3]\n    {answer}\n\nresult = len(Stack())",
    }),
    v("lt", "Inside the `Item` class below, write the method that makes one item count as smaller than another when its `cost` is lower, so that items can be sorted and put on a heap (2 lines).", "", "result ends up [1, 2, 3]", "def __lt__(self, other):\n    return self.cost < other.cost", "result == [1, 2, 3]", {
      template: "class Item:\n    def __init__(self, cost):\n        self.cost = cost\n    {answer}\n\nresult = [it.cost for it in sorted([Item(3), Item(1), Item(2)])]",
    }),
  ]),

  skill("class-extras", 3, { explain: "Decorators change what a method is: @property makes it read like a field, @staticmethod drops self." }, [
    v("property", "You are inside the class below, whose objects have a private field `_val`. Write a getter: a property named `val` that returns it (3 lines).", "", "result ends up 3", "@property\ndef val(self):\n    return self._val", "result == 3", {
      template: "class Box:\n    def __init__(self):\n        self._val = 3\n    {answer}\n\nresult = Box().val",
      explain: "@property turns the method into an attribute read: obj.val, no parentheses.",
    }),
    v("staticmethod", "In the class below, `add` does not use the object at all. Write the decorator line that lets it be defined without `self`.", "", "result ends up 5", "@staticmethod", "result == 5", {
      template: "class MathUtil:\n    {answer}\n    def add(a, b):\n        return a + b\n\nresult = MathUtil().add(2, 3)",
    }),
    v("subclass-header", "`Animal` is the class below. Write only the header line of a class `Dog` that inherits from it.", "class Animal:\n    def speak(self):\n        return \"...\"", 'result ends up "..."', "class Dog(Animal):", 'result == "..."', {
      template: "{answer}\n    pass\n\nresult = Dog().speak()",
    }),
    v("super-init", "`Dog` inherits from `Animal` below. Inside Dog's constructor, call the parent constructor so that `name` is stored.", 'class Animal:\n    def __init__(self, name):\n        self.name = name', 'result ends up "Rex"', "super().__init__(name)", 'result == "Rex"', {
      template: 'class Dog(Animal):\n    def __init__(self, name):\n        {answer}\n\nresult = Dog("Rex").name',
      explain: "super() takes no arguments here, and self is not passed to __init__.",
    }),
    v("dataclass", "`dataclass` is already imported. Write a data class named `Point` with two int fields, `x` and `y`, so the constructor is generated for you. Put both fields on one line, separated by a semicolon (3 lines).", "from dataclasses import dataclass", "Point(1, 2) has x = 1 and y = 2, and equal points compare equal", "@dataclass\nclass Point:\n    x: int; y: int", "Point(1, 2).x == 1 and Point(1, 2) == Point(1, 2)", {
      accepted: ["@dataclass\nclass Point:\n    x: int\n    y: int"],
      explain: "A dataclass writes __init__, __repr__ and __eq__ from the field list.",
    }),
  ]),
]);

export const objects = topic("python", "objects", [
  skill("obj-list", 2, { explain: "A list of objects is used like any list; the only difference is reading a field off each item." }, [
    v("build", "`pairs` is a list of (x, y) tuples. Build a list of `Point` objects from it. Use `x` and `y`.", POINT + "\npairs = [(1, 2), (3, 4)]", "gives two Points: (1, 2) and (3, 4)", "[Point(x, y) for x, y in pairs]", "[(p.x, p.y) for p in _] == [(1, 2), (3, 4)]", {
      accepted: ["[Point(*p) for p in pairs]"],
    }),
    v("sum-field", "`points` is a list of `Point` objects. Get the total of their `x` fields. Call each object `p`.", POINTS, "gives 6", "sum(p.x for p in points)", "_ == 6"),
    v("max-field", "`points` is a list of `Point` objects. Get the largest `y` value among them. Call each object `p`.", POINTS, "gives 5", "max(p.y for p in points)", "_ == 5"),
    v("object-with-max", "`points` is a list of `Point` objects. Get the OBJECT with the largest `x`, not the value. Call each object `p`.", POINTS, "gives the Point with x = 3", "max(points, key=lambda p: p.x)", "_.x == 3 and _ in points"),
    v("filter", "`points` is a list of `Point` objects. Build a list of only those whose `y` is 5. Call each object `p`.", POINTS, "gives the two Points with y = 5", "[p for p in points if p.y == 5]", "[p.x for p in _] == [1, 2]"),
    v("find-first", "`points` is a list of `Point` objects and `target` is a number. Get the first object whose `x` equals `target`, or None when there is none. Call each object `p`.", POINTS + "\ntarget = 3", "gives the Point with x = 3", "next((p for p in points if p.x == target), None)", "_ is points[1]"),
    v("update-each", "`points` is a list of `Point` objects. Add 10 to the `x` field of every one, in place (2 lines). Call each object `p`.", POINTS, "the x fields become 11, 13, 12", "for p in points:\n    p.x += 10", "[p.x for p in points] == [11, 13, 12]", {
      explain: "The loop variable is the object itself, so changing its field changes the object in the list.",
    }),
    v("count-matching", "`points` is a list of `Point` objects. Count how many have a `y` of 5. Call each object `p`.", POINTS, "gives 2", "sum(p.y == 5 for p in points)", "_ == 2", {
      accepted: ["sum(1 for p in points if p.y == 5)", "len([p for p in points if p.y == 5])"],
    }),
  ]),

  skill("obj-dict", 2, { explain: "Objects are ordinary dict values; index them by whichever field you look them up by." }, [
    v("index-by-field", "`points` is a list of `Point` objects with distinct `x` values. Build a dictionary mapping each `x` to its object. Call each object `p`.", POINTS, "gives a dict with keys 1, 3, 2", "{p.x: p for p in points}", "sorted(_) == [1, 2, 3] and _[3] is points[1]"),
    v("group-by-field", "`groups` is a defaultdict of lists and `points` is a list of `Point` objects. File every point under its `y` value (2 lines). Call each object `p`.", "from collections import defaultdict\n" + POINTS + "\ngroups = defaultdict(list)", "groups has 2 points under 5 and 1 point under 2", "for p in points:\n    groups[p.y].append(p)", "len(groups[5]) == 2 and len(groups[2]) == 1"),
    v("field-via-lookup", "`by_x` is a dictionary mapping an x value to a `Point` object. Get the `y` field of the point stored under `key`.", POINT + "\nby_x = {7: Point(7, 9)}\nkey = 7", "gives 9", "by_x[key].y", "_ == 9"),
    v("object-as-key", "`depth` is a dictionary keyed by `ListNode` objects themselves. Record that `node` is at depth `d`.", LIST_NODE + "\ndepth = {}\nnode = ListNode(4)\nd = 2", "depth maps the node object to 2", "depth[node] = d", "depth[node] == 2 and len(depth) == 1", {
      explain: "Plain objects can be dict keys: they hash by identity, so each object is its own key.",
    }),
  ]),

  skill("obj-set", 3, { explain: "A plain object in a set is matched by identity; two objects holding the same values are different members." }, [
    v("visited-nodes", "`seen` is a set of `ListNode` objects already visited. Write an expression that is True when `node` itself has been visited before.", LIST_NODE + "\nnode = ListNode(1)\nseen = {node}", "gives True", "node in seen", "_ is True", {
      explain: "This is identity membership, which is exactly what cycle detection needs.",
    }),
    v("add-by-value", "`seen` is a set that should treat points with the same coordinates as the same. Add `p`, a `Point`, in a form that compares by value.", POINT + "\nseen = {(0, 0)}\np = Point(1, 2)", "seen becomes {(0, 0), (1, 2)}", "seen.add((p.x, p.y))", "seen == {(0, 0), (1, 2)}", {
      explain: "Adding p itself would add a second member; a tuple of its fields compares by value.",
    }),
    v("same-values", "`a` and `b` are two separate `Point` objects with the same coordinates, and the class defines no equality. Write an expression that is True because their fields match.", POINT + "\na = Point(1, 2)\nb = Point(1, 2)", "gives True, even though a == b is False", "(a.x, a.y) == (b.x, b.y)", "_ is True", {
      accepted: ["a.x == b.x and a.y == b.y"],
    }),
  ]),

  skill("obj-compare", 2, { explain: "`is` asks whether two names refer to the same object; use it for None and for node identity." }, [
    v("same-node", "`slow` and `fast` are pointers into a linked list. Write an expression that is True when they are pointing at the very same node.", LIST_NODE + "\nslow = ListNode(1)\nfast = slow", "gives True", "slow is fast", "_ is True", {
      accepted: ["slow == fast"],
      explain: "For plain objects == falls back to identity, but `is` says what you mean.",
    }),
    v("has-next", "`node` is a `ListNode`. Write an expression that is True when it has NO following node.", LIST_NODE + "\nnode = ListNode(1)", "gives True", "node.next is None", "_ is True", {
      accepted: ["not node.next"],
    }),
    v("getattr-default", "`obj` is an object that may or may not have a `val` field. Get its `val`, or 0 when the field does not exist.", "class Thing:\n    pass\nobj = Thing()", "gives 0", 'getattr(obj, "val", 0)', "_ == 0", {
      explain: "getattr(object, name, default) never raises when a default is given.",
    }),
    v("safe-field", "`node` is a `ListNode` or None. In one expression, get its `val`, or -1 when `node` is None.", LIST_NODE + "\nnode = None", "gives -1", "node.val if node else -1", "_ == -1", {
      accepted: ["node.val if node is not None else -1"],
      explain: "Reading a field of None raises AttributeError, so test the node first.",
    }),
  ]),

  skill("obj-in-tuples", 3, { explain: "Tuples and objects mix freely; just avoid making Python compare two objects when it sorts or heaps the tuples." }, [
    v("loop-unpack", "`items` is a list of (object, depth) tuples. Write only the `for` line that unpacks each into `node` and `depth`.", POINT + "\nitems = [(Point(1, 2), 0), (Point(3, 4), 1)]", "out ends up [(1, 0), (3, 1)]", "for node, depth in items:", "out == [(1, 0), (3, 1)]", {
      template: "out = []\n{answer}\n    out.append((node.x, depth))",
    }),
    v("sort-by-score-only", "`items` is a list of (score, object) tuples where two scores are equal and the objects cannot be compared. Sort it in place by score ONLY. Call each tuple `t`.", POINT + "\nitems = [(5, Point(1, 1)), (2, Point(2, 2)), (5, Point(3, 3))]", "the scores become 2, 5, 5 with no error", "items.sort(key=lambda t: t[0])", "[t[0] for t in items] == [2, 5, 5]", {
      explain: "items.sort() alone would compare the Points on the tied scores and raise TypeError.",
    }),
    v("pair-with-index", "`points` is a list of `Point` objects. Build a list of (x field, index) tuples so the points can be sorted without comparing the objects. Use `i` and `p`.", POINTS, "gives [(1, 0), (3, 1), (2, 2)]", "[(p.x, i) for i, p in enumerate(points)]", "_ == [(1, 0), (3, 1), (2, 2)]"),
  ]),

  skill("obj-intervals", 2, { explain: "An interval is the same idea whether it is a [start, end] list or an object with .start and .end; only the access syntax changes." }, [
    v("sort-objects", "`intervals` is a list of `Interval` objects. Sort it in place by start. Call each object `iv`.", INTERVAL + "\nintervals = [Interval(5, 6), Interval(1, 9)]", "the starts become 1, 5", "intervals.sort(key=lambda iv: iv.start)", "[iv.start for iv in intervals] == [1, 5]"),
    v("overlap-objects", "`a` and `b` are `Interval` objects, with `a` starting first. Write an expression that is True when they overlap.", INTERVAL + "\na = Interval(1, 5)\nb = Interval(4, 8)", "gives True", "b.start <= a.end", "_ is True", {
      accepted: ["a.end >= b.start"],
    }),
    v("overlap-lists", "`a` and `b` are [start, end] lists, with `a` starting first. Write an expression that is True when they overlap.", "a = [1, 5]\nb = [4, 8]", "gives True", "b[0] <= a[1]", "_ is True", {
      accepted: ["a[1] >= b[0]"],
      explain: "The same test as with objects, with [0] for start and [1] for end.",
    }),
    v("to-lists", "`intervals` is a list of `Interval` objects. Convert it to a list of [start, end] lists. Call each object `iv`.", INTERVAL + "\nintervals = [Interval(1, 3), Interval(5, 6)]", "gives [[1, 3], [5, 6]]", "[[iv.start, iv.end] for iv in intervals]", "_ == [[1, 3], [5, 6]]"),
    v("extend-end", "`last` is the most recent `Interval` in a merged result and `cur` is an overlapping interval. Stretch `last` so it ends at whichever of the two ends is later.", INTERVAL + "\nlast = Interval(1, 5)\ncur = Interval(4, 8)", "last.end becomes 8", "last.end = max(last.end, cur.end)", "last.end == 8"),
  ]),
]);
