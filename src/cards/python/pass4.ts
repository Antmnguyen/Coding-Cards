import { skill, topic, v } from "../topic";
import { LIST_NODE, POINT, TREE_NODE } from "./given";

/** Second pass, batch 3: classes, objects, grids, linked lists, trees and graphs. */

const DQ = "from collections import deque";
const POINTS = POINT + "\npoints = [Point(1, 5), Point(3, 2), Point(2, 5)]";
const TREE = TREE_NODE + "\nroot = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))";
const IF = { template: 'out = "no"\n{answer}\n    out = "yes"' };

export const classesMore = topic("python", "classes", [
  skill("class-design-methods", 2, { explain: "A design problem is a class whose methods each read or change the structures set up in __init__." }, [
    v("minstack-push", "You are inside `push` of the min-stack below. `self.stack` holds the values and `self.mins` holds the smallest value so far at each depth. Push `x` onto both (2 lines).", "", "result ends up ([5, 3, 7], [5, 3, 3])", "self.stack.append(x)\nself.mins.append(min(x, self.mins[-1]) if self.mins else x)", "result == ([5, 3, 7], [5, 3, 3])", {
      template: "class MinStack:\n    def __init__(self):\n        self.stack, self.mins = [], []\n    def push(self, x):\n        {answer}\n\nms = MinStack()\nfor value in (5, 3, 7):\n    ms.push(value)\nresult = (ms.stack, ms.mins)",
    }),
    v("minstack-pop", "You are inside `pop` of the min-stack below, which keeps two parallel lists, `self.stack` and `self.mins`. Remove the top entry from both (2 lines).", "", "result ends up ([5], [5])", "self.stack.pop()\nself.mins.pop()", "result == ([5], [5])", {
      template: "class MinStack:\n    def __init__(self):\n        self.stack, self.mins = [5, 3], [5, 3]\n    def pop(self):\n        {answer}\n\nms = MinStack()\nms.pop()\nresult = (ms.stack, ms.mins)",
    }),
    v("minstack-getmin", "You are inside `getMin` of the min-stack below. Return the current minimum, which is the top of `self.mins`.", "", "result ends up 3", "return self.mins[-1]", "result == 3", {
      template: "class MinStack:\n    def __init__(self):\n        self.stack, self.mins = [5, 3, 7], [5, 3, 3]\n    def getMin(self):\n        {answer}\n\nresult = MinStack().getMin()",
    }),
    v("lru-get", "You are inside `get` of the LRU cache below, where `self.data` is an OrderedDict. When `key` is missing return -1; otherwise mark it as most recently used (3 lines).", "", "result ends up (1, -1), and the key order becomes b, a", "if key not in self.data:\n    return -1\nself.data.move_to_end(key)", 'result == (1, -1) and list(cache.data) == ["b", "a"]', {
      template: 'from collections import OrderedDict\nclass LRU:\n    def __init__(self):\n        self.data = OrderedDict(a=1, b=2)\n    def get(self, key):\n        {answer}\n        return self.data[key]\n\ncache = LRU()\nresult = (cache.get("a"), cache.get("z"))',
    }),
    v("lru-evict", "You are at the end of `put` of the LRU cache below, where `self.data` is an OrderedDict and `self.cap` its capacity. When the cache has grown past its capacity, remove the least recently used entry (2 lines).", "", 'the cache keeps only "b" and "c"', "if len(self.data) > self.cap:\n    self.data.popitem(last=False)", 'list(cache.data) == ["b", "c"]', {
      template: 'from collections import OrderedDict\nclass LRU:\n    def __init__(self, cap):\n        self.cap = cap\n        self.data = OrderedDict()\n    def put(self, key, value):\n        self.data[key] = value\n        self.data.move_to_end(key)\n        {answer}\n\ncache = LRU(2)\nfor name in "abc":\n    cache.put(name, 1)',
    }),
  ]),

  skill("class-more-dunders", 3, { explain: "A few more special methods cover printing, indexing and the `in` operator." }, [
    v("str", "Inside the `Money` class below, write the method that controls what `str()` and `print` show, returning a dollar sign followed by the amount (2 lines).", "", 'result ends up "$5"', 'def __str__(self):\n    return f"${self.amount}"', 'result == "$5"', {
      template: "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n    {answer}\n\nresult = str(Money(5))",
      accepted: ['def __str__(self):\n    return "$" + str(self.amount)'],
    }),
    v("getitem", "Inside the `Row` class below, write the method that makes square-bracket indexing work, returning the item at index `i` of its `cells` list (2 lines).", "", "result ends up 8", "def __getitem__(self, i):\n    return self.cells[i]", "result == 8", {
      template: "class Row:\n    def __init__(self):\n        self.cells = [7, 8, 9]\n    {answer}\n\nresult = Row()[1]",
    }),
    v("contains", "Inside the `Bag` class below, write the method that makes the `in` operator work, returning whether `x` is in its `items` set (2 lines).", "", "result ends up True", "def __contains__(self, x):\n    return x in self.items", "result is True", {
      template: "class Bag:\n    def __init__(self):\n        self.items = {1, 2}\n    {answer}\n\nresult = 2 in Bag() and 5 not in Bag()",
    }),
    v("property-setter", "The `Box` class below has a property `val` backed by `_val`. Write the setter that lets `box.val = something` store into `_val` (3 lines). Call the new value `v`.", "", "result ends up 9", "@val.setter\ndef val(self, v):\n    self._val = v", "result == 9", {
      template: "class Box:\n    def __init__(self):\n        self._val = 3\n    @property\n    def val(self):\n        return self._val\n    {answer}\n\nbox = Box()\nbox.val = 9\nresult = box.val",
    }),
    v("class-attribute", "`Node` below has a class-level counter `count` shared by all its objects. From outside the class, add 1 to that shared counter.", "class Node:\n    count = 0", "Node.count becomes 1", "Node.count += 1", "Node.count == 1", {
      explain: "Go through the class name; assigning through an object would create a separate per-object field.",
    }),
  ]),
]);

