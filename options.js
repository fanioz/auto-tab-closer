document.addEventListener('DOMContentLoaded', async () => {
  const thresholdSlider = document.getElementById('threshold-slider');
  const thresholdVal = document.getElementById('threshold-val');
  const exceptionInput = document.getElementById('exception-input');
  const addExceptionBtn = document.getElementById('add-exception-btn');
  const exceptionsContainer = document.getElementById('exceptions-container');
  const saveBtn = document.getElementById('save-btn');
  const statusMsg = document.getElementById('status-msg');

  let currentExceptions = [];

  const data = await chrome.storage.sync.get(['thresholdHours', 'exceptions']);
  const hours = data.thresholdHours ?? 24;
  thresholdSlider.value = hours;
  updateThresholdLabel(hours);
  currentExceptions = data.exceptions || [];
  renderExceptions();

  thresholdSlider.addEventListener('input', (e) => {
    updateThresholdLabel(e.target.value);
  });

  function updateThresholdLabel(val) {
    const num = Number(val);
    if (num === 1) {
      thresholdVal.textContent = '1 hour';
    } else if (num < 24) {
      thresholdVal.textContent = `${num} hours`;
    } else {
      const days = (num / 24).toFixed(num % 24 === 0 ? 0 : 1);
      thresholdVal.textContent = `${days} day${days > 1 ? 's' : ''} (${num} hours)`;
    }
  }

  addExceptionBtn.addEventListener('click', () => {
    const val = exceptionInput.value.trim().toLowerCase();
    if (val && !currentExceptions.includes(val)) {
      currentExceptions.push(val);
      exceptionInput.value = '';
      renderExceptions();
    }
  });

  exceptionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addExceptionBtn.click();
    }
  });

  function renderExceptions() {
    exceptionsContainer.innerHTML = '';
    if (currentExceptions.length === 0) {
      exceptionsContainer.innerHTML = '<span style="font-size: 12px; color: var(--text-muted);">No exceptions added yet</span>';
      return;
    }

    for (const exc of currentExceptions) {
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.textContent = exc;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'tag-remove';
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => {
        currentExceptions = currentExceptions.filter(e => e !== exc);
        renderExceptions();
      });

      tag.appendChild(removeBtn);
      exceptionsContainer.appendChild(tag);
    }
  }

  saveBtn.addEventListener('click', async () => {
    const thresholdHours = Number(thresholdSlider.value);
    await chrome.storage.sync.set({
      thresholdHours,
      exceptions: currentExceptions
    });

    statusMsg.classList.add('show');
    setTimeout(() => {
      statusMsg.classList.remove('show');
    }, 2000);
  });
});
