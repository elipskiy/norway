class Timeline {
  constructor(tripData, modal) {
    this.tripData = tripData;
    this.modal = modal;
    this.container = document.querySelector('#itinerary .grid');
  }

  render() {
    const container = this.container;
    container.className = 'timeline';
    container.innerHTML = '';
    this.tripData.days.forEach(day => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      timelineItem.innerHTML = `
      <div class="timeline-dot status-${day.status}">${day.day}</div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div class="timeline-title">${day.title}</div>
          <div class="timeline-meta"><span>${day.date}</span><span>${day.locations.length} остановок</span></div>
          <div class="timeline-stats"><span>📍 ${day.distance}</span><span>⏱️ ${day.time}</span></div>
        </div>
      </div>
      <div class="timeline-locations">
        <div class="locations-header">📋 Детали дня</div>
        ${day.locations.map(loc => `
          <div class="location-item ${loc.type === 'hidden_gem' ? 'hidden-gem' : ''}" onclick="modalComponent.showLocationDetails('${day.day}','${loc.name}', tripData)">
            <div class="location-icon ${loc.type}">${getLocationTypeEmoji(loc.type)}</div>
            <div class="location-details">
              <div class="location-name">${loc.name}</div>
              <div class="location-time">${loc.time}</div>
              <div class="location-description">${loc.description}</div>
              ${loc.notes ? `<div class="location-notes">💡 ${loc.notes}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>`;
      container.appendChild(timelineItem);
    });
  }

  renderHiddenGems() {
    const container = document.getElementById('hidden-gems-container');
    container.innerHTML = '';
    this.tripData.days.forEach(day => {
      const gems = day.locations.filter(loc => loc.type === 'hidden_gem');
      if (gems.length) {
        const daySection = document.createElement('div');
        daySection.className = 'bg-white border border-gray-200 rounded-lg p-6';
        daySection.innerHTML = `
        <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
          <span class="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">${day.day}</span>
          День ${day.day}: ${day.title}
        </h3>
        <div class="space-y-4">
          ${gems.map(gem => `
            <div class="location-item hidden-gem cursor-pointer" onclick="modalComponent.showLocationDetails('${day.day}','${gem.name}', tripData)">
              <div class="location-icon ${gem.type}">${getLocationTypeEmoji(gem.type)}</div>
              <div class="location-details">
                <div class="location-name">${gem.name}</div>
                <div class="location-time">${gem.time}</div>
                <div class="location-description">${gem.description}</div>
                ${gem.notes ? `<div class="location-notes">💡 ${gem.notes}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>`;
        container.appendChild(daySection);
      }
    });
    const total = this.tripData.days.reduce((t, d) => t + d.locations.filter(l => l.type === 'hidden_gem').length,0);
    if (total) {
      const summary = document.createElement('div');
      summary.className = 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 text-center';
      summary.innerHTML = `<h3 class="text-lg font-semibold text-purple-800 mb-2">✨ Всего найдено ${total} тайных мест</h3><p class="text-purple-600 text-sm">Эти места помогут вам погрузиться в аутентичную норвежскую культуру и избежать туристических толп</p>`;
      container.appendChild(summary);
    }
  }
}

if (typeof module !== 'undefined') { module.exports = { Timeline }; }
