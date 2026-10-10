import { describe, expect, it } from "vitest";
import { answer, createQueue } from "../src/core/queue";

const ids = ["a", "b", "c", "d", "e", "f"];

describe("queue", () => {
  it("re-inserts a missed card 2 to 4 cards ahead", () => {
    for (const [roll, index] of [[0, 2], [0.5, 3], [0.99, 4]] as const) {
      const q = answer(createQueue(ids), false, () => roll);
      expect(q.queue.indexOf("a")).toBe(index);
      expect(q.queue).toHaveLength(ids.length);
    }
  });

  it("puts a missed card last when fewer cards remain than the gap", () => {
    expect(answer(createQueue(["a", "b"]), false, () => 0.99).queue).toEqual(["b", "a"]);
    expect(answer(createQueue(["a"]), false).queue).toEqual(["a"]);
  });

  it("sends a first correct answer to the back without mastering it", () => {
    const q = answer(createQueue(ids), true);
    expect(q.queue).toEqual(["b", "c", "d", "e", "f", "a"]);
    expect(q.mastered).toEqual([]);
  });

  it("masters a card after 2 consecutive correct answers", () => {
    let q = createQueue(["a", "b"]);
    q = answer(q, true); // a
    q = answer(q, true); // b
    q = answer(q, true); // a again
    expect(q.mastered).toEqual(["a"]);
    expect(q.queue).toEqual(["b"]);
  });

  it("resets the streak on a miss", () => {
    let q = createQueue(["a"]);
    q = answer(q, true);
    q = answer(q, false);
    q = answer(q, true);
    expect(q.mastered).toEqual([]);
    q = answer(q, true);
    expect(q.mastered).toEqual(["a"]);
    expect(q.queue).toEqual([]);
  });

  it("ignores answers once the queue is empty", () => {
    const q = createQueue([]);
    expect(answer(q, true)).toBe(q);
  });
});
