import { skill, topic, v } from "../topic";
import { LIST_NODE, TREE_NODE } from "./given";

const GRID = "grid = [[1, 2, 3], [4, 5, 6]]";
const CHAIN = LIST_NODE + "\nhead = ListNode(1, ListNode(2, ListNode(3)))";
const TREE = TREE_NODE + "\nroot = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))";

/** Runs a recursive tree function whose body has one slot, on `root`, into `result`. */
const treeFn = (name: string, body: string) => `def ${name}(node):\n${body}\n\nresult = ${name}(root)`;

export const grids = topic("python", "grids", [
  skill("grid-dims", 1, { explain: "A grid is a list of rows: len(grid) is the row count and len(grid[0]) the column count." }, [
    v("rows-cols", "`grid` is a list of lists. In one line, store its number of rows in `rows` and its number of columns in `cols`.", GRID, "rows is 2, cols is 3", "rows, cols = len(grid), len(grid[0])", "(rows, cols) == (2, 3)"),
    v("m-n", "`matrix` is a list of lists. In one line, store its number of rows in `m` and its number of columns in `n`.", "matrix = [[1, 2], [3, 4], [5, 6]]", "m is 3, n is 2", "m, n = len(matrix), len(matrix[0])", "(m, n) == (3, 2)"),
    v("empty-guard", "`grid` is a list of lists that might be empty or have empty rows. Write the `if` line whose block runs when there are no cells at all.", "grid = [[]]", 'out ends up "yes"', "if not grid or not grid[0]:", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
      explain: "Check `not grid` first, so grid[0] is never read on an empty list.",
    }),
    v("last-cell", "`rows` and `cols` are the dimensions of a grid. Create `target`, the (row, col) tuple of its bottom-right cell.", "rows = 3\ncols = 4", "target is (2, 3)", "target = (rows - 1, cols - 1)", "target == (2, 3)"),
  ]),

  skill("grid-slices", 2, { explain: "A row is one index away; a column has to be collected from every row." }, [
    v("row", "`grid` is a list of lists. Get the row at index `r`.", GRID + "\nr = 1", "gives [4, 5, 6]", "grid[r]", "_ == [4, 5, 6]"),
    v("column", "`grid` is a list of lists. Get the column at index `c`, as a list. Call each row `row`.", GRID + "\nc = 1", "gives [2, 5]", "[row[c] for row in grid]", "_ == [2, 5]", {
      explain: "grid[:][c] does not work; it is just grid[c], a row.",
    }),
    v("diagonal", "`grid` is a square list of lists. Get its main diagonal, top-left to bottom-right. Call the index `i`.", "grid = [[1, 2], [3, 4]]", "gives [1, 4]", "[grid[i][i] for i in range(len(grid))]", "_ == [1, 4]"),
    v("anti-diagonal", "`grid` is a square list of lists with `n` rows. Get its other diagonal, top-right to bottom-left. Call the index `i`.", "grid = [[1, 2], [3, 4]]\nn = 2", "gives [2, 3]", "[grid[i][n - 1 - i] for i in range(n)]", "_ == [2, 3]"),
  ]),

  skill("grid-bounds", 2, { explain: "Check that a cell is on the grid BEFORE reading it; `or` and `and` stop early, so the order is what keeps the read safe." }, [
    v("off-grid-guard", "You are inside the recursive function below. `r`, `c` may be off the grid, whose size is `rows` by `cols`. Write the `if` line whose block runs when the cell is off the grid.", "rows = 2\ncols = 2", "out ends up [False, True, True, True]", "if r < 0 or c < 0 or r >= rows or c >= cols:", "out == [False, True, True, True]", {
      template: "out = []\nfor r, c in [(0, 0), (-1, 0), (0, 2), (2, 1)]:\n    off = False\n    {answer}\n        off = True\n    out.append(off)",
      accepted: ["if not (0 <= r < rows and 0 <= c < cols):", "if r < 0 or r >= rows or c < 0 or c >= cols:"],
    }),
    v("in-bounds-and-land", "`grid` is a grid of 0s and 1s, `rows` by `cols`. In the loop below `nr`, `nc` is a candidate cell. Write the `if` line whose block runs only when the cell is on the grid AND holds a 1.", "grid = [[1, 0], [1, 1]]\nrows = 2\ncols = 2", "out ends up [(0, 0), (1, 1)]", "if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:", "out == [(0, 0), (1, 1)]", {
      template: "out = []\nfor nr, nc in [(0, 0), (0, 1), (2, 0), (1, 1), (0, -1)]:\n    {answer}\n        out.append((nr, nc))",
      explain: "The bounds tests come first; a negative index would otherwise silently wrap around to the other side.",
    }),
  ]),

  skill("grid-neighbors", 2, { explain: "Neighbours are the current cell plus each direction offset." }, [
    v("four-neighbors", "`dirs` is a list of (row change, col change) tuples and `r`, `c` is a cell. Build the list of its neighbouring cells. Use `dr` and `dc`.", "dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]\nr = 1\nc = 1", "gives [(2, 1), (0, 1), (1, 2), (1, 0)]", "[(r + dr, c + dc) for dr, dc in dirs]", "_ == [(2, 1), (0, 1), (1, 2), (1, 0)]"),
    v("eight-dirs", "Create `dirs`, the list of all eight (row change, col change) tuples around a cell, including diagonals, using a comprehension over -1, 0 and 1 that leaves out (0, 0). Use `dr` and `dc`.", "", "dirs holds 8 offsets", "dirs = [(dr, dc) for dr in (-1, 0, 1) for dc in (-1, 0, 1) if (dr, dc) != (0, 0)]", "len(dirs) == 8 and (0, 0) not in dirs and (-1, 1) in dirs", {
      accepted: ["dirs = [(dr, dc) for dr in (-1, 0, 1) for dc in (-1, 0, 1) if dr or dc]"],
    }),
    v("inline-dirs", "`r`, `c` is a cell. Write only the `for` line that loops over the four direction offsets written inline as a tuple of tuples, unpacking each into `dr` and `dc`.", "r = 0\nc = 0", "out ends up [(1, 0), (-1, 0), (0, 1), (0, -1)]", "for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):", "sorted(out) == [(-1, 0), (0, -1), (0, 1), (1, 0)]", {
      template: "out = []\n{answer}\n    out.append((r + dr, c + dc))",
      accepted: ["for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:"],
    }),
  ]),

  skill("grid-transform", 3, { explain: "Reversing and zipping the rows covers flips, transposes and rotations." }, [
    v("flip-vertical", "`grid` is a list of lists. Reverse the order of its rows in place, so the bottom row becomes the top.", "grid = [[1, 2], [3, 4]]", "grid becomes [[3, 4], [1, 2]]", "grid.reverse()", "grid == [[3, 4], [1, 2]]", {
      accepted: ["grid[:] = grid[::-1]"],
    }),
    v("flip-horizontal", "`grid` is a list of lists. Reverse every row in place, so each row reads right to left (2 lines). Call each row `row`.", "grid = [[1, 2], [3, 4]]", "grid becomes [[2, 1], [4, 3]]", "for row in grid:\n    row.reverse()", "grid == [[2, 1], [4, 3]]"),
    v("rotate-clockwise", "`grid` is a square list of lists. Get a new grid that is it rotated 90 degrees clockwise, as a list of lists. Call each zipped column `row`.", "grid = [[1, 2], [3, 4]]", "gives [[3, 1], [4, 2]]", "[list(row) for row in zip(*grid[::-1])]", "_ == [[3, 1], [4, 2]]", {
      explain: "Reverse the rows, then transpose: that is a clockwise quarter turn.",
    }),
  ]),

  skill("grid-aggregate", 2, { explain: "Aggregate a grid by aggregating each row, then aggregating those results." }, [
    v("total", "`grid` is a list of lists of numbers. Get the total of every value. Call each row `row`.", GRID, "gives 21", "sum(sum(row) for row in grid)", "_ == 21", {
      accepted: ["sum(map(sum, grid))"],
    }),
    v("max", "`grid` is a list of lists of numbers. Get the largest value anywhere in it. Call each row `row`.", GRID, "gives 6", "max(max(row) for row in grid)", "_ == 6", {
      accepted: ["max(map(max, grid))"],
    }),
    v("row-sums", "`grid` is a list of lists of numbers. Get a list holding the sum of each row. Call each row `row`.", GRID, "gives [6, 15]", "[sum(row) for row in grid]", "_ == [6, 15]", {
      accepted: ["list(map(sum, grid))"],
    }),
    v("count-ones", "`grid` is a list of lists of 0s and 1s. Count how many cells hold a 1. Call each row `row`.", "grid = [[1, 0], [1, 1]]", "gives 3", "sum(row.count(1) for row in grid)", "_ == 3", {
      accepted: ["sum(sum(row) for row in grid)", "sum(map(sum, grid))"],
    }),
    v("cells-matching", "`grid` is a list of lists of 0s and 1s, `rows` by `cols`. Build the list of (row, col) tuples of every cell that holds a 1. Use `r` and `c`.", "grid = [[1, 0], [0, 1]]\nrows = 2\ncols = 2", "gives [(0, 0), (1, 1)]", "[(r, c) for r in range(rows) for c in range(cols) if grid[r][c] == 1]", "_ == [(0, 0), (1, 1)]"),
  ]),

  skill("grid-flat-index", 3, { explain: "A cell maps to one number as r * cols + c, and back with divmod." }, [
    v("to-flat", "`r`, `c` is a cell in a grid with `cols` columns. Get the single index that numbers the cells row by row.", "r = 1\nc = 2\ncols = 4", "gives 6", "r * cols + c", "_ == 6"),
    v("from-flat", "`i` is a row-by-row cell number in a grid with `cols` columns. In one line, recover the cell's row `r` and column `c`.", "i = 6\ncols = 4", "r is 1, c is 2", "r, c = divmod(i, cols)", "(r, c) == (1, 2)", {
      accepted: ["r, c = i // cols, i % cols"],
    }),
  ]),
]);

