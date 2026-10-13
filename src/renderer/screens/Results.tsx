import { givenCode } from "../../core/compose";
import { useStore } from "../store";
import { percent, Prompt, repsPerMinute, useKeys } from "../ui";

export function Results() {
  const session = useStore((s) => s.session)!;
  const start = useStore((s) => s.start);
  const startFocused = useStore((s) => s.startFocused);
  const goHome = useStore((s) => s.goHome);
  const openBrowse = useStore((s) => s.openBrowse);
  const focus = session.focus;
  const once = session.mode === "once";

  useKeys((e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      // A focused drill repeats the same patterns and returns to the browser.
      if (focus) startFocused(focus.skills);
      else start();
    } else if (e.key === "Escape") {
      if (focus) openBrowse();
      else goHome();
    }
  });

  const elapsed = (session.finishedAt ?? Date.now()) - session.startedAt;

  return (
    <main className="results">
      <div className="summary">
        <div>
          <b>{percent(session.correct, session.answers)}</b>
          <span>accuracy</span>
        </div>
        <div>
          <b>{repsPerMinute(session.answers, elapsed)}</b>
          <span>reps/min</span>
        </div>
        <div>
          <b>
            {once ? session.total - session.missed.length : session.q.mastered.length}/{session.total}
          </b>
          <span>{once ? "first try" : "mastered"}</span>
        </div>
        <div>
          <b>{session.bestStreak}</b>
          <span>best streak</span>
        </div>
        <div>
          <b>{Math.round(elapsed / 1000)}s</b>
          <span>time</span>
        </div>
      </div>

      {session.missed.length > 0 && (
        <section className="missed-list">
          <h2>missed</h2>
          {session.missed.map((id) => {
            const card = session.cards[id]!;
            return (
              <div className="missed-card" key={id}>
                <p>
                  <Prompt text={card.prompt} />
                </p>
                <pre className="dim">{givenCode(card)}</pre>
                <pre className="solution">{card.solution}</pre>
                <p className="explain">{card.explain}</p>
              </div>
            );
          })}
        </section>
      )}

      <footer>
        <span>enter again</span>
        <span>{focus ? "esc patterns" : "esc home"}</span>
      </footer>
    </main>
  );
}
