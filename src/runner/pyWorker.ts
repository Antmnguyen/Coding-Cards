import { HARNESS, RUN_FN } from "./harness";

export interface RunRequest {
  id: number;
  setup: string;
  answer: string;
  check: string;
}

export type RunMessage = { type: "ready" } | { type: "result"; id: number; ok: boolean };

const post = (msg: RunMessage) => (self as unknown as Worker).postMessage(msg);

const indexURL = new URL("./pyodide/", self.location.href).href;

// The URL is built at runtime so esbuild leaves the import alone and Pyodide
// loads from the files shipped next to this worker.
const run: Promise<(setup: string, answer: string, check: string) => boolean> = import(indexURL + "pyodide.mjs")
  .then((mod) => mod.loadPyodide({ indexURL }))
  .then((py) => {
    py.runPython(HARNESS);
    post({ type: "ready" });
    return py.globals.get(RUN_FN);
  });

self.onmessage = async (e: MessageEvent<RunRequest>) => {
  const { id, setup, answer, check } = e.data;
  let ok = false;
  try {
    ok = !!(await run)(setup, answer, check);
  } catch {
    ok = false;
  }
  post({ type: "result", id, ok });
};