export const objectsMore = topic("python", "objects", [
  skill("obj-more", 2, { explain: "Everything that works on a list of numbers works on a list of objects once you name the field." }, [
    v("field-set", "`points` is a list of `Point` objects. Get the SET of distinct `y` values among them. Call each object `p`.", POINTS, "gives {2, 5}", "{p.y for p in points}", "_ == {2, 5}"),
    v("any-match", "`points` is a list of `Point` objects. Write an expression that is True when any of them has an `x` of 3. Call each object `p`.", POINTS, "gives True", "any(p.x == 3 for p in points)", "_ is True"),
    v("sum-of-products", "`points` is a list of `Point` objects. Get the total of `x` times `y` over all of them. Call each object `p`.", POINTS, "gives 21", "sum(p.x * p.y for p in points)", "_ == 21"),
    v("min-two-fields", "`points` is a list of `Point` objects. Get the object with the smallest `y`, breaking ties by the smallest `x`. Call each object `p`.", POINTS, "gives the Point (3, 2)", "min(points, key=lambda p: (p.y, p.x))", "(_.x, _.y) == (3, 2)"),
    v("replace-in-list", "`points` is a list of `Point` objects and `i` is an index. Replace the object at that index with a new Point at the origin.", POINTS + "\ni = 1", "points[1] is now a Point (0, 0)", "points[i] = Point(0, 0)", "(points[1].x, points[1].y) == (0, 0) and len(points) == 3"),
    v("swap-fields", "`p` is a `Point`. Swap its `x` and `y` fields in one line.", POINT + "\np = Point(1, 2)", "p.x is 2, p.y is 1", "p.x, p.y = p.y, p.x", "(p.x, p.y) == (2, 1)"),
    v("update-via-dict", "`by_name` is a dictionary whose values are `Point` objects. Add 1 to the `x` field of the point stored under `k`.", POINT + '\nby_name = {"p": Point(4, 5)}\nk = "p"', "that point's x becomes 5", "by_name[k].x += 1", 'by_name["p"].x == 5'),
    v("same-fields-lists", "`a` and `b` are lists of `Point` objects with no equality defined. Write an expression that is True when they hold points with the same coordinates in the same order. Call each object `p`.", POINT + "\na = [Point(1, 2)]\nb = [Point(1, 2)]", "gives True, although a == b is False", "[(p.x, p.y) for p in a] == [(p.x, p.y) for p in b]", "_ is True"),
    v("queue-of-nodes", "`q` is a deque of `ListNode` objects. Take the next node off the front and get its value, in one expression.", DQ + "\n" + LIST_NODE + "\nq = deque([ListNode(7), ListNode(8)])", "gives 7, and q has 1 node left", "q.popleft().val", "_ == 7 and len(q) == 1"),
    v("shallow-copy", "`p` is a `Point`. Create `p2`, a separate object with the same field values, using the copy module. Include the import.", POINT + "\np = Point(1, 2)", "p2 has the same fields but is a different object", "import copy\np2 = copy.copy(p)", "p2 is not p and (p2.x, p2.y) == (1, 2)"),
  ]),
]);

