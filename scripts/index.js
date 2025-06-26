import { tripData, checklistData, budgetData } from "./data.js";

// Load notes from localStorage or use default
let notes = JSON.parse(localStorage.getItem("norwayTripNotes")) || [
  {
    text: "Проверить прогноз погоды для Dalsnibba перед подъемом",
    author: "Система",
    timestamp: new Date(),
  },
  {
    text: "Забронировать Via Ferrata Loen как можно скорее",
    author: "Система",
    timestamp: new Date(),
  },
];

// Load checklist progress from localStorage
let checklistProgress =
  JSON.parse(localStorage.getItem("norwayTripChecklist")) || {};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderItinerary();
  renderChecklist();
  renderBudget();
  renderNotes();
  renderHiddenGems();
  showSection("itinerary");

  // Add loading animation
  document.body.classList.add("loaded");
});

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Show selected section
  document.getElementById(sectionName).classList.remove("hidden");

  // Update nav buttons (both old and new classes)
  document.querySelectorAll(".nav-btn, .nav-btn-compact").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Save current section to localStorage
  localStorage.setItem("norwayTripCurrentSection", sectionName);
}

function renderItinerary() {
  const container = document.querySelector("#itinerary .grid");
  container.className = "timeline"; // Change from grid to timeline
  container.innerHTML = "";

  tripData.days.forEach((day) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";

    timelineItem.innerHTML = `
      <div class="timeline-dot status-${day.status}">
        ${day.day}
      </div>
      
      <div class="timeline-card">
        <div class="timeline-header">
          <div class="timeline-title">
            ${day.title}
          </div>
          <div class="timeline-meta">
            <span>${day.date}</span>
            <span>${day.locations.length} остановок</span>
          </div>
          <div class="timeline-stats">
            <span>📍 ${day.distance}</span>
            <span>⏱️ ${day.time}</span>
            <a href="https://maps.google.com/?q=${day.coordinates[0]},${day.coordinates[1]}" 
               target="_blank" 
               class="day-map-btn"
               title="Открыть день ${day.day} на Google Maps">
              🗺️
            </a>
          </div>
        </div>
      </div>
      
      <div class="timeline-locations">
        <div class="locations-header">
          📋 Детали дня
        </div>
        ${day.locations
          .map(
            (location) => `
          <div class="location-item ${
            location.type === "hidden_gem" ? "hidden-gem" : ""
          }" onclick="showLocationDetails('${day.day}', '${location.name}')">
            <div class="location-icon ${location.type}">
              ${getLocationTypeEmoji(location.type)}
            </div>
            <div class="location-details">
              <div class="location-name">
                ${location.name}
                ${location.maps ? `
                  <a href="${location.maps}" 
                     target="_blank" 
                     class="location-map-btn"
                     onclick="event.stopPropagation()"
                     title="Открыть ${location.name} на Google Maps">
                    🗺️
                  </a>
                ` : ''}
              </div>
              <div class="location-time">${location.time}</div>
              <div class="location-description">${location.description}</div>
              ${
                location.notes
                  ? `<div class="location-notes">💡 ${location.notes}</div>`
                  : ""
              }
              ${(location.photo || location.inspirationCategory) ? `
                <div class="location-photo-preview" 
                     data-location="${location.name.replace(/\s+/g, '-')}"
                     data-day="${day.day}"
                     data-main-photo="${location.photo || ''}"
                     data-category="${location.inspirationCategory || ''}"
                     onclick="event.stopPropagation()">
                  <div class="photo-nav-controls">
                    <button class="photo-nav-btn-external prev" onclick="changeLocationPhoto('${location.name.replace(/\s+/g, '-')}', ${day.day}, 'prev')" title="Предыдущие фото">‹</button>
                    <div class="photo-counter-external">
                      <span class="current-page">1</span>/<span class="total-pages">1</span>
                    </div>
                    <button class="photo-nav-btn-external next" onclick="changeLocationPhoto('${location.name.replace(/\s+/g, '-')}', ${day.day}, 'next')" title="Следующие фото">›</button>
                  </div>
                  <div class="photo-gallery-container" id="gallery-${location.name.replace(/\s+/g, '-')}-${day.day}">
                    <!-- Photos will be loaded here -->
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    container.appendChild(timelineItem);
  });
  
  // Load inspiration photos for timeline previews
  loadTimelineInspirationPhotos();
}

// Store inspiration photos for timeline navigation
let timelineInspirationPhotos = {};
const PHOTOS_PER_PAGE = 3; // Show 3 photos at once

async function loadTimelineInspirationPhotos() {
  try {
    const response = await fetch('images/inspiration/photo-info.json');
    const photoInfo = await response.json();
    
    // Group photos by category
    timelineInspirationPhotos = {};
    photoInfo.forEach(photo => {
      if (!timelineInspirationPhotos[photo.category]) {
        timelineInspirationPhotos[photo.category] = [];
      }
      timelineInspirationPhotos[photo.category].push(photo);
    });
    
    // Initialize photo galleries and counters
    document.querySelectorAll('.location-photo-preview').forEach(preview => {
      const category = preview.dataset.category;
      const mainPhoto = preview.dataset.mainPhoto;
      const locationId = preview.dataset.location;
      const dayNum = preview.dataset.day;
      
      // Build all photos array (main photo + inspiration photos)
      let allPhotos = [];
      if (mainPhoto) {
        allPhotos.push({ src: mainPhoto, type: 'main', alt: 'Main photo' });
      }
      if (category && timelineInspirationPhotos[category]) {
        const inspirationPhotos = timelineInspirationPhotos[category].map(photo => ({
          src: `images/inspiration/${category}/${photo.filename}-small.jpg`,
          type: 'inspiration',
          alt: photo.description,
          author: photo.author
        }));
        allPhotos = allPhotos.concat(inspirationPhotos);
      }
      
      if (allPhotos.length > 0) {
        const totalPages = Math.ceil(allPhotos.length / PHOTOS_PER_PAGE);
        preview.querySelector('.total-pages').textContent = totalPages;
        
        // Store photos data
        preview.dataset.allPhotos = JSON.stringify(allPhotos);
        
        // Load first page
        loadPhotoPage(locationId, dayNum, 1);
      }
    });
    
  } catch (error) {
    console.error('Ошибка загрузки inspiration фотографий для таймлайна:', error);
  }
}

function loadPhotoPage(locationId, dayNum, page) {
  const preview = document.querySelector(`[data-location="${locationId}"][data-day="${dayNum}"]`);
  if (!preview) return;
  
  const allPhotos = JSON.parse(preview.dataset.allPhotos || '[]');
  const container = document.getElementById(`gallery-${locationId}-${dayNum}`);
  const mainPhoto = preview.dataset.mainPhoto;
  
  if (!container || allPhotos.length === 0) return;
  
  // Clear container
  container.innerHTML = '';
  
  const startIndex = (page - 1) * PHOTOS_PER_PAGE;
  const endIndex = Math.min(startIndex + PHOTOS_PER_PAGE, allPhotos.length);
  const pagePhotos = allPhotos.slice(startIndex, endIndex);
  
  // Generate HTML for photos on this page
  container.innerHTML = pagePhotos.map((photo, index) => {
    const globalIndex = startIndex + index;
    return `
    <div class="timeline-photo-item">
      <img src="${photo.src}" 
           alt="${photo.alt}"
           class="timeline-photo-image"
           onerror="this.style.display='none'"
           onclick="openTimelinePhotoViewer('${locationId}', '${dayNum}', ${globalIndex})">
      ${photo.author ? `<div class="timeline-photo-author">📸 ${photo.author}</div>` : ''}
    </div>
    `;
  }).join('');
  
  // Update page counter
  preview.querySelector('.current-page').textContent = page;
}

function changeLocationPhoto(locationId, dayNum, direction) {
  const preview = document.querySelector(`[data-location="${locationId}"][data-day="${dayNum}"]`);
  if (!preview) return;
  
  const currentPageSpan = preview.querySelector('.current-page');
  const totalPagesSpan = preview.querySelector('.total-pages');
  
  let currentPage = parseInt(currentPageSpan.textContent);
  const totalPages = parseInt(totalPagesSpan.textContent);
  
  // Calculate new page
  if (direction === 'next') {
    currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
  } else {
    currentPage = currentPage <= 1 ? totalPages : currentPage - 1;
  }
  
  // Load new page
  loadPhotoPage(locationId, dayNum, currentPage);
}

function renderChecklist() {
  const container = document.querySelector("#checklist .grid");
  container.innerHTML = "";

  Object.entries(checklistData).forEach(([category, items]) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "bg-white border border-gray-200 rounded-lg p-4";
    categoryDiv.innerHTML = `
      <h3 class="font-semibold text-primary mb-3 capitalize">${getCategoryTitle(
        category
      )}</h3>
      <div class="space-y-2">
        ${items
          .map((item, index) => {
            const itemKey = `${category}-${index}`;
            const isChecked = checklistProgress[itemKey] || false;
            return `
            <label class="checklist-item flex items-start space-x-2 cursor-pointer ${
              isChecked ? "completed" : ""
            }">
              <input type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" onchange="toggleChecklistItem(this, '${itemKey}')" ${
              isChecked ? "checked" : ""
            }>
              <span class="text-primary text-sm">${item}</span>
            </label>
          `;
          })
          .join("")}
      </div>
      <div class="mt-3 text-xs text-muted">
        <span class="completed-count">${getCompletedCount(
          category
        )}</span> из ${items.length} выполнено
      </div>
    `;
    container.appendChild(categoryDiv);
  });
}

function renderBudget() {
  const container = document.querySelector("#budget .grid");
  container.innerHTML = "";

  // Calculate totals from the actual amounts in Euro
  const euroAmounts = [
    "1 570–2 620", // Аренда кемпера
    "440–610", // Топливо и дороги
    "175–305", // Кемпинги
    "90–175", // Паромы
    "525–875", // Еда
    "265–435", // Развлечения
    "175–435", // Прочее
  ];

  let totalMin = 0,
    totalMax = 0;

  euroAmounts.forEach((amount) => {
    const [min, max] = amount
      .split("–")
      .map((val) => parseInt(val.replace(/\s/g, "")));
    totalMin += min;
    totalMax += max || min;
  });

  budgetData.forEach((item) => {
    const budgetItem = document.createElement("div");
    budgetItem.className = "bg-white border border-gray-200 rounded-lg p-4";
    budgetItem.innerHTML = `
      <h3 class="font-semibold text-primary mb-2">${item.category}</h3>
      <p class="text-2xl font-bold text-primary mb-1">${item.amount}</p>
      <p class="text-muted text-sm">${item.note}</p>
    `;
    container.appendChild(budgetItem);
  });

  // Add total
  const totalDiv = document.createElement("div");
  totalDiv.className =
    "bg-blue-50 border border-blue-200 rounded-lg p-4 md:col-span-2";
  totalDiv.innerHTML = `
    <h3 class="font-semibold text-primary mb-2">💰 Общий бюджет</h3>
    <p class="text-3xl font-bold text-blue-700 mb-1">${totalMin.toLocaleString()}–${totalMax.toLocaleString()} €</p>
  `;
  container.appendChild(totalDiv);
}

function renderNotes() {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-bubble p-4";
    noteDiv.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <span class="font-medium text-primary">${note.author}</span>
        <span class="text-muted text-sm">${new Date(
          note.timestamp
        ).toLocaleDateString()}</span>
      </div>
      <p class="text-primary">${note.text}</p>
      <button onclick="deleteNote(${index})" class="mt-2 text-red-600 hover:text-red-800 text-sm">
        Удалить
      </button>
    `;
    container.appendChild(noteDiv);
  });
}

