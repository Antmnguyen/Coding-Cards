import { useEffect, useMemo, useRef, useState } from "react";
import { cards, tags } from "../../cards";
import { buildPatterns, masteredCount, patternStatus, searchPatterns, STATUSES } from "../../core/search";
import { FOCUS_ROUNDS, useStore } from "../store";
import { useKeys } from "../ui";

const LEVELS = ["1 basics", "2 everyday", "3 rare"];

const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

interface Item {
  label: string;
  active: boolean;
  run(): void;
}

/** Every pattern (a skill and its variants) as a searchable, filterable list; Enter drills one. */
export function Browse() {
  const settings = useStore((s) => s.settings);
  const history = useStore((s) => s.history);
  const browse = useStore((s) => s.browse);
  const update = useStore((s) => s.updateBrowse);
  const updateSettings = useStore((s) => s.updateSettings);
  const startFocused = useStore((s) => s.startFocused);
  const goHome = useStore((s) => s.goHome);

  const [selected, setSelected] = useState(0);
  // Keys go to the search line and the list, or (after Tab) to the filter chips.
  const [zone, setZone] = useState<"search" | "filters">("search");
  const [focus, setFocus] = useState({ row: 0, col: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const patterns = useMemo(
    () => buildPatterns(cards.filter((c) => settings.thinking || c.kind === "recall")),
    [settings.thinking],
  );
  const results = useMemo(() => searchPatterns(patterns, browse.query, browse, history), [patterns, browse, history]);
  const at = Math.min(selected, results.length - 1);

  useEffect(() => setSelected(0), [browse, settings.thinking]);
  useEffect(() => {
    listRef.current?.children[at]?.scrollIntoView({ block: "nearest" });
  }, [at]);

  const rows: { name: string; items: Item[] }[] = [
    {
      name: "topic",
      items: [
        { label: "all", active: browse.topics.length === 0, run: () => update({ topics: [] }) },
        ...tags.map((tag) => ({
          label: tag,
          active: browse.topics.includes(tag),
          run: () => update({ topics: toggle(browse.topics, tag) }),
        })),
      ],
    },
    {
      name: "level",
      items: LEVELS.map((label, i) => ({
        label,
        active: browse.levels.includes(i + 1),
        run: () => update({ levels: toggle(browse.levels, i + 1) }),
      })),
    },
    {
      name: "status",
      items: STATUSES.map((status) => ({
        label: status,
        active: browse.statuses.includes(status),
        run: () => update({ statuses: toggle(browse.statuses, status) }),
      })),
    },
    {
      name: "drill",
      items: [
        ...FOCUS_ROUNDS.map((n) => ({
          label: `${n} in a row`,
          active: settings.focusRounds === n,
          run: () => updateSettings({ focusRounds: n }),
        })),
        {
          label: "thinking cards",
          active: settings.thinking,
          run: () => updateSettings({ thinking: !settings.thinking }),
        },
      ],
    },
  ];

  const drill = (all: boolean) => {
    if (results.length === 0) return;
    startFocused(all ? results.map((p) => p.id) : [results[at]!.id]);
  };

  const toSearch = () => {
    setZone("search");
    inputRef.current?.focus();
  };

  function onSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") setSelected(Math.min(at + 1, results.length - 1));
    else if (e.key === "ArrowUp") setSelected(Math.max(at - 1, 0));
    else if (e.key === "PageDown") setSelected(Math.min(at + 10, results.length - 1));
    else if (e.key === "PageUp") setSelected(Math.max(at - 10, 0));
    else if (e.key === "Enter") drill(e.ctrlKey);
    else if (e.key === "Escape") browse.query ? update({ query: "" }) : goHome();
    else if (e.key === "Tab") {
      setZone("filters");
      inputRef.current?.blur();
    } else return;
    e.preventDefault();
  }

  useKeys((e) => {
    // A key typed in the search line has already been handled there.
    if (zone !== "filters" || e.target === inputRef.current) return;
    const row = rows[focus.row]!;
    const move = (dRow: number, dCol: number) => {
      const r = (focus.row + dRow + rows.length) % rows.length;
      const len = rows[r]!.items.length;
      setFocus({ row: r, col: dRow ? Math.min(focus.col, len - 1) : (focus.col + dCol + len) % len });
    };
    if (e.key === "Tab") toSearch();
    else if (e.key === "Enter") drill(e.ctrlKey);
    else if (e.key === "Escape") goHome();
    else if (e.key === " ") row.items[focus.col]!.run();
    else if (e.key === "ArrowRight") move(0, 1);
    else if (e.key === "ArrowLeft") move(0, -1);
    else if (e.key === "ArrowDown") move(1, 0);
    else if (e.key === "ArrowUp") move(-1, 0);
    else return;
    e.preventDefault();
  });

  return (
    <main className="browse">
      <input
        ref={inputRef}
        className="search"
        value={browse.query}
        autoFocus
        spellCheck={false}
        autoComplete="off"
        placeholder="search patterns: append, key=lambda, [::-1], sorting reverse ..."
        onChange={(e) => update({ query: e.target.value })}
        onKeyDown={onSearchKey}
        onFocus={() => setZone("search")}
      />

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
                    "chip" +
                    (item.active ? " active" : "") +
                    (zone === "filters" && focus.row === r && focus.col === c ? " focused" : "")
                  }
                  onClick={() => {
                    setFocus({ row: r, col: c });
                    item.run();
                    toSearch();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pattern-count">
        {results.length} of {patterns.length} patterns
      </div>

      <div className="patterns" ref={listRef}>
        {results.map((p, i) => {
          const status = patternStatus(p, history);
          return (
            <button
              key={p.id}
              tabIndex={-1}
              className={"pattern" + (i === at ? " selected" : "")}
              onClick={() => {
                setSelected(i);
                toSearch();
              }}
              onDoubleClick={() => startFocused([p.id])}
            >
              <span className="pattern-topic">{p.topic}</span>
              <span className="pattern-name">{p.id}</span>
              <span className="pattern-example">{p.cards[0]!.solution.split("\n")[0]}</span>
              <span className={"pattern-status " + status}>
                {status} {masteredCount(p, history)}/{p.cards.length}
              </span>
            </button>
          );
        })}
        {results.length === 0 && <div className="pattern-none">no pattern matches</div>}
      </div>

      <footer>
        <span>type to search</span>
        <span>up/down move</span>
        <span>enter drill pattern</span>
        <span>ctrl+enter drill all listed</span>
        <span>tab filters</span>
        <span>esc {browse.query ? "clear" : "home"}</span>
      </footer>
    </main>
  );
}
