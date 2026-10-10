import { skill, topic, v } from "../topic";
import { TREE_NODE } from "./given";

const DQ = "from collections import deque";

export const stacks = topic("python", "stack", [
  skill("stack-basic", 1, { explain: "A Python stack is a plain list: append pushes, pop() pops, [-1] peeks." }, [
    v("create", "Create `stack`, an empty stack.", "", "stack is []", "stack = []", "stack == [] and type(stack) is list"),
    v("push", "`stack` is a list used as a stack. Push `x` onto it.", "stack = [1, 2]\nx = 3", "stack becomes [1, 2, 3]", "stack.append(x)", "stack == [1, 2, 3]", {
      explain: "There is no push method; it is append.",
    }),
    v("pop", "`stack` is a list used as a stack. Pop the top item off and get it back.", "stack = [1, 2, 3]", "gives 3, and stack becomes [1, 2]", "stack.pop()", "_ == 3 and stack == [1, 2]"),
    v("peek", "`stack` is a list used as a stack. Look at the top item without removing it.", "stack = [1, 2, 3]", "gives 3, and stack stays [1, 2, 3]", "stack[-1]", "_ == 3 and stack == [1, 2, 3]", {
      explain: "There is no peek or top method; the top is the last item.",
    }),
    v("is-empty", "`stack` is a list used as a stack. Write an expression that is True when it is empty.", "stack = []", "gives True", "not stack", "_ is True", {
      accepted: ["len(stack) == 0"],
    }),
    v("seed", "`start` is a starting node for an iterative DFS. Create `stack` holding just that node.", "start = 7", "stack is [7]", "stack = [start]", "stack == [7]"),
  ]),

  skill("stack-tuples", 2, { explain: "Stack entries are often tuples; push with double parentheses and unpack on pop." }, [
    v("push-pair", "`stack` is a stack of (value, index) tuples. Push the pair made of `x` and `i`.", "stack = []\nx = 70\ni = 2", "stack becomes [(70, 2)]", "stack.append((x, i))", "stack == [(70, 2)]"),
    v("pop-unpack", "`stack` is a stack of (value, index) tuples. Pop the top one straight into `val` and `idx`.", "stack = [(70, 2), (60, 5)]", "val is 60, idx is 5", "val, idx = stack.pop()", "(val, idx) == (60, 5) and stack == [(70, 2)]"),
    v("peek-part", "`stack` is a stack of (value, index) tuples. Get the VALUE of the top entry without popping it.", "stack = [(70, 2), (60, 5)]", "gives 60", "stack[-1][0]", "_ == 60 and len(stack) == 2"),
    v("seed-with-depth", "`root` is the root of a tree. Create `stack` holding the single tuple of `root` and the depth 1.", 'root = "r"', 'stack is [("r", 1)]', "stack = [(root, 1)]", 'stack == [("r", 1)]'),
    v("push-child", "`stack` is a stack of (node, depth) tuples, and `child` is a child of a node at depth `depth`. Push the child with its depth.", 'stack = []\nchild = "c"\ndepth = 2', 'stack becomes [("c", 3)]', "stack.append((child, depth + 1))", 'stack == [("c", 3)]'),
  ]),

  skill("stack-conditions", 2, { explain: "Always test that the stack is non-empty before reading stack[-1]." }, [
    v("top-is-smaller-index", "`nums` is a list and `stack` holds INDEXES into it. `x` is a new value. Write the `while` line that keeps popping while the stack is not empty and the value at the top index is smaller than `x`.", "nums = [5, 2, 1]\nstack = [0, 1, 2]\nx = 3", "out ends up [2, 1], and stack keeps [0]", "while stack and nums[stack[-1]] < x:", "out == [2, 1] and stack == [0]", {
      template: "out = []\n{answer}\n    out.append(stack.pop())",
    }),
    v("top-pair-smaller", "`stack` holds (value, index) tuples and `x` is a new value. Write the `while` line that keeps popping while the stack is not empty and the top entry's value is smaller than `x`.", "stack = [(9, 0), (2, 1)]\nx = 5", "out ends up [(2, 1)], and stack keeps [(9, 0)]", "while stack and stack[-1][0] < x:", "out == [(2, 1)] and stack == [(9, 0)]", {
      template: "out = []\n{answer}\n    out.append(stack.pop())",
    }),
    v("matches-top", "`stack` is a stack of characters and `c` is a character. Write the `if` line whose block runs when the stack is not empty and its top equals `c`.", 'stack = ["a", "b"]\nc = "b"', 'out ends up "yes"', "if stack and stack[-1] == c:", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
    }),
  ]),

  skill("stack-brackets", 2, { explain: "Push opening brackets; on a closing bracket the top of the stack must be its partner." }, [
    v("is-opening", "`c` is a single bracket character. Write an expression that is True when it is one of the three opening brackets.", 'c = "["', "gives True", 'c in "([{"', "_ is True"),
    v("mismatch", '`stack` is a stack of opening brackets, `pairs` maps each closing bracket to its opening one, and `c` is a closing bracket. Write an expression that is True when `c` does NOT close the top of the stack, including when the stack is empty.', 'stack = ["("]\npairs = {")": "(", "]": "["}\nc = "]"', "gives True", "not stack or stack.pop() != pairs[c]", "_ is True", {
      accepted: ["not stack or stack[-1] != pairs[c]"],
      explain: "`not stack or ...` short-circuits, so pop is never called on an empty list.",
    }),
    v("all-closed", "You are at the end of the function below. Return True only when every opening bracket was closed, meaning the stack is empty.", "", "result ends up False, because one bracket is still open", "return not stack", "result is False", {
      template: 'def valid(stack):\n    {answer}\n\nresult = valid(["("])',
      accepted: ["return len(stack) == 0"],
    }),
  ]),

  skill("stack-monotonic", 3, { explain: "A monotonic stack of indexes resolves each index at the moment a larger value arrives." }, [
    v("resolve", "`stack` holds indexes still waiting for a warmer day, `res` is the answer list, and `i` is today's index. Pop the waiting index into `j` and record how many days it waited (2 lines).", "stack = [0]\nres = [0, 0, 0]\ni = 2", "res becomes [2, 0, 0]", "j = stack.pop()\nres[j] = i - j", "res == [2, 0, 0] and stack == []"),
    v("result-array", "`nums` is a list. Create `res`, a list of the same length filled with -1, for answers that may never be found.", "nums = [4, 5, 6]", "res is [-1, -1, -1]", "res = [-1] * len(nums)", "res == [-1, -1, -1]"),
  ]),
]);

