class Checklist {
  constructor(data, progress) {
    this.data = data;
    this.progress = progress;
    this.container = document.querySelector('#checklist .grid');
  }

  render() {
    this.container.innerHTML = '';
    Object.entries(this.data).forEach(([category, items]) => {
      const div = document.createElement('div');
      div.className = 'bg-white border border-gray-200 rounded-lg p-4';
      div.innerHTML = `
        <h3 class="font-semibold text-primary mb-3 capitalize">${getCategoryTitle(category)}</h3>
        <div class="space-y-2">
          ${items.map((item, idx) => {
            const key = `${category}-${idx}`;
            const checked = this.progress[key] || false;
            return `<label class="checklist-item flex items-start space-x-2 cursor-pointer ${checked ? 'completed' : ''}">
              <input type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" onchange="checklistComponent.toggleItem(this, '${key}')" ${checked ? 'checked' : ''}>
              <span class="text-primary text-sm">${item}</span>
            </label>`;
          }).join('')}
        </div>
        <div class="mt-3 text-xs text-muted">
          <span class="completed-count">${this.getCompletedCount(category)}</span> из ${items.length} выполнено
        </div>`;
      this.container.appendChild(div);
    });
  }

  toggleItem(cb, key) {
    const item = cb.closest('.checklist-item');
    const counter = item.closest('.bg-white').querySelector('.completed-count');
    if (cb.checked) {
      item.classList.add('completed');
      this.progress[key] = true;
    } else {
      item.classList.remove('completed');
      this.progress[key] = false;
    }
    const category = key.split('-')[0];
    counter.textContent = this.getCompletedCount(category);
    StorageService.saveChecklist(this.progress);
  }

  getCompletedCount(category) {
    let count = 0;
    Object.keys(this.progress).forEach(k => {
      if (k.startsWith(category + '-') && this.progress[k]) count++;
    });
    return count;
  }
}

if (typeof module !== 'undefined') { module.exports = { Checklist }; }