export const gridsMore = topic("python", "grids", [
  skill("grid-walks", 3, { explain: "Layer-by-layer and flood-fill walks keep explicit bounds or temporarily mark cells." }, [
    v("spiral-bounds", "`rows` and `cols` are the dimensions of a grid. In one line, set up the four bounds of a spiral walk: `top`, `bottom`, `left` and `right`.", "rows = 3\ncols = 4", "top is 0, bottom is 2, left is 0, right is 3", "top, bottom, left, right = 0, rows - 1, 0, cols - 1", "(top, bottom, left, right) == (0, 2, 0, 3)"),
    v("top-edge", "`grid` is a list of lists and `top`, `left`, `right` are bounds of the current layer. Write only the `for` line that walks column `c` along the top edge from `left` through `right`, both included.", "grid = [[1, 2, 3], [4, 5, 6]]\ntop = 0\nleft = 0\nright = 2", "out ends up [1, 2, 3]", "for c in range(left, right + 1):", "out == [1, 2, 3]", {
      template: "out = []\n{answer}\n    out.append(grid[top][c])",
    }),
    v("right-edge-down", "`grid` is a list of lists and `top`, `bottom`, `right` are bounds of the current layer. Write only the `for` line that walks row `r` down the right edge from just below `top` through `bottom`.", "grid = [[1, 2], [3, 4], [5, 6]]\ntop = 0\nbottom = 2\nright = 1", "out ends up [4, 6]", "for r in range(top + 1, bottom + 1):", "out == [4, 6]", {
      template: "out = []\n{answer}\n    out.append(grid[r][right])",
    }),
    v("mark-visited", "`grid` is a grid of letters. Before recursing from cell `r`, `c`, save its letter in `tmp` and overwrite the cell with a marker so it is not reused (2 lines).", 'grid = [["a", "b"]]\nr = 0\nc = 1', 'tmp is "b", and the cell holds "#"', 'tmp = grid[r][c]\ngrid[r][c] = "#"', 'tmp == "b" and grid == [["a", "#"]]'),
    v("restore", "`grid` is a grid of letters in which cell `r`, `c` was temporarily overwritten, with the original letter saved in `tmp`. Put the letter back.", 'grid = [["a", "#"]]\nr = 0\nc = 1\ntmp = "b"', 'grid becomes [["a", "b"]]', "grid[r][c] = tmp", 'grid == [["a", "b"]]'),
    v("on-border", "`r`, `c` is a cell in a grid of `rows` by `cols`. Write an expression that is True when the cell is on the outer border.", "r = 0\nc = 2\nrows = 4\ncols = 5", "gives True", "r in (0, rows - 1) or c in (0, cols - 1)", "_ is True", {
      accepted: ["r == 0 or c == 0 or r == rows - 1 or c == cols - 1"],
    }),
  ]),

  skill("grid-rows-cols", 2, { explain: "A whole row can be replaced in one assignment; a column needs a loop over the rows." }, [
    v("zero-row", "`grid` is a list of lists with `cols` columns. Replace row `r` with a row of zeros.", "grid = [[1, 2], [3, 4]]\ncols = 2\nr = 0", "grid becomes [[0, 0], [3, 4]]", "grid[r] = [0] * cols", "grid == [[0, 0], [3, 4]]"),
    v("zero-column", "`grid` is a list of lists. Set every cell in column `c` to 0 (2 lines). Call each row `row`.", "grid = [[1, 2], [3, 4]]\nc = 1", "grid becomes [[1, 0], [3, 0]]", "for row in grid:\n    row[c] = 0", "grid == [[1, 0], [3, 0]]"),
    v("column-total", "`grid` is a list of lists of numbers. Get the total of column `c`. Call each row `row`.", "grid = [[1, 2], [3, 4]]\nc = 1", "gives 6", "sum(row[c] for row in grid)", "_ == 6"),
    v("distance-grid", "`rows` and `cols` are the dimensions of a grid, and `sr`, `sc` is the starting cell. Create `dist`, a grid of -1 meaning unvisited, and set the start to 0 (2 lines).", "rows = 2\ncols = 2\nsr = 0\nsc = 1", "dist is [[-1, 0], [-1, -1]]", "dist = [[-1] * cols for _ in range(rows)]\ndist[sr][sc] = 0", "dist == [[-1, 0], [-1, -1]] and dist[0] is not dist[1]"),
    v("live-neighbours", "`grid` is a grid of 0s and 1s, `rows` by `cols`, and `dirs` lists the offsets to check. Count the 1s among the on-grid neighbours of cell `r`, `c`. Use `dr` and `dc`.", "grid = [[1, 1], [0, 1]]\nrows = 2\ncols = 2\ndirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]\nr = 0\nc = 0", "gives 1", "sum(grid[r + dr][c + dc] for dr, dc in dirs if 0 <= r + dr < rows and 0 <= c + dc < cols)", "_ == 1"),
  ]),
]);