export const linkedLists = topic("python", "linked-lists", [
  skill("ll-create", 1, { explain: "A linked list is just nodes that point at each other; a dummy node in front removes the special case for the head." }, [
    v("node", "`ListNode` is defined below. Create a node holding 5 and store it in `node`.", LIST_NODE, "node.val is 5, node.next is None", "node = ListNode(5)", "node.val == 5 and node.next is None"),
    v("dummy", "`ListNode` is defined below. Create `dummy`, a placeholder node with default values, to build a new list after.", LIST_NODE, "dummy is a node with val 0 and no next", "dummy = ListNode()", "dummy.val == 0 and dummy.next is None", {
      accepted: ["dummy = ListNode(0)"],
    }),
    v("dummy-and-tail", "`ListNode` is defined below. In one line, create a placeholder node and point both `dummy` and `tail` at it.", LIST_NODE, "dummy and tail are the same node", "dummy = tail = ListNode()", "dummy is tail and dummy.next is None", {
      accepted: ["dummy = tail = ListNode(0)"],
    }),
    v("dummy-before-head", "`head` is the first node of a list. Create `dummy`, a placeholder node whose next node is `head`.", CHAIN, "dummy.next is head", "dummy = ListNode(0, head)", "dummy.next is head"),
  ]),

  skill("ll-walk", 1, { explain: "Moving along a list is reassigning the pointer to its own next." }, [
    v("step", "`node` points into a linked list. Move it forward one node.", LIST_NODE + "\nnode = ListNode(1, ListNode(2))", "node now holds 2", "node = node.next", "node.val == 2"),
    v("double-step", "`fast` points into a linked list with at least two more nodes. Move it forward two nodes.", LIST_NODE + "\nfast = ListNode(1, ListNode(2, ListNode(3)))", "fast now holds 3", "fast = fast.next.next", "fast.val == 3"),
    v("length", "`node` is the head of a linked list and `n` is 0. Count the nodes into `n` (3 lines).", LIST_NODE + "\nnode = ListNode(1, ListNode(2, ListNode(3)))\nn = 0", "n ends up 3", "while node:\n    n += 1\n    node = node.next", "n == 3"),
    v("to-list", "`node` is the head of a linked list and `out` is an empty list. Collect every node's value into `out` (3 lines).", LIST_NODE + "\nnode = ListNode(1, ListNode(2, ListNode(3)))\nout = []", "out ends up [1, 2, 3]", "while node:\n    out.append(node.val)\n    node = node.next", "out == [1, 2, 3]"),
    v("start-both", "`head` is the first node of a list. In one line, start two pointers `slow` and `fast` at it.", CHAIN, "slow and fast are both head", "slow = fast = head", "slow is head and fast is head"),
  ]),

  skill("ll-edit", 2, { explain: "Rewiring is assigning to .next; set the new node's next before overwriting the old link." }, [
    v("append-to-tail", "`tail` is the last node of a list being built (`first` remembers where it began) and `node` is a node to add. Attach `node` after `tail`, then move `tail` onto it (2 lines).", LIST_NODE + "\ntail = ListNode(1)\nnode = ListNode(2)\nfirst = tail", "first.next is the new node, and tail has moved onto it", "tail.next = node\ntail = tail.next", "first.next is node and tail is node", {
      accepted: ["tail.next = node\ntail = node"],
    }),
    v("insert-after", "`prev` is a node in a list and `node` is a new node. Insert `node` right after `prev`, keeping the rest of the list (2 lines).", LIST_NODE + "\nprev = ListNode(1, ListNode(3))\nnode = ListNode(2)", "the list reads 1, 2, 3", "node.next = prev.next\nprev.next = node", "prev.next is node and node.next.val == 3", {
      explain: "Reversing the two lines loses the rest of the list.",
    }),
    v("delete-next", "`prev` is a node in a list. Remove the node right after it by skipping over it.", LIST_NODE + "\nprev = ListNode(1, ListNode(2, ListNode(3)))", "the list reads 1, 3", "prev.next = prev.next.next", "prev.next.val == 3"),
    v("build-from-list", "`nums` is a list, and `dummy` and `tail` both point at a placeholder node. Build a linked list of the values after `tail` (3 lines). Call each value `x`.", LIST_NODE + "\nnums = [1, 2, 3]\ndummy = tail = ListNode()", "dummy.next starts the list 1, 2, 3", "for x in nums:\n    tail.next = ListNode(x)\n    tail = tail.next", "dummy.next.val == 1 and dummy.next.next.next.val == 3 and tail.next is None"),
    v("return-head", "You are at the end of the function below, which built a new list after `dummy`. Return the real first node.", "", "result ends up 7, the value of the first real node", "return dummy.next", "result == 7", {
      template: LIST_NODE + "\ndef build():\n    dummy = ListNode(0, ListNode(7))\n    {answer}\n\nresult = build().val",
    }),
  ]),

  skill("ll-reverse", 2, { explain: "Reversing a list walks it once, pointing each node back at the previous one." }, [
    v("save-next", "`curr` is the current node in a reversal loop. Before its link is overwritten, save the following node in `nxt`.", LIST_NODE + "\ncurr = ListNode(1, ListNode(2))", "nxt holds 2", "nxt = curr.next", "nxt.val == 2"),
    v("point-back", "`curr` is the current node in a reversal loop and `prev` is the node before it. Make `curr` point back at `prev`.", LIST_NODE + "\nprev = ListNode(1)\ncurr = ListNode(2, ListNode(3))", "curr.next is prev", "curr.next = prev", "curr.next is prev"),
    v("one-line", "`prev` and `curr` are the two pointers of a reversal loop (`first` remembers the starting node). In ONE tuple assignment, point `curr` back at `prev` and advance both pointers.", LIST_NODE + "\nprev = None\ncurr = ListNode(1, ListNode(2))\nfirst = curr", "first.next is None, prev is first, curr holds 2", "curr.next, prev, curr = prev, curr, curr.next", "first.next is None and prev is first and curr.val == 2", {
      explain: "The right side is evaluated first, so curr.next is read before it is overwritten.",
    }),
    v("whole-loop", "`curr` is the head of a list and `prev` is None. Reverse the whole list with a loop whose body is one tuple assignment (2 lines).", LIST_NODE + "\nprev = None\ncurr = ListNode(1, ListNode(2, ListNode(3)))", "prev ends up as the new head, holding 3", "while curr:\n    curr.next, prev, curr = prev, curr, curr.next", "prev.val == 3 and prev.next.val == 2 and prev.next.next.next is None"),
  ]),

  skill("ll-two-lists", 3, { explain: "Merging walks both lists at once and always attaches the smaller head." }, [
    v("while-both", "`a` and `b` are the heads of two lists. Write only the `while` line of a loop that runs as long as BOTH still have nodes.", LIST_NODE + "\na = ListNode(1, ListNode(2))\nb = ListNode(9)", "n ends up 1", "while a and b:", "n == 1", {
      template: "n = 0\n{answer}\n    n += 1\n    a = a.next\n    b = b.next",
    }),
    v("attach-rest", "`tail` is the end of a merged list, and at most one of `a` and `b` still has nodes. Attach whichever one is left.", LIST_NODE + "\ntail = ListNode(0)\na = None\nb = ListNode(5)", "tail.next is b", "tail.next = a or b", "tail.next is b", {
      accepted: ["tail.next = a if a else b"],
      explain: "`a or b` gives a when it is a node and b when a is None.",
    }),
    v("carry-digit", "`a` and `b` are nodes or None, and `carry` is an int. Get the total of `carry` plus the value of each node that exists.", LIST_NODE + "\na = ListNode(7)\nb = None\ncarry = 1", "gives 8", "carry + (a.val if a else 0) + (b.val if b else 0)", "_ == 8"),
  ]),
]);

