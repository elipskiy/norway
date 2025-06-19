// Trip data
const tripData = {
  days: [
    {
      day: 1,
      date: "2 июля",
      title: "Oslo → Loen",
      distance: "482 км",
      time: "8 часов",
      status: "planned",
      locations: [
        {
          name: "Получение кемпера",
          time: "12:00-12:30",
          description: "Аэропорт Gardermoen, проверка документов и инструктаж",
          type: "logistics",
          maps: "https://goo.gl/maps/oslo-gardermoen",
          notes:
            "Взять телефон компании проката, проверить все системы кемпера",
        },
        {
          name: "Закупка продуктов",
          time: "12:30-13:30",
          description: "Rema 1000 или Kiwi рядом с аэропортом",
          type: "shopping",
          maps: "https://goo.gl/maps/rema1000-gardermoen",
          notes: "Продукты на 2-3 дня, не забыть норвежские кроны",
        },
        {
          name: "Lo-Vik Camping",
          time: "21:30",
          description: "Кемпинг прямо у фьорда в Лоене",
          type: "accommodation",
          maps: "https://www.lovik-camping.no",
          notes: "Запасной вариант: Sande Camping (2 км далее)",
        },
      ],
    },
    {
      day: 2,
      date: "3 июля",
      title: "Via Ferrata → Valldal",
      distance: "160 км",
      time: "3 часа",
      status: "confirmed",
      locations: [
        {
          name: "Via Ferrata Loen",
          time: "09:00-14:00",
          description: "Маршрут 'Classic', подвесной мост на высоте 750м",
          type: "activity",
          maps: "https://www.loenactive.no",
          notes: "Забронировать заранее! Взять перчатки и воду",
        },
        {
          name: "Долина Norangsdalen",
          time: "14:30-16:30",
          description: "Затонувшая деревня в озере Lygnstøylvatnet",
          type: "sightseeing",
          maps: "https://goo.gl/maps/norangsdalen",
          notes: "Мистическое место, отличные фото",
        },
        {
          name: "Паром Eidsdal-Linge",
          time: "16:30-17:30",
          description: "Переправа через фьорд, 20 минут",
          type: "transport",
          maps: "https://www.fjord1.no",
          notes: "Каждые 30 мин, ~200 NOK, возможны очереди",
        },
        {
          name: "Valldal Camping",
          time: "18:00",
          description: "Кемпинг в 'клубничной столице' Норвегии",
          type: "accommodation",
          maps: "https://valldal-camping.no",
          notes: "Если успеваем - заехать в Jordbærstova за клубничным тортом",
        },
      ],
    },
    {
      day: 3,
      date: "4 июля",
      title: "Trollstigen → Atlantic Road",
      distance: "290 км",
      time: "5.5 часов",
      status: "planned",
      locations: [
        {
          name: "Trollstigen (Дорога Троллей)",
          time: "08:00-10:30",
          description: "11 крутых поворотов серпантина, водопад Stigfossen",
          type: "sightseeing",
          maps: "https://goo.gl/maps/trollstigen",
          notes: "Ехать медленно на кемпере, смотровая площадка обязательна",
        },
        {
          name: "Trollveggen (Стена Троллей)",
          time: "10:30-11:00",
          description: "Самая высокая вертикальная стена в Европе (1100м)",
          type: "sightseeing",
          maps: "https://goo.gl/maps/trollveggen",
          notes: "Иногда видны альпинисты на стене",
        },
        {
          name: "Atlantic Road",
          time: "14:30-17:30",
          description: "8.3 км дороги с 8 мостами над океаном",
          type: "sightseeing",
          maps: "https://www.atlanticroad.com",
          notes:
            "Storseisundet Bridge - самый фотогеничный. При шторме волны через дорогу!",
        },
        {
          name: "Atlanterhavsveien Camping",
          time: "17:30",
          description: "Кемпинг с видом на океан",
          type: "accommodation",
          maps: "https://atlanterhavsveien-camping.no",
          notes: "Места с видом на океан, ресторан на территории",
        },
      ],
    },
    {
      day: 4,
      date: "5 июля",
      title: "Ålesund → Runde",
      distance: "240 км",
      time: "4.5 часа",
      status: "planned",
      locations: [
        {
          name: "Ålesund",
          time: "10:30-13:00",
          description: "Город в стиле ар-нуво, смотровая площадка Aksla",
          type: "sightseeing",
          maps: "https://www.visitalesund.com",
          notes: "418 ступеней на Aksla, рыбный рынок Brogata для обеда",
        },
        {
          name: "Остров Runde",
          time: "15:00",
          description: "Заселение в Runde Camping",
          type: "accommodation",
          maps: "https://runde-camping.no",
          notes: "Защищен от океанских ветров",
        },
        {
          name: "Наблюдение за тупиками",
          time: "19:00-22:00",
          description: "Утесы Rundebranden, 45 минут подъема",
          type: "activity",
          maps: "https://goo.gl/maps/runde-puffins",
          notes: "Лучшее время после 19:00, взять бинокль! Осторожно у обрывов",
        },
      ],
    },
    {
      day: 5,
      date: "6 июля",
      title: "Hjørundfjord → Geiranger",
      distance: "275 км",
      time: "5 часов",
      status: "optional",
      locations: [
        {
          name: "Hjørundfjord (опционально)",
          time: "10:30-12:00",
          description: "Паром Sæbø-Trandal, 'Альпы у океана'",
          type: "sightseeing",
          maps: "https://www.hjorundfjord.no",
          notes: "ПРОВЕРИТЬ расписание парома! Альтернатива: прямо через Ørsta",
        },
        {
          name: "Hotel Union Øye",
          time: "11:00-12:00",
          description: "Исторический отель 1891г, кофе с видом на фьорд",
          type: "optional",
          maps: "https://www.unionoye.no",
          notes: "Останавливались: Кайзер Вильгельм II, Ибсен, Амундсен",
        },
        {
          name: "Паром Hellesylt-Geiranger",
          time: "14:00-15:10",
          description: "Круиз по Geirangerfjord (UNESCO), водопады",
          type: "transport",
          maps: "https://www.geirangerfjord.no",
          notes: "ЗАБРОНИРОВАТЬ ОНЛАЙН ЗАРАНЕЕ! Обязательно на открытой палубе",
        },
        {
          name: "Dalsnibba Skywalk",
          time: "16:00-17:30",
          description: "Смотровая площадка 1500м, 21 км серпантина",
          type: "sightseeing",
          maps: "https://www.dalsnibba.no",
          notes: "260 NOK за машину. При тумане не ехать!",
        },
        {
          name: "Geiranger Camping",
          time: "15:30",
          description: "Кемпинг в самом известном фьорде",
          type: "accommodation",
          maps: "https://geiranger-camping.no",
          notes: "Забронировать заранее - очень популярно!",
        },
      ],
    },
    {
      day: 6,
      date: "7 июля",
      title: "Geiranger → Lillehammer",
      distance: "510 км",
      time: "7 часов",
      status: "planned",
      locations: [
        {
          name: "Lom",
          time: "10:30-11:30",
          description: "Fossheim Bakery, Lom Stave Church (1170г)",
          type: "sightseeing",
          maps: "https://www.visitlom.com",
          notes: "Skillingsbolle (булочка с корицей), церковь 100 NOK",
        },
        {
          name: "Lillehammer",
          time: "17:00",
          description: "Олимпийский город, лыжные трамплины",
          type: "accommodation",
          maps: "https://www.lillehammer.com",
          notes: "Lillehammer Camping у озера Mjøsa",
        },
      ],
    },
    {
      day: 7,
      date: "8 июля",
      title: "Возвращение в Oslo",
      distance: "134 км",
      time: "2 часа",
      status: "confirmed",
      locations: [
        {
          name: "Сдача кемпера",
          time: "11:30-12:00",
          description: "Аэропорт Gardermoen, осмотр и трансфер",
          type: "logistics",
          maps: "https://goo.gl/maps/oslo-gardermoen",
          notes: "Заправить полный бак, уборка, опустошить баки",
        },
      ],
    },
  ],
};