export const linkedListsMore = topic("python", "linked-lists", [
  skill("ll-gap-and-digits", 2, { explain: "A fixed gap between two pointers finds positions counted from the end; digit lists are walked with a carry." }, [
    v("advance-k", "`fast` points at the head of a list and `k` is an int. Move `fast` forward `k` nodes (2 lines).", LIST_NODE + "\nfast = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))\nk = 2", "fast now holds 3", "for _ in range(k):\n    fast = fast.next", "fast.val == 3"),
    v("walk-with-gap", "`slow` and `fast` point into the same list, with `fast` some nodes ahead. Write only the `while` line that moves both until `fast` is ON the last node.", LIST_NODE + "\nslow = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))\nfast = slow.next.next", "slow ends up on the node holding 2", "while fast.next:", "slow.val == 2", {
      template: "{answer}\n    slow = slow.next\n    fast = fast.next",
    }),
    v("cycle-check", "Inside the loop of the function below, `slow` and `fast` have just been advanced. Return True when they have met (2 lines).", "", "result ends up True for the looped list", "if slow is fast:\n    return True", "result is True", {
      template:
        LIST_NODE +
        "\ndef has_cycle(head):\n    slow = fast = head\n    for _ in range(20):\n        if not fast or not fast.next:\n            return False\n        slow = slow.next\n        fast = fast.next.next\n        {answer}\n    return False\n\na = ListNode(1)\nb = ListNode(2)\na.next = b\nb.next = a\nresult = has_cycle(a) and not has_cycle(ListNode(1, ListNode(2)))",
      accepted: ["if slow == fast:\n    return True"],
    }),
    v("delete-given-node", "`node` is a node in the middle of a list and you have no access to the one before it. Delete it by copying the next node's value into it and skipping the next node (2 lines).", LIST_NODE + "\nnode = ListNode(1, ListNode(2, ListNode(3)))", "the list now reads 2, 3", "node.val = node.next.val\nnode.next = node.next.next", "node.val == 2 and node.next.val == 3 and node.next.next is None"),
    v("values-palindrome", "`vals` is the list of values collected from a linked list. Write an expression that is True when the list reads the same in both directions.", "vals = [1, 2, 2, 1]", "gives True", "vals == vals[::-1]", "_ is True"),
    v("while-any-left", "`a` and `b` are the heads of two digit lists and `carry` is an int. Write only the `while` line of a loop that runs while either list has nodes or there is still a carry.", LIST_NODE + "\na = ListNode(9)\nb = None\ncarry = 1", "n ends up 2", "while a or b or carry:", "n == 2", {
      template: "n = 0\n{answer}\n    n += 1\n    carry = 0 if n == 2 else carry\n    a = a.next if a else None",
    }),
    v("digit-node", "`tail` is the end of a result list and `total` is the sum for the current column of digits. Attach a new node holding the last digit of `total` after `tail`.", LIST_NODE + "\ntail = ListNode()\ntotal = 17", "tail.next holds 7", "tail.next = ListNode(total % 10)", "tail.next.val == 7"),
    v("carry", "`total` is the sum for the current column of digits. Store the amount to carry into the next column in `carry`.", "total = 17", "carry is 1", "carry = total // 10", "carry == 1"),
  ]),
]);

