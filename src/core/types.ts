export type Language = "python";

export interface Card {
  id: string;
  language: Language;
  tags: string[];
  prompt: string;
  solution: string;
  /** Alternate answers that count as correct without running anything. */
  accepted?: string[];
  /** One line shown on a miss, naming the trap. */
  explain: string;
  /** Code run before the answer when run-checking. */
  setup?: string;
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
