// Writes audit.tsv: every card with its idea count, for RECALL_AUDIT_PLAN.md.
// Usage: node scripts/audit.mjs [topic ...]   (topics also print to the terminal)
import { build } from "esbuild";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const dir = await mkdtemp(join(tmpdir(), "audit-"));
const outfile = join(dir, "bundle.mjs");
await build({
  stdin: {
    contents: 'export { cards } from "./src/cards"; export { countIdeas } from "./src/core/ideas"; export { COUNTED_BY_HAND } from "./src/cards/thinking";',
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "error",
});
const { cards, countIdeas, COUNTED_BY_HAND } = await import(pathToFileURL(outfile).href);

const rows = cards.map((c) => ({
  id: c.id,
  topic: c.tags[0],
  level: c.level,
  ideas: countIdeas(c.solution),
  hand: COUNTED_BY_HAND[c.id] ?? "",
  kind: c.kind,
  solution: c.solution.replace(/\n/g, " ⏎ "),
}));
const order = [...new Set(rows.map((r) => r.topic))];
rows.sort((a, b) => order.indexOf(a.topic) - order.indexOf(b.topic) || b.ideas - a.ideas);

const cols = ["id", "topic", "level", "ideas", "hand", "kind", "solution"];
await writeFile("audit.tsv", [cols.join("\t"), ...rows.map((r) => cols.map((c) => r[c]).join("\t"))].join("\n") + "\n");

const real = (r) => (r.hand === "" ? r.ideas : r.hand);
const wrong = rows.filter((r) => (r.kind === "recall") !== real(r) <= 2);
console.log(`${rows.length} cards, ${rows.filter((r) => r.kind === "think").length} thinking, ${wrong.length} with a label that does not match the count`);
for (const topic of process.argv.slice(2)) {
  for (const r of rows.filter((x) => x.topic === topic)) console.log(`${r.ideas}${r.hand === "" ? " " : "h"} ${r.kind === "think" ? "T" : " "} ${r.id}  ::  ${r.solution}`);
}
