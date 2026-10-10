import { skill, topic, v } from "../topic";

const DQ = "from collections import deque";

export const graphs = topic("python", "graphs", [
  skill("graph-build", 2, { explain: "An adjacency list maps each node to the list of nodes it connects to." }, [
    v("list-of-lists", "`n` is the number of nodes, numbered 0 to `n - 1`. Create `graph`, a list holding one separate empty list per node.", "n = 3", "graph is [[], [], []]", "graph = [[] for _ in range(n)]", "graph == [[], [], []] and graph[0] is not graph[1]", {
      explain: "[[]] * n would make every node share the same list.",
    }),
    v("dict-of-lists", "`n` is the number of nodes, numbered 0 to `n - 1`. Create `graph`, a dictionary mapping each node number to its own empty list. Call the node `i`.", "n = 3", "graph is {0: [], 1: [], 2: []}", "graph = {i: [] for i in range(n)}", "graph == {0: [], 1: [], 2: []} and graph[0] is not graph[1]"),
    v("undirected-edges", "`graph` is a list of empty lists, one per node, and `edges` is a list of [a, b] pairs. Fill in an UNDIRECTED graph: each end lists the other (3 lines). Use `u` and `v`.", "graph = [[], [], []]\nedges = [[0, 1], [1, 2]]", "graph becomes [[1], [0, 2], [1]]", "for u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)", "graph == [[1], [0, 2], [1]]"),
    v("prerequisites", "`graph` is a list of empty lists, one per course, and `prereqs` is a list of [course, prerequisite] pairs. Add an edge from each prerequisite TO the course that needs it (2 lines). Use `course` and `pre`.", "graph = [[], [], []]\nprereqs = [[1, 0], [2, 1]]", "graph becomes [[1], [2], []]", "for course, pre in prereqs:\n    graph[pre].append(course)", "graph == [[1], [2], []]", {
      explain: "The pair is [course, prerequisite], but the edge runs the other way: prerequisite to course.",
    }),
    v("weighted-edges", "`graph` is a list of empty lists, one per node, and `edges` is a list of [from, to, weight] triples. Fill in a DIRECTED weighted graph, storing (neighbour, weight) tuples (2 lines). Use `u`, `v` and `w`.", "graph = [[], [], []]\nedges = [[0, 1, 5], [1, 2, 7]]", "graph becomes [[(1, 5)], [(2, 7)], []]", "for u, v, w in edges:\n    graph[u].append((v, w))", "graph == [[(1, 5)], [(2, 7)], []]"),
  ]),

  skill("graph-indegree", 2, { explain: "Topological sort counts incoming edges and starts from the nodes that have none." }, [
    v("create", "`n` is the number of nodes. Create `indegree`, a list of `n` zeros that will count each node's incoming edges.", "n = 3", "indegree is [0, 0, 0]", "indegree = [0] * n", "indegree == [0, 0, 0]"),
    v("count", "`indegree` is a list of zeros and `edges` is a list of [from, to] pairs. Count the incoming edges of every node (2 lines). Use `u` and `v`.", "indegree = [0, 0, 0]\nedges = [[0, 1], [0, 2], [1, 2]]", "indegree becomes [0, 1, 2]", "for u, v in edges:\n    indegree[v] += 1", "indegree == [0, 1, 2]"),
    v("sources", "`deque` is already imported, `n` is the number of nodes and `indegree` counts their incoming edges. Create `q`, a deque of every node with no incoming edges. Call the node `i`.", DQ + "\nn = 3\nindegree = [0, 1, 0]", "q is deque([0, 2])", "q = deque(i for i in range(n) if indegree[i] == 0)", "list(q) == [0, 2]", {
      accepted: ["q = deque([i for i in range(n) if indegree[i] == 0])"],
    }),
    v("release", "`indegree` counts incoming edges, `q` is the queue of ready nodes, and `nxt` is a neighbour of the node just processed. Take one off its count, and queue it if that count has reached 0 (3 lines).", DQ + "\nindegree = [0, 1]\nq = deque()\nnxt = 1", "indegree becomes [0, 0], and q holds 1", "indegree[nxt] -= 1\nif indegree[nxt] == 0:\n    q.append(nxt)", "indegree == [0, 0] and list(q) == [1]"),
  ]),

  skill("graph-visit", 2, { explain: "Mark a node as visited when you add it to the queue or stack, not when you take it off." }, [
    v("seed-visited", "`start` is the starting node. Create `visited`, a set that already contains `start`.", "start = 0", "visited is {0}", "visited = {start}", "visited == {0} and type(visited) is set", {
      accepted: ["visited = set([start])"],
      explain: "set(start) would fail on an int or split a string; use a set literal.",
    }),
    v("visited-list", "`n` is the number of nodes. Create `visited`, a list of `n` False values, one per node.", "n = 3", "visited is [False, False, False]", "visited = [False] * n", "visited == [False, False, False]"),
    v("neighbor-loop", "`graph` maps each node to a list of neighbours and `node` is the current node. Write only the `for` line that visits each neighbour as `nxt`.", "graph = {0: [1, 2], 1: [], 2: []}\nnode = 0", "out ends up [1, 2]", "for nxt in graph[node]:", "out == [1, 2]", {
      template: "out = []\n{answer}\n    out.append(nxt)",
    }),
    v("skip-seen", "Inside the loop below, `visited` is a set of nodes already seen. Skip the neighbour `nxt` when it has been seen (2 lines).", "visited = {1}", "out ends up [2]", "if nxt in visited:\n    continue", "out == [2]", {
      template: "out = []\nfor nxt in [1, 2]:\n    {answer}\n    out.append(nxt)",
    }),
    v("mark-and-queue", "`visited` is a set, `q` is a deque, and `nxt` is an unseen neighbour. Mark it as visited and add it to the queue (2 lines).", DQ + "\nvisited = {0}\nq = deque()\nnxt = 3", "visited becomes {0, 3}, and q holds 3", "visited.add(nxt)\nq.append(nxt)", "visited == {0, 3} and list(q) == [3]"),
    v("dfs-unseen", "`graph` maps each node to its neighbours. Inside the recursive `dfs` below, `visited` is the set of nodes seen. For the neighbour `nxt`, recurse only when it has not been seen (2 lines).", "graph = {0: [1, 2], 1: [0], 2: []}", "visited ends up {0, 1, 2}", "if nxt not in visited:\n    dfs(nxt)", "visited == {0, 1, 2}", {
      template: "visited = set()\ndef dfs(node):\n    visited.add(node)\n    for nxt in graph[node]:\n        {answer}\n\ndfs(0)",
    }),
    v("count-components", "`n` is the number of nodes and `edges` maps each node to its neighbours. Below, `visited` is a set and `dfs` marks everything reachable from a node. Count the connected components into `count`: for each unvisited node `i`, add 1 and explore from it (3 lines, with the last two statements on one line).", "n = 4\nedges = {0: [1], 1: [0], 2: [], 3: []}", "count ends up 3", "for i in range(n):\n    if i not in visited:\n        count += 1; dfs(i)", "count == 3", {
      template: "visited = set()\ncount = 0\ndef dfs(node):\n    visited.add(node)\n    for nxt in edges[node]:\n        if nxt not in visited:\n            dfs(nxt)\n\n{answer}",
      accepted: ["for i in range(n):\n    if i not in visited:\n        dfs(i); count += 1"],
    }),
  ]),

  skill("graph-union-find", 3, { explain: "Union-find keeps a parent for every node; two nodes are connected when they share a root." }, [
    v("parents", "`n` is the number of nodes. Create `parent`, a list in which every node starts as its own parent.", "n = 4", "parent is [0, 1, 2, 3]", "parent = list(range(n))", "parent == [0, 1, 2, 3]", {
      accepted: ["parent = [i for i in range(n)]"],
    }),
    v("find", "`parent` is the union-find parent list. Write the body of `find` below: when `x` is not its own parent, point it straight at its root; then return that root (3 lines).", "parent = [0, 0, 1, 2]", "result ends up 0, and the chain is flattened so parent[3] is 0", "if parent[x] != x:\n    parent[x] = find(parent[x])\nreturn parent[x]", "result == 0 and parent[3] == 0", {
      template: "def find(x):\n    {answer}\n\nresult = find(3)",
      explain: "Assigning the recursive result back is path compression.",
    }),
    v("union", "`parent` is the union-find parent list and `find` returns a node's root. Join the groups of `a` and `b` in one line.", "parent = [0, 1, 2]\ndef find(x):\n    while parent[x] != x:\n        x = parent[x]\n    return x\na = 0\nb = 2", "parent becomes [2, 1, 2]", "parent[find(a)] = find(b)", "find(0) == find(2) and find(1) == 1"),
    v("connected", "`parent` is a union-find parent list and `find` returns a node's root. Write an expression that is True when `a` and `b` are in the same group.", "parent = [0, 0, 2]\ndef find(x):\n    while parent[x] != x:\n        x = parent[x]\n    return x\na = 0\nb = 1", "gives True", "find(a) == find(b)", "_ is True"),
    v("count-groups", "`parent` is a union-find parent list over `n` nodes and `find` returns a node's root. Count the number of separate groups. Call the node `i`.", "parent = [0, 0, 2, 2]\ndef find(x):\n    while parent[x] != x:\n        x = parent[x]\n    return x\nn = 4", "gives 2", "len({find(i) for i in range(n)})", "_ == 2", {
      accepted: ["len(set(find(i) for i in range(n)))"],
    }),
  ]),

  skill("graph-weighted", 3, { explain: "Shortest-path code keeps a best-known distance per node and improves it edge by edge." }, [
    v("dist-list", "`n` is the number of nodes and `start` is the source. Create `dist`, a list of `n` infinities, and then set the source's distance to 0 (2 lines).", "n = 3\nstart = 1", "dist is [inf, 0, inf]", 'dist = [float("inf")] * n\ndist[start] = 0', 'dist == [float("inf"), 0, float("inf")]'),
    v("dist-dict", "`start` is the source node. Create `dist`, a dictionary of best known distances holding just the source at distance 0.", 'start = "a"', 'dist is {"a": 0}', "dist = {start: 0}", 'dist == {"a": 0}'),
    v("weighted-neighbors", "`graph` maps each node to a list of (neighbour, weight) tuples and `node` is the current node. Write only the `for` line that unpacks each into `nxt` and `w`.", 'graph = {"a": [("b", 5), ("c", 2)]}\nnode = "a"', 'out ends up [("b", 5), ("c", 2)]', "for nxt, w in graph[node]:", 'out == [("b", 5), ("c", 2)]', {
      template: "out = []\n{answer}\n    out.append((nxt, w))",
    }),
    v("relax", "`heapq` is imported. `d` is the distance to the current node, `w` the weight of an edge to `nxt`, `dist` the best known distances and `h` the heap. When going through this edge is shorter, record the new distance and push it on the heap (3 lines).", 'import heapq\ndist = {"a": 0, "b": 9}\nh = []\nd = 0\nw = 4\nnxt = "b"', 'dist["b"] becomes 4, and h holds (4, "b")', "if d + w < dist[nxt]:\n    dist[nxt] = d + w\n    heapq.heappush(h, (dist[nxt], nxt))", 'dist["b"] == 4 and h == [(4, "b")]', {
      accepted: ["if d + w < dist[nxt]:\n    dist[nxt] = d + w\n    heapq.heappush(h, (d + w, nxt))"],
    }),
    v("unreachable", "`dist` is a list of shortest distances in which unreachable nodes are still infinity. Get the largest distance, or -1 when any node was never reached.", 'dist = [0, 4, float("inf")]', "gives -1", 'max(dist) if max(dist) < float("inf") else -1', "_ == -1", {
      accepted: ['-1 if max(dist) == float("inf") else max(dist)', '-1 if float("inf") in dist else max(dist)'],
    }),
  ]),
]);

