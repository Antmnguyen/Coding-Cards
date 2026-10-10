# Coding Cards

A lightning-fast, keyboard-driven desktop flashcard app designed for practicing Python syntax, standard library modules, and tricky language edge cases. Built with a clean, distraction-free interface inspired by Monkeytype, it helps you build muscle memory for the code you write every day.

## Get it running

Windows only. Nothing to install — no Python, no Node, no setup.

1. Download **[codingcards.exe](https://github.com/Antmnguyen/Coding-Cards/releases/latest/download/codingcards.exe)** (about 100 MB).
2. Double-click `codingcards.exe`.
3. If Windows shows a blue **"Windows protected your PC"** box, click **More info**, then **Run anyway**. This appears because the app is not code-signed.

That's it. The app takes a few seconds to open.

To update later, download the exe again from the same link and replace the old file. All versions are listed on the [Releases page](https://github.com/Antmnguyen/Coding-Cards/releases).

## Features

* **Rapid-Fire Practice:** Fully keyboard-driven workflow. Type your code, hit `Enter` to submit, and instantly see explanations without lifting your hands from the home row.
* **Smart Answer Checking:** Instant evaluation that checks strict matches, normalizes syntax, or runs your code against custom test assertions using a background Python runtime (Pyodide).
* **Adaptive Learning Queue:** Uses a weighted scheduling system powered by your history. Cards you struggle with show up more frequently, while mastered concepts fade out to keep your practice efficient.
* **Custom Sessions:** Filter practice by specific topics (like `heapq`, `collections`, `itertools`, or built-ins), set card limits, or challenge yourself with timed blitz modes.
* **Offline & Portable:** Runs entirely locally as a single standalone application with no internet connection or server required.

## Run from source

Only needed if you want to change the code. Requires [Node.js](https://nodejs.org) 22 or newer.

```
git clone https://github.com/Antmnguyen/Coding-Cards.git
cd Coding-Cards
npm install
npm start
```

To build the exe and publish a new release, see [UPDATE.md](UPDATE.md).