function renderHiddenGems() {
  const container = document.getElementById("hidden-gems-container");
  container.innerHTML = "";

  tripData.days.forEach((day) => {
    const hiddenGems = day.locations.filter((loc) => loc.type === "hidden_gem");

    if (hiddenGems.length > 0) {
      const daySection = document.createElement("div");
      daySection.className = "bg-white border border-gray-200 rounded-lg p-6";

      daySection.innerHTML = `
        <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
          <span class="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
            ${day.day}
          </span>
          День ${day.day}: ${day.title}
        </h3>
        <div class="space-y-4">
          ${hiddenGems
            .map(
              (gem) => `
            <div class="location-item hidden-gem cursor-pointer" onclick="showLocationDetails('${
              day.day
            }', '${gem.name}')">
              <div class="location-icon ${gem.type}">
                ${getLocationTypeEmoji(gem.type)}
              </div>
              <div class="location-details">
                <div class="location-name">${gem.name}</div>
                <div class="location-time">${gem.time}</div>
                <div class="location-description">${gem.description}</div>
                ${
                  gem.notes
                    ? `<div class="location-notes">💡 ${gem.notes}</div>`
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      container.appendChild(daySection);
    }
  });

  // Add summary at the end
  const totalHiddenGems = tripData.days.reduce(
    (total, day) =>
      total + day.locations.filter((loc) => loc.type === "hidden_gem").length,
    0
  );

  if (totalHiddenGems > 0) {
    const summaryDiv = document.createElement("div");
    summaryDiv.className =
      "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 text-center";
    summaryDiv.innerHTML = `
      <h3 class="text-lg font-semibold text-purple-800 mb-2">
        ✨ Всего найдено ${totalHiddenGems} тайных мест
      </h3>
      <p class="text-purple-600 text-sm">
        Эти места помогут вам погрузиться в аутентичную норвежскую культуру и избежать туристических толп
      </p>
    `;
    container.appendChild(summaryDiv);
  }
}