export const trees = topic("python", "trees", [
  skill("tree-create", 1, { explain: "A TreeNode holds a value and two child pointers that default to None." }, [
    v("leaf", "`TreeNode` is defined below. Create a node holding 5 with no children, stored in `node`.", TREE_NODE, "node.val is 5, with no children", "node = TreeNode(5)", "node.val == 5 and node.left is None and node.right is None"),
    v("with-children", "`TreeNode` is defined below. In one expression, create `root` holding 1, with a left child holding 2 and a right child holding 3.", TREE_NODE, "root has val 1, left 2, right 3", "root = TreeNode(1, TreeNode(2), TreeNode(3))", "(root.val, root.left.val, root.right.val) == (1, 2, 3)"),
    v("attach", "`root` is a `TreeNode` with no children. Give it a right child holding 9.", TREE_NODE + "\nroot = TreeNode(1)", "root.right.val is 9", "root.right = TreeNode(9)", "root.right.val == 9 and root.left is None"),
  ]),

  skill("tree-checks", 1, { explain: "A missing child is None, which is falsy." }, [
    v("is-leaf", "`node` is a `TreeNode`. Write an expression that is True when it has no children.", TREE_NODE + "\nnode = TreeNode(4)", "gives True", "not node.left and not node.right", "_ is True", {
      accepted: ["node.left is None and node.right is None", "not (node.left or node.right)"],
    }),
    v("has-left", "`node` is a `TreeNode`. Write the `if` line whose block runs when it has a left child.", TREE_NODE + "\nnode = TreeNode(1, TreeNode(2))", 'out ends up "yes"', "if node.left:", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
      accepted: ["if node.left is not None:"],
    }),
    v("child-value", "`node` is a `TreeNode` that has a left child. Get the value held by that child.", TREE_NODE + "\nnode = TreeNode(1, TreeNode(2))", "gives 2", "node.left.val", "_ == 2"),
    v("swap-children", "`node` is a `TreeNode`. Swap its left and right children in one line.", TREE_NODE + "\nnode = TreeNode(1, TreeNode(2), TreeNode(3))", "node.left holds 3, node.right holds 2", "node.left, node.right = node.right, node.left", "(node.left.val, node.right.val) == (3, 2)"),
  ]),

  skill("tree-recursion", 2, { explain: "Most tree functions return a value built from the answers for the left and right subtrees." }, [
    v("depth", "`root` is a tree of `TreeNode` objects. You are inside the recursive function `depth` below. Return 1 plus the larger of the depths of the two subtrees.", TREE, "result ends up 3", "return 1 + max(depth(node.left), depth(node.right))", "result == 3", {
      template: treeFn("depth", "    if not node:\n        return 0\n    {answer}"),
    }),
    v("count", "`root` is a tree of `TreeNode` objects. You are inside the recursive function `count` below. Return the number of nodes: this one plus both subtrees.", TREE, "result ends up 4", "return 1 + count(node.left) + count(node.right)", "result == 4", {
      template: treeFn("count", "    if not node:\n        return 0\n    {answer}"),
    }),
    v("total", "`root` is a tree of `TreeNode` objects. You are inside the recursive function `total` below. Return the sum of this node's value and both subtrees.", TREE, "result ends up 10", "return node.val + total(node.left) + total(node.right)", "result == 10", {
      template: treeFn("total", "    if not node:\n        return 0\n    {answer}"),
    }),
    v("store-subtree", "`root` is a tree of `TreeNode` objects. You are inside the recursive function `height` below. Store the height of the LEFT subtree in `left`.", TREE, "result ends up 3", "left = height(node.left)", "result == 3", {
      template: treeFn("height", "    if not node:\n        return 0\n    {answer}\n    right = height(node.right)\n    return 1 + max(left, right)"),
    }),
    v("both-match", "You are inside the recursive function `same` below, which compares two trees `p` and `q` whose root values already match. Return whether both pairs of subtrees match.", "", "result ends up True", "return same(p.left, q.left) and same(p.right, q.right)", "result is True", {
      template:
        TREE_NODE +
        "\ndef same(p, q):\n    if not p and not q:\n        return True\n    if not p or not q or p.val != q.val:\n        return False\n    {answer}\n\nresult = same(TreeNode(1, TreeNode(2)), TreeNode(1, TreeNode(2)))",
    }),
  ]),

  skill("tree-traversal", 2, { explain: "The three depth-first orders differ only in where the node itself is visited relative to its children." }, [
    v("inorder", "`root` is a tree of `TreeNode` objects and `out` collects values. Inside `dfs` below, write the three lines of an IN-order visit: left subtree, this node, right subtree.", TREE, "out ends up [4, 2, 1, 3]", "dfs(node.left)\nout.append(node.val)\ndfs(node.right)", "out == [4, 2, 1, 3]", {
      template: "out = []\ndef dfs(node):\n    if not node:\n        return\n    {answer}\n\ndfs(root)",
    }),
    v("preorder", "`root` is a tree of `TreeNode` objects and `out` collects values. Inside `dfs` below, write the three lines of a PRE-order visit: this node, left subtree, right subtree.", TREE, "out ends up [1, 2, 4, 3]", "out.append(node.val)\ndfs(node.left)\ndfs(node.right)", "out == [1, 2, 4, 3]", {
      template: "out = []\ndef dfs(node):\n    if not node:\n        return\n    {answer}\n\ndfs(root)",
    }),
    v("postorder", "`root` is a tree of `TreeNode` objects and `out` collects values. Inside `dfs` below, write the three lines of a POST-order visit: left subtree, right subtree, this node.", TREE, "out ends up [4, 2, 3, 1]", "dfs(node.left)\ndfs(node.right)\nout.append(node.val)", "out == [4, 2, 3, 1]", {
      template: "out = []\ndef dfs(node):\n    if not node:\n        return\n    {answer}\n\ndfs(root)",
    }),
    v("inorder-as-list", "`root` is a tree of `TreeNode` objects. You are inside the recursive function `inorder` below, which returns a list. Return the in-order values: the left subtree's list, this node's value, the right subtree's list.", TREE, "result ends up [4, 2, 1, 3]", "return inorder(node.left) + [node.val] + inorder(node.right)", "result == [4, 2, 1, 3]", {
      template: treeFn("inorder", "    if not node:\n        return []\n    {answer}"),
      explain: "node.val must be wrapped in a list before it can be concatenated.",
    }),
  ]),

  skill("tree-bfs", 2, { explain: "Level-order traversal is a queue: pop a node, record it, push its children that exist." }, [
    v("push-children", "`q` is a deque and `node` is a `TreeNode` just popped from it. Add each of its children that exists to the queue (3 lines). Call each `child`.", "from collections import deque\n" + TREE_NODE + "\nq = deque()\nnode = TreeNode(1, TreeNode(2))", "q holds only the left child, the node with val 2", "for child in (node.left, node.right):\n    if child:\n        q.append(child)", "len(q) == 1 and q[0].val == 2"),
    v("collect-level", "`res` is the list of levels found so far and `level` is the list of values on the level just finished. Add the level to the result.", "res = [[1]]\nlevel = [2, 3]", "res becomes [[1], [2, 3]]", "res.append(level)", "res == [[1], [2, 3]]"),
    v("rightmost", "`level` is the list of values on one level of a tree, left to right. Get the value seen from the right side.", "level = [4, 5, 6]", "gives 6", "level[-1]", "_ == 6"),
  ]),

  skill("tree-bst", 2, { explain: "In a binary search tree, smaller values are in the left subtree and larger ones in the right." }, [
    v("choose-side", "`node` is a node of a binary search tree and `target` is the value being searched for, which is not at `node`. Move `node` to the child on the side where `target` must be.", TREE_NODE + "\nnode = TreeNode(5, TreeNode(3), TreeNode(8))\ntarget = 8", "node now holds 8", "node = node.left if target < node.val else node.right", "node.val == 8"),
    v("validate-left", "`root` is a binary search tree. You are inside the recursive function `valid` below, which checks every value is between `lo` and `hi`. Write the recursive call for the LEFT subtree, whose values must stay below this node's value.", TREE_NODE + "\nroot = TreeNode(5, TreeNode(3), TreeNode(8))", "result ends up True", "valid(node.left, lo, node.val)", "result is True", {
      template:
        'def valid(node, lo, hi):\n    if not node:\n        return True\n    if not lo < node.val < hi:\n        return False\n    left_ok = (\n        {answer}\n    )\n    return left_ok and valid(node.right, node.val, hi)\n\nresult = valid(root, float("-inf"), float("inf"))',
    }),
  ]),

  skill("tree-nary", 2, { explain: "An N-ary node keeps its children in a list, so visiting them is a for loop." }, [
    v("children-loop", "`node` is a tree node whose children are in a list field named `children`. Write only the `for` line that visits each one as `child`.", "class Node:\n    def __init__(self, val, children=None):\n        self.val = val\n        self.children = children or []\nnode = Node(1, [Node(2), Node(3)])", "out ends up [2, 3]", "for child in node.children:", "out == [2, 3]", {
      template: "out = []\n{answer}\n    out.append(child.val)",
    }),
  ]),
]);
