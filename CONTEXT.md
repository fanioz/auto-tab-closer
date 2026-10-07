# Glossary

- **Janitor**: The automated background process that sweeps idle tabs to free RAM.
- **Idle Tab**: A tab whose `lastAccessed` timestamp exceeds the user-configured global threshold.
- **Safety Invariant**: Protected tabs that are never auto-closed regardless of idle time. Always protected: audible tabs, the active tab, and domain exceptions. Conditionally protected: pinned tabs, via the Protect Pinned setting (default on).
- **Exception**: A hostname rule (e.g. `github.com`) configured by the user to prevent auto-closing tabs from that site.
- **Protect Pinned**: User setting (default on) that shields pinned tabs from the janitor. Disabling it is an explicit opt-in to letting idle pinned tabs be closed.
- **Restorability**: The ability to reopen auto-closed tabs from a recent history log stored in local extension storage.