function showLocationDetails(dayNum, locationName) {
  const day = tripData.days.find((d) => d.day == dayNum);
  const location = day.locations.find((l) => l.name === locationName);

  document.getElementById("modal-title").textContent = location.name;
  
  // Photo HTML if photo exists
  const photoHtml = location.photo ? `
    <div class="mb-4 text-center">
      <img src="${location.photo}" 
           alt="${location.name} landscape view"
           class="w-full max-w-md h-48 object-cover rounded-lg shadow-lg mx-auto cursor-pointer hover:shadow-xl transition-shadow"
           onerror="console.error('Ошибка загрузки фото: ${location.photo}'); this.style.display='none'"
           onclick="openPhotoViewer('${location.photo}', '${location.name}')"
           title="Нажмите для увеличения">
      <div class="text-xs text-gray-500 mt-2 italic">📸 Кликните для полного размера</div>
    </div>
  ` : '';

  // Inspiration gallery HTML if category exists
  const inspirationHtml = location.inspirationCategory ? `
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-semibold text-purple-700">🎨 Галерея вдохновения</h4>
        <button onclick="openInspirationGallery('${location.inspirationCategory}', '${location.name}')" 
                class="text-sm text-purple-600 hover:text-purple-800 underline">
          Посмотреть все →
        </button>
      </div>
      <div id="inspiration-preview-${dayNum}-${locationName.replace(/\s+/g, '-')}" class="grid grid-cols-3 gap-2">
        <div class="text-center text-gray-500 text-sm">Загрузка...</div>
      </div>
    </div>
  ` : '';

  document.getElementById("modal-content").innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <span class="text-lg">${getLocationTypeEmoji(location.type)}</span>
        <span class="text-muted">${location.time}</span>
      </div>
      
      ${photoHtml}
      ${inspirationHtml}
      
      <p class="text-primary">${location.description}</p>
      
      ${
        location.notes
          ? `
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <h4 class="font-semibold text-amber-800 mb-1">💡 Важные заметки:</h4>
          <p class="text-amber-700">${location.notes}</p>
        </div>
      `
          : ""
      }
      
      <div class="flex space-x-2">
        ${
          location.maps
            ? `
          <a href="${location.maps}" target="_blank" 
             class="btn">
            🗺️ Открыть на карте
          </a>
        `
            : ""
        }
        <button onclick="addLocationNote('${dayNum}', '${locationName}')" 
                class="btn-secondary">
          💭 Добавить заметку
        </button>
      </div>
    </div>
  `;

  // Load inspiration preview if category exists
  if (location.inspirationCategory) {
    loadInspirationPreview(location.inspirationCategory, dayNum, locationName);
  }

  document.getElementById("location-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("location-modal").style.display = "none";
}

function openPhotoViewer(photoSrc, locationName, photoArray = null, currentIndex = 0) {
  // Create or get photo viewer modal
  let photoViewer = document.getElementById('photo-viewer');
  if (!photoViewer) {
    photoViewer = document.createElement('div');
    photoViewer.id = 'photo-viewer';
    photoViewer.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    photoViewer.style.cssText = 'display: none; background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(5px);';
    
    photoViewer.innerHTML = `
      <div class="relative max-w-5xl max-h-full flex items-center">
        <button id="photo-viewer-prev" 
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-4xl z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center transition-all">
          ‹
        </button>
        <button onclick="closePhotoViewer()" 
                class="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl z-10">
          &times;
        </button>
        <div class="relative">
          <img id="photo-viewer-img" 
               class="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
               alt="">
          <div id="photo-viewer-info" 
               class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
            <div id="photo-viewer-title" class="font-semibold"></div>
            <div id="photo-viewer-counter" class="text-sm text-gray-300 mt-1"></div>
          </div>
        </div>
        <button id="photo-viewer-next" 
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-4xl z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center transition-all">
          ›
        </button>
      </div>
    `;
    
    document.body.appendChild(photoViewer);
    
    // Close on click outside
    photoViewer.addEventListener('click', function(e) {
      if (e.target === this) {
        closePhotoViewer();
      }
    });
  }
  
  // Store current photo data
  photoViewer.dataset.photoArray = photoArray ? JSON.stringify(photoArray) : '[]';
  photoViewer.dataset.currentIndex = currentIndex.toString();
  photoViewer.dataset.locationName = locationName;
  
  // Set up navigation if we have multiple photos
  const prevBtn = document.getElementById('photo-viewer-prev');
  const nextBtn = document.getElementById('photo-viewer-next');
  
  if (photoArray && photoArray.length > 1) {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    
    prevBtn.onclick = () => navigatePhotoViewer('prev');
    nextBtn.onclick = () => navigatePhotoViewer('next');
    
    updatePhotoViewer(photoArray, currentIndex, locationName);
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    
    // Single photo mode
    document.getElementById('photo-viewer-img').src = photoSrc;
    document.getElementById('photo-viewer-title').textContent = locationName;
    document.getElementById('photo-viewer-counter').textContent = '';
  }
  
  // Show viewer
  photoViewer.style.display = 'flex';
}

function navigatePhotoViewer(direction) {
  const photoViewer = document.getElementById('photo-viewer');
  const photoArray = JSON.parse(photoViewer.dataset.photoArray || '[]');
  const locationName = photoViewer.dataset.locationName || '';
  let currentIndex = parseInt(photoViewer.dataset.currentIndex || '0');
  
  if (photoArray.length === 0) return;
  
  // Calculate new index
  if (direction === 'next') {
    currentIndex = (currentIndex + 1) % photoArray.length;
  } else {
    currentIndex = currentIndex === 0 ? photoArray.length - 1 : currentIndex - 1;
  }
  
  photoViewer.dataset.currentIndex = currentIndex.toString();
  updatePhotoViewer(photoArray, currentIndex, locationName);
}

function updatePhotoViewer(photoArray, currentIndex, locationName = '') {
  const photo = photoArray[currentIndex];
  const img = document.getElementById('photo-viewer-img');
  const title = document.getElementById('photo-viewer-title');
  const counter = document.getElementById('photo-viewer-counter');
  
  // Use high-res version for full screen
  const highResSrc = photo.src.replace('-small.jpg', '-large.jpg');
  
  img.src = highResSrc;
  title.textContent = locationName || photo.alt || 'Photo';
  counter.textContent = `${currentIndex + 1} / ${photoArray.length}`;
  
  if (photo.author) {
    counter.textContent += ` • 📸 ${photo.author}`;
  }
}

function closePhotoViewer() {
  const photoViewer = document.getElementById('photo-viewer');
  if (photoViewer) {
    photoViewer.style.display = 'none';
  }
}

function openTimelinePhotoViewer(locationId, dayNum, photoIndex) {
  const preview = document.querySelector(`[data-location="${locationId}"][data-day="${dayNum}"]`);
  if (!preview) return;
  
  const allPhotos = JSON.parse(preview.dataset.allPhotos || '[]');
  if (allPhotos.length === 0) return;
  
  const locationName = preview.closest('.location-item').querySelector('.location-name').textContent;
  
  openPhotoViewer(allPhotos[photoIndex].src, locationName, allPhotos, photoIndex);
}

async function loadInspirationPreview(category, dayNum, locationName) {
  const containerId = `inspiration-preview-${dayNum}-${locationName.replace(/\s+/g, '-')}`;
  const container = document.getElementById(containerId);
  
  if (!container) return;
  
  try {
    // Load photo info
    const response = await fetch('images/inspiration/photo-info.json');
    const photoInfo = await response.json();
    
    // Filter photos by category and get first 3
    const categoryPhotos = photoInfo.filter(photo => photo.category === category).slice(0, 3);
    
    if (categoryPhotos.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-500 text-sm col-span-3">Фото не найдены</div>';
      return;
    }
    
    // Generate preview HTML
    container.innerHTML = categoryPhotos.map(photo => `
      <div class="cursor-pointer group" onclick="openPhotoViewer('images/inspiration/${photo.category}/${photo.filename}-large.jpg', '${photo.description}')">
        <img src="images/inspiration/${photo.category}/${photo.filename}-small.jpg" 
             alt="${photo.description}"
             class="w-full h-16 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow"
             onerror="this.style.display='none'">
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Ошибка загрузки inspiration фото:', error);
    container.innerHTML = '<div class="text-center text-red-500 text-sm col-span-3">Ошибка загрузки</div>';
  }
}

