import { useEffect, useRef, useState } from "react";
import { givenCode } from "../../core/compose";
import { matches, normalise } from "../../core/match";
import type { Card } from "../../core/types";
import { runCheck } from "../../runner/runner";
import { useStore } from "../store";
import { Prompt, repsPerMinute, useKeys } from "../ui";

const FLASH_MS = 90;
const INDENT = "    ";
const EDITOR_ROWS = 3;

type Phase = "answer" | "checking" | "reveal";

export function Drill() {
  const session = useStore((s) => s.session)!;
  const settings = useStore((s) => s.settings);
  const pyReady = useStore((s) => s.pyReady);
  const recordAnswer = useStore((s) => s.recordAnswer);
  const finish = useStore((s) => s.finish);
  const goHome = useStore((s) => s.goHome);

  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("answer");
  // The answered card stays on screen with its solution until Enter, right or wrong.
  const [reveal, setReveal] = useState<{ card: Card; given: string; ok: boolean } | null>(null);
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
    if (e.key === "Escape") goHome();
  });

  // The queue has already moved on while an answer is revealed, so keep showing that card.
  const headId = session.q.queue[0];
  const card = reveal?.card ?? (headId ? session.cards[headId] : undefined);

  // The last card finishes the queue while its reveal is still up; leave once it is dismissed.
  useEffect(() => {
    if (!card) finish();
  }, [card, finish]);

  if (!card) return null;

  const mustRetype = phase === "reveal" && !reveal!.ok && settings.forceCorrection;

  function nextCard() {
    setReveal(null);
    setInput("");
    setPhase("answer");
    shownAt.current = Date.now();
  }

  async function submit(card: Card) {
    if (phase === "checking") return;
    if (phase === "reveal") {
      if (mustRetype && !matches(card, input, settings.strict)) return setFlash("bad");
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
    setReveal({ card, given: input, ok });
    setInput("");
    setPhase("reveal");
  }

  /** Replaces the selection with text and puts the caret after it. */
  function insert(el: HTMLTextAreaElement, text: string) {
    const caret = el.selectionStart + text.length;
    setInput(input.slice(0, el.selectionStart) + text + input.slice(el.selectionEnd));
    requestAnimationFrame(() => el.setSelectionRange(caret, caret));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    if (e.key === "Tab") {
      e.preventDefault();
      return insert(el, INDENT);
    }
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!e.shiftKey) return void submit(card!);
    // Shift+Enter starts a new line, keeping the indent and adding a level after a colon.
    const before = input.slice(0, el.selectionStart);
    const line = before.slice(before.lastIndexOf("\n") + 1);
    insert(el, "\n" + (line.match(/^ */)?.[0] ?? "") + (line.trimEnd().endsWith(":") ? INDENT : ""));
  }

  const elapsed = now - session.startedAt;
  const remaining = session.total - session.q.mastered.length;
  const secondsLeft = session.endsAt ? Math.max(0, Math.ceil((session.endsAt - now) / 1000)) : null;
  const given = givenCode(card);
  const typing = phase !== "reveal" || mustRetype;

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
        {given && <pre className="given">{given}</pre>}
        <p className="expect">
          <span>expected</span> {card.expect}
        </p>

        {reveal && (
          <div className={"reveal " + (reveal.ok ? "ok" : "bad")}>
            <div className="verdict">{reveal.ok ? "correct" : "wrong"}</div>
            {(!reveal.ok || normalise(reveal.given) !== normalise(card.solution)) && (
              <pre className="yours">{reveal.given}</pre>
            )}
            <pre className="solution">{card.solution}</pre>
            <p className="explain">{card.explain}</p>
          </div>
        )}

        <textarea
          ref={inputRef}
          className={"answer" + (flash ? ` flash-${flash}` : "")}
          rows={typing ? Math.max(EDITOR_ROWS, input.split("\n").length) : 1}
          value={input}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          readOnly={phase === "checking" || !typing}
          placeholder={
            mustRetype ? "type the solution to continue" : phase === "reveal" ? "enter for the next card" : "your code"
          }
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => inputRef.current?.focus()}
        />
      </section>

      <footer>
        <span>enter submit</span>
        <span>shift+enter new line</span>
        <span>esc quit</span>
        <span>{settings.strict ? "strict" : pyReady ? "smart + run" : "smart"}</span>
      </footer>
    </main>
  );
}
