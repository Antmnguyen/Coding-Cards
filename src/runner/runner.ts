import { compose } from "../core/compose";
import type { Card } from "../core/types";
import type { RunMessage, RunRequest } from "./pyWorker";

const TIMEOUT_MS = 1000;
/** How long an answer waits for Python to finish loading before it is given up on. */
const READY_WAIT_MS = 20000;

let worker: Worker | null = null;
let ready = false;
let nextId = 1;
let onReadyChange: (ready: boolean) => void = () => {};
const pending = new Map<number, (ok: boolean) => void>();
let waiting: (() => void)[] = [];

function setReady(value: boolean) {
  ready = value;
  onReadyChange(value);
  if (value) {
    for (const go of waiting) go();
    waiting = [];
  }
}

function spawn() {
  worker = new Worker("pyWorker.js", { type: "module" });
  worker.onmessage = (e: MessageEvent<RunMessage>) => {
    if (e.data.type === "ready") return setReady(true);
    pending.get(e.data.id)?.(e.data.ok);
  };
  worker.onerror = () => setReady(false);
}

/** Starts loading Python in the background; run-checking is skipped until it is ready. */
export function startRunner(listener: (ready: boolean) => void) {
  onReadyChange = listener;
  spawn();
}

/** Resolves true once Python is loaded, or false if that takes too long. */
function whenReady(): Promise<boolean> {
  if (ready) return Promise.resolve(true);
  return new Promise((resolve) => {
    const go = () => {
      clearTimeout(timer);
      resolve(true);
    };
    const timer = setTimeout(() => {
      waiting = waiting.filter((w) => w !== go);
      resolve(false);
    }, READY_WAIT_MS);
    waiting.push(go);
  });
}

/**
 * Runs the answer against the card's check, waiting for Python if it is still loading,
 * so a correct answer is never marked wrong just because it was typed early.
 * Resolves false on any error or timeout.
 */
export async function runCheck(card: Card, answer: string): Promise<boolean> {
  if (!worker || !card.check) return false;
  if (!(await whenReady())) return false;
  const id = nextId++;
  const req: RunRequest = { id, setup: card.setup ?? "", answer: compose(card, answer), check: card.check };
  return new Promise((resolve) => {
    const done = (ok: boolean) => {
      clearTimeout(timer);
      pending.delete(id);
      resolve(ok);
    };
    // Python runs synchronously in the worker, so the only way to stop a
    // runaway answer is to kill the worker and start a fresh one.
    const timer = setTimeout(() => {
      worker?.terminate();
      setReady(false);
      spawn();
      done(false);
    }, TIMEOUT_MS);
    pending.set(id, done);
    worker!.postMessage(req);
  });
}
