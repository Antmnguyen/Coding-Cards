import { skill, topic, v } from "../topic";

export const maths = topic("python", "math", [
  skill("division", 1, { explain: "/ always gives a float; // floors to a whole number; % is the remainder." }, [
    v("floor-div", "`n` is an int. Divide it by 2 and get a whole number back, rounding down (9 gives 4).", "n = 9", "gives 4", "n // 2", "_ == 4 and type(_) is int"),
    v("remainder", "`n` is a positive int. Get its last digit.", "n = 127", "gives 7", "n % 10", "_ == 7", {
      explain: "% 10 is the last digit; // 10 drops it.",
    }),
    v("divmod", "`a` and `b` are ints. In a single function call, get both the whole-number quotient and the remainder of `a` divided by `b`.", "a = 7\nb = 2", "gives (3, 1)", "divmod(a, b)", "_ == (3, 1)", {
      explain: "divmod returns the tuple (a // b, a % b).",
    }),
    v("divmod-unpack", "`total` is a number of seconds. In one line, split it into whole minutes `m` and leftover seconds `s`.", "total = 135", "m is 2, s is 15", "m, s = divmod(total, 60)", "(m, s) == (2, 15)"),
    v("half-float", "`a` and `b` are ints. Get their average, keeping any fraction.", "a = 3\nb = 4", "gives 3.5", "(a + b) / 2", "_ == 3.5"),
  ]),

  skill("division-negative", 3, { explain: "// rounds DOWN (towards negative infinity), so -7 // 2 is -4, and % takes the sign of the divisor." }, [
    v("truncate", "`a` is a negative int and `b` is a positive int. Divide them and round TOWARDS ZERO, the way C and Java do.", "a = -7\nb = 2", "gives -3", "int(a / b)", "_ == -3", {
      explain: "-7 // 2 is -4 in Python; int(a / b) truncates to -3.",
    }),
    v("wrap-back", "`i` is an index into a circular list of length `n`. Get the index one step BEFORE `i`, wrapping from 0 round to the end.", "i = 0\nn = 5", "gives 4", "(i - 1) % n", "_ == 4", {
      explain: "Python's % never returns a negative for a positive divisor, so -1 % 5 is 4.",
    }),
    v("wrap-forward", "`i` is an index into a circular list of length `n`. Get the index one step AFTER `i`, wrapping from the end back to 0.", "i = 4\nn = 5", "gives 0", "(i + 1) % n", "_ == 0"),
    v("ceil-div", "`a` and `b` are positive ints. Divide `a` by `b` rounding UP, using only integer arithmetic.", "a = 7\nb = 2", "gives 4", "(a + b - 1) // b", "_ == 4 and type(_) is int", {
      accepted: ["-(-a // b)", "import math\nmath.ceil(a / b)"],
      explain: "Adding b - 1 before floor division pushes any remainder up to the next whole number.",
    }),
  ]),

  skill("power", 1, { explain: "** is the power operator; ^ is XOR." }, [
    v("square", "`x` is a number. Get `x` squared.", "x = 3", "gives 9", "x ** 2", "_ == 9", {
      accepted: ["x * x"],
    }),
    v("general", "`base` and `exp` are ints. Get `base` raised to the power `exp`.", "base = 2\nexp = 10", "gives 1024", "base ** exp", "_ == 1024", {
      accepted: ["pow(base, exp)"],
    }),
    v("square-root", "`x` is a number. Get its square root using the power operator, with no import.", "x = 16", "gives 4.0", "x ** 0.5", "_ == 4.0", {
      explain: "A power of 0.5 is the square root; the result is a float.",
    }),
    v("mod-const", "Create the constant `MOD` holding ten to the ninth plus seven, the modulus LeetCode asks answers to be reduced by.", "", "MOD is 1000000007", "MOD = 10 ** 9 + 7", "MOD == 1000000007 and type(MOD) is int", {
      accepted: ["MOD = 1_000_000_007", "MOD = 1000000007"],
      explain: "Use 10 ** 9, an int; 1e9 is a float.",
    }),
    v("mod-pow", "`base`, `exp` and `mod` are ints. Get `base` to the power `exp`, reduced modulo `mod`, without building the huge intermediate number.", "base = 2\nexp = 10\nmod = 1000", "gives 24", "pow(base, exp, mod)", "_ == 24", {
      explain: "The three-argument form of pow does fast modular exponentiation.",
    }),
  ]),

  skill("abs-round", 1, { explain: "abs and round are built-ins; no import needed." }, [
    v("distance", "`a` and `b` are numbers. Get how far apart they are, as a non-negative number.", "a = 3\nb = 10", "gives 7", "abs(a - b)", "_ == 7"),
    v("manhattan", "`x1`, `y1` and `x2`, `y2` are the coordinates of two grid cells. Get the Manhattan distance between them.", "x1 = 1\ny1 = 2\nx2 = 4\ny2 = 0", "gives 5", "abs(x1 - x2) + abs(y1 - y2)", "_ == 5"),
    v("round-places", "`x` is a float. Round it to 2 decimal places, keeping it a number.", "x = 3.14159", "gives 3.14", "round(x, 2)", "_ == 3.14", {
      explain: "The second argument of round is the number of decimal places.",
    }),
  ]),

  skill("min-max", 1, { explain: "min and max are built-ins that take either several values or one iterable." }, [
    v("larger", "`a` and `b` are numbers. Get whichever one is larger.", "a = 1\nb = 2", "gives 2", "max(a, b)", "_ == 2", {
      explain: "A builtin, not Math.max.",
    }),
    v("smaller", "`a` and `b` are numbers. Get whichever one is smaller.", "a = 1\nb = 2", "gives 1", "min(a, b)", "_ == 1"),
    v("clamp", "`x`, `lo` and `hi` are numbers. Limit `x` to the range from `lo` to `hi`.", "x = 15\nlo = 0\nhi = 10", "gives 10", "max(lo, min(x, hi))", "_ == 10", {
      accepted: ["min(hi, max(x, lo))", "min(max(x, lo), hi)", "max(min(x, hi), lo)"],
    }),
    v("overlap", "Two intervals run from `a1` to `a2` and from `b1` to `b2`. Get the length of their overlap, or 0 when they do not overlap.", "a1 = 1\na2 = 5\nb1 = 3\nb2 = 9", "gives 2", "max(0, min(a2, b2) - max(a1, b1))", "_ == 2", {
      explain: "The overlap starts at the later start and ends at the earlier end.",
    }),
  ]),

  skill("infinity", 1, { explain: 'float("inf") is larger than every number and float("-inf") is smaller than every number.' }, [
    v("positive", "Write the value for positive infinity, for example as the starting value when searching for a minimum.", "", "gives inf", 'float("inf")', '_ == float("inf")', {
      accepted: ["import math\nmath.inf"],
    }),
    v("negative", "Write the value for negative infinity, for example as the starting value when searching for a maximum.", "", "gives -inf", 'float("-inf")', '_ == float("-inf")', {
      accepted: ['-float("inf")', "import math\n-math.inf"],
    }),
    v("unreached", "`best` holds the result of a minimum search that started at infinity. In one expression, get `best`, or -1 when it is still infinity because nothing was found.", 'best = float("inf")', "gives -1", 'best if best != float("inf") else -1', "_ == -1", {
      accepted: ['-1 if best == float("inf") else best'],
    }),
  ]),

  skill("math-module", 2, { explain: "These live in the math module, so they need import math and the math. prefix." }, [
    v("sqrt", "`n` is a number. Using the math module, get its square root. Include the import.", "n = 16", "gives 4.0", "import math\nmath.sqrt(n)", "_ == 4.0"),
    v("isqrt", "`n` is a positive int. Using the math module, get the whole-number part of its square root, as an int. Include the import.", "n = 17", "gives 4", "import math\nmath.isqrt(n)", "_ == 4 and type(_) is int", {
      accepted: ["int(n ** 0.5)"],
      explain: "isqrt is exact for huge ints, where int(n ** 0.5) can be off by one.",
    }),
    v("ceil", "`x` is a float. Using the math module, round it UP to a whole number. Include the import.", "x = 2.1", "gives 3", "import math\nmath.ceil(x)", "_ == 3"),
    v("floor", "`x` is a float. Using the math module, round it DOWN to a whole number. Include the import.", "x = 2.9", "gives 2", "import math\nmath.floor(x)", "_ == 2", {
      accepted: ["int(x)"],
    }),
    v("gcd", "`a` and `b` are positive ints. Using the math module, get their greatest common divisor. Include the import.", "a = 12\nb = 18", "gives 6", "import math\nmath.gcd(a, b)", "_ == 6"),
    v("lcm", "`a` and `b` are positive ints. Using the math module, get their least common multiple. Include the import.", "a = 4\nb = 6", "gives 12", "import math\nmath.lcm(a, b)", "_ == 12", {
      accepted: ["import math\na * b // math.gcd(a, b)"],
    }),
    v("factorial", "`n` is a small non-negative int. Using the math module, get `n` factorial. Include the import.", "n = 5", "gives 120", "import math\nmath.factorial(n)", "_ == 120"),
    v("comb", "`n` and `k` are ints. Using the math module, get the number of ways to choose `k` items from `n`. Include the import.", "n = 5\nk = 2", "gives 10", "import math\nmath.comb(n, k)", "_ == 10"),
    v("log2", "`n` is a power of two. Using the math module, get the exponent, as a float. Include the import.", "n = 8", "gives 3.0", "import math\nmath.log2(n)", "_ == 3.0"),
  ]),

  skill("digits", 2, { explain: "Digits are peeled off the right with % 10 and // 10, and built up with * 10 + digit." }, [
    v("append-digit", "`num` is an int being built up and `d` is the next digit. Add `d` on the right-hand end of `num`.", "num = 12\nd = 3", "num becomes 123", "num = num * 10 + d", "num == 123"),
    v("reverse-int", "`n` is a positive int. Get the int with its digits reversed, going through a string.", "n = 123", "gives 321", "int(str(n)[::-1])", "_ == 321"),
    v("is-palindrome", "`n` is a positive int. Write an expression that is True when it reads the same backwards.", "n = 1221", "gives True", "str(n) == str(n)[::-1]", "_ is True"),
    v("first-digit", "`n` is a positive int. Get its first (leftmost) digit as an int.", "n = 5273", "gives 5", "int(str(n)[0])", "_ == 5"),
  ]),

  skill("midpoint", 1, { explain: "Use // so the midpoint stays an int you can index with." }, [
    v("simple", "`lo` and `hi` are two list indexes (binary search). Get the index halfway between them, as an int.", "lo = 2\nhi = 7", "gives 4", "(lo + hi) // 2", "_ == 4 and type(_) is int", {
      accepted: ["lo + (hi - lo) // 2"],
    }),
    v("store", "`l` and `r` are the bounds of a binary search. Create `mid`, the index halfway between them.", "l = 0\nr = 9", "mid is 4", "mid = (l + r) // 2", "mid == 4 and type(mid) is int", {
      accepted: ["mid = l + (r - l) // 2"],
    }),
  ]),

  skill("sum-formula", 2, { explain: "The sum of 1 to n is n * (n + 1) // 2." }, [
    v("gauss", "`n` is a positive int. Using the closed formula, get the sum of the ints from 1 through `n`.", "n = 100", "gives 5050", "n * (n + 1) // 2", "_ == 5050 and type(_) is int", {
      explain: "// keeps it an int; / would give 5050.0.",
    }),
    v("range-sum", "`n` is a positive int. Using `sum` and `range`, get the sum of the ints from 1 through `n`.", "n = 4", "gives 10", "sum(range(1, n + 1))", "_ == 10"),
    v("missing-number", "`nums` holds every int from 0 to `n` except one. Get the missing one by subtracting the list's total from the full total.", "nums = [0, 1, 3]\nn = 3", "gives 2", "n * (n + 1) // 2 - sum(nums)", "_ == 2"),
  ]),

  skill("int-range", 3, { explain: "Python ints never overflow, so 32-bit limits have to be applied by hand." }, [
    v("clamp-32-bit", "`x` is an int that may be outside the signed 32-bit range. Limit it to that range, from minus two to the 31st up to two to the 31st minus one.", "x = 2 ** 40", "gives 2147483647", "max(-2 ** 31, min(x, 2 ** 31 - 1))", "_ == 2147483647", {
      accepted: ["min(max(x, -2 ** 31), 2 ** 31 - 1)"],
      explain: "** binds tighter than unary minus, so -2 ** 31 is -(2 ** 31).",
    }),
  ]),
]);
