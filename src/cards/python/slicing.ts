import { skill, topic, type Seed } from "../topic";

/** The three sequence types every slicing skill is drilled on, each with six items. */
const SEQS = [
  {
    k: "list",
    name: "nums",
    kind: "a list",
    unit: "item",
    setup: "nums = [10, 20, 30, 40, 50, 60]",
    items: ["10", "20", "30", "40", "50", "60"],
    show: (xs: string[]) => `[${xs.join(", ")}]`,
  },
  {
    k: "str",
    name: "s",
    kind: "a string",
    unit: "character",
    setup: 's = "abcdef"',
    items: [..."abcdef"],
    show: (xs: string[]) => `"${xs.join("")}"`,
  },
  {
    k: "tuple",
    name: "t",
    kind: "a tuple",
    unit: "item",
    setup: "t = (1, 2, 3, 4, 5, 6)",
    items: ["1", "2", "3", "4", "5", "6"],
    show: (xs: string[]) => (xs.length === 1 ? `(${xs[0]},)` : `(${xs.join(", ")})`),
  },
];

interface SliceSkill {
  /** What to get; `{item}` becomes "item" or "character". */
  what: string;
  /** The answer for a sequence called `x`. */
  code: (x: string) => string;
  /** Indexes of the six example items that the answer selects, in order. */
  picks: number[];
  explain: string;
  /** Extra given lines, such as `k = 2`. */
  vars?: string;
}

/** One slicing skill as three cards: on a list, a string and a tuple. */
function seq(id: string, level: 1 | 2 | 3, { what, code, picks, explain, vars }: SliceSkill): Seed[] {
  return skill(
    id,
    level,
    { explain },
    SEQS.map((q) => {
      const result = q.show(picks.map((i) => q.items[i]!));
      return {
        k: q.k,
        prompt: `\`${q.name}\` is ${q.kind}. Get ${what.replaceAll("{item}", q.unit)}.`,
        setup: vars ? `${q.setup}\n${vars}` : q.setup,
        expect: `gives ${result}`,
        solution: code(q.name),
        check: `_ == ${result}`,
      };
    }),
  );
}

