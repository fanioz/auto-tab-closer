# Store Listing — Tab Janitor

Ready-to-paste copy for both stores. Package: `dist/tab-janitor-<version>.zip` (build with `./package.sh`).

---

## Identity

| Field | Value |
|---|---|
| Name | `Tab Janitor — Auto Close Idle Tabs` |
| Version | `1.0.0` |
| Language | English (add `id` locale later if wanted) |
| Category | Productivity (Edge: "Productivity") |
| Price | Free |
| Distribution | Public, all countries |

## Short summary (CWS, ≤132 chars; Edge "short description")

> Automatically closes tabs you forgot about — frees memory, keeps you focused. Everything restorable.

(103 chars ✓)

## Detailed description

> **You open tabs "for later". Later never comes. Meanwhile, they eat your RAM.**
>
> Tab Janitor is a silent janitor for your browser: every 5 minutes it checks your tabs and closes the ones you haven't touched for longer than your threshold — so your memory stays free and your tab strip stays sane.
>
> ✨ **How it works**
> • Set one threshold — from 1 hour up to 7 days (default: 24 hours)
> • Tabs you haven't accessed for that long get closed automatically
> • Every auto-closed tab lands in a Restore list — one click brings it back (they also stay recoverable via Ctrl/Cmd+Shift+T)
>
> 🛡️ **What never gets touched**
> • Tabs playing audio or video
> • The tab you're looking at right now
> • Sites you exempt (add them from the popup in one click, e.g. gmail.com)
> • Pinned tabs — protected by default (you can turn this off in Settings if you really want)
>
> 📊 **Stay in control**
> • Badge shows how many tabs the janitor cleaned this session
> • Recently auto-closed list with one-click Restore
> • Per-domain exceptions for the tabs you always want alive
>
> 🔒 **Private by design** — no network requests, no analytics, no accounts. All data stays in your browser. See the privacy policy for details.
>
> Install it, set it, forget about forgetting tabs.

## Single purpose statement (CWS dashboard)

> Improve browser performance and focus by automatically closing tabs that have been idle longer than a user-configured threshold, and letting the user restore them.

## Permission justifications (CWS "Privacy practices" tab / Edge notes)

- **`tabs`** — Required to read each tab's idle time (`lastAccessed`), pinned/audible/active state, URL and title so the janitor can decide which tabs to close, record closed tabs in the restore log, and reopen a tab on Restore. All processing is local; no data is transmitted.
- **`alarms`** — Required to wake the extension's service worker every 5 minutes to run the idle-tab sweep. Without alarms the extension cannot function while the service worker is dormant.
- **`storage`** — Stores user settings (threshold, pinned-tab protection, domain exceptions) in `storage.sync`, and the recently-closed tab list in `storage.local` so tabs remain restorable. No other data is stored.
- **Host permissions** — none requested. The extension does not read page content.

## Data usage disclosures (CWS)

- Does this item collect or use personal/sensitive user data? **No data is collected, transmitted, or sold.** Tab metadata is read and processed locally to decide which tabs to close, and stored locally (settings synced by the browser's own sync) only for the restore feature.
- Privacy policy URL: `https://github.com/fanioz/auto-tab-closer/blob/main/PRIVACY.md`
- Support: `https://github.com/fanioz/auto-tab-closer/issues` (+ developer email filled at registration)

## Image assets

| Asset | Size | Used by | File |
|---|---|---|---|
| Screenshots | 1280×800 (max 5, PNG/JPEG) | CWS | `store-assets/screenshot-*.png` |
| Screenshots | 1366×768 (max 5) | Edge | `store-assets/screenshot-edge-*.png` |
| Store logo | 300×300 | Edge | `store-assets/logo-300.png` |
| Icon | 128×128 | in package | `icon.png` |

Promo tiles (CWS 440×280, Edge 540×540 / 1400×560) are optional at submission time; add later if the dashboard demands them.

## Submission checklist

### You (HITL, ~20 min)
1. **Edge (first)**: sign in at <https://partner.microsoft.com/dashboard/microsoftedge> with a Microsoft account → register as Edge developer (free) → "Create new extension" → upload `dist/tab-janitor-1.0.0.zip` → paste the listing above → upload store assets → submit. Privacy policy URL + support email required.
2. **Chrome Web Store**: pay the one-time **$5** fee at <https://chrome.google.com/webstore/devconsole> → "New item" → upload the same zip → fill Privacy practices tab with the disclosures above (single purpose + three permission justifications) → submit.

### Me (done / on request)
- [x] Package zip: `./package.sh` → `dist/tab-janitor-1.0.0.zip`
- [x] Privacy policy (`PRIVACY.md`)
- [x] Listing copy + justifications (this file)
- [ ] Screenshots (capture via browser when idle; then `sips` resize for Edge)
- [ ] Edge store logo 300×300 (render from `icon.svg`)
