import { skill, topic, v } from "../topic";
import { LIST_NODE, TASK } from "./given";

const HQ = "import heapq";
const IMPORTED = "The `heapq` module is already imported.";

export const heaps = topic("python", "heaps", [
  skill("heap-setup", 1, { explain: "The module is heapq. A heap is a plain list that the heapq functions keep ordered, smallest first." }, [
    v("import", "Write the import line for Python's heap (priority queue) module.", "", "heapq is available to use", HQ, 'heapq.__name__ == "heapq"'),
    v("empty", "Create `h`, an empty heap.", "", "h is []", "h = []", "h == [] and type(h) is list", {
      explain: "There is no heap class; an empty heap is an empty list.",
    }),
    v("heapify", "`h` is an ordinary unsorted list. Rearrange it in place so it becomes a min-heap. Include the import.", "h = [3, 1, 2]", "h[0] is now 1, the smallest", HQ + "\nheapq.heapify(h)", "h[0] == 1 and sorted(h) == [1, 2, 3]", {
      explain: "heapify works in place and returns None; do not assign its result.",
    }),
  ]),

  skill("heap-build", 2, { explain: "heapify turns any list into a heap in O(n); build the list in the shape you want first." }, [
    v("max-heap-of-ints", IMPORTED + " `nums` is a list. Create `h`, a MAX-heap of its values, by storing each one negated (2 lines). Call each item `x`.", HQ + "\nnums = [3, 9, 4]", "h[0] is -9, the largest value negated", "h = [-x for x in nums]\nheapq.heapify(h)", "h[0] == -9 and sorted(h) == [-9, -4, -3]"),
    v("from-counts", IMPORTED + " `freq` is a dictionary of counts. Create `h`, a heap of (negated count, item) tuples so the most frequent item comes out first (2 lines). Use `c` for the item and `n` for its count.", HQ + '\nfreq = {"a": 3, "b": 5}', 'h[0] is (-5, "b")', "h = [(-n, c) for c, n in freq.items()]\nheapq.heapify(h)", 'h[0] == (-5, "b") and len(h) == 2'),
    v("tuples", IMPORTED + " `h` is an unsorted list of (distance, name) tuples. Turn it into a heap in place.", HQ + '\nh = [(7, "a"), (2, "b"), (5, "c")]', 'h[0] is now (2, "b")', "heapq.heapify(h)", 'h[0] == (2, "b")', {
      explain: "Tuples are ordered by their first item, then by the next on a tie.",
    }),
  ]),

  skill("heap-push", 1, { explain: "heapq.heappush(heap, item): the heap is the first argument, and there is no h.push()." }, [
    v("int", IMPORTED + " `h` is a list that is already a min-heap. Add `x` to it, keeping it a heap.", HQ + "\nh = [1, 3]\nx = 0", "h[0] is now 0, and h has 3 items", "heapq.heappush(h, x)", "h[0] == 0 and len(h) == 3"),
    v("negated", IMPORTED + " `h` is a heap you are using as a MAX-heap by storing negated numbers. Add the number `x` to it.", HQ + "\nh = []\nx = 5", "h becomes [-5]", "heapq.heappush(h, -x)", "h == [-5]", {
      explain: "heapq is min-only: store negatives and negate again when popping.",
    }),
    v("dist-node", IMPORTED + " `h` is a min-heap of (distance, node) tuples. Add an entry for `node` at distance `d`.", HQ + '\nh = []\nd = 4\nnode = "b"', 'h becomes [(4, "b")]', "heapq.heappush(h, (d, node))", 'h == [(4, "b")]', {
      explain: "Double parentheses: the tuple is ONE argument, with the priority first.",
    }),
    v("dist-cell", IMPORTED + " `h` is a min-heap of tuples. Add one tuple made of `dist`, `r` and `c`, in that order, so the heap is ordered by `dist`.", HQ + "\nh = []\ndist = 5\nr = 1\nc = 2", "h becomes [(5, 1, 2)]", "heapq.heappush(h, (dist, r, c))", "h == [(5, 1, 2)]"),
    v("freq-char", IMPORTED + " `h` is a max-heap of (negated count, character) tuples. Add the character `ch` with count `n`.", HQ + '\nh = []\nch = "a"\nn = 3', 'h becomes [(-3, "a")]', "heapq.heappush(h, (-n, ch))", 'h == [(-3, "a")]'),
    v("string", IMPORTED + " `h` is a min-heap of strings. Add `word` to it.", HQ + '\nh = ["b", "c"]\nword = "a"', 'h[0] is now "a"', "heapq.heappush(h, word)", 'h[0] == "a" and len(h) == 3', {
      explain: "Strings compare alphabetically, so they can go on a heap directly.",
    }),
    v("relax-edge", IMPORTED + " `h` is a min-heap of (distance, node) tuples in Dijkstra's algorithm. `d` is the distance to the current node, `w` the weight of an edge, and `nxt` the node it leads to. Add the entry for `nxt`.", HQ + '\nh = []\nd = 4\nw = 3\nnxt = "c"', 'h becomes [(7, "c")]', "heapq.heappush(h, (d + w, nxt))", 'h == [(7, "c")]'),
  ]),

  skill("heap-pop", 1, { explain: "heapq.heappop(heap) removes and returns the smallest item; it is not a method on the list." }, [
    v("int", IMPORTED + " `h` is a list that is already a min-heap. Remove its smallest item and get that item back.", HQ + "\nh = [1, 3, 2]", "gives 1, and h keeps 2 and 3", "heapq.heappop(h)", "_ == 1 and sorted(h) == [2, 3]"),
    v("negated", IMPORTED + " `h` is a MAX-heap stored as negated numbers. Remove the largest value and get it back as a positive number.", HQ + "\nh = [-9, -4, -3]", "gives 9", "-heapq.heappop(h)", "_ == 9 and len(h) == 2", {
      explain: "Negate on the way out to undo the negation on the way in.",
    }),
    v("unpack-pair", IMPORTED + " `h` is a min-heap of (distance, node) tuples. Pop the closest entry straight into `d` and `node`.", HQ + '\nh = [(2, "b"), (7, "a")]', 'd is 2, node is "b"', "d, node = heapq.heappop(h)", '(d, node) == (2, "b") and len(h) == 1'),
    v("unpack-triple", IMPORTED + " `h` is a min-heap of (distance, row, col) tuples. Pop the closest entry straight into `dist`, `r` and `c`.", HQ + "\nh = [(1, 0, 2), (5, 3, 3)]", "dist is 1, r is 0, c is 2", "dist, r, c = heapq.heappop(h)", "(dist, r, c) == (1, 0, 2) and len(h) == 1"),
    v("unpack-negated-count", IMPORTED + " `h` is a max-heap of (negated count, character) tuples. Pop the most frequent entry into `n` and `ch`, with `n` turned back into a positive count (2 lines).", HQ + '\nh = [(-5, "b"), (-3, "a")]', 'n is 5, ch is "b"', "n, ch = heapq.heappop(h)\nn = -n", '(n, ch) == (5, "b")'),
    v("drop-priority", IMPORTED + " `h` is a min-heap of (priority, index, task) tuples. Pop the next entry, keeping only the task in `task` and using the throwaway name for the rest.", HQ + '\nh = [(1, 0, "write"), (2, 1, "test")]', 'task is "write"', "_, _, task = heapq.heappop(h)", 'task == "write" and len(h) == 1'),
  ]),

  skill("heap-peek", 1, { explain: "The smallest item is always at index 0; there is no peek()." }, [
    v("int", "`h` is a list that is already a min-heap. Look at its smallest item without removing it.", "h = [1, 3, 2]", "gives 1, and h still has 3 items", "h[0]", "_ == 1 and len(h) == 3"),
    v("negated", "`h` is a MAX-heap stored as negated numbers. Look at the largest value, as a positive number, without removing it.", "h = [-9, -4, -3]", "gives 9, and h still has 3 items", "-h[0]", "_ == 9 and len(h) == 3"),
    v("tuple-priority", "`h` is a min-heap of (distance, node) tuples. Look at the smallest DISTANCE without removing the entry.", 'h = [(2, "b"), (7, "a")]', "gives 2", "h[0][0]", "_ == 2 and len(h) == 2"),
  ]),

  skill("heap-size-k", 2, { explain: "A min-heap capped at k items holds the k largest seen so far, with the k-th largest at h[0]." }, [
    v("push-then-trim", IMPORTED + " `h` is a min-heap that must never hold more than `k` items. Add `x`, then remove the smallest if the heap has grown past `k` (3 lines).", HQ + "\nh = [4, 8]\nk = 2\nx = 6", "h ends up holding 6 and 8", "heapq.heappush(h, x)\nif len(h) > k:\n    heapq.heappop(h)", "sorted(h) == [6, 8]", {
      accepted: ["heapq.heappushpop(h, x)"],
    }),
    v("pushpop", IMPORTED + " `h` is a full min-heap. In ONE call, add `x` and then remove and return the smallest item.", HQ + "\nh = [4, 8]\nx = 6", "gives 4, and h ends up holding 6 and 8", "heapq.heappushpop(h, x)", "_ == 4 and sorted(h) == [6, 8]", {
      explain: "heappushpop pushes first, then pops; heapreplace pops first, then pushes.",
    }),
    v("replace", IMPORTED + " `h` is a min-heap. In ONE call, remove and return the smallest item and then add `x`.", HQ + "\nh = [4, 8]\nx = 1", "gives 4, and h ends up holding 1 and 8", "heapq.heapreplace(h, x)", "_ == 4 and sorted(h) == [1, 8]"),
    v("trim-loop", IMPORTED + " `h` is a min-heap and `k` is an int. Write only the `while` line of a loop that runs as long as `h` holds more than `k` items.", HQ + "\nh = [1, 2, 3, 7]\nk = 2", "h ends up holding 3 and 7", "while len(h) > k:", "sorted(h) == [3, 7]", {
      template: "{answer}\n    heapq.heappop(h)",
      explain: "Compare len(h), not the list itself.",
    }),
  ]),

  skill("heap-n-best", 2, { explain: "nlargest and nsmallest take the count first, then the iterable, and return a sorted list." }, [
    v("nlargest", IMPORTED + " `a` is a list of numbers and `k` is an int. Get the `k` largest items of `a`, largest first.", HQ + "\na = [1, 5, 3, 4]\nk = 2", "gives [5, 4]", "heapq.nlargest(k, a)", "_ == [5, 4]"),
    v("nsmallest", IMPORTED + " `a` is a list of numbers and `k` is an int. Get the `k` smallest items of `a`, smallest first.", HQ + "\na = [1, 5, 3, 4]\nk = 2", "gives [1, 3]", "heapq.nsmallest(k, a)", "_ == [1, 3]"),
    v("with-key", IMPORTED + " `words` is a list of strings and `k` is an int. Get the `k` longest words, longest first.", HQ + '\nwords = ["a", "ccc", "bb"]\nk = 2', 'gives ["ccc", "bb"]', "heapq.nlargest(k, words, key=len)", '_ == ["ccc", "bb"]'),
    v("top-k-frequent", IMPORTED + " `freq` is a dictionary of counts and `k` is an int. Get the `k` keys with the highest counts.", HQ + '\nfreq = {"a": 1, "b": 5, "c": 3}\nk = 2', 'gives ["b", "c"]', "heapq.nlargest(k, freq, key=freq.get)", '_ == ["b", "c"]', {
      accepted: ["heapq.nlargest(k, freq.keys(), key=freq.get)"],
      explain: "Iterating a dict gives its keys; key=freq.get ranks them by count.",
    }),
    v("closest-points", IMPORTED + " `points` is a list of [x, y] lists and `k` is an int. Get the `k` points closest to the origin. Call each point `p`.", HQ + "\npoints = [[3, 3], [1, 0], [0, 2]]\nk = 2", "gives [[1, 0], [0, 2]]", "heapq.nsmallest(k, points, key=lambda p: p[0] ** 2 + p[1] ** 2)", "_ == [[1, 0], [0, 2]]", {
      accepted: ["heapq.nsmallest(k, points, key=lambda p: p[0] * p[0] + p[1] * p[1])"],
    }),
  ]),

  skill("heap-objects", 3, { explain: "A heap compares its items with <. Plain objects cannot be compared, so give the class __lt__ or put a tiebreaker before the object in a tuple." }, [
    v("define-lt", "The `Task` class below needs to work in a heap. Inside it, write the method that makes one task count as smaller than another when its `priority` is lower (2 lines).", "", 'result ends up "urgent"', "def __lt__(self, other):\n    return self.priority < other.priority", 'result == "urgent"', {
      template:
        "import heapq\nclass Task:\n    def __init__(self, priority, name):\n        self.priority = priority\n        self.name = name\n    {answer}\n\nh = []\nheapq.heappush(h, Task(5, \"later\"))\nheapq.heappush(h, Task(1, \"urgent\"))\nresult = heapq.heappop(h).name",
    }),
    v("tiebreak-push", IMPORTED + " `h` is a heap and `task` is a `Task` object with no ordering defined. Push it so the heap orders by the task's `priority`, with the counter `i` as a tiebreaker so two tasks are never compared directly.", HQ + "\n" + TASK + '\nh = []\ntask = Task(2, "write")\ni = 0', "h holds one tuple: (2, 0, the task)", "heapq.heappush(h, (task.priority, i, task))", "len(h) == 1 and h[0][:2] == (2, 0) and h[0][2] is task", {
      explain: "With (priority, task) alone, equal priorities make Python compare the tasks and raise TypeError.",
    }),
    v("tiebreak-pop", IMPORTED + " `h` is a heap of (priority, counter, task) tuples. Pop the next entry and store only the `Task` object in `task`.", HQ + "\n" + TASK + '\nh = [(1, 0, Task(1, "urgent")), (5, 1, Task(5, "later"))]', 'task is the "urgent" Task', "task = heapq.heappop(h)[2]", 'task.name == "urgent" and len(h) == 1', {
      accepted: ["_, _, task = heapq.heappop(h)"],
    }),
    v("list-node-push", IMPORTED + " `h` is a heap used to merge sorted linked lists, and `node` is the head `ListNode` of list number `i`. Push it so the heap orders by the node's value, with `i` as the tiebreaker.", HQ + "\n" + LIST_NODE + "\nh = []\nnode = ListNode(4)\ni = 2", "h holds one tuple: (4, 2, the node)", "heapq.heappush(h, (node.val, i, node))", "len(h) == 1 and h[0][:2] == (4, 2) and h[0][2] is node"),
    v("list-node-pop", IMPORTED + " `h` is a heap of (value, list index, node) tuples. Pop the smallest entry straight into `val`, `i` and `node`.", HQ + "\n" + LIST_NODE + "\nh = [(1, 0, ListNode(1)), (4, 2, ListNode(4))]", "val is 1, i is 0, node is the ListNode holding 1", "val, i, node = heapq.heappop(h)", "(val, i) == (1, 0) and node.val == 1"),
  ]),

  skill("heap-dijkstra", 3, { explain: "Dijkstra keeps a heap of (distance, node) and skips entries that are out of date." }, [
    v("seed", "`start` is the starting node. Create `h`, a heap holding the single entry for `start` at distance 0.", 'start = "a"', 'h is [(0, "a")]', "h = [(0, start)]", 'h == [(0, "a")]', {
      explain: "A one-item list is already a valid heap, so no heapify is needed.",
    }),
    v("skip-stale", "Inside the loop below, `d` and `node` were just popped and `dist` maps each node to its best known distance. Skip this entry when a shorter distance to `node` is already known (2 lines).", 'dist = {"a": 0, "b": 3}', 'out ends up [(0, "a"), (3, "b")], without the stale (9, "b")', "if d > dist[node]:\n    continue", 'out == [(0, "a"), (3, "b")]', {
      template: 'out = []\nfor d, node in [(0, "a"), (9, "b"), (3, "b")]:\n    {answer}\n    out.append((d, node))',
    }),
  ]),

  skill("heap-merge", 3, { explain: "heapq.merge lazily merges inputs that are each already sorted." }, [
    v("two-sorted", IMPORTED + " `a` and `b` are sorted lists. Get one sorted list holding the items of both.", HQ + "\na = [1, 4, 9]\nb = [2, 3]", "gives [1, 2, 3, 4, 9]", "list(heapq.merge(a, b))", "_ == [1, 2, 3, 4, 9]", {
      accepted: ["sorted(a + b)"],
    }),
  ]),
]);
