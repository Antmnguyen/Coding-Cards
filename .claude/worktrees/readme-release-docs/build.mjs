import { build } from "esbuild";
import { copyFile, mkdir, rm } from "node:fs/promises";

const common = { bundle: true, minify: true, logLevel: "info" };
const node = { ...common, platform: "node", format: "cjs", external: ["electron"] };

// The parts of the pyodide package needed at runtime.
const PYODIDE_FILES = ["pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"];

await rm("dist", { recursive: true, force: true });

await Promise.all([
  build({ ...node, entryPoints: ["src/main/main.ts"], outfile: "dist/main.js" }),
  build({ ...node, entryPoints: ["src/main/preload.ts"], outfile: "dist/preload.js" }),
  build({
    ...common,
    entryPoints: ["src/renderer/index.tsx"],
    outdir: "dist/renderer",
    platform: "browser",
    format: "iife",
    jsx: "automatic",
    loader: { ".woff2": "file", ".woff": "file" },
    assetNames: "fonts/[name]",
    define: { "process.env.NODE_ENV": '"production"' },
  }),
  build({
    ...common,
    entryPoints: ["src/runner/pyWorker.ts"],
    outfile: "dist/renderer/pyWorker.js",
    platform: "browser",
    format: "esm",
  }),
]);

await mkdir("dist/renderer/pyodide", { recursive: true });
await Promise.all([
  copyFile("src/renderer/index.html", "dist/renderer/index.html"),
  ...PYODIDE_FILES.map((f) => copyFile(`node_modules/pyodide/${f}`, `dist/renderer/pyodide/${f}`)),
]);
