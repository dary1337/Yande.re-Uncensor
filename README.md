# Yande.re Uncensor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](manifest.json)
[![Userscript](https://img.shields.io/badge/Tampermonkey-userscript-success.svg)](#method-1--userscript-easiest)

Unlocks **18+ posts** (`rating:e` / `extreme_content`) on [yande.re](https://yande.re) for guests — **no account, no login required**.

By default, yande.re hides explicit posts behind a "rating:e" / "extreme_content" warning for unregistered users. This tool simply clicks that confirmation for you, so hidden posts are shown automatically.

> **Why not the Chrome Web Store?** Google bans adult/NSFW extensions, so this can't be published there. The methods below are the way to install it.

---

## How it works

The entire logic is a few lines: on every yande.re page it finds the "show anyway" links (`rating:e`, `extreme_content`) and clicks them.

```js
document.querySelectorAll("a.no-focus-outline").forEach((el) => {
  if (el.textContent === "rating:e" || el.textContent === "extreme_content") {
    el.click();
  }
});
```

No permissions, no network access, no data collection. It only runs on `https://yande.re/*`.

---

## Installation

### Method 1 — Userscript (easiest, all browsers)

The simplest way. Works in Chrome, Edge, Brave, Firefox, Opera, and mobile (Kiwi/Firefox Android).

1. Install a userscript manager:
   - [**Tampermonkey**](https://www.tampermonkey.net/) (Chrome / Edge / Firefox / Safari), or
   - [**Violentmonkey**](https://violentmonkey.github.io/) (Chrome / Edge / Firefox).
2. Open the manager dashboard → **Create a new script**.
3. Replace the contents with the script below and press **Ctrl + S** to save:

```js
// ==UserScript==
// @name         Yande.re Uncensor
// @namespace    https://github.com/dary1337/Yande.re-Uncensor
// @version      1.0.0
// @description  Unlocks 18+ posts (rating:e / extreme_content) on Yande.re for guests
// @author       dary1337
// @match        https://yande.re/*
// @icon         https://yande.re/favicon.ico
// @run-at       document-idle
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  "use strict";
  document.querySelectorAll("a.no-focus-outline").forEach((el) => {
    if (el.textContent === "rating:e" || el.textContent === "extreme_content") {
      el.click();
    }
  });
})();
```

4. Open [yande.re](https://yande.re) — hidden posts are now revealed automatically.

### Method 2 — Unpacked extension (Chrome / Edge / Brave)

Use this if you prefer a real extension instead of a userscript.

1. Download the latest **zip** from the [Releases](https://github.com/dary1337/Yande.re-Uncensor/releases) page and unpack it to a permanent folder.
2. Open your browser's extensions page:
   - Chrome / Brave: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable **Developer mode** (toggle in the top‑right / left sidebar).
4. Click **Load unpacked** and select the unpacked folder.
5. Done — open [yande.re](https://yande.re). No extra permissions (file access / incognito) are required.

> ⚠️ With "Load unpacked", the browser may show a warning about developer-mode extensions on each startup. That's normal for sideloaded extensions and is not a problem with this one.

### Method 3 — `.crx` on mobile (Kiwi / Chromium-based mobile browsers)

Mobile Chromium browsers like **Kiwi Browser** can install a packed `.crx` directly (there is no "Load unpacked" on mobile).

1. Download [`yandere-uncencor.crx`](yandere-uncencor.crx) to your phone.
2. Open **Kiwi** → menu → **Extensions**.
3. Tap **+ (from .crx file)** and select the downloaded `yandere-uncencor.crx`.
4. Confirm the install — then open [yande.re](https://yande.re).

> On desktop Chrome this `.crx` will be blocked (Google disables external `.crx` installs), so on desktop use Method 1 or 2 instead.

### Method 4 — Firefox add-on

The userscript (Method 1) is the recommended path for Firefox. A signed `.xpi` may be published later.

---

## Supported browsers

| Browser | Method 1 (userscript) | Method 2 (unpacked) | Method 3 (`.crx`) |
| --- | :---: | :---: | :---: |
| Chrome / Edge / Brave / Opera (desktop) | ✅ | ✅ | — |
| Firefox (desktop) | ✅ | — | — |
| Kiwi / Chromium mobile | ✅ | — | ✅ |
| Firefox Android | ✅ | — | — |

---

## Project files

| File | Purpose |
| --- | --- |
| [`manifest.json`](manifest.json) | Manifest V3 extension manifest |
| [`main.js`](main.js) | Content script (the actual logic) |
| [`yandere-uncencor.crx`](yandere-uncencor.crx) | Packed build for mobile Chromium browsers (Kiwi) |

---

## FAQ

**Does it need my login or any permissions?**
No. It declares zero permissions and only runs on `yande.re`.

**Does it send my data anywhere?**
No. There is no network, storage, or tracking code.

**Will it auto-update?**
The userscript version can auto-update if hosted on Greasy Fork or via `@updateURL`. The unpacked extension does not auto-update.

---

## License

[MIT](LICENSE)
