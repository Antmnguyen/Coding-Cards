# Plan: codingcards, rapid-fire Python syntax flashcards

Greenfield build. Source requirements are in `requirementsdump.md`.

## How it runs
A desktop app: one `codingcards.exe` you double-click. No terminal, no server, no hosting, no internet needed. Everything (cards, fonts, Python runtime) is bundled inside it.

## Stack
- **Electron** as the desktop shell, packaged to a single portable `.exe` with electron-builder.
- **React + TypeScript**, bundled with **esbuild** (no Vite, no dev server).
- **Zustand** for session state.
- **History saved to a JSON file** in the user's app-data folder, so it survives updates and can be backed up or reset by hand.
- **Plain CSS with CSS variables** for theming: dark, monospace (JetBrains Mono / Roboto Mono), one accent colour, centred content, the Monkeytype look.
- **Pyodide in a Web Worker** to run answers, shipped inside the app and loaded in the background after first paint.
- **Vitest** for the queue logic and for validating cards.

## Card format
Cards live in per-topic data files (`src/cards/python/heaps.ts`, `dicts.ts`, `strings.ts`, …). The rules for writing them are in `CARD_RULES.md`.

```ts
{
  id, tags: ["heaps"],
  prompt: "`h` is a list that is already a min-heap. Remove its smallest item and get that item back.",
  setup: "h = [1, 3, 2]",                     // given code, shown on the card and run first
  expect: "gives 1, and h keeps 2 and 3",     // what a right answer produces, shown on the card
  solution: "import heapq\nheapq.heappop(h)", // must run on its own after the given code
  accepted: [...],                            // optional alternates
  explain: "heapq.heappop(h), not h.heappop().",
  check: "_ == 1 and sorted(h) == [2, 3]"     // optional assertion
}
```

A `language` field keeps the door open for TypeScript and React decks later.

## Answer checking
1. **Strict**: exact character match.
2. **Smart**: normalise whitespace and quotes, then compare against `solution` and `accepted`. This is synchronous, so the result is instant.
3. **Run**: only if smart match fails and the card has a `check`. It runs `setup`, then the answer, then `check` in the Pyodide worker with a timeout of about 1s. This accepts any variable naming or equivalent phrasing.

## Queue engine
A pure TypeScript module, separate from the UI, so it is easy to test.
- **Missed card**: re-inserted 2–4 cards ahead.
- **Mastery**: 2 consecutive correct answers removes the card from the session.
- **Modes**: by tag(s), global shuffle, card-count limit, or timed blitz.
- **Forced correction**: optional setting to type the right answer before moving on.

## History and card weighting
Every answer is recorded per card: attempts, correct count, current streak, last seen, and average answer time.

Each card gets a weight from that history, and sessions are drawn by weighted random pick, so this is always on rather than a separate mode:
- **Misses raise the weight**, more so if they are recent.
- **Correct streaks lower it**, down to a small floor so a known card still shows up occasionally.
- **Unseen cards** start at a medium-high weight so new material gets introduced.
- **Slow correct answers** count as weaker than fast ones.

A stats view on the Home screen shows accuracy per topic and the worst cards.

## UI
Three screens, all keyboard-only:
- **Home**: tag chips, session size or time, mode toggles. Works like Monkeytype's config bar, with no separate settings page.
- **Drill**: HUD (remaining, streak, reps/min), prompt, the given code, the expected result, and an auto-focused multi-line code input. `Enter` submits and `Shift+Enter` adds a line. After every answer, right or wrong, it shows the solution and the one-line explanation, and `Enter` advances. `Esc` goes home.
- **Results**: accuracy, reps/min, missed cards.

For speed there are no route transitions or animations beyond a colour flash under 100ms on right/wrong. The input is a single controlled field.

## Build order
1. **Scaffold**: Electron + esbuild + React, theme, layout shell, and a working `.exe` build from day one.
2. **Core loop**: queue engine with tests, Drill screen with strict/smart matching, and about 50 seed cards from the examples in `requirementsdump.md`.
3. **History**: JSON history file, card weighting, Home config, HUD, Results, stats view.
4. **Run-checking**: Pyodide worker.
5. **Content**: grow to several hundred cards across builtins, `collections`, `heapq`, `bisect`, `itertools`, `math`, `functools`, and the micro-traps. A test asserts that every card's `solution` passes its own `check`.
6. **Later**: TypeScript/React decks, then AI card generation from pasted docs.

## Trade-offs
- **Electron vs Tauri**: Electron gives a large exe (roughly 150MB) and about a second to open, but builds with the Node already on this machine. Tauri would be around 10MB and open faster, but needs the Rust toolchain and MSVC build tools installed first. The React code is the same either way, so switching later is cheap.
- **Pyodide** adds roughly 10MB to the app and takes a moment to warm up on launch. Smart matching works immediately, and run-checking switches on once it is ready.
