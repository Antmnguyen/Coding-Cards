import { useEffect, useRef, useState } from "react";
import { matches } from "../../core/match";
import type { Card } from "../../core/types";
import { runCheck } from "../../runner/runner";
import { useStore } from "../store";
import { Prompt, repsPerMinute, useKeys } from "../ui";

const FLASH_MS = 90;

type Phase = "answer" | "checking" | "missed";

export function Drill() {
  const session = useStore((s) => s.session)!;
  const settings = useStore((s) => s.settings);
  const pyReady = useStore((s) => s.pyReady);
  const recordAnswer = useStore((s) => s.recordAnswer);
  const finish = useStore((s) => s.finish);
  const start = useStore((s) => s.start);
  const goHome = useStore((s) => s.goHome);

  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("answer");
  const [missed, setMissed] = useState<{ card: Card; given: string } | null>(null);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [now, setNow] = useState(Date.now());
  const shownAt = useRef(Date.now());
  const alive = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (session.endsAt && t >= session.endsAt) finish();
    }, 250);
    return () => clearInterval(timer);
  }, [session.endsAt, finish]);

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(null), FLASH_MS);
    return () => clearTimeout(timer);
  }, [flash]);

  useKeys((e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      start();
    } else if (e.key === "Escape") {
      goHome();
    }
  });

  // While a miss is on screen the queue has already moved on, so keep showing the missed card.
  const headId = session.q.queue[0];
  const card = missed?.card ?? (headId ? session.cards[headId] : undefined);
  if (!card) return null;

  function nextCard() {
    setMissed(null);
    setInput("");
    setPhase("answer");
    shownAt.current = Date.now();
  }

  async function submit(card: Card) {
    if (phase === "checking") return;
    if (phase === "missed") {
      if (settings.forceCorrection && !matches(card, input, settings.strict)) return setFlash("bad");
      return nextCard();
    }
    if (input.trim() === "") return;

    const ms = Date.now() - shownAt.current;
    let ok = matches(card, input, settings.strict);
    if (!ok && !settings.strict && card.check && pyReady) {
      setPhase("checking");
      ok = await runCheck(card, input);
      if (!alive.current) return;
    }
    recordAnswer(card.id, ok, ms);
    setFlash(ok ? "ok" : "bad");
    if (ok) return nextCard();
    setMissed({ card, given: input });
    setInput("");
    setPhase("missed");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!e.shiftKey) return void submit(card!);
    // Shift+Enter starts a new line, keeping the indent and adding a level after a colon.
    const el = e.currentTarget;
    const before = input.slice(0, el.selectionStart);
    const line = before.slice(before.lastIndexOf("\n") + 1);
    const indent = (line.match(/^ */)?.[0] ?? "") + (line.trimEnd().endsWith(":") ? "    " : "");
    const next = before + "\n" + indent + input.slice(el.selectionEnd);
    const caret = before.length + 1 + indent.length;
    setInput(next);
    requestAnimationFrame(() => el.setSelectionRange(caret, caret));
  }

  const elapsed = now - session.startedAt;
  const remaining = session.total - session.q.mastered.length;
  const multiline = card.solution.includes("\n");
  const secondsLeft = session.endsAt ? Math.max(0, Math.ceil((session.endsAt - now) / 1000)) : null;

  return (
    <main className="drill">
      <header className="hud">
        <span>
          <b>{remaining}</b> left
        </span>
        <span>
          <b>{session.streak}</b> streak
        </span>
        <span>
          <b>{repsPerMinute(session.answers, elapsed)}</b> reps/min
        </span>
        {secondsLeft !== null && (
          <span>
            <b>{secondsLeft}</b>s
          </span>
        )}
      </header>

      <section className="card">
        <div className="tag">{card.tags.join(" · ")}</div>
        <p className="prompt">
          <Prompt text={card.prompt} />
        </p>

        {missed && (
          <div className="miss">
            <pre className="given">{missed.given}</pre>
            <pre className="solution">{card.solution}</pre>
            <p className="explain">{card.explain}</p>
          </div>
        )}

        <textarea
          ref={inputRef}
          className={"answer" + (flash ? ` flash-${flash}` : "")}
          rows={Math.max(1, input.split("\n").length)}
          value={input}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          readOnly={phase === "checking"}
          placeholder={
            phase === "missed"
              ? settings.forceCorrection
                ? "type the solution to continue"
                : "enter to continue"
              : multiline
                ? "shift+enter for a new line"
                : ""
          }
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => inputRef.current?.focus()}
        />
      </section>

      <footer>
        <span>enter submit</span>
        <span>tab restart</span>
        <span>esc home</span>
        <span>{settings.strict ? "strict" : pyReady ? "smart + run" : "smart"}</span>
      </footer>
    </main>
  );
}
