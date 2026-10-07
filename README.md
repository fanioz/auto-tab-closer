# Tutupen — Auto Close Idle Tabs

A Chrome/Edge extension (Manifest V3) that silently closes idle tabs — tabs you opened, forgot about, and never returned to — to free memory and keep your browsing focused. Everything it closes is restorable. Formerly "Auto Tab Closer".

## How it works

- Every 5 minutes, the extension checks all tabs. A tab is **idle** when it hasn't been accessed (`tabs.lastAccessed`) for longer than the threshold (default: 24 hours).
- **Never closed**: audible (playing media) tabs, the active tab, and domains on your exception list. Pinned tabs are protected by default — there's a toggle in Options to let idle pinned tabs be closed too.
- Closed tabs land in a **Recently Auto-Closed** log (last 100) in the popup with one-click **Restore**; they're also recoverable via `Ctrl+Shift+T` / `chrome://history`.
- Badge shows how many tabs were auto-closed this session.

## Install (unpacked)

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.

Also works in Edge/Brave and other Chromium browsers.

## Configure

Right-click the toolbar icon → **Options** (or the gear in the popup):

- **Idle threshold**: slider from 1 hour to 7 days. Default 24 hours.
- **Protect pinned tabs**: on by default. Turn off only if you want the janitor to close idle pinned tabs as well.
- **Domain exceptions**: hostnames that are never auto-closed. You can also add the current site from the popup with **Exempt Current Domain**.

Settings sync across your Chrome instances; the closed-tabs log stays local.

## Files

| File | Role |
|---|---|
| `manifest.json` | MV3 manifest: permissions (`tabs`, `alarms`, `storage`, `notifications`), popup, options page |
| `background.js` | Service worker: alarm-driven sweep, safety invariants, closed-tabs log, badge |
| `popup.html` / `popup.js` | Exempt current domain + restore log |
| `options.html` / `options.js` | Threshold slider + exception list editor |
| `SPEC.md` | Locked product decisions for the MVP |
| `CONTEXT.md` | Domain glossary |

## Privacy

No network requests, no analytics, no remote code. All data lives in Chrome storage on your machine. See [PRIVACY.md](PRIVACY.md).

## Publishing to the stores

See [STORE_LISTING.md](STORE_LISTING.md) for the ready-to-paste listing, permission justifications, and the submission checklist for Chrome Web Store and Microsoft Edge Add-ons. Build the upload package with `./package.sh`.

## Post-MVP ideas

Per-domain thresholds, URL-pattern exceptions, pre-close warnings, a manual "sweep now" button, context-menu exempting, Firefox support.

## License

[MIT](LICENSE)