function openInspirationGallery(category, locationName) {
  // Create inspiration gallery modal
  let galleryModal = document.getElementById('inspiration-gallery-modal');
  if (!galleryModal) {
    galleryModal = document.createElement('div');
    galleryModal.id = 'inspiration-gallery-modal';
    galleryModal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    galleryModal.style.cssText = 'display: none; background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(5px);';
    
    galleryModal.innerHTML = `
      <div class="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 id="gallery-title" class="text-xl font-bold text-gray-800"></h3>
          <button onclick="closeInspirationGallery()" 
                  class="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        <div id="gallery-content" class="p-4 overflow-y-auto max-h-96">
          <div class="text-center">Загрузка...</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(galleryModal);
    
    // Close on click outside
    galleryModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeInspirationGallery();
      }
    });
  }
  
  // Set title and load content
  document.getElementById('gallery-title').textContent = `${locationName} - Галерея вдохновения`;
  loadInspirationGalleryContent(category);
  
  // Show gallery
  galleryModal.style.display = 'flex';
}

async function loadInspirationGalleryContent(category) {
  const container = document.getElementById('gallery-content');
  
  try {
    // Load photo info
    const response = await fetch('images/inspiration/photo-info.json');
    const photoInfo = await response.json();
    
    // Filter photos by category
    const categoryPhotos = photoInfo.filter(photo => photo.category === category);
    
    if (categoryPhotos.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-500">Фото не найдены для этой категории</div>';
      return;
    }
    
    // Generate gallery grid
    container.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        ${categoryPhotos.map(photo => `
          <div class="cursor-pointer group" onclick="openPhotoViewer('images/inspiration/${photo.category}/${photo.filename}-large.jpg', '${photo.description}')">
            <img src="images/inspiration/${photo.category}/${photo.filename}-small.jpg" 
                 alt="${photo.description}"
                 class="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all group-hover:scale-105"
                 onerror="this.parentElement.style.display='none'">
            <div class="mt-2 text-xs text-gray-600 text-center">
              <div class="font-medium">${photo.description}</div>
              <div class="text-gray-500">📸 ${photo.author}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
  } catch (error) {
    console.error('Ошибка загрузки галереи:', error);
    container.innerHTML = '<div class="text-center text-red-500">Ошибка загрузки галереи</div>';
  }
}

