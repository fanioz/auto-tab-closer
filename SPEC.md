# Specification: Auto Tab Closer (Chrome MV3 MVP)

## Overview
A Chrome extension that automatically closes idle tabs to free memory and preserve user focus, acting as a silent janitor with robust safety invariants and instant restorability.

## Core Rules & Invariants
1. **Idle Metric**: `chrome.tabs.Tab.lastAccessed` timestamp compared against current time.
2. **Global Threshold**: Single configurable threshold in hours (default: 24 hours).
3. **Safety Invariants (Never Close)**:
   - Audible tabs (`tab.audible === true`)
   - Active/focused tab in any window (`tab.active === true`)
   - Tabs matching user-defined domain exceptions (`chrome.storage.sync`)
   - Pinned tabs — protected by default (`protectPinned`, default `true`); the user may disable this in Options, after which idle pinned tabs become closeable like any other.
4. **Sweep Interval**: Every 5 minutes via `chrome.alarms` API.
5. **Restorability**: Last 100 auto-closed tabs stored in `chrome.storage.local`. Each entry records title, url, faviconUrl, and closedAt timestamp. Restorable via popup click or `Ctrl+Shift+T`.
6. **UI Surfaces**:
   - **Popup**: Status, list of recently auto-closed tabs with "Restore" button, and "Exempt this domain" button for the current active tab.
   - **Options**: Global threshold slider (1 to 168 hours), pinned-tab protection toggle, and exception hostname list management.
   - **Badge**: Count of auto-closed tabs in current session.
7. **First Run**: Enabled immediately upon install with 24-hour default threshold.
