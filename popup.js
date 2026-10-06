document.addEventListener('DOMContentLoaded', async () => {
  const openOptionsBtn = document.getElementById('open-options');
  const exemptCurrentBtn = document.getElementById('exempt-current-btn');
  const logContainer = document.getElementById('log-container');

  openOptionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  let currentTab = null;
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTab = tab;
    if (tab && tab.url) {
      const urlObj = new URL(tab.url);
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        exemptCurrentBtn.textContent = `Exempt ${urlObj.hostname}`;
      } else {
        exemptCurrentBtn.disabled = true;
        exemptCurrentBtn.style.opacity = '0.5';
      }
    }
  } catch {
    exemptCurrentBtn.disabled = true;
  }

  exemptCurrentBtn.addEventListener('click', async () => {
    if (!currentTab || !currentTab.url) return;
    try {
      const urlObj = new URL(currentTab.url);
      const hostname = urlObj.hostname;
      const data = await chrome.storage.sync.get(['exceptions']);
      const exceptions = data.exceptions || [];
      if (!exceptions.includes(hostname)) {
        exceptions.push(hostname);
        await chrome.storage.sync.set({ exceptions });
        exemptCurrentBtn.textContent = `Exempted ${hostname}`;
        exemptCurrentBtn.style.borderColor = '#10b981';
        setTimeout(() => {
          window.close();
        }, 1000);
      }
    } catch {}
  });

  await loadClosedTabs();

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.closedTabs) {
      renderLog(changes.closedTabs.newValue || []);
    }
  });
});

async function loadClosedTabs() {
  const data = await chrome.storage.local.get(['closedTabs']);
  renderLog(data.closedTabs || []);
}

function renderLog(closedTabs) {
  const logContainer = document.getElementById('log-container');
  if (!closedTabs || closedTabs.length === 0) {
    logContainer.innerHTML = '<div class="empty-state">No auto-closed tabs yet</div>';
    return;
  }

  logContainer.innerHTML = '';
  const list = document.createElement('ul');
  list.className = 'log-list';

  for (const item of closedTabs) {
    const li = document.createElement('li');
    li.className = 'log-item';

    const info = document.createElement('div');
    info.className = 'tab-info';

    const favicon = document.createElement('img');
    favicon.className = 'tab-favicon';
    favicon.src = item.favIconUrl || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
    favicon.onerror = () => { favicon.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'; };

    const titleSpan = document.createElement('span');
    titleSpan.className = 'tab-title';
    titleSpan.textContent = item.title;
    titleSpan.title = item.url;

    info.appendChild(favicon);
    info.appendChild(titleSpan);

    const restoreBtn = document.createElement('button');
    restoreBtn.className = 'restore-btn';
    restoreBtn.textContent = 'Restore';
    restoreBtn.addEventListener('click', async () => {
      await chrome.tabs.create({ url: item.url });
      const data = await chrome.storage.local.get(['closedTabs']);
      const updated = (data.closedTabs || []).filter(t => t.url !== item.url || t.closedAt !== item.closedAt);
      await chrome.storage.local.set({ closedTabs: updated });
    });

    li.appendChild(info);
    li.appendChild(restoreBtn);
    list.appendChild(li);
  }

  logContainer.appendChild(list);
}
