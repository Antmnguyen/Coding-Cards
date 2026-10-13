import { useMemo, useState } from "react";
import { cards, groups } from "../../cards";
import { tagStats, weakPool, worstCards } from "../../core/history";
import { sessionPool } from "../../core/pool";
import type { Mode, SessionLength } from "../../core/types";
import { useStore } from "../store";
import { percent, Prompt, useKeys } from "../ui";

const LENGTHS: { label: string; value: SessionLength }[] = [
  { label: "5", value: { kind: "count", n: 5 } },
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

const LEVELS = ["1 basics", "2 everyday", "3 rare"];

const MODES: { label: string; value: Mode; note: string }[] = [
  { label: "standard", value: "standard", note: "each card until it is right 2 times in a row" },
  {
    label: "once through",
    value: "once",
    note: "each card once; a miss is retyped, then repeated at the end until it is right first try",
  },
  { label: "practice weak", value: "weak", note: "cards you have been getting wrong, and their variants" },
];

const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

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
  const openBrowse = useStore((s) => s.openBrowse);
  const [focus, setFocus] = useState({ row: 0, col: 0 });

  const rows: { name: string; items: Item[] }[] = [
    { name: "topics", items: [{ label: "all", active: settings.tags.length === 0, run: () => update({ tags: [] }) }] },
    ...groups.map((group) => ({
      name: group.name,
      items: group.topics.map((tag) => ({
        label: tag,
        active: settings.tags.includes(tag),
        run: () => update({ tags: toggle(settings.tags, tag) }),
      })),
    })),
    {
      name: "mode",
      items: MODES.map((m) => ({
        label: m.label,
        active: settings.mode === m.value,
        run: () => update({ mode: m.value }),
      })),
    },
    {
      name: "level",
      items: LEVELS.map((label, i) => ({
        label,
        active: settings.levels.includes(i + 1),
        run: () => update({ levels: toggle(settings.levels, i + 1) }),
      })),
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
        { label: "thinking cards", active: settings.thinking, run: () => update({ thinking: !settings.thinking }) },
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
    else if (e.key === "/") openBrowse();
    else if (e.key === " ") row.items[focus.col]!.run();
    else if (e.key === "ArrowRight") move(0, 1);
    else if (e.key === "ArrowLeft") move(0, -1);
    else if (e.key === "ArrowDown") move(1, 0);
    else if (e.key === "ArrowUp") move(-1, 0);
    else return;
    e.preventDefault();
  });

  // Thinking cards stay out of the numbers unless they are being drilled.
  const shown = useMemo(() => cards.filter((c) => settings.thinking || c.kind === "recall"), [settings.thinking]);
  const stats = useMemo(() => tagStats(shown, history), [shown, history]);
  const worst = useMemo(() => worstCards(shown, history, 5), [shown, history]);
  const hasHistory = stats.some((s) => s.attempts > 0);
  const weak = useMemo(() => weakPool(sessionPool(cards, settings), history), [settings, history]);
  const note =
    settings.mode !== "weak"
      ? MODES.find((m) => m.value === settings.mode)!.note
      : weak.weak.length === 0
        ? "no weak cards in these topics and levels: nothing to practise yet"
        : `${weak.weak.length} weak cards and ${weak.variants.length} variants in these topics and levels`;

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

      <p className="mode-note">{note}</p>

      <div className="actions">
        <button className="start" tabIndex={-1} onClick={start}>
          enter to start
        </button>
        <button className="start secondary" tabIndex={-1} onClick={openBrowse}>
          / browse patterns
        </button>
      </div>

      {hasHistory && (
        <section className="stats">
          <div>
            <h2>accuracy and mastery by topic</h2>
            <table>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.tag}>
                    <td>{s.tag}</td>
                    <td className="num">{percent(s.correct, s.attempts)}</td>
                    <td className="num dim">
                      {s.mastered}/{s.total} mastered
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
        <span>/ browse patterns</span>
        <span className={pyReady ? "ok" : ""}>{pyReady ? "python ready" : "python loading"}</span>
      </footer>
    </main>
  );
}