const checklistData = {
  documents: [
    "Загранпаспорта (всех участников)",
    "Водительские права (международные + национальные)",
    "Страховка медицинская",
    "Банковские карты (минимум 2 разных)",
    "Наличные NOK (~3000-5000 крон)",
    "Копии всех документов",
    "Подтверждения бронирований",
  ],
  clothing: [
    "Термобелье (2 комплекта)",
    "Мембранная куртка и штаны",
    "Дождевик",
    "Пуховка или теплая куртка",
    "Треккинговые ботинки (разношенные!)",
    "Шапка и перчатки (даже летом)",
    "Быстросохнущие штаны (2-3 пары)",
    "Купальник/плавки",
  ],
  gear: [
    "Перчатки для via ferrata (усиленная ладонь)",
    "Налобный фонарь + батарейки",
    "Бинокль 8x или 10x (для тупиков)",
    "Треккинговые палки",
    "Рюкзак дневной 20-30л",
    "Солнцезащитный крем SPF 30+",
    "Репеллент от комаров",
  ],
  camper: [
    "Переходники для розеток",
    "Удлинитель 10-25м",
    "Веревка для белья + прищепки",
    "Мусорные пакеты",
    "Туалетная химия",
    "Термос",
    "Контейнеры для еды",
  ],
};

