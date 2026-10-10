import { Fragment, useEffect, useRef } from "react";

/** Renders `backticked` spans of a prompt as code. */
export function Prompt({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

/** Window-level key handler that always sees the latest closure. */
export function useKeys(handler: (e: KeyboardEvent) => void) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    // A screen can mount while the keypress that opened it is still bubbling
    // (Enter on the last card opens Results); that press belongs to the old screen.
    const mountedAt = performance.now();
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.timeStamp <= mountedAt) return;
      ref.current(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

export const percent = (correct: number, attempts: number) =>
  attempts === 0 ? "-" : `${Math.round((100 * correct) / attempts)}%`;

export function repsPerMinute(answers: number, ms: number): string {
  return ms < 1000 ? "0" : (answers / (ms / 60_000)).toFixed(0);
}