export const intervals = topic("python", "intervals", [
  skill("interval-merge", 2, { explain: "After sorting by start, an interval overlaps the previous one exactly when it starts no later than that one ends." }, [
    v("overlaps-last", "`res` is the list of merged [start, end] intervals so far, and `start`, `end` is the next interval in sorted order. Write the `if` line whose block runs when it overlaps the last one in `res`.", "res = [[1, 5]]\nstart = 4\nend = 8", 'out ends up "yes"', "if res and start <= res[-1][1]:", 'out == "yes"', {
      template: 'out = "no"\n{answer}\n    out = "yes"',
      accepted: ["if res and res[-1][1] >= start:"],
      explain: "`res and` guards the first interval, when there is nothing to compare with.",
    }),
    v("extend-last", "`res` is the list of merged [start, end] intervals so far and `end` is the end of an overlapping interval. Stretch the last interval in `res` to the later of the two ends.", "res = [[1, 5]]\nend = 8", "res becomes [[1, 8]]", "res[-1][1] = max(res[-1][1], end)", "res == [[1, 8]]", {
      explain: "Use max: the overlapping interval might end before the existing one does.",
    }),
    v("add-new", "`res` is the list of merged intervals so far and `start`, `end` is an interval that does not overlap the last one. Add it as a new [start, end] list.", "res = [[1, 5]]\nstart = 7\nend = 9", "res becomes [[1, 5], [7, 9]]", "res.append([start, end])", "res == [[1, 5], [7, 9]]"),
    v("no-overlaps", "`intervals` is a list of [start, end] lists sorted by start. Write an expression that is True when no two of them overlap. Use `a` and `b` for neighbouring intervals.", "intervals = [[1, 3], [3, 6], [7, 9]]", "gives True", "all(a[1] <= b[0] for a, b in zip(intervals, intervals[1:]))", "_ is True"),
    v("length", "`start` and `end` are the two ends of an interval of whole numbers, both included. Get how many numbers it covers.", "start = 3\nend = 7", "gives 5", "end - start + 1", "_ == 5", {
      explain: "With both ends included, the count is end - start + 1.",
    }),
  ]),

  skill("trie", 3, { explain: "A trie is nested dictionaries, one level per character; a special key marks where a word ends." }, [
    v("create", "Create `trie`, an empty trie built from plain dictionaries.", "", "trie is {}", "trie = {}", "trie == {} and type(trie) is dict"),
    v("insert", '`trie` is a trie of nested dictionaries, `word` is a string, and `node` starts at the root. Walk down one level per character `c`, creating levels as needed, then mark the end of the word with the key "$" (3 lines).', 'trie = {}\nword = "ab"', 'trie becomes {"a": {"b": {"$": True}}}', 'for c in word:\n    node = node.setdefault(c, {})\nnode["$"] = True', 'trie == {"a": {"b": {"$": True}}}', {
      template: "node = trie\n{answer}",
    }),
    v("step-or-fail", "`trie` is a trie of nested dictionaries. You are inside the loop of `search` below, walking it. When the character `c` has no entry at the current `node`, return False (2 lines).", 'trie = {"a": {"b": {"$": True}}}', "result ends up False, because there is no path a, x", "if c not in node:\n    return False", "result is False", {
      template: 'def search(word):\n    node = trie\n    for c in word:\n        {answer}\n        node = node[c]\n    return "$" in node\n\nresult = search("ax")',
    }),
    v("is-word", 'You have walked a trie of nested dictionaries down to `node`. Write an expression that is True when a whole word ends there, marked by the key "$".', 'node = {"$": True, "s": {}}', "gives True", '"$" in node', "_ is True"),
    v("node-class", "Write a class named `TrieNode` whose constructor takes nothing and gives the object an empty dictionary named `children` (3 lines).", "", "TrieNode().children is {}", "class TrieNode:\n    def __init__(self):\n        self.children = {}", "TrieNode().children == {}"),
    v("child-step", "`node` is a `TrieNode` (`root` remembers where it started) whose `children` dictionary may not have an entry for the character `c` yet. Create a child for `c` if it is missing, then move `node` down to it (3 lines).", 'class TrieNode:\n    def __init__(self):\n        self.children = {}\nnode = TrieNode()\nroot = node\nc = "a"', 'root has a child under "a", and node has moved to it', "if c not in node.children:\n    node.children[c] = TrieNode()\nnode = node.children[c]", 'list(root.children) == ["a"] and node is root.children["a"]'),
  ]),
]);