export const slicing = topic("python", "slicing", [
  seq("slice-first-3", 1, {
    what: "the first 3 {item}s",
    code: (x) => `${x}[:3]`,
    picks: [0, 1, 2],
    explain: "Leaving out the start means from the beginning; the stop index is not included.",
  }),
  seq("slice-first-k", 1, {
    what: "the first `k` {item}s",
    vars: "k = 2",
    code: (x) => `${x}[:k]`,
    picks: [0, 1],
    explain: "x[:k] is exactly k items, indexes 0 to k - 1.",
  }),
  seq("slice-last-3", 1, {
    what: "the last 3 {item}s",
    code: (x) => `${x}[-3:]`,
    picks: [3, 4, 5],
    explain: "A negative start counts from the end; leaving out the stop runs to the end.",
  }),
  seq("slice-last-k", 2, {
    what: "the last `k` {item}s",
    vars: "k = 2",
    code: (x) => `${x}[-k:]`,
    picks: [4, 5],
    explain: "x[-k:] keeps the last k; x[:-k] would drop them instead.",
  }),
  seq("slice-drop-first", 1, {
    what: "everything except the first {item}",
    code: (x) => `${x}[1:]`,
    picks: [1, 2, 3, 4, 5],
    explain: "Start at index 1 and leave the stop empty.",
  }),
  seq("slice-drop-last", 1, {
    what: "everything except the last {item}",
    code: (x) => `${x}[:-1]`,
    picks: [0, 1, 2, 3, 4],
    explain: "A stop of -1 means up to, but not including, the last one.",
  }),
  seq("slice-drop-last-k", 2, {
    what: "everything except the last `k` {item}s",
    vars: "k = 2",
    code: (x) => `${x}[:-k]`,
    picks: [0, 1, 2, 3],
    explain: "x[:-k] drops the last k; careful, when k is 0 it gives an empty result.",
  }),
  seq("slice-drop-both-ends", 2, {
    what: "everything except the first and the last {item}",
    code: (x) => `${x}[1:-1]`,
    picks: [1, 2, 3, 4],
    explain: "Start at 1 and stop before -1.",
  }),
  seq("slice-from-i", 1, {
    what: "everything from index `i` to the end",
    vars: "i = 2",
    code: (x) => `${x}[i:]`,
    picks: [2, 3, 4, 5],
    explain: "The start index is included.",
  }),
  seq("slice-before-i", 1, {
    what: "everything before index `i`, not including it",
    vars: "i = 4",
    code: (x) => `${x}[:i]`,
    picks: [0, 1, 2, 3],
    explain: "The stop index is excluded, so x[:i] and x[i:] split cleanly with no overlap.",
  }),
  seq("slice-i-to-j", 1, {
    what: "the {item}s from index `i` up to but not including index `j`",
    vars: "i = 1\nj = 4",
    code: (x) => `${x}[i:j]`,
    picks: [1, 2, 3],
    explain: "x[i:j] has j - i items.",
  }),
  seq("slice-i-through-j", 2, {
    what: "the {item}s from index `i` through index `j`, including the one at `j`",
    vars: "i = 1\nj = 4",
    code: (x) => `${x}[i:j + 1]`,
    picks: [1, 2, 3, 4],
    explain: "The stop is exclusive, so including index j needs j + 1.",
  }),
  seq("slice-window", 2, {
    what: "a window of `k` {item}s starting at index `i`",
    vars: "i = 1\nk = 3",
    code: (x) => `${x}[i:i + k]`,
    picks: [1, 2, 3],
    explain: "A window of size k starting at i is x[i:i + k].",
  }),
  seq("slice-every-other", 2, {
    what: "every other {item}, starting with the first",
    code: (x) => `${x}[::2]`,
    picks: [0, 2, 4],
    explain: "The third part is the step; both colons are needed even with start and stop empty.",
  }),
  seq("slice-odd-indexes", 2, {
    what: "the {item}s at the odd indexes 1, 3, 5",
    code: (x) => `${x}[1::2]`,
    picks: [1, 3, 5],
    explain: "Start at 1, empty stop, step 2.",
  }),
  seq("slice-every-k", 2, {
    what: "every `k`-th {item}, starting with the first",
    vars: "k = 3",
    code: (x) => `${x}[::k]`,
    picks: [0, 3],
    explain: "x[::k] takes indexes 0, k, 2k and so on.",
  }),
  seq("slice-reverse", 1, {
    what: "all of it in reverse order",
    code: (x) => `${x}[::-1]`,
    picks: [5, 4, 3, 2, 1, 0],
    explain: "A step of -1 walks backwards; reversed(x) gives an iterator, not the same type back.",
  }),
  seq("slice-reverse-every-other", 3, {
    what: "every other {item} going backwards, starting with the last",
    code: (x) => `${x}[::-2]`,
    picks: [5, 3, 1],
    explain: "A negative step starts from the end when start is left empty.",
  }),
  seq("slice-i-down-to-0", 3, {
    what: "the {item}s from index `i` back down to index 0, in that reversed order",
    vars: "i = 2",
    code: (x) => `${x}[i::-1]`,
    picks: [2, 1, 0],
    explain: "With a negative step, leave the stop empty to reach index 0; a stop of -1 would mean the last item.",
  }),
  seq("slice-first-half", 2, {
    what: "the first half",
    code: (x) => `${x}[:len(${x}) // 2]`,
    picks: [0, 1, 2],
    explain: "Use // so the index is an int; / gives a float and slicing raises TypeError.",
  }),
  seq("slice-second-half", 2, {
    what: "the second half",
    code: (x) => `${x}[len(${x}) // 2:]`,
    picks: [3, 4, 5],
    explain: "The same midpoint as the first half, used as the start.",
  }),
  seq("slice-past-end", 2, {
    what: "the first 100 {item}s, even though there are only 6",
    code: (x) => `${x}[:100]`,
    picks: [0, 1, 2, 3, 4, 5],
    explain: "Slices never raise IndexError; out-of-range bounds are clamped.",
  }),
  seq("slice-last-as-container", 2, {
    what: "the last {item} as a one-{item} slice, not as a bare value",
    code: (x) => `${x}[-1:]`,
    picks: [5],
    explain: "x[-1] is the item itself; x[-1:] is a container holding it.",
  }),
  seq("slice-rotate-left", 3, {
    what: "it rotated left by `k`: everything from index `k` onward, followed by the first `k` {item}s",
    vars: "k = 2",
    code: (x) => `${x}[k:] + ${x}[:k]`,
    picks: [2, 3, 4, 5, 0, 1],
    explain: "Two slices that split at k, joined in the opposite order.",
  }),
  seq("slice-rotate-right", 3, {
    what: "it rotated right by `k`: the last `k` {item}s, followed by everything before them",
    vars: "k = 2",
    code: (x) => `${x}[-k:] + ${x}[:-k]`,
    picks: [4, 5, 0, 1, 2, 3],
    explain: "The last k come first, then the rest.",
  }),

  skill("slice-assign", 2, { explain: "Assigning to a slice replaces that stretch in place; it only works on lists." }, [
    {
      k: "replace",
      prompt: "`nums` is a list and `new` is another list. Replace the items at indexes 1 and 2 of `nums` with the items of `new`, in place.",
      setup: "nums = [10, 20, 30, 40]\nnew = [7, 8, 9]",
      expect: "nums becomes [10, 7, 8, 9, 40]",
      solution: "nums[1:3] = new",
      check: "nums == [10, 7, 8, 9, 40]",
      explain: "The replacement does not have to be the same length as the slice.",
    },
    {
      k: "insert",
      prompt: "`nums` is a list and `new` is another list. Insert all the items of `new` at index `i` of `nums`, in place, removing nothing.",
      setup: "nums = [10, 20, 30]\nnew = [7, 8]\ni = 1",
      expect: "nums becomes [10, 7, 8, 20, 30]",
      solution: "nums[i:i] = new",
      check: "nums == [10, 7, 8, 20, 30]",
      explain: "An empty slice x[i:i] is a position between items.",
    },
    {
      k: "reverse-in-place",
      prompt:
        "`nums` is a list and `alias` is a second name for the same list. Reverse the contents using slices so that `alias` sees the change too.",
      setup: "nums = [1, 2, 3]\nalias = nums",
      expect: "nums and alias both show [3, 2, 1]",
      solution: "nums[:] = nums[::-1]",
      accepted: ["nums.reverse()"],
      check: "alias == [3, 2, 1] and alias is nums",
      explain: "nums = nums[::-1] rebinds the name to a new list; nums[:] = ... changes the existing one.",
    },
  ]),

  skill("slice-delete", 2, { explain: "del with a slice removes that stretch from the list in place." }, [
    {
      k: "first-two",
      prompt: "`nums` is a list. Remove its first two items in place.",
      setup: "nums = [10, 20, 30, 40]",
      expect: "nums becomes [30, 40]",
      solution: "del nums[:2]",
      accepted: ["nums[:2] = []"],
      check: "nums == [30, 40]",
    },
    {
      k: "from-i",
      prompt: "`nums` is a list. Remove everything from index `i` to the end, in place.",
      setup: "nums = [10, 20, 30, 40]\ni = 1",
      expect: "nums becomes [10]",
      solution: "del nums[i:]",
      accepted: ["nums[i:] = []"],
      check: "nums == [10]",
    },
  ]),

  skill("slice-immutable", 2, { explain: "Strings and tuples cannot be changed in place; build a new one from slices." }, [
    {
      k: "str-replace-first",
      prompt: "`s` is a string and `c` is a character. Strings cannot be changed in place, so build a new string that is `s` with its first character replaced by `c`.",
      setup: 's = "cat"\nc = "b"',
      expect: 'gives "bat"',
      solution: "c + s[1:]",
      check: '_ == "bat"',
      explain: 's[0] = c raises TypeError; join c with the rest of the string.',
    },
    {
      k: "str-remove-at-i",
      prompt: "`s` is a string and `i` is an index. Build a new string that is `s` without the character at index `i`.",
      setup: 's = "abcd"\ni = 1',
      expect: 'gives "acd"',
      solution: "s[:i] + s[i + 1:]",
      check: '_ == "acd"',
      explain: "Everything before i, plus everything after i.",
    },
    {
      k: "str-replace-at-i",
      prompt: "`s` is a string, `i` is an index and `c` is a character. Build a new string that is `s` with the character at index `i` replaced by `c`.",
      setup: 's = "abcd"\ni = 2\nc = "x"',
      expect: 'gives "abxd"',
      solution: "s[:i] + c + s[i + 1:]",
      check: '_ == "abxd"',
      explain: "Before i, the new character, then after i.",
    },
    {
      k: "tuple-append",
      prompt: "`t` is a tuple and `x` is a value. Tuples have no append, so build a new tuple that is `t` with `x` added at the end.",
      setup: "t = (1, 2)\nx = 3",
      expect: "gives (1, 2, 3)",
      solution: "t + (x,)",
      check: "_ == (1, 2, 3)",
      explain: "Concatenate with a one-item tuple; (x) without the comma is just x.",
    },
  ]),
]);
