export type Language = "python";

export interface Card {
  id: string;
  language: Language;
  tags: string[];
  /** The piece of syntax this card drills. Variants of one skill share it. */
  skill: string;
  /** How common the syntax is: 1 = bare basics, 2 = everyday LeetCode, 3 = rare. */
  level: 1 | 2 | 3;
  /** "recall" = at most 2 ideas, typed in seconds. "think" = 3 or more; left out of sessions unless asked for. */
  kind: "recall" | "think";
  /** Says what every name in the given code is, then what to do. */
  prompt: string;
  /** The given code: shown on the card with example values, and run before the answer. */
  setup?: string;
  /**
   * Code the answer is placed into at `{answer}`, for lines that cannot run alone
   * (a loop header needs a body). Shown on the card after the given code.
   */
  template?: string;
  /** What a right answer produces for the given code, in plain words. Shown on the card. */
  expect: string;
  /** Must run on its own after the given code, so it includes any import the given code lacks. */
  solution: string;
  /** Alternate answers that count as correct without running anything. */
  accepted?: string[];
  /** One line shown after answering, naming the trap. */
  explain: string;
  /** Expression that must be truthy after the answer runs. `_` is the answer's value. */
  check?: string;
}

export interface CardHistory {
  attempts: number;
  correct: number;
  streak: number;
  lastSeen: number;
  lastMiss: number;
  /** Moving average time of correct answers, in ms. 0 until the first correct answer. */
  avgMs: number;
}

export type History = Record<string, CardHistory>;

export type SessionLength =
  | { kind: "count"; n: number }
  | { kind: "timed"; seconds: number };

/** "once" shows each card one time, then repeats the misses. "weak" draws the cards that keep being missed. */
export type Mode = "standard" | "once" | "weak";

export interface Settings {
  mode: Mode;
  /** Empty means every topic. */
  tags: string[];
  length: SessionLength;
  /** Empty means every level. */
  levels: number[];
  /** Also draw the "think" cards. Off by default. */
  thinking: boolean;
  /** Correct answers in a row each card needs in a focused drill. */
  focusRounds: number;
  strict: boolean;
  forceCorrection: boolean;
}
