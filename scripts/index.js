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

  // Update nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
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
              <div class="location-name">${location.name}</div>
              <div class="location-time">${location.time}</div>
              <div class="location-description">${location.description}</div>
              ${
                location.notes
                  ? `<div class="location-notes">💡 ${location.notes}</div>`
                  : ""
              }
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    container.appendChild(timelineItem);
  });
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
  document.getElementById("modal-content").innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <span class="text-lg">${getLocationTypeEmoji(location.type)}</span>
        <span class="text-muted">${location.time}</span>
      </div>
      
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

  document.getElementById("location-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("location-modal").style.display = "none";
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

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
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

