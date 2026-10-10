import { useMemo, useState } from "react";
import { cards, tags as allTags } from "../../cards";
import { tagStats, worstCards } from "../../core/history";
import type { SessionLength } from "../../core/types";
import { useStore } from "../store";
import { percent, Prompt, useKeys } from "../ui";

const LENGTHS: { label: string; value: SessionLength }[] = [
  { label: "10", value: { kind: "count", n: 10 } },
  { label: "25", value: { kind: "count", n: 25 } },
  { label: "50", value: { kind: "count", n: 50 } },
  { label: "100", value: { kind: "count", n: 100 } },
  { label: "1 min", value: { kind: "timed", seconds: 60 } },
  { label: "3 min", value: { kind: "timed", seconds: 180 } },
  { label: "5 min", value: { kind: "timed", seconds: 300 } },
];

const sameLength = (a: SessionLength, b: SessionLength) =>
  a.kind === "count" ? b.kind === "count" && a.n === b.n : b.kind === "timed" && a.seconds === b.seconds;

interface Item {
  label: string;
  active: boolean;
  run(): void;
}

export function Home() {
  const settings = useStore((s) => s.settings);
  const history = useStore((s) => s.history);
  const pyReady = useStore((s) => s.pyReady);
  const update = useStore((s) => s.updateSettings);
  const start = useStore((s) => s.start);
  const [focus, setFocus] = useState({ row: 0, col: 0 });

  const rows: { name: string; items: Item[] }[] = [
    {
      name: "topics",
      items: [
        { label: "all", active: settings.tags.length === 0, run: () => update({ tags: [] }) },
        ...allTags.map((tag) => ({
          label: tag,
          active: settings.tags.includes(tag),
          run: () =>
            update({
              tags: settings.tags.includes(tag) ? settings.tags.filter((t) => t !== tag) : [...settings.tags, tag],
            }),
        })),
      ],
    },
    {
      name: "length",
      items: LENGTHS.map((l) => ({
        label: l.label,
        active: sameLength(l.value, settings.length),
        run: () => update({ length: l.value }),
      })),
    },
    {
      name: "options",
      items: [
        { label: "strict match", active: settings.strict, run: () => update({ strict: !settings.strict }) },
        {
          label: "forced correction",
          active: settings.forceCorrection,
          run: () => update({ forceCorrection: !settings.forceCorrection }),
        },
      ],
    },
  ];

  useKeys((e) => {
    const row = rows[focus.row]!;
    const move = (dRow: number, dCol: number) => {
      const r = (focus.row + dRow + rows.length) % rows.length;
      const len = rows[r]!.items.length;
      setFocus({ row: r, col: dRow ? Math.min(focus.col, len - 1) : (focus.col + dCol + len) % len });
    };
    if (e.key === "Enter") start();
    else if (e.key === " ") row.items[focus.col]!.run();
    else if (e.key === "ArrowRight") move(0, 1);
    else if (e.key === "ArrowLeft") move(0, -1);
    else if (e.key === "ArrowDown") move(1, 0);
    else if (e.key === "ArrowUp") move(-1, 0);
    else return;
    e.preventDefault();
  });

  const stats = useMemo(() => tagStats(cards, history), [history]);
  const worst = useMemo(() => worstCards(cards, history, 5), [history]);
  const hasHistory = stats.some((s) => s.attempts > 0);

  return (
    <main className="home">
      <h1>codingcards</h1>
      <div className="config">
        {rows.map((row, r) => (
          <div className="config-row" key={row.name}>
            <span className="config-name">{row.name}</span>
            <div className="chips">
              {row.items.map((item, c) => (
                <button
                  key={item.label}
                  tabIndex={-1}
                  className={
                    "chip" + (item.active ? " active" : "") + (focus.row === r && focus.col === c ? " focused" : "")
                  }
                  onClick={() => {
                    setFocus({ row: r, col: c });
                    item.run();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="start" tabIndex={-1} onClick={start}>
        enter to start
      </button>

      {hasHistory && (
        <section className="stats">
          <div>
            <h2>accuracy by topic</h2>
            <table>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.tag}>
                    <td>{s.tag}</td>
                    <td className="num">{percent(s.correct, s.attempts)}</td>
                    <td className="num dim">
                      {s.seen}/{s.total} seen
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {worst.length > 0 && (
            <div>
              <h2>worst cards</h2>
              <table>
                <tbody>
                  {worst.map(({ card, h }) => (
                    <tr key={card.id}>
                      <td>
                        <Prompt text={card.prompt} />
                      </td>
                      <td className="num">{percent(h.correct, h.attempts)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <footer>
        <span>arrows move</span>
        <span>space select</span>
        <span>enter start</span>
        <span className={pyReady ? "ok" : ""}>{pyReady ? "python ready" : "python loading"}</span>
      </footer>
    </main>
  );
}
