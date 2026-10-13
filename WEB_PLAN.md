# Plan: codingcards in the browser

Goal: the same app at a public URL, with nothing to install. The Windows exe keeps working from the same code.

Written 2026-10-12. Hosting limits below were checked against the providers' docs on that date where marked; the rest is flagged as unverified.

## Why this is a small port

The app is already a web page inside an Electron window. Only three things are Electron-specific:

| Electron piece | File | What replaces it on the web |
|---|---|---|
| Saving history and settings to disk over IPC | `src/main/main.ts`, `src/main/preload.ts`, `window.api` in `src/renderer/store.ts` | `localStorage` in the browser |
| The `app://` protocol that serves the files | `src/main/main.ts` | The host serves the same files over HTTPS |
| Window size, no menu bar | `src/main/main.ts` | Nothing; CSS already handles layout |

Everything else is already browser code: React, the card deck, the queue, and Python (Pyodide, running in a web worker from files shipped next to the page). All paths in `index.html`, `runner.ts` and `pyWorker.ts` are relative, so they work from any URL.

There is **no server**. No accounts, no database, no API. Each user's progress lives in their own browser. That is what makes the hosting requirements achievable.

## What the user gets, and what they do not

- Open the URL, start typing. Python finishes loading in the background, as it does today.
- Progress is saved in that browser on that device.
- **No sync between devices and no accounts.** Clearing site data wipes progress. Step 3 adds export and import so progress can be backed up or moved.
- Desktop browsers with a keyboard. The app is keyboard-driven; phones are out of scope (step 5 shows a notice).

## Steps

Each step ends with a check. Do them in order.

### 1. Storage behind one interface

New file `src/renderer/storage.ts`:

```ts
export type StoreName = "history" | "settings";
export interface Storage {
  read(name: StoreName): Promise<unknown>;
  write(name: StoreName, data: unknown): Promise<void>;
}
```

