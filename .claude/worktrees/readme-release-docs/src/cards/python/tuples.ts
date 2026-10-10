import { topic } from "../topic";

export const tuples = topic("python", "tuples", [
  {
    id: "tuple-unpack",
    expect: "dist is 5, x is 1, y is 2",
    prompt: "`item` is a tuple of 3 values. Break it into three separate variables `dist`, `x` and `y`.",
    setup: "item = (5, 1, 2)",
    solution: "dist, x, y = item",
    explain: "The number of names must equal the tuple length.",
    check: "(dist, x, y) == (5, 1, 2)",
  },
  {
    id: "tuple-loop-unpack",
    expect: "the first pass has dist=5 x=1 y=2",
    prompt:
      "`heap` is a list of 3-value tuples. Write only the `for` line of a loop that unpacks each tuple straight into `dist`, `x` and `y`.",
    setup: "heap = [(5, 1, 2), (7, 0, 3)]",
    solution: "for dist, x, y in heap:",
    explain: "Unpack directly in the loop; no temporary `item` is needed.",
  },
  {
    id: "tuple-return-two",
    expect: "the caller receives (1, 9)",
    prompt: "You are inside a function that has two numbers, `lo` and `hi`. Return both of them at once.",
    setup: "lo = 1\nhi = 9",
    solution: "return lo, hi",
    accepted: ["return (lo, hi)"],
    explain: "A comma makes a tuple; the caller unpacks with a, b = f().",
  },
  {
    id: "tuple-swap",
    expect: "a is 2, b is 1",
    prompt: "`a` and `b` are two variables. Swap their values in one line, without a temp variable.",
    setup: "a = 1\nb = 2",
    solution: "a, b = b, a",
    explain: "The right side is evaluated first, so no temp variable is needed.",
    check: "(a, b) == (2, 1)",
  },
  {
    id: "tuple-single",
    expect: "gives (1,)",
    prompt: "Make a tuple that contains just the one value `x`.",
    setup: "x = 1",
    solution: "(x,)",
    accepted: ["x,"],
    explain: "(x) is just x; the trailing comma makes the tuple.",
    check: "type(_) is tuple and _ == (1,)",
  },
  {
    id: "tuple-neighbor",
    expect: "gives (2, 2)",
    prompt:
      "`i` and `j` are the row and column of a grid cell. Write the cell one row below it, as a value that can be stored in a set.",
    setup: "i = 1\nj = 2",
    solution: "(i + 1, j)",
    explain: "Use a tuple, not [i + 1, j]: lists cannot go in a set.",
    check: "type(_) is tuple and _ == (2, 2)",
  },
]);
