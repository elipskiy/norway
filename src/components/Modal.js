class Modal {
  constructor() {
    this.modal = document.getElementById('location-modal');
    this.titleEl = document.getElementById('modal-title');
    this.contentEl = document.getElementById('modal-content');
  }

  showLocationDetails(day, location, tripData) {
    const dayData = tripData.days.find(d => d.day == day);
    const loc = dayData.locations.find(l => l.name === location);
    this.titleEl.textContent = loc.name;
    this.contentEl.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <span class="text-lg">${getLocationTypeEmoji(loc.type)}</span>
        <span class="text-muted">${loc.time}</span>
      </div>
      <p class="text-primary">${loc.description}</p>
      ${loc.notes ? `<div class="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <h4 class="font-semibold text-amber-800 mb-1">💡 Важные заметки:</h4>
          <p class="text-amber-700">${loc.notes}</p>
        </div>` : ''}
      <div class="flex space-x-2">
        ${loc.maps ? `<a href="${loc.maps}" target="_blank" class="btn">🗺️ Открыть на карте</a>` : ''}
        <button onclick="notesComponent.addLocationNote('${day}', '${location}')" class="btn-secondary">💭 Добавить заметку</button>
      </div>
    </div>`;
    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.style.display = 'none';
  }
}

if (typeof module !== 'undefined') { module.exports = { Modal }; }
