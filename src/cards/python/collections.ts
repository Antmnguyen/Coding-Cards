import { topic } from "../topic";

export const deques = topic("python", "deque", [
  {
    id: "deque-import",
    expect: "deque is available to use",
    prompt: "Write the import line for `deque`, the double-ended queue.",
    solution: "from collections import deque",
    explain: "Lowercase deque, from collections.",
    check: 'deque.__module__ == "collections"',
  },
  {
    id: "deque-new",
    expect: "q is deque([1])",
    prompt: "`root` is a single value (for example a tree node). Create a deque named `q` that starts with just `root` in it.",
    setup: "root = 1",
    solution: "from collections import deque\nq = deque([root])",
    explain: "deque takes an iterable: deque(root) would try to iterate root.",
    check: "isinstance(q, deque) and list(q) == [1]",
  },
  {
    id: "deque-popleft",
    expect: "gives 1, and q becomes deque([2])",
    prompt: "`q` is a deque. Remove the item at the FRONT and get that item back.",
    setup: "from collections import deque\nq = deque([1, 2])",
    solution: "q.popleft()",
    explain: "popleft() is O(1); list.pop(0) is O(n).",
    check: "_ == 1 and list(q) == [2]",
  },
  {
    id: "deque-append",
    expect: "q becomes deque([1, 2])",
    prompt: "`q` is a deque. Add `x` to the BACK of it.",
    setup: "from collections import deque\nq = deque([1])\nx = 2",
    solution: "q.append(x)",
    explain: "Same name as on a list: append.",
    check: "list(q) == [1, 2]",
  },
  {
    id: "deque-appendleft",
    expect: "q becomes deque([0, 1])",
    prompt: "`q` is a deque. Add `x` to the FRONT of it.",
    setup: "from collections import deque\nq = deque([1])\nx = 0",
    solution: "q.appendleft(x)",
    explain: "One word, all lowercase: appendleft.",
    check: "list(q) == [0, 1]",
  },
]);
