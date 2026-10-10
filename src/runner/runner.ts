import { compose } from "../core/compose";
import type { Card } from "../core/types";
import type { RunMessage, RunRequest } from "./pyWorker";

const TIMEOUT_MS = 1000;

let worker: Worker | null = null;
let ready = false;
let nextId = 1;
let onReadyChange: (ready: boolean) => void = () => {};
const pending = new Map<number, (ok: boolean) => void>();

function setReady(value: boolean) {
  ready = value;
  onReadyChange(value);
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

/** Runs the answer against the card's check. Resolves false on any error or timeout. */
export function runCheck(card: Card, answer: string): Promise<boolean> {
  if (!worker || !ready || !card.check) return Promise.resolve(false);
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
