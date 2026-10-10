/**
 * Cards that drill a classic syntax blunder. They keep their own topic and
 * also get the "traps" tag, so "drill only the traps" is one chip on Home.
 */
export const TRAP_IDS = new Set([
  // {} vs set(), and other constructors that iterate their argument
  "set-create--empty",
  "set-create--start-cell",
  "tuple-create--single",
  "deque-create--one-item",
  "deque-create--start-cell",
  "graph-visit--seed-visited",
  "dd-create-custom--lambda",
  // in place vs new value, and methods that return None
  "list-reorder--sorted-copy",
  "heap-setup--heapify",
  "call-store-result--returns-none",
  "str-replace--reassign",
  "slice-assign--reverse-in-place",
  "list-remove--clear",
  "random--shuffle",
  // shared references and copies
  "list-grid-build--zeros",
  "list-grid-build--visited",
  "graph-build--list-of-lists",
  "dp-table--two-d",
  "list-copy--alias",
  "list-copy--copy-rows",
  "list-append--copy-of-path",
  "bt-stop--record-copy",
  "class-init--two-structures",
  "mutable-default--none-guard",
  "def-default--none",
  "tuple-objects--list-inside",
  // one item vs many
  "list-extend--append-nests",
  "list-extend--extend",
  "call-unpack--varargs-from-list",
  "heap-push--dist-node",
  "list-append--tuple",
  // the right end of the right structure
  "list-pop--first",
  "deque-ends--popleft",
  "list-insert--front",
  "stack-basic--peek",
  // remove vs discard, find vs index, and other raise-or-not pairs
  "set-remove--discard",
  "set-remove--remove",
  "str-find--find-missing",
  "list-find--index-or-minus-1",
  "list-aggregate--max-default",
  "dict-read--get",
  "dict-write--increment-missing",
  "dict-remove--pop-default",
  "dd-trap--check-without-creating",
  "dict-iterate-trap--snapshot-keys",
  // operators that are not what other languages make them
  "power--square",
  "power--mod-const",
  "bit-operators--xor",
  "division--floor-div",
  "division-negative--truncate",
  "division-negative--wrap-back",
  "division-negative--ceil-div",
  "to-number--float-to-int",
  "augmented--add-1",
  "augmented--drop-digit",
  "bool-ops--and",
  "ternary--label",
  "elif-else--elif",
  "bit-masks--full-mask",
  "int-range--clamp-32-bit",
  // is vs ==, None
  "is-vs-eq--same-contents",
  "is-vs-eq--same-object",
  "none-check--is-none",
  "none-check--default",
  // strings are immutable and are not numbers
  "str-concat--append-char",
  "str-concat--int-needs-str",
  "str-immutable--drop-last",
  "slice-immutable--str-replace-first",
  "slice-immutable--tuple-append",
  "str-join--ints",
  "str-sort--sorted-string",
  "str-split--whitespace",
  // exclusive stops
  "for-range-start-stop--inclusive",
  "for-range-reverse--n-to-0",
  "slice-i-through-j--list",
  "slice-last-as-container--list",
  "random--randint",
  // lazy iterators
  "reversed-use--to-string",
  "reversed-use--to-list",
  "map-use--lambda",
  "zip-build--unequal",
  // guards that must come first
  "while-compound--stack-top",
  "while-node--slow-fast",
  "grid-bounds--in-bounds-and-land",
  // scope and comprehension layout
  "scope--nonlocal",
  "comp-conditional--clip",
  "comp-nested--flatten",
  // objects: equality, hashing, ordering
  "class-dunder--eq",
  "class-dunder--hash",
  "obj-set--add-by-value",
  "heap-objects--tiebreak-push",
  "heap-objects--define-lt",
  "obj-in-tuples--sort-by-score-only",
  "heap-pop--negated",
  // sorting
  "sort-multi-key--count-desc-then-alpha",
  "sort-comparator--cmp-to-key",
]);

export const TRAPS_TAG = "traps";
