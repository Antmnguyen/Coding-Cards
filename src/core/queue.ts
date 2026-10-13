export const MASTERY_STREAK = 2;
const REQUEUE_MIN = 2;
const REQUEUE_MAX = 4;

export type Rng = () => number;

export interface QueueState {
  /** Card ids still in play; the head is the card being shown. */
  queue: string[];
  /** Consecutive correct answers per card within this session. */
  streaks: Record<string, number>;
  mastered: string[];
  /** Once-through only: cards missed in this pass, waiting for the next one. */
  held: string[];
}

export function createQueue(ids: string[]): QueueState {
  return { queue: [...ids], streaks: {}, mastered: [], held: [] };
}

/**
 * Applies the answer for the head card.
 * A miss comes back 2-4 cards later; a correct answer goes to the back until
 * the card has been answered correctly `target` times in a row.
 */
export function answer(state: QueueState, correct: boolean, rng: Rng = Math.random, target = MASTERY_STREAK): QueueState {
  const [id, ...rest] = state.queue;
  if (id === undefined) return state;

  if (!correct) {
    const gap = REQUEUE_MIN + Math.floor(rng() * (REQUEUE_MAX - REQUEUE_MIN + 1));
    rest.splice(Math.min(gap, rest.length), 0, id);
    return { ...state, queue: rest, streaks: { ...state.streaks, [id]: 0 } };
  }

  const streak = (state.streaks[id] ?? 0) + 1;
  const streaks = { ...state.streaks, [id]: streak };
  if (streak >= target) {
    return { ...state, queue: rest, streaks, mastered: [...state.mastered, id] };
  }
  return { ...state, queue: [...rest, id], streaks };
}

/**
 * Applies the answer for the head card in a once-through session.
 * Every card is shown once. A miss is held back, and when the pass ends the
 * held cards become the next pass, until each has been answered correctly once.
 */
export function answerOnce(state: QueueState, correct: boolean): QueueState {
  const [id, ...rest] = state.queue;
  if (id === undefined) return state;
  const held = correct ? state.held : [...state.held, id];
  const mastered = correct ? [...state.mastered, id] : state.mastered;
  if (rest.length === 0) return { ...state, queue: held, held: [], mastered };
  return { ...state, queue: rest, held, mastered };
}
