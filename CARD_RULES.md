# Card rules

Every card in `src/cards/` follows these rules. `tests/cards.test.ts` enforces the ones marked **(tested)**.

## What a card is
One small piece of Python syntax: a method call, an initialisation, a state update, a shortcut. Not a LeetCode problem and not an algorithm. The answer is 1 line where possible and never more than 3 **(tested)**.

## The card must give all the context
The reader should never have to guess what a name is.

1. **The prompt says what every name is before saying what to do.** Write "`path` is a list of single characters. Glue them into one string", not "Join `path`". Every variable in the given code is named in the prompt, in backticks **(tested)**.
2. **The given code (`setup`) shows example values.** It is displayed on the card as a snippet, so the reader sees `nums = [1, 1, 2]` instead of imagining it. One statement per line. It must be valid Python that runs **(tested)**.
3. **`expect` says what a right answer produces for those example values**, so there is no doubt about the goal: `freq is {1: 2, 2: 1}`. Every card has one **(tested)**. Wording:
   - `gives X` when the answer is an expression with a value.
   - `a becomes X` when the answer changes something, `a stays X` when it must not.
   - `x is X` when the answer creates a new variable.
   - A short sentence for loop headers and other lines that cannot run alone.
4. **Name things the answer must use.** If the answer needs a loop variable or a new variable, the prompt gives its name ("Call each item `x`", "store the result in `freq`").
5. **Say so when only part of a statement is wanted**: "Write only the `for` line".

## The answer is real code
The answer box is a small code editor and the answer is run as written.

1. **The solution must run on its own after the given code** **(tested)**. Anything the given code does not provide, the answer has to: if the card uses `Counter` and the given code does not import it, the solution is two lines, the import and then the call.
2. **The given code only imports a module when it has to**, which is when its own example values need it (`q = deque([1, 2])`). Otherwise the import is part of the answer.
3. **`check` decides correctness by running the answer**, so any variable naming or equivalent phrasing passes. It is an expression evaluated after the answer, with `_` bound to the value of the answer's last line. Prefer checking the resulting state (`h == [-5]`) over checking only `_`, so a typed-in literal cannot pass. A do-nothing answer must fail the check **(tested)**.
4. **Leave `check` out only when the line cannot run alone** (a loop header, a `return`) or when the point of the card is one specific method and a check could not tell it from a wrong one (`discard` vs `remove`). Those cards are matched as text against `solution` and `accepted`.
5. **`accepted` lists other common correct spellings.** Each one must also pass the check **(tested)**.

## Lines that cannot run alone
A loop header, an `if` line, a `return`, or a line inside a function gets a **`template`**: code with an `{answer}` slot that the answer is placed into before running. The card shows the template with a blank where the answer goes, so the reader sees the loop body or the surrounding function.

```ts
template: "out = []\n{answer}\n    out.append(i)",   // answer: for i in range(n):
check: "out == [0, 1, 2, 3]",
```

- The slot sits on its own line; its indentation is applied to every line of the answer.
- The check looks at what the template produced (`out`, `result`), never at `_`.
- `expect` says what that variable ends up as: `out ends up [0, 1, 2, 3]`.
- Names that only the template uses (`out`) go in the template, not in `setup`.

## Skills, variants and levels
- **`skill()`** groups cards that drill the same syntax on different data. Card ids are `<skill>--<variant>`. A session shows one variant per skill before repeating a skill.
- A variant must change what you type or where people slip. Changing only the example numbers is not a variant.
- Vary names across variants (`nums`, `a`, `s`, `words`, `grid`) so a card cannot be recognised by its variable name.
- No two cards may have the same prompt and given code **(tested)**.
- **`level`**: 1 = bare basics, 2 = everyday LeetCode, 3 = tricky or rare. Set per skill.
- Standard classes (`ListNode`, `TreeNode`, `Point`) come from `src/cards/python/given.ts`, so every card shows the same definition.

## After answering
Right or wrong, the card stays up and shows the solution and `explain`; Enter moves on.

- **`explain` is one sentence naming the trap**: what people type by mistake and why it is wrong ("heapq.heappop(h), not h.heappop()").

## Housekeeping
- `id` is unique, kebab-case, and never changes once used, because history is stored against it **(tested)**.
- One topic tag per card unless it clearly belongs to two.
- A card is added to the topic file it belongs to; a new topic gets its own file and a line in `src/cards/index.ts`.

## Example

```ts
{
  id: "counter-new",
  prompt: "`nums` is a list. Count how many times each item appears and store the result in `freq`.",
  setup: "nums = [1, 1, 2]",
  expect: "freq is {1: 2, 2: 1}",
  solution: "from collections import Counter\nfreq = Counter(nums)",
  explain: "Counter takes any iterable, including a string.",
  check: "isinstance(freq, Counter) and freq == {1: 2, 2: 1}",
}
```
