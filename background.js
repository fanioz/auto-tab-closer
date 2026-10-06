const DEFAULT_THRESHOLD_HOURS = 24;
const SWEEP_ALARM_NAME = 'auto-tab-closer-sweep';
const SWEEP_INTERVAL_MINUTES = 5;

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    const data = await chrome.storage.sync.get(['thresholdHours', 'exceptions']);
    if (data.thresholdHours === undefined) {
      await chrome.storage.sync.set({ thresholdHours: DEFAULT_THRESHOLD_HOURS });
    }
    if (!data.exceptions) {
      await chrome.storage.sync.set({ exceptions: [] });
    }
    await chrome.storage.local.set({ closedTabs: [], sessionClosedCount: 0 });

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Auto Tab Closer Active',
      message: `Tabs idle longer than ${DEFAULT_THRESHOLD_HOURS} hours will be automatically closed.`
    });
  }

  chrome.alarms.create(SWEEP_ALARM_NAME, {
    periodInMinutes: SWEEP_INTERVAL_MINUTES
  });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === SWEEP_ALARM_NAME) {
    await sweepIdleTabs();
  }
});

async function sweepIdleTabs() {
  const settings = await chrome.storage.sync.get(['thresholdHours', 'exceptions']);
  const thresholdHours = settings.thresholdHours ?? DEFAULT_THRESHOLD_HOURS;
  const exceptions = settings.exceptions || [];
  const thresholdMs = thresholdHours * 3600 * 1000;
  const now = Date.now();

  const tabs = await chrome.tabs.query({});
  const tabsToClose = [...collectIdleTabs(tabs, thresholdMs, now, exceptions)];
  const newlyClosed = tabsToClose.map(tab => ({
    id: tab.id,
    title: tab.title || 'Untitled',
    url: tab.url,
    favIconUrl: tab.favIconUrl || '',
    closedAt: now
  }));

  if (tabsToClose.length > 0) {
    await chrome.tabs.remove(tabsToClose.map(tab => tab.id));
    await recordClosedTabs(newlyClosed);
  }
}

function* collectIdleTabs(tabs, thresholdMs, now, exceptions) {
  for (const tab of tabs) {
    if (!tab.id) continue;
    if (tab.pinned) continue;
    if (tab.audible) continue;
    if (tab.active) continue;
    if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:')) continue;

    try {
      const urlObj = new URL(tab.url);
      const hostname = urlObj.hostname;
      const isExempt = exceptions.some(exc => hostname === exc || hostname.endsWith('.' + exc));
      if (isExempt) continue;
    } catch {
      continue;
    }

    const lastAccessed = tab.lastAccessed || now;
    const idleTime = now - lastAccessed;

    if (idleTime > thresholdMs) {
      yield tab;
    }
  }
}

async function recordClosedTabs(newlyClosed) {
  const data = await chrome.storage.local.get(['closedTabs', 'sessionClosedCount']);
  const closedTabs = data.closedTabs || [];
  const sessionCount = (data.sessionClosedCount || 0) + newlyClosed.length;

  const updated = [...newlyClosed, ...closedTabs].slice(0, 100);

  await chrome.storage.local.set({
    closedTabs: updated,
    sessionClosedCount: sessionCount
  });

  if (sessionCount > 0) {
    chrome.action.setBadgeText({ text: String(sessionCount) });
    chrome.action.setBadgeBackgroundColor({ color: '#4F46E5' });
  }
}
