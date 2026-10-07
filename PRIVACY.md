# Privacy Policy — Tutupen

_Last updated: October 7, 2026_

Tutupen (formerly "Auto Tab Closer") is a browser extension that automatically closes tabs that have been idle for longer than a threshold you configure. **It does not collect, transmit, sell, or share any data.**

## What the extension stores

All data lives exclusively in your browser's built-in extension storage on your own devices:

- **Settings** (`chrome.storage.sync`, synced by your browser across your own signed-in browser instances): idle threshold, pinned-tab protection on/off, and your domain exception list (hostnames only).
- **Auto-closed tab log** (`chrome.storage.local`, stays on this device only): the title, URL, favicon URL, and close time of recently auto-closed tabs (capped at 100 entries / used only to power the Restore list).

## What the extension accesses

- The `tabs` permission is used solely to read each tab's metadata (pinned/audible/active state, URL, title, and last-accessed time) and to close or reopen tabs. Nothing is sent anywhere.
- The extension makes **no network requests**, contains **no remote code**, and includes **no analytics, trackers, or ads**.

## Third parties

None. There are no third-party services, servers, or SDKs involved.

## Data removal

Uninstalling the extension removes all stored data automatically. You can also clear the closed-tabs log by removing entries via the popup.

## Contact

Open an issue at <https://github.com/fanioz/auto-tab-closer/issues> for any privacy question.
