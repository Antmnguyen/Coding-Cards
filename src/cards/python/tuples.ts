import { topic } from "../topic";

export const tuples = topic("python", "tuples", [
  {
    id: "tuple-unpack",
    prompt: "Unpack tuple `item` into `dist`, `x`, `y`",
    solution: "dist, x, y = item",
    explain: "The number of names must equal the tuple length.",
    setup: "item = (5, 1, 2)",
    check: "(dist, x, y) == (5, 1, 2)",
  },
  {
    id: "tuple-loop-unpack",
    prompt: "Loop over `heap`, unpacking each item into `dist`, `x`, `y` (header line only)",
    solution: "for dist, x, y in heap:",
    explain: "Unpack directly in the loop; no temporary `item` is needed.",
  },
  {
    id: "tuple-return-two",
    prompt: "Return `lo` and `hi` from a function",
    solution: "return lo, hi",
    accepted: ["return (lo, hi)"],
    explain: "A comma makes a tuple; the caller unpacks with a, b = f().",
  },
  {
    id: "tuple-swap",
    prompt: "Swap `a` and `b`",
    solution: "a, b = b, a",
    explain: "The right side is evaluated first, so no temp variable is needed.",
    setup: "a = 1; b = 2",
    check: "(a, b) == (2, 1)",
  },
  {
    id: "tuple-single",
    prompt: "A tuple containing only `x`",
    solution: "(x,)",
    accepted: ["x,"],
    explain: "(x) is just x; the trailing comma makes the tuple.",
    setup: "x = 1",
    check: "type(_) is tuple and _ == (1,)",
  },
  {
    id: "tuple-neighbor",
    prompt: "The cell below (`i`, `j`), as a hashable",
    solution: "(i + 1, j)",
    explain: "Use a tuple, not [i + 1, j]: lists cannot go in a set.",
    setup: "i = 1; j = 2",
    check: "type(_) is tuple and _ == (2, 2)",
  },
]);
