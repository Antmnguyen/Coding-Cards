import { app, BrowserWindow, ipcMain, Menu, net, protocol } from "electron";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join, sep } from "node:path";
import { pathToFileURL } from "node:url";

const RENDERER_DIR = join(__dirname, "renderer");
const STORES = new Set(["history", "settings"]);

// A real origin (instead of file://) lets the page fetch the Pyodide wasm and start workers.
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } },
]);

const storePath = (name: string) => join(app.getPath("userData"), `${name}.json`);

let writes: Promise<unknown> = Promise.resolve();

function registerStore() {
  ipcMain.handle("store:read", async (_e, name: string) => {
    if (!STORES.has(name)) return null;
    try {
      return JSON.parse(await readFile(storePath(name), "utf8"));
    } catch {
      return null;
    }
  });

  ipcMain.handle("store:write", (_e, name: string, data: unknown) => {
    if (!STORES.has(name)) return;
    // Writes are chained and go through a temp file so a crash never leaves half a file.
    writes = writes
      .then(async () => {
        const path = storePath(name);
        await mkdir(app.getPath("userData"), { recursive: true });
        await writeFile(path + ".tmp", JSON.stringify(data));
        await rename(path + ".tmp", path);
      })
      .catch((err) => console.error(`saving ${name} failed`, err));
    return writes;
  });
}

function registerProtocol() {
  protocol.handle("app", (request) => {
    const path = join(RENDERER_DIR, decodeURIComponent(new URL(request.url).pathname));
    if (path !== RENDERER_DIR && !path.startsWith(RENDERER_DIR + sep)) {
      return new Response("Not found", { status: 404 });
    }
    return net.fetch(pathToFileURL(path).toString());
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 720,
    minHeight: 520,
    backgroundColor: "#262a33",
    webPreferences: { preload: join(__dirname, "preload.js") },
  });
  win.loadURL("app://bundle/index.html");
}

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  registerStore();
  registerProtocol();
  createWindow();
});

app.on("window-all-closed", () => app.quit());