export const treesMore = topic("python", "trees", [
  skill("tree-paths", 3, { explain: "Path problems carry the path so far down the recursion and undo the last step on the way back up." }, [
    v("append-recurse-pop", "`root` is a tree of `TreeNode` objects. Inside `dfs` below, `path` holds the values from the root to the parent. Add this node's value, recurse into both children, then remove it again (3 lines, with the two recursive calls on one line separated by a semicolon).", TREE, 'res ends up ["1->2->4", "1->3"]', "path.append(node.val)\ndfs(node.left); dfs(node.right)\npath.pop()", 'res == ["1->2->4", "1->3"]', {
      template: 'res = []\npath = []\ndef dfs(node):\n    if not node:\n        return\n    if not node.left and not node.right:\n        res.append("->".join(map(str, path + [node.val])))\n    {answer}\n\ndfs(root)',
    }),
    v("path-string", "`path` is a list of ints from the root to a leaf. Build the string of them joined by an arrow.", "path = [1, 2, 4]", 'gives "1->2->4"', '"->".join(map(str, path))', '_ == "1->2->4"', {
      accepted: ['"->".join(str(x) for x in path)'],
    }),
    v("leaf-test-line", "`node` is a `TreeNode`. Write the `if` line whose block runs only when `node` is a leaf.", TREE_NODE + "\nnode = TreeNode(4)", 'out ends up "yes"', "if not node.left and not node.right:", 'out == "yes"', {
      ...IF,
      accepted: ["if node.left is None and node.right is None:", "if not (node.left or node.right):"],
    }),
    v("remaining-sum", "`root` is a tree of `TreeNode` objects. Inside `has_path` below, `target` is the sum still needed. Write the recursive call on the left child with this node's value taken off the target.", TREE, "result ends up True, for the path 1, 2, 4", "has_path(node.left, target - node.val)", "result is True", {
      template: "def has_path(node, target):\n    if not node:\n        return False\n    if not node.left and not node.right:\n        return target == node.val\n    left = (\n        {answer}\n    )\n    return left or has_path(node.right, target - node.val)\n\nresult = has_path(root, 7)",
    }),
  ]),

  skill("tree-combine", 3, { explain: "Post-order solutions compute both subtrees first and then combine the two answers at the node." }, [
    v("lca-both-sides", "`root` is a tree of `TreeNode` objects. Inside `lca` below, `left` and `right` are the results from the two subtrees. When BOTH found something, this node is the answer: return it (2 lines).", TREE, "result ends up 1, the lowest common ancestor of 4 and 3", "if left and right:\n    return node", "result == 1", {
      template: "def lca(node, a, b):\n    if not node or node.val in (a, b):\n        return node\n    left = lca(node.left, a, b)\n    right = lca(node.right, a, b)\n    {answer}\n    return left or right\n\nresult = lca(root, 4, 3).val",
    }),
    v("lca-one-side", "`root` is a tree of `TreeNode` objects. At the end of `lca` below, at most one of `left` and `right` found something. Return whichever one did.", TREE, "result ends up 2, the lowest common ancestor of 2 and 4", "return left or right", "result == 2", {
      template: "def lca(node, a, b):\n    if not node or node.val in (a, b):\n        return node\n    left = lca(node.left, a, b)\n    right = lca(node.right, a, b)\n    if left and right:\n        return node\n    {answer}\n\nresult = lca(root, 2, 4).val",
      accepted: ["return left if left else right"],
    }),
    v("diameter-update", "`root` is a tree of `TreeNode` objects. Inside `height` below, `left` and `right` are the heights of the two subtrees and `best` is the longest path found so far. Update `best` with the path that passes through this node.", TREE, "best ends up 3", "best = max(best, left + right)", "best == 3", {
      template: "best = 0\ndef height(node):\n    global best\n    if not node:\n        return 0\n    left = height(node.left)\n    right = height(node.right)\n    {answer}\n    return 1 + max(left, right)\n\nheight(root)",
    }),
    v("build-from-mid", "Inside `build` below, `nums` is a sorted list and `mid` is its middle index. Create the node for the middle value and store it in `node`.", "", "result ends up 2, the value at the root", "node = TreeNode(nums[mid])", "result == 2", {
      template: TREE_NODE + "\ndef build(nums):\n    if not nums:\n        return None\n    mid = len(nums) // 2\n    {answer}\n    node.left = build(nums[:mid])\n    node.right = build(nums[mid + 1:])\n    return node\n\nresult = build([1, 2, 3]).val",
    }),
    v("build-left-half", "Inside `build` below, `nums` is a sorted list, `mid` its middle index and `node` the node for the middle value. Build its left subtree from everything before `mid`.", "", "result ends up 1, the value of the left child", "node.left = build(nums[:mid])", "result == 1", {
      template: TREE_NODE + "\ndef build(nums):\n    if not nums:\n        return None\n    mid = len(nums) // 2\n    node = TreeNode(nums[mid])\n    {answer}\n    node.right = build(nums[mid + 1:])\n    return node\n\nresult = build([1, 2, 3]).left.val",
    }),
  ]),

  skill("tree-levels", 2, { explain: "Once a level is collected as a list, the per-level answer is one expression on that list." }, [
    v("level-average", "`level` is the list of values on one level of a tree. Get their average.", "level = [3, 9]", "gives 6.0", "sum(level) / len(level)", "_ == 6.0"),
    v("zigzag", "`res` is the list of levels collected so far and `level` is the next one, left to right. Add it to `res`, reversed when it is an odd-numbered level counting from 0.", "res = [[1]]\nlevel = [2, 3]", "res becomes [[1], [3, 2]]", "res.append(level[::-1] if len(res) % 2 else level)", "res == [[1], [3, 2]]", {
      accepted: ["res.append(level[::-1] if len(res) % 2 == 1 else level)"],
    }),
    v("serialize-node", '`out` is a list of strings and `node` is a `TreeNode` or None. Add the node\'s value as a string, or "#" when there is no node.', TREE_NODE + "\nout = []\nnode = None", 'out becomes ["#"]', 'out.append(str(node.val) if node else "#")', 'out == ["#"]'),
  ]),
]);