- `desktopStorage`: wraps `window.api` (today's behaviour, unchanged).
- `browserStorage`: `localStorage.getItem("codingcards:" + name)` and `JSON.parse`; `setItem` on write. Every call is wrapped in try/catch: a read that fails returns `null`, a write that fails is logged and ignored, so a browser with storage blocked still runs (progress just is not kept).
- `export const storage = window.api ? desktopStorage : browserStorage`.
- `store.ts` uses `storage.read` / `storage.write` in place of `window.api.*`; the `Window.api` type becomes optional.

Size check: history is about 100 bytes per card, 1,519 cards, so at most ~150 KB. The `localStorage` limit is about 5 MB.

Check: `npm run typecheck`, `npm test`, `npm start` and confirm the exe build still saves and loads.

### 2. Validate what is loaded

Today `init()` accepts any object as history. On the web the stored value can be edited by the user or come from an import file, so add `cleanHistory(raw)` next to `cleanSettings` in `store.ts`: keep only entries whose key is a string and whose six fields are finite numbers; drop the rest. Unit-test it in `tests/history.test.ts` (move the function into `src/core/history.ts` so it is testable without the store).

Check: tests for a valid history, a history with junk entries, `null`, an array, and a string.

### 3. Export and import progress

On Home, two small buttons under the stats: `export progress`, `import progress`.

- Export: `{ version: 1, history, settings }` as a JSON file download (`Blob` + a temporary `<a download>`), named `codingcards-progress.json`.
- Import: a hidden `<input type="file" accept="application/json">`. Parse, run through `cleanHistory` and `cleanSettings`, replace the store, write both back. Bad files show one line of error text and change nothing.
- Works in the exe too, which gives a way to move existing progress from the exe to the website.

Check: export in the exe, import in the browser build, numbers on Home match.

### 4. A web build target

`build.mjs` takes a target: `node build.mjs` (desktop, as now) or `node build.mjs web`.

The web target writes `dist-web/`:

```
dist-web/
  index.html
  index.js  index.css
  pyWorker.js
  fonts/          4 files
  pyodide/        pyodide.mjs, pyodide.asm.mjs, pyodide.asm.wasm, python_stdlib.zip, pyodide-lock.json
  _headers
```

- Same renderer and worker builds as today; skip `main.ts` and `preload.ts`.
- No source maps (they would publish local file paths).
- `_headers` (a Cloudflare Pages file) sets, for every path:
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; font-src 'self'; frame-ancestors 'none'` (the current meta tag plus `frame-ancestors`, which a meta tag cannot set)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: no-referrer`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `package.json` scripts: `"build:web": "node build.mjs web"`, `"preview:web": "npx serve dist-web"`.
- `.gitignore`: add `dist-web/`.

Sizes today: `pyodide.asm.wasm` 9.6 MB, `python_stdlib.zip` 2.5 MB, `pyodide.asm.mjs` 1.25 MB, `index.js` 0.7 MB. About 14 MB before compression, downloaded once per browser and then cached. The largest file is well under the host's 25 MiB per-file limit.

(Step 8 adds two Cloudflare hosts to this CSP for the visitor count.)

Check: `npm run build:web`, then `npm run preview:web` and open it in Chrome. Footer reaches `python ready`. Answer a card that needs the run check. Reload: history is still there. No console errors, no CSP violations, and the Network tab shows no request to any other domain.

### 5. Browser-only details

- `index.html`: add `<meta name="viewport" content="width=device-width, initial-scale=1">` and a favicon (an inline SVG data URI needs `img-src data:` in the CSP; a `favicon.svg` file does not, so use a file).
- Narrow or touch-only screens: one line at the top of Home, "codingcards needs a keyboard", shown with a CSS media query (`(pointer: coarse)`). No other mobile work.
- Shortcuts to re-test in a browser, because the browser has its own: `Ctrl+F` in the drill (already calls `preventDefault`), `Tab` on Results, `/` on Home, `Esc`.
- Two tabs open at once would overwrite each other's history. Listen for the `storage` event in `init()` and reload history when another tab writes.
- Test in Chrome, Firefox and Edge. Safari if available (module workers with dynamic `import()` need Safari 15 or newer).

Check: every shortcut on every screen in each browser; two tabs stay in step.

### 6. Privacy scrub before anything is uploaded

Run on `dist-web/` and fail the build if any of these match:

```
grep -rniE "antmnguyen|ants\b|users[\\/]|gmail|github.com" dist-web
```

- The site must not link to the GitHub repo. The repo URL contains the account name, and the commit history contains a personal Gmail address. That is separate from the web port, but the website is only anonymous if it does not point there.
- No external fonts, no CDN scripts. Already true; the CSP in step 4 enforces it. The one exception is the visitor count in step 8, which is Cloudflare's own script and sets no cookies.
- Choose a project name for the URL that is not tied to any username.

Check: the grep prints nothing.

### 7. Deploy

Cloudflare Pages, direct upload. No Git connection, so the host never sees the repository.

One time, by hand (interactive login):

1. Create a Cloudflare account. Do not add a payment method.
2. `npx wrangler login`
3. `npx wrangler pages project create <name> --production-branch main`

Every release:

```
npm test
npm run build:web
npx wrangler pages deploy dist-web --project-name <name>
```

Add that last line as `"deploy:web"` in `package.json`. The site is at `https://<name>.pages.dev`.

Check: open the URL in a private window, repeat the step 4 checks against the live site, and confirm the response headers from `_headers` are present.

### 8. Visitor count

Cloudflare Web Analytics, turned on for the Pages project. Same account as the hosting, free, no cookies, no extra service to sign up for.

How it counts: Cloudflare adds a small script to the page, and the script reports each page load. A crawler or attack tool that only downloads files never runs the script, so it is not counted. That is what makes the number "real visitors" rather than raw requests.

Set up, one time:

1. Cloudflare dashboard: Workers & Pages, the project, Metrics, enable Web Analytics. Cloudflare injects the script on the next deploy, so nothing goes into `index.html` and the exe is untouched.
2. Widen the CSP in `_headers` (step 4) by two hosts, or the script is blocked and the count stays at zero:
   - `script-src 'self' 'wasm-unsafe-eval' https://static.cloudflareinsights.com`
   - add `connect-src 'self' https://cloudflareinsights.com`
3. Deploy again.

Confirm the two host names against Cloudflare's Web Analytics docs when doing this; they are from memory.

What the number means:

- **It is visits and page views, not unique people.** With no cookies, one person on five days is five visits. The app is a single page, so visits and page views will be nearly the same number.
- **It undercounts.** Ad blockers and some browsers block the script, and programmers use blockers more than most. Treat it as a floor.
- **It says nothing about use.** A visit is someone who opened the page, not someone who answered a card.
- Step 4's check changes to: no request to any other domain except `static.cloudflareinsights.com` and `cloudflareinsights.com`.

Not chosen:

- A self-made counter (Pages Function plus a KV store): it counts every request including bots, an attacker can inflate it, and Functions are metered (100,000 requests a day on the free plan).
- GoatCounter or similar: does give unique visitors, but it is a second account and a second company seeing the traffic.

Check: open the live site in a private window with no blocker, wait a few minutes, and see the visit in the dashboard. No CSP errors in the console.

### 9. Docs

- `README.md`: add the URL above the exe download; say progress is stored in the browser and how to export it.
- `UPDATE.md`: add a "Releasing the website" part with the three commands from step 7.

### Not in this plan

- Accounts, cross-device sync, leaderboards. These need a server and a database, which breaks "low maintenance" and means holding user data.
- Offline install (service worker / PWA). Possible later; the browser cache already avoids re-downloading Python.
- Phone layout.

## Where to host it

### What the requirements rule in and out

| Requirement | What it means here |
|---|---|
| Free, permanently, no credits to run out | A free tier with no usage meter on what this app uses, not a trial or monthly credit |
| Cannot be run up by an attack | No payment method on file, or a plan that stops serving instead of billing |
| Does not leak anything about you | No public repo required, no username in the URL, no domain registration record |
| Low maintenance | Static files only; nothing to patch, restart or renew |
| About 1,000 users | ~14 MB first load each, so ~14 GB if all 1,000 arrive in one month, then almost nothing |

Because the app has no server, 1,000 users is not a hard target. The only cost a visitor creates is a file download.

### Options

| Host | Free and unmetered? | Can you be billed? | Privacy | Verdict |
|---|---|---|---|---|
| **Cloudflare Pages** | Yes. Docs: "requests to static assets are free and unlimited" on free and paid plans. Limits that apply: 20,000 files, 25 MiB per file, 500 builds a month. | No, with no payment method on the account. | Direct upload needs no repo. URL is `<name>.pages.dev`, a name you pick. Account email is not shown. | **Recommended** |
| GitHub Pages | Yes, with soft limits: 100 GB a month bandwidth, 1 GB site. Over that, the site may stop being served or you get an email. | No. There is no paid overage. | **Fails.** Free plan requires a public repo, and the URL is `<username>.github.io`. A separate throwaway account would fix it, at the cost of a second account to look after. | Runner-up |
| Netlify | Free plan is a monthly credit allowance. Reported as 300 credits, roughly 30 GB (unverified, from third-party write-ups). | Reported to pause the site when credits run out rather than bill (unverified). | Direct upload possible. | Fails "no credits to run out" |
| Vercel Hobby | Metered; the account is paused when limits are passed, and users report pauses outlasting the reset. Non-commercial use only. | No on Hobby. | Fine. | Fails "low maintenance" |
| Firebase Hosting (free) | Small daily transfer cap (from memory, about 360 MB a day; unverified). That is about 25 first visits a day at 14 MB. | No on the free plan. | Fine. | Fails 1,000 users |
| A VPS or home server | No | Yes, or your home IP is exposed | Poor | No |

### Why Cloudflare Pages

- **Attack traffic costs nothing.** Static requests are not metered, DDoS filtering is part of the free plan, and with no card on the account there is nothing to charge. The worst realistic outcome is Cloudflare suspending the project, not a bill.
- **Nothing identifies you.** Direct upload from your machine, a project name you choose, no domain to register.
- **Nothing to maintain.** No server, no certificate renewals, no dependencies running in production. A release is one command.

### Limits and honest caveats

- **"Permanently free" is a company policy, not a guarantee.** Nobody can promise it. What protects you is that the site is a folder of static files: moving it to another host is a 10-minute job.
- **Moving hosts changes the address, and browser storage is tied to the address.** Users' progress would not follow. Export/import (step 3) is the answer, and the reason it is in the plan.
- **A custom domain is not free** and its registration is a privacy question of its own. Stay on `pages.dev`.
- **500 builds a month** does not apply to direct uploads in any way that matters; a deploy is an upload, and you will do a handful a month.
- Cloudflare also offers static hosting through Workers and suggests it as an alternative on its limits page. The same `dist-web/` folder works there if Pages is ever retired.
- **Anything with a server is not possible under these requirements.** Accounts, sync, shared leaderboards and per-user stats (who answered what) all need a database, which brings quotas, user data and upkeep. If one of those is wanted later, it needs its own decision.

Sources: Cloudflare Pages limits (developers.cloudflare.com/pages/platform/limits), Cloudflare Pages Functions pricing (developers.cloudflare.com/pages/functions/pricing), GitHub Pages limits (docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
