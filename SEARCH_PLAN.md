# Plan: search and focused practice

Goal: you make a mistake while doing LeetCode (say you wrote `s.append(c)` on a string), you open the app, type what you got wrong, and within a few seconds you are drilling that exact piece of syntax and all its variants, a dozen or more times.

## What you will be able to do

1. **Search from Home.** Press `/` (or just start typing) and a search line appears. Results update on every keystroke.
2. **Search by the mistake, not only the answer.** Typing `append`, `string append`, `s.append`, `+=`, `heappop`, `sort returns none` or `{} set` all find the right skill.
3. **Pick a result and drill it.** Arrow keys move through results, Enter starts a focused drill on the highlighted skill. `Ctrl+Enter` drills every result at once.
4. **Drill it many times.** A focused drill cycles through every variant of the skill and repeats until you have got each one right several times in a row. The number of rounds is a setting: 3, 5 or 10.
5. **Jump to a focused drill from a miss.** In a normal session, when a card is marked wrong, pressing `F` on the reveal screen starts a focused drill on that card's skill, then returns you to the session.
6. **Keep a "my mistakes" list.** Pressing `P` on a search result or on a reveal pins that skill. A `pinned` chip on Home drills everything you have pinned.

## How search works

Each card is searched across these fields, with this priority:

| Priority | Field | Why |
|---|---|---|
| 1 | `mistakes` (new, see below) | What people actually type wrong: `s.append(c)`, `h.push(x)`, `nums.length` |
| 2 | `solution` and `accepted` | The right syntax: `path += c` |
| 3 | `explain` | Already names the trap in words: "Strings have no append(); += builds a new string." |
| 4 | `prompt`, skill id, topic | Plain-language description: "add a character to the end of a string" |

- **Results are grouped by skill**, not by card, so 10 variants show as one line with "10 variants". Each line shows the topic, one example solution, and your mastery for that skill.
- **Code-aware matching.** The query is split on spaces; symbols such as `+=`, `[::-1]`, `//`, `.append(` are matched literally and are not stripped out. Whitespace inside code is ignored, the same way the answer checker ignores it.
- **Every word must match somewhere** in the card, in any field. `string append` matches a card whose prompt says "string" and whose explanation says "append".
- **No external library.** 1,447 cards is small enough to scan on every keystroke.

### New card field: `mistakes`

`explain` often mentions the wrong form, but not reliably and not as code. To make "search by what I typed wrong" dependable, cards get an optional list:

```ts
mistakes: ["path.append(c)", "path.push(c)", "path.add(c)"]
```

- It is used only for search; it is never shown on the card and never accepted as an answer.
- It is set per skill where possible (on the `skill()` base), so all variants inherit it.
- A test asserts that no entry in `mistakes` passes the card's own check, so a "mistake" can never be a correct answer.

Writing these for all 344 skills is the bulk of the content work. Order: the 97 trap cards first, then level 1, then the rest.

## How a focused drill differs from a normal session

| | Normal session | Focused drill |
|---|---|---|
| Cards | Weighted draw from the chosen topics | Every variant of the chosen skill or skills |
| Variants | One per skill before any repeats | All of them, shuffled |
| Finishes when | Each card is right 2 times in a row | Each card is right N times in a row (3, 5 or 10) |
| A miss | Card returns 2 to 4 cards later | Same |
| History | Recorded | Recorded the same way, so it also lowers how often the skill comes up later |

- **Thin skills.** A skill with one or two variants would show the same card over and over. For those, the drill also pulls in the sibling skills from the same topic section that share the most solution text, and says so on screen ("plus 2 related skills").
- **Top up the thinnest skills.** As part of this work, list every skill with fewer than 3 variants and add variants to the ones that are common mistakes, so a focused drill has real variety.

## Screens

- **Home:** a search line above the topic rows. Empty by default and takes no space until used. While it has text, the topic rows are replaced by the results list.
- **Results list:** one line per skill: topic, skill description, example solution, "n variants", mastery, pinned marker.
- **Drill:** unchanged, with a header line "focused: str-concat (6 variants, round 2 of 5)".
- **Reveal:** two new footer hints, `F focus this` and `P pin`.

All of it stays keyboard-only: `/` search, arrows move, Enter drill, `Ctrl+Enter` drill all, `P` pin, Esc clear.

## Build order

1. **Search index and matching** in `src/core/search.ts`, as a pure function with tests: query in, ranked skills out. Uses the fields that exist today, so it works before any `mistakes` are written.
2. **Search UI on Home**: the input, the results list, keyboard handling.
3. **Focused drill**: a second way to start a session in the store (`startFocused(skillIds, rounds)`), the higher mastery count, the header line, and the related-skills fallback for thin skills.
4. **`F` and `P` on the reveal screen**, the pinned list saved in settings, and the `pinned` chip.
5. **`mistakes` field**: type, test, then content for the trap cards.
6. **`mistakes` for the remaining skills**, and extra variants for thin skills that are common mistakes.

Steps 1 to 4 are app work and give a usable feature on their own. Steps 5 and 6 are card content and can continue in batches, logged in `CARD_PLAN.md` like the earlier card work.

## Decisions for you

1. **Rounds.** Default of 5 correct in a row per card for a focused drill, with 3 and 10 as options. Say if you want a fixed number instead.
2. **Returning to the session after `F`.** The plan resumes the interrupted session where it left off. The simpler alternative is to end it and go to Home afterwards.
3. **Scope of `mistakes`.** Trap cards and level 1 only (about 550 cards) covers most real slips; doing all 1,447 is roughly three times the writing.
