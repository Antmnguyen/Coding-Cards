# Plan: once-through mode and practising what you are bad at

Home gets a `mode` row with three choices. Topics, level, length (10 / 25 / 50 / 100 / timed) and the other options work the same in every mode.

| Mode | Which cards | How a card leaves the session |
|---|---|---|
| `standard` | weighted draw from the chosen topics (unchanged) | right 2 times in a row (unchanged) |
| `once through` | same draw as standard | see below |
| `practice weak` | cards you have been getting wrong, plus their variants | right 2 times in a row |

## Once through

1. **First pass.** Every card in the set is shown exactly once, in order.
   - Right: move on. The card is done.
   - Wrong: the solution is shown and has to be typed correctly before moving on (forced correction, always on in this mode whatever the option says). The card is held back.
2. **Review passes.** When the first pass ends, the held cards are shown again.
   - Right on the first try, with no solution on screen: the card is done.
   - Wrong: forced correction again, and the card waits for the next review pass.
3. The session ends when nothing is held. Typing the solution during forced correction never counts as getting it right.

The HUD says `review` during review passes. Results show `first try` (cards right on the first pass) instead of `mastered`.

A timed length still ends on the clock, wherever the passes have got to.

## Universal tracking

Every answer in every mode (standard, once through, practice weak, focused drill) already goes into the one saved history: attempts, times right, current streak, last miss. Nothing new is stored. What changes:

- The card on screen shows `right N of M` so the count is visible.
- The count decides what `practice weak` draws.

Forced-correction retyping is not an answer and is never counted.

## Practice weak

- A card is **weak** if it has been missed and has not been answered right 2 times in a row since (the same streak that counts as mastered everywhere else).
- The session is the weak cards first, then the other variants of the same patterns, cut to the chosen length. Both parts use the usual weighted order.
- Topic, level and thinking-card filters apply. Home shows how many weak cards the current filters give; with none, there is nothing to start.

## Code

| File | Change |
|---|---|
| `src/core/types.ts` | `Mode`, `Settings.mode` |
| `src/core/queue.ts` | `QueueState.held`, `answerOnce` |
| `src/core/history.ts` | `isWeak`, `weakPool`, `drawWeak` |
| `src/renderer/store.ts` | `Session.mode`; `start` picks the draw; `recordAnswer` picks the queue rule |
| `src/renderer/screens/Home.tsx` | `mode` row and a one-line note |
| `src/renderer/screens/Drill.tsx` | forced correction in once-through, `review` in the HUD, `right N of M` |
| `src/renderer/screens/Results.tsx` | `first try` for once-through |
| `tests/queue.test.ts`, `tests/history.test.ts` | the new rules |