function closeInspirationGallery() {
  const galleryModal = document.getElementById('inspiration-gallery-modal');
  if (galleryModal) {
    galleryModal.style.display = 'none';
  }
}

function addNote() {
  const input = document.getElementById("note-input");
  const text = input.value.trim();

  if (text) {
    notes.unshift({
      text: text,
      author: "Участник",
      timestamp: new Date(),
    });
    input.value = "";
    renderNotes();
    saveNotes();
  }
}

function addLocationNote(dayNum, locationName) {
  const noteText = prompt(`Добавить заметку к "${locationName}":`);
  if (noteText && noteText.trim()) {
    notes.unshift({
      text: `📍 ${locationName} (День ${dayNum}): ${noteText.trim()}`,
      author: "Участник",
      timestamp: new Date(),
    });
    renderNotes();
    saveNotes();
    closeModal();
  }
}

function deleteNote(index) {
  if (confirm("Удалить эту заметку?")) {
    notes.splice(index, 1);
    renderNotes();
    saveNotes();
  }
}

function toggleChecklistItem(checkbox, itemKey) {
  const item = checkbox.closest(".checklist-item");
  const counter = item.closest(".bg-white").querySelector(".completed-count");

  if (checkbox.checked) {
    item.classList.add("completed");
    checklistProgress[itemKey] = true;
  } else {
    item.classList.remove("completed");
    checklistProgress[itemKey] = false;
  }

  // Update counter
  const category = itemKey.split("-")[0];
  counter.textContent = getCompletedCount(category);

  // Save to localStorage
  localStorage.setItem(
    "norwayTripChecklist",
    JSON.stringify(checklistProgress)
  );
}

