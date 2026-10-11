# Plan: browse patterns, search, and focused practice

Goal: pick one exact pattern and master it and its variants. Two ways in:

- **You know what you got wrong.** You wrote `s.append(c)` on a string. Open the app, type `append`, and within a few seconds you are drilling that pattern.
- **You want to look.** Scroll the full list of patterns, narrow it with filters (topic, level, how well you know it), and pick one.

A **pattern** is a skill: one piece of syntax plus its data variants (`sort-key` on strings, pairs, objects). There are about 365 of them.

## What you can do

1. **Open the pattern browser from Home** with `/` or the `browse patterns` button.
2. **Scroll every pattern.** One line per pattern: topic, name, an example answer, number of variants, how many you have mastered.
3. **Filter the list** with chips: topic, level (1 basics, 2 everyday, 3 rare), status (new, weak, learning, mastered). Filters combine with each other and with the search text.
4. **Search by typing.** Results update on every keystroke. Typing `append`, `key=lambda`, `[::-1]`, `heappop`, `sorting reverse` or `returns none` all work.
5. **Drill one pattern.** Enter on the highlighted line starts a focused drill on that pattern and all its variants.
6. **Drill everything listed.** `Ctrl+Enter` drills every pattern currently in the list, so "all weak sorting patterns" is two filters and one key.
7. **Jump from a card to its pattern.** On any revealed card, `Ctrl+F` starts a focused drill on that card's pattern.

## How search works

Each pattern is searched across the text of all its cards:

| Weight | Field | Why |
|---|---|---|
| 3 | `solution` and `accepted` | The syntax itself: `path += c` |
| 2 | `explain` | Names the trap in words: "Strings have no append(); += builds a new string." |
| 1 | `prompt`, pattern name, topic | Plain-language description |

- **Every word must match somewhere** in the pattern, in any field. `string append` matches a pattern whose prompt says "string" and whose explanation says "append".
- **Code-aware.** Symbols such as `+=`, `[::-1]`, `//`, `.append(` are matched literally. Case and spaces inside code are ignored, so `key = lambda` finds `key=lambda`.
- **Ranked** by where the words matched; with no search text the list is in deck order (the order of `CARD_PLAN.md`).
- **No external library.** The deck is small enough to scan on every keystroke.
- **Thinking cards** follow the same switch as everywhere else: patterns made only of thinking cards are listed only when `thinking cards` is on.

## Filters

| Filter | Values | Meaning |
|---|---|---|
| topic | all, or any topics | Same topics as Home |
| level | 1, 2, 3 | How common the syntax is |
| status | new | no card of the pattern answered yet |
| | weak | answered, with at least one card whose last answer was a miss |
| | learning | answered, no card currently missed, not all mastered |
| | mastered | every card right twice in a row |
| rounds | 3, 5, 10 | How many times in a row each card must be right in a focused drill |

## How a focused drill differs from a normal session

| | Normal session | Focused drill |
|---|---|---|
| Cards | Weighted draw from the chosen topics | Every variant of the chosen pattern or patterns |
| Variants | One per pattern before any repeats | All of them, shuffled |
| Finishes when | Each card is right 2 times in a row | Each card is right N times in a row (3, 5 or 10; default 3) |
| A miss | Card returns 2 to 4 cards later | Same |
| History | Recorded | Recorded the same way |

- **Thin patterns.** A pattern with one or two variants would show the same card back to back. For those, the drill adds the neighbouring patterns from the same topic until there are at least 4 cards, and the header says so ("+ related").
- The drill header shows what is being drilled: `focused: sort-key (6 cards, 3 in a row)`.
- When it ends, Results shows as usual; Enter repeats the same focused drill, Esc goes back to the browser.

## Screens and keys

- **Home:** a `browse patterns` button and `/`.
- **Browser:** search line on top, filter chips under it, then the scrolling list.
  - typing searches; `Up`/`Down` move through the list; `Enter` drills the highlighted pattern; `Ctrl+Enter` drills all listed.
  - `Tab` moves between the search line and the filter chips; on the chips, arrows move and Space toggles, as on Home.
  - `Esc` clears the search text, or goes Home when it is already empty.
  - Mouse works too: click a chip, click a line to highlight it, double-click to drill it.
- **Drill:** unchanged apart from the header line and the `ctrl+f focus pattern` hint.

## Build order

1. **`src/core/search.ts`**: pure functions with tests. `buildPatterns(cards)`, `patternStatus(pattern, history)`, `searchPatterns(patterns, query, filters, history)`.
2. **Focused drill**: mastery target per session in `src/core/queue.ts`; `startFocused(skillIds)` in the store with the thin-pattern padding; `focusRounds` setting.
3. **Browser screen** `src/renderer/screens/Browse.tsx` and the Home entry point.
4. **Drill header and `Ctrl+F`**, Results returning to the browser.

Later, not part of this build:

5. **`mistakes` field.** An optional list per pattern of wrong forms people type (`path.append(c)`, `h.push(x)`, `nums.length`), searched at the highest weight, never shown and never accepted. A test asserts no mistake passes the card's own check. Content work: trap cards first, then level 1.
6. **Pinned patterns.** `P` pins a pattern; a `pinned` status filter drills them.