export const deques = topic("python", "deque", [
  skill("deque-create", 1, { explain: "deque comes from collections and takes an ITERABLE of starting items." }, [
    v("import", "Write the import line for `deque`, the double-ended queue.", "", "deque is available to use", DQ, 'deque.__module__ == "collections"'),
    v("empty", "Create `q`, an empty deque. Include the import.", "", "q is an empty deque", DQ + "\nq = deque()", "type(q).__name__ == 'deque' and len(q) == 0"),
    v("one-item", "`deque` is already imported and `root` is a single value. Create a deque named `q` that starts with just `root` in it.", DQ + "\nroot = 1", "q is deque([1])", "q = deque([root])", "type(q).__name__ == 'deque' and list(q) == [1]", {
      explain: "deque(root) would try to iterate root; wrap it in a list.",
    }),
    v("from-list", "`deque` is already imported and `nums` is a list. Create `q`, a deque holding the same items in the same order.", DQ + "\nnums = [1, 2, 3]", "q is deque([1, 2, 3])", "q = deque(nums)", "type(q).__name__ == 'deque' and list(q) == [1, 2, 3]"),
    v("start-cell", "`deque` is already imported. Create `q`, a deque that starts with the single grid cell (0, 0) in it.", DQ, "q is deque([(0, 0)])", "q = deque([(0, 0)])", "type(q).__name__ == 'deque' and list(q) == [(0, 0)]", {
      explain: "deque((0, 0)) would hold two separate zeros; the cell tuple goes inside a list.",
    }),
    v("node-and-depth", "`deque` is already imported and `root` is a tree root. Create `q`, a deque that starts with the single tuple of `root` and depth 0.", DQ + '\nroot = "r"', 'q is deque([("r", 0)])', "q = deque([(root, 0)])", 'list(q) == [("r", 0)]'),
    v("maxlen", "`deque` is already imported and `k` is an int. Create `q`, an empty deque that never holds more than `k` items, dropping the oldest automatically.", DQ + "\nk = 3", "q is an empty deque with maxlen 3", "q = deque(maxlen=k)", "q.maxlen == 3 and len(q) == 0"),
  ]),

  skill("deque-ends", 1, { explain: "A deque is O(1) at both ends: append / pop on the right, appendleft / popleft on the left." }, [
    v("append", "`q` is a deque. Add `x` to the BACK of it.", DQ + "\nq = deque([1])\nx = 2", "q becomes deque([1, 2])", "q.append(x)", "list(q) == [1, 2]"),
    v("appendleft", "`q` is a deque. Add `x` to the FRONT of it.", DQ + "\nq = deque([1])\nx = 0", "q becomes deque([0, 1])", "q.appendleft(x)", "list(q) == [0, 1]", {
      explain: "One word, all lowercase: appendleft.",
    }),
    v("popleft", "`q` is a deque. Remove the item at the FRONT and get that item back.", DQ + "\nq = deque([1, 2])", "gives 1, and q becomes deque([2])", "q.popleft()", "_ == 1 and list(q) == [2]", {
      explain: "popleft() is O(1); list.pop(0) is O(n).",
    }),
    v("pop", "`q` is a deque. Remove the item at the BACK and get that item back.", DQ + "\nq = deque([1, 2])", "gives 2, and q becomes deque([1])", "q.pop()", "_ == 2 and list(q) == [1]"),
    v("peek-front", "`q` is a deque. Look at the item at the front without removing it.", DQ + "\nq = deque([4, 5, 6])", "gives 4", "q[0]", "_ == 4 and len(q) == 3"),
    v("peek-back", "`q` is a deque. Look at the item at the back without removing it.", DQ + "\nq = deque([4, 5, 6])", "gives 6", "q[-1]", "_ == 6 and len(q) == 3"),
    v("extend", "`q` is a deque and `nbrs` is a list. Add every item of `nbrs` to the back of `q`.", DQ + "\nq = deque([1])\nnbrs = [2, 3]", "q becomes deque([1, 2, 3])", "q.extend(nbrs)", "list(q) == [1, 2, 3]"),
  ]),

  skill("deque-bfs", 2, { explain: "BFS pops from the left and appends to the right; entries are usually tuples that are unpacked on the way out." }, [
    v("pop-cell", "`q` is a deque of (row, col) tuples. Take the next cell off the front, straight into `r` and `c`.", DQ + "\nq = deque([(0, 1), (2, 2)])", "r is 0, c is 1", "r, c = q.popleft()", "(r, c) == (0, 1) and len(q) == 1"),
    v("pop-cell-dist", "`q` is a deque of (row, col, distance) tuples. Take the next entry off the front, straight into `r`, `c` and `dist`.", DQ + "\nq = deque([(0, 1, 5)])", "r is 0, c is 1, dist is 5", "r, c, dist = q.popleft()", "(r, c, dist) == (0, 1, 5) and len(q) == 0"),
    v("pop-node-depth", "`q` is a deque of (node, depth) tuples. Take the next entry off the front, straight into `node` and `depth`.", DQ + '\nq = deque([("a", 0)])', 'node is "a", depth is 0', "node, depth = q.popleft()", '(node, depth) == ("a", 0)'),
    v("push-cell", "`q` is a deque of (row, col) tuples. Add the neighbouring cell `nr`, `nc` to the back.", DQ + "\nq = deque()\nnr = 1\nnc = 2", "q becomes deque([(1, 2)])", "q.append((nr, nc))", "list(q) == [(1, 2)]"),
    v("push-cell-dist", "`q` is a deque of (row, col, distance) tuples and `dist` is the current cell's distance. Add the neighbouring cell `nr`, `nc` to the back, one step further away.", DQ + "\nq = deque()\nnr = 1\nnc = 2\ndist = 4", "q becomes deque([(1, 2, 5)])", "q.append((nr, nc, dist + 1))", "list(q) == [(1, 2, 5)]"),
    v("push-child", "`q` is a deque of tree nodes and `node` is a `TreeNode` that may or may not have a left child. Add the left child to the queue only when it exists (2 lines).", DQ + "\n" + TREE_NODE + "\nq = deque()\nnode = TreeNode(1, TreeNode(2))", "q holds the left child, the node with val 2", "if node.left:\n    q.append(node.left)", "len(q) == 1 and q[0].val == 2"),
  ]),

  skill("deque-misc", 3, { explain: "A deque can also be indexed, rotated and converted like a list." }, [
    v("rotate-right", "`q` is a deque. Rotate it one step to the right, so the last item becomes the first.", DQ + "\nq = deque([1, 2, 3])", "q becomes deque([3, 1, 2])", "q.rotate(1)", "list(q) == [3, 1, 2]"),
    v("rotate-left", "`q` is a deque. Rotate it one step to the left, so the first item becomes the last.", DQ + "\nq = deque([1, 2, 3])", "q becomes deque([2, 3, 1])", "q.rotate(-1)", "list(q) == [2, 3, 1]", {
      explain: "A negative argument rotates left.",
    }),
    v("to-list", "`q` is a deque. Convert it to an ordinary list.", DQ + "\nq = deque([1, 2])", "gives [1, 2]", "list(q)", "_ == [1, 2] and type(_) is list"),
    v("drop-stale-front", "`q` is a deque of indexes for a sliding window of size `k`, and `i` is the current index. Remove the front index when it has fallen out of the window (2 lines).", DQ + "\nq = deque([0, 2, 3])\ni = 3\nk = 3", "q becomes deque([2, 3])", "if q[0] <= i - k:\n    q.popleft()", "list(q) == [2, 3]", {
      accepted: ["if q and q[0] <= i - k:\n    q.popleft()", "if q[0] < i - k + 1:\n    q.popleft()"],
      explain: "An index is outside a window of size k ending at i when it is at most i - k.",
    }),
  ]),
]);
