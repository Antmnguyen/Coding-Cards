import { topic } from "../topic";

export const deques = topic("python", "deque", [
  {
    id: "deque-import",
    prompt: "Import deque",
    solution: "from collections import deque",
    explain: "Lowercase deque, from collections.",
    check: 'deque.__module__ == "collections"',
  },
  {
    id: "deque-new",
    prompt: "Create deque `q` starting with `root` in it",
    solution: "q = deque([root])",
    explain: "deque takes an iterable: deque(root) would try to iterate root.",
    setup: "from collections import deque; root = 1",
    check: "isinstance(q, deque) and list(q) == [1]",
  },
  {
    id: "deque-popleft",
    prompt: "Remove and return the front of deque `q`",
    solution: "q.popleft()",
    explain: "popleft() is O(1); list.pop(0) is O(n).",
    setup: "from collections import deque; q = deque([1, 2])",
    check: "_ == 1 and list(q) == [2]",
  },
  {
    id: "deque-append",
    prompt: "Add `x` to the back of deque `q`",
    solution: "q.append(x)",
    explain: "Same name as on a list: append.",
    setup: "from collections import deque; q = deque([1]); x = 2",
    check: "list(q) == [1, 2]",
  },
  {
    id: "deque-appendleft",
    prompt: "Add `x` to the front of deque `q`",
    solution: "q.appendleft(x)",
    explain: "One word, all lowercase: appendleft.",
    setup: "from collections import deque; q = deque([1]); x = 0",
    check: "list(q) == [0, 1]",
  },
  {
    id: "deque-while",
    prompt: "Loop while deque `q` is not empty (header line only)",
    solution: "while q:",
    accepted: ["while len(q) > 0:"],
    explain: "Empty containers are falsy.",
  },
]);

export const counters = topic("python", "counter", [
  {
    id: "counter-import",
    prompt: "Import Counter",
    solution: "from collections import Counter",
    explain: "Capital C, from collections.",
    check: 'Counter.__module__ == "collections"',
  },
  {
    id: "counter-new",
    prompt: "Count the frequencies of `nums` into `freq`",
    solution: "freq = Counter(nums)",
    explain: "Counter takes any iterable, including a string.",
    setup: "from collections import Counter; nums = [1, 1, 2]",
    check: "isinstance(freq, Counter) and freq == {1: 2, 2: 1}",
  },
  {
    id: "counter-missing",
    prompt: "Count of `x` in Counter `freq`",
    solution: "freq[x]",
    explain: "A missing key gives 0, not a KeyError.",
    setup: "from collections import Counter; freq = Counter([1, 1]); x = 9",
    check: "_ == 0",
  },
  {
    id: "counter-most-common",
    prompt: "The `k` most common (item, count) pairs of Counter `freq`",
    solution: "freq.most_common(k)",
    explain: "Returns a list of (item, count) tuples, most frequent first.",
    setup: "from collections import Counter; freq = Counter([1, 1, 2]); k = 1",
    check: "_ == [(1, 2)]",
  },
  {
    id: "counter-anagram",
    prompt: "Are strings `s` and `t` anagrams? (using Counter)",
    solution: "Counter(s) == Counter(t)",
    explain: "Counters compare equal when every count matches.",
    setup: 'from collections import Counter; s = "abc"; t = "cab"',
    check: "_ is True",
  },
]);