function getCompletedCount(category) {
  let count = 0;
  Object.keys(checklistProgress).forEach((key) => {
    if (key.startsWith(category + "-") && checklistProgress[key]) {
      count++;
    }
  });
  return count;
}

function saveNotes() {
  localStorage.setItem("norwayTripNotes", JSON.stringify(notes));
}

function getLocationTypeEmoji(type) {
  const emojis = {
    logistics: "🚐",
    shopping: "🛒",
    accommodation: "🏕️",
    activity: "🧗",
    sightseeing: "🏔️",
    transport: "⛴️",
    optional: "⭐",
    hidden_gem: "💎",
  };
  return emojis[type] || "📍";
}

function getCategoryTitle(category) {
  const titles = {
    documents: "📄 Документы",
    clothing: "👕 Одежда",
    gear: "🎒 Снаряжение",
    camper: "🚐 Для кемпера",
  };
  return titles[category] || category;
}

// Handle keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    closePhotoViewer();
    closeInspirationGallery();
  }
  
  // Arrow keys for photo viewer navigation
  const photoViewer = document.getElementById('photo-viewer');
  if (photoViewer && photoViewer.style.display === 'flex') {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const direction = e.key === "ArrowRight" ? "next" : "prev";
      navigatePhotoViewer(direction);
      return;
    }
  }
  
  // Arrow keys for photo navigation in timeline
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const focusedPreview = document.querySelector('.location-photo-preview:hover') || 
                          document.querySelector('.location-photo-preview .timeline-photo-image:focus');
    
    if (focusedPreview) {
      e.preventDefault();
      const preview = focusedPreview.closest('.location-photo-preview');
      const locationId = preview.dataset.location;
      const dayNum = preview.dataset.day;
      const direction = e.key === "ArrowRight" ? "next" : "prev";
      
      changeLocationPhoto(locationId, dayNum, direction);
    }
  }
});

// Close modal on outside click
document
  .getElementById("location-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

// Add service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Expose functions to global scope for inline handlers
window.showSection = showSection;
window.addNote = addNote;
window.closeModal = closeModal;
window.addLocationNote = addLocationNote;
window.deleteNote = deleteNote;
window.toggleChecklistItem = toggleChecklistItem;
window.showLocationDetails = showLocationDetails;
window.openPhotoViewer = openPhotoViewer;
window.closePhotoViewer = closePhotoViewer;
window.openTimelinePhotoViewer = openTimelinePhotoViewer;
window.openInspirationGallery = openInspirationGallery;
window.closeInspirationGallery = closeInspirationGallery;
window.changeLocationPhoto = changeLocationPhoto;

