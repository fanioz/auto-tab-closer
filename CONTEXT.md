# Glossary

- **Janitor**: The automated background process that sweeps idle tabs to free RAM.
- **Idle Tab**: A tab whose `lastAccessed` timestamp exceeds the user-configured global threshold.
- **Safety Invariant**: Protected tabs that are never auto-closed regardless of idle time: pinned tabs, audible tabs, and domain exceptions.
- **Exception**: A hostname rule (e.g. `github.com`) configured by the user to prevent auto-closing tabs from that site.
- **Restorability**: The ability to reopen auto-closed tabs from a recent history log stored in local extension storage.
