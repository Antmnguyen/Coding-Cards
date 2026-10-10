# Releasing a new version

How to build `codingcards.exe` and put it on GitHub so people can download it.

Run every command from the project folder (the one containing `package.json`).

## One-time setup

1. Install [Node.js](https://nodejs.org) 22 or newer.
2. Install the project's dependencies:

   ```
   npm install
   ```

## Part 1 — Build the exe

1. Open `package.json` and raise the `version` number, for example `"0.1.0"` to `"0.2.0"`. Save the file.

2. Check that nothing is broken:

   ```
   npm test
   ```

   Every test should pass. If one fails, fix it before going on.

3. Build the exe:

   ```
   npm run dist
   ```

   This takes a minute or two. When it finishes, the exe is here:

   ```
   release\codingcards.exe
   ```

4. Double-click `release\codingcards.exe` and try a few cards to confirm it works.

## Part 2 — Save the code to GitHub

The `release` folder is not tracked by git, so the exe itself is never committed. Only the code is.

```
git add -A
git commit -m "Release v0.2.0"
git push
```

Use the version number you set in Part 1.

## Part 3 — Publish the release on GitHub

1. Go to <https://github.com/Antmnguyen/Coding-Cards/releases/new>.

2. Click **Choose a tag**, type `v0.2.0` (your version with a `v` in front), then click **Create new tag: v0.2.0 on publish**.

3. Leave **Target** set to `main`.

4. In **Release title**, type `v0.2.0`.

5. In the description box, write a line or two about what changed. Or click **Generate release notes**.

6. Drag `release\codingcards.exe` from File Explorer into the box that says **Attach binaries by dropping them here or selecting them**. Wait until the upload bar finishes and the file name appears in the list.

7. Make sure **Set as the latest release** is ticked.

8. Click **Publish release**.

## Part 4 — Check it worked

1. Open <https://github.com/Antmnguyen/Coding-Cards/releases/latest>. It should show your new version with `codingcards.exe` under **Assets**.

2. Click this link, which is the one the README gives to users. It should download the new exe:

   <https://github.com/Antmnguyen/Coding-Cards/releases/latest/download/codingcards.exe>

## Things to know

- **Keep the file named `codingcards.exe`.** The README download link depends on that exact name. The build already names it correctly, so do not rename it before uploading.
- **The repository must be public** for other people to download the exe. Check under **Settings → General → Danger Zone → Change repository visibility**.
- **Uploaded the wrong file?** Open the release, click the pencil icon to edit it, delete the old exe under **Assets**, drag in the new one, and click **Update release**.
- **The "Windows protected your PC" warning** appears for users because the exe is not code-signed. It is expected; the README tells users to click **More info**, then **Run anyway**.