export const graphsMore = topic("python", "graphs", [
  skill("graph-bfs-distance", 2, { explain: "In BFS, a dict of distances doubles as the visited set: a node is new exactly when it has no distance yet." }, [
    v("unseen-test", "`dist` maps each reached node to its distance. Write the `if` line whose block runs when `nxt` has not been reached yet.", "dist = {0: 0}\nnxt = 3", 'out ends up "yes"', "if nxt not in dist:", 'out == "yes"', IF),
    v("set-distance", "`dist` maps each reached node to its distance, `node` is the current node and `nxt` is an unreached neighbour. Record that `nxt` is one step further than `node`.", "dist = {0: 0, 2: 1}\nnode = 2\nnxt = 5", "dist[5] becomes 2", "dist[nxt] = dist[node] + 1", "dist[5] == 2"),
    v("pop-and-record", "`deque` is imported. `q` is the queue of ready nodes in a topological sort and `order` is the result so far. Take the next node off the front into `node` and add it to `order` (2 lines).", DQ + "\nq = deque([3, 1])\norder = [0]", "node is 3, and order becomes [0, 3]", "node = q.popleft()\norder.append(node)", "node == 3 and order == [0, 3] and list(q) == [1]"),
    v("all-processed", "`order` is the list of nodes a topological sort managed to process and `n` is the number of nodes. Write an expression that is True when there was no cycle, meaning every node was processed.", "order = [0, 2, 1]\nn = 3", "gives True", "len(order) == n", "_ is True"),
  ]),

  skill("graph-colouring", 3, { explain: "Two-colouring gives each neighbour the opposite colour; a neighbour that already has the same colour means the graph is not bipartite." }, [
    v("opposite-colour", "`color` maps each coloured node to 0 or 1. Give the uncoloured neighbour `nxt` the opposite colour to `node`.", "color = {0: 1}\nnode = 0\nnxt = 4", "color[4] becomes 0", "color[nxt] = 1 - color[node]", "color[4] == 0"),
    v("conflict", "`color` maps each coloured node to 0 or 1. Write the `if` line whose block runs when the already-coloured neighbour `nxt` has the SAME colour as `node`.", "color = {0: 1, 4: 1}\nnode = 0\nnxt = 4", 'out ends up "yes"', "if color[nxt] == color[node]:", 'out == "yes"', IF),
  ]),

  skill("graph-edge-lists", 3, { explain: "Some algorithms work straight from the list of edges rather than from an adjacency list." }, [
    v("relax-edge", "`dist` is a list of best known distances and `u`, `v`, `w` is one edge: from `u` to `v` with weight `w`. When going through this edge is shorter, update the distance to `v` (2 lines).", "dist = [0, 9]\nu = 0\nv = 1\nw = 4", "dist becomes [0, 4]", "if dist[u] + w < dist[v]:\n    dist[v] = dist[u] + w", "dist == [0, 4]", {
      accepted: ["dist[v] = min(dist[v], dist[u] + w)"],
    }),
    v("node-count", "`edges` is a list of [a, b] pairs of node numbers, starting from 0. Work out the number of nodes into `n`: one more than the largest number mentioned. Use `u` and `v`.", "edges = [[0, 3], [1, 2]]", "n is 4", "n = max(max(u, v) for u, v in edges) + 1", "n == 4"),
    v("reverse-edges", "`rev` is a list of empty lists, one per node, and `edges` is a list of [from, to] pairs. Fill `rev` with the REVERSED graph: each node lists the nodes that point to it (2 lines). Use `u` and `v`.", "rev = [[], [], []]\nedges = [[0, 1], [0, 2]]", "rev becomes [[], [0], [0]]", "for u, v in edges:\n    rev[v].append(u)", "rev == [[], [0], [0]]"),
    v("sort-by-weight", "`edges` is a list of [from, to, weight] triples. Sort it in place by weight, as Kruskal's algorithm needs. Call each edge `e`.", "edges = [[0, 1, 5], [1, 2, 2]]", "edges becomes [[1, 2, 2], [0, 1, 5]]", "edges.sort(key=lambda e: e[2])", "edges == [[1, 2, 2], [0, 1, 5]]"),
  ]),
]);