const budgetData = [
  {
    category: "Аренда кемпера",
    amount: "40000-60000",
    note: "7 дней, включая страховку",
  },
  {
    category: "Топливо",
    amount: "15000-20000",
    note: "~2000 км, дизель ~16-18 NOK/л",
  },
  {
    category: "Кемпинги",
    amount: "15000-25000",
    note: "6 ночей, 300-500 NOK/ночь",
  },
  {
    category: "Паромы",
    amount: "8000-12000",
    note: "5 переправ, 100-300 NOK каждая",
  },
  {
    category: "Еда",
    amount: "20000-30000",
    note: "Продукты + 2-3 ресторана",
  },
  {
    category: "Развлечения",
    amount: "8000-15000",
    note: "Via Ferrata, входные билеты",
  },
  {
    category: "Прочее",
    amount: "5000-10000",
    note: "Сувениры, непредвиденное",
  },
];

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
    btn.classList.remove("bg-white", "bg-opacity-30");
  });
  event.target.classList.add("bg-white", "bg-opacity-30");

  // Save current section to localStorage
  localStorage.setItem("norwayTripCurrentSection", sectionName);
}

function renderItinerary() {
  const container = document.querySelector("#itinerary .grid");
  container.innerHTML = "";

  tripData.days.forEach((day) => {
    const statusClass = `status-${day.status}`;
    const dayCard = document.createElement("div");
    dayCard.className = `day-card glass rounded-xl p-6 ${statusClass}`;
    dayCard.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-white">День ${day.day}</h3>
        <span class="status-indicator ${statusClass}"></span>
      </div>
      <p class="text-white opacity-90 mb-2">${day.date} • ${day.title}</p>
      <p class="text-white opacity-75 text-sm mb-4">${day.distance} • ${
      day.time
    }</p>
      <div class="space-y-2">
        ${day.locations
          .map(
            (location) => `
          <div class="location-card bg-white bg-opacity-10 rounded-lg p-3 cursor-pointer hover:bg-opacity-20 transition-all" 
               onclick="showLocationDetails('${day.day}', '${location.name}')">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h4 class="font-medium text-white text-sm">${location.name}</h4>
                <p class="text-white opacity-75 text-xs">${location.time}</p>
              </div>
              <span class="text-xs bg-white bg-opacity-20 text-white px-2 py-1 rounded">
                ${getLocationTypeEmoji(location.type)}
              </span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    container.appendChild(dayCard);
  });
}

function renderChecklist() {
  const container = document.querySelector("#checklist .grid");
  container.innerHTML = "";

  Object.entries(checklistData).forEach(([category, items]) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "bg-white bg-opacity-10 rounded-lg p-4";
    categoryDiv.innerHTML = `
      <h3 class="font-semibold text-white mb-3 capitalize">${getCategoryTitle(
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
              <input type="checkbox" class="mt-1 rounded" onchange="toggleChecklistItem(this, '${itemKey}')" ${
              isChecked ? "checked" : ""
            }>
              <span class="text-white text-sm">${item}</span>
            </label>
          `;
          })
          .join("")}
      </div>
      <div class="mt-3 text-xs text-white opacity-75">
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

  let totalMin = 0,
    totalMax = 0;

  budgetData.forEach((item) => {
    const amounts = item.amount.split("-");
    const min = parseInt(amounts[0]);
    const max = parseInt(amounts[1] || amounts[0]);
    totalMin += min;
    totalMax += max;

    const budgetItem = document.createElement("div");
    budgetItem.className = "bg-white bg-opacity-10 rounded-lg p-4";
    budgetItem.innerHTML = `
      <h3 class="font-semibold text-white mb-2">${item.category}</h3>
      <p class="text-2xl font-bold text-white mb-1">${item.amount} ₽</p>
      <p class="text-white opacity-75 text-sm">${item.note}</p>
    `;
    container.appendChild(budgetItem);
  });

  // Add total
  const totalDiv = document.createElement("div");
  totalDiv.className = "bg-white bg-opacity-20 rounded-lg p-4 md:col-span-2";
  totalDiv.innerHTML = `
    <h3 class="font-semibold text-white mb-2">💰 Общий бюджет</h3>
    <p class="text-3xl font-bold text-white mb-1">${totalMin}-${totalMax} ₽</p>
    <p class="text-white opacity-75 text-sm">На человека при поездке вчетвером</p>
  `;
  container.appendChild(totalDiv);
}

function renderNotes() {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-bubble bg-white bg-opacity-10 rounded-lg p-4";
    noteDiv.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <span class="font-medium text-white">${note.author}</span>
        <span class="text-white opacity-75 text-sm">${new Date(
          note.timestamp
        ).toLocaleDateString()}</span>
      </div>
      <p class="text-white">${note.text}</p>
      <button onclick="deleteNote(${index})" class="mt-2 text-red-300 hover:text-red-200 text-sm">
        Удалить
      </button>
    `;
    container.appendChild(noteDiv);
  });
}

function showLocationDetails(dayNum, locationName) {
  const day = tripData.days.find((d) => d.day == dayNum);
  const location = day.locations.find((l) => l.name === locationName);

  document.getElementById("modal-title").textContent = location.name;
  document.getElementById("modal-content").innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <span class="text-lg">${getLocationTypeEmoji(location.type)}</span>
        <span class="text-white opacity-75">${location.time}</span>
      </div>
      
      <p class="text-white">${location.description}</p>
      
      ${
        location.notes
          ? `
        <div class="bg-yellow-500 bg-opacity-20 rounded-lg p-3">
          <h4 class="font-semibold text-yellow-200 mb-1">💡 Важные заметки:</h4>
          <p class="text-yellow-100">${location.notes}</p>
        </div>
      `
          : ""
      }
      
      <div class="flex space-x-2">
        ${
          location.maps
            ? `
          <a href="${location.maps}" target="_blank" 
             class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            🗺️ Открыть на карте
          </a>
        `
            : ""
        }
        <button onclick="addLocationNote('${dayNum}', '${locationName}')" 
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
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
