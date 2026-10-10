export type Language = "python";

export interface Card {
  id: string;
  language: Language;
  tags: string[];
  /** Says what every name in the given code is, then what to do. */
  prompt: string;
  /** The given code: shown on the card with example values, and run before the answer. */
  setup?: string;
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

export interface Settings {
  /** Empty means every topic. */
  tags: string[];
  length: SessionLength;
  strict: boolean;
  forceCorrection: boolean;
}
