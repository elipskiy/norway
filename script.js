// Trip data
const tripData = {
  days: [
    /* ───────────────────────  DAY 1  ─────────────────────── */
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
          maps: "https://maps.google.com/?q=Oslo+Airport+Gardermoen",
          notes: "Взять телефон прокатчика, проверить все системы кемпера",
        },
        {
          name: "Закупка продуктов",
          time: "12:30-13:30",
          description: "Rema 1000 или Kiwi рядом с аэропортом",
          type: "shopping",
          maps: "https://maps.google.com/?q=Kiwi+Gardermoen",
          notes:
            "Запастись на 2-3 дня; норвежские кроны пригодятся на платных дорогах",
        },
        {
          name: "🥩 Annis Pölsemakeri (по пути)",
          time: "опционально",
          description:
            "Семейная мясная лавка в Рингебу — колбасы и стейки ручной работы",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Annis+P%C3%B6lsemakeri+Ringebu",
          notes:
            "Деликатесы для гриля, кафе Annis Spisested. Удобная парковка для кемпера",
        },
        {
          name: "🧑‍🌾 Aabrekk Gard (по пути)",
          time: "опционально",
          description:
            "Историческая ферма в долине Олдендален — традиционная норвежская кухня",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Aabrekk+Gard+Oldendalen",
          notes:
            "Живая культура seterkultur. Открыто 12-18, бесплатная парковка",
        },
        {
          name: "🏞️ Kjenndalstova (детур)",
          time: "опционально",
          description:
            "Красный домик у озера Ловватнет — свежая форель с видом на ледник",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Kjenndalstova+Lovatnet",
          notes:
            "Узкая платная дорога (наличные). Уединенный ужин вдали от толпы",
        },
        {
          name: "Lo-Vik Camping",
          time: "21:30",
          description: "Кемпинг прямо у фьорда в Лоэне",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Lo-Vik+Camping+Loen",
          notes:
            "Запасной вариант — Sande Camping ( https://maps.google.com/?q=Sande+Camping+Loen )",
        },
      ],
    },

    /* ───────────────────────  DAY 2  ─────────────────────── */
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
          time: "08:00-13:30",
          description: "Маршрут 'Classic', подвесной мост Gjølmunne (750 м)",
          type: "activity",
          maps: "https://maps.google.com/?q=Loen+Active",
          notes: "Бронь на 08:00; перчатки, 1½ л воды, слойная одежда",
        },
        {
          name: "Долина Norangsdalen",
          time: "13:30-15:30",
          description:
            "Озеро Lygnstøylvatnet (затонувшая деревня) и водопад Norangsfossen",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Lygnstøylvatnet",
          notes: "Фантастические фото сквозь прозрачную воду",
        },
        {
          name: "Паром Eidsdal → Linge",
          time: "16:00-17:10",
          description: "Переправа 10 мин, отправления каждые 20-30 мин летом",
          type: "transport",
          maps: "https://maps.google.com/?q=Eidsdal+ferjekai",
          notes: "~200 NOK, возможна очередь до 40 мин",
        },
        {
          name: "🍎 Lingebakken Gardsutsalg (по пути)",
          time: "опционально",
          description: "Фермерский магазин сидра — дегустация и свежие фрукты",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Lingebakken+Gardsutsalg",
          notes: "Домашний сидр и сезонные фрукты. Открыто 9-17",
        },
        {
          name: "Valldal Camping",
          time: "17:30",
          description: "Кемпинг в 'клубничной столице' Норвегии",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Valldal+Camping",
          notes:
            "Успеете в Jordbærstova ( https://maps.google.com/?q=Jordbærstova+Valldal ) если до 17:00",
        },
        {
          name: "🍓 Jordbærstova (вечером)",
          time: "опционально",
          description: "Легендарное кафе — лучший клубничный торт в Норвегии",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Jordbærstova+Valldal",
          notes: "Главная цель в 'клубничной столице'. Бесплатная парковка",
        },
      ],
    },

    /* ───────────────────────  DAY 3  ─────────────────────── */
    {
      day: 3,
      date: "4 июля",
      title: "Trollstigen (плато) → Åndalsnes → Atlantic Road",
      distance: "295 км",
      time: "6 часов",
      status: "planned",
      locations: [
        {
          name: "Trollstigen плато (дорога закрыта ↓ Åndalsnes)",
          time: "08:00-09:30",
          description:
            "Подъём на плато со стороны Valldal; лучшие виды на серпантин",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Trollstigen+plat%C3%A5",
          notes:
            "Участок со стороны Åndalsnes открыт с 14 июля; спускаемся обратно тем же путём",
        },
        {
          name: "🚶 Тропа Kløvstien (альтернатива)",
          time: "опционально",
          description:
            "Секретная вьючная тропа — виды на Trollstigen без толпы",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Kl%C3%B8vstien+Trollstigen",
          notes:
            "Начало от визит-центра. Уникальные виды, недоступные с основных площадок",
        },
        {
          name: "Romsdalsgondolen",
          time: "10:45-12:00",
          description: "Канатка 708 м, панорама 360° на Trollveggen и Romsdal",
          type: "activity",
          maps: "https://maps.google.com/?q=Romsdalsgondolen",
          notes: "Билеты онлайн дешевле; заложить ≥ 75 мин с фото",
        },
        {
          name: "Trollveggen Visitor Centre",
          time: "12:00-12:30",
          description:
            "Вертикальная стена 1100 м; смотровая площадка у подножия",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Trollveggen+visitor+center",
          notes: "Иногда видны альпинисты",
        },
        {
          name: "🦀 Bjartmars Favorittkro (обед)",
          time: "опционально",
          description:
            "Ресторан у Атлантической дороги — отмеченный наградами бакалао",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Bjartmars+Favorittkro",
          notes: "Кулинарная жемчужина с разумными ценами. Удобная парковка",
        },
        {
          name: "Atlantic Road (Atlanterhavsvegen)",
          time: "15:30-18:00",
          description:
            "8,3 км мостов над океаном; Eldhusøya trail, Storseisundet Bridge",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Atlanterhavsveien",
          notes: "Заглянуть в Kvernes Stave Church по дороге (11-17)",
        },
        {
          name: "🐟 Деревня Буд (детур)",
          time: "опционально",
          description:
            "Рыбацкая деревня — густой сливочный рыбный суп в Bryggjen i Bud",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Bryggjen+i+Bud",
          notes: "Атмосфера настоящей рыбацкой деревни. Большая парковка",
        },
        {
          name: "Atlanterhavsveien Camping",
          time: "18:00",
          description: "Кемпинг с видом на океан",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Atlanterhavsveien+Camping",
          notes: "Ресторан на территории, душ за жетон",
        },
      ],
    },

    /* ───────────────────────  DAY 4  ─────────────────────── */
    {
      day: 4,
      date: "5 июля",
      title: "Ålesund → Runde",
      distance: "240 км",
      time: "4.5 часа",
      status: "planned",
      locations: [
        {
          name: "Ålesund (Aksla)",
          time: "10:30-13:00",
          description:
            "418 ступеней к платформе Fjellstua; ар-нуво-центр города",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Aksla+viewpoint+%C3%85lesund",
          notes: "Обед на рыбном рынке Brogata",
        },
        {
          name: "🏙️ Прогулка по Ålesund (альтернатива)",
          time: "опционально",
          description:
            "Маршрут местных: кофе в Racoon, Apotekergata 5, бар Trankokeriet",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Racoon+Coffee+%C3%85lesund",
          notes:
            "Душа города, не только фасады. Парковка Hjelsetgården Bobilparkering",
        },
        {
          name: "🚤 Kami Skotholmen (экстрим)",
          time: "опционально",
          description:
            "Ресторан морепродуктов на удаленном острове — катер из Fosnavåg",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Fosnavag+harbor",
          notes:
            "Требует бронирования (booking@skotholmen.no). Ужин-приключение",
        },
        {
          name: "Runde Camping",
          time: "15:00",
          description: "Кемпинг на северной стороне острова",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Runde+Camping",
          notes: "Уютно и безветренно",
        },
        {
          name: "Наблюдение за тупиками",
          time: "19:00-22:00",
          description: "Маршрут Rundebranden (45 мин подъёма)",
          type: "activity",
          maps: "https://maps.google.com/?q=Rundebranden+trailhead",
          notes: "Птицы возвращаются 19-22:30; взять бинокль, ветрозащиту",
        },
      ],
    },

    /* ───────────────────────  DAY 5  ─────────────────────── */
    {
      day: 5,
      date: "6 июля",
      title: "Hjørundfjord → Geiranger",
      distance: "275 км",
      time: "5 часов",
      status: "optional",
      locations: [
        {
          name: "Паром Sæbø → Trandal (по расписанию!)",
          time: "10:30-11:00",
          description: "20 мин через Hjørundfjord; 'Альпы у океана'",
          type: "transport",
          maps: "https://maps.google.com/?q=S%C3%A6b%C3%B8+ferjekai",
          notes: "Если рейса нет — ехать через Ørsta (+55 км)",
        },
        {
          name: "🦅 Hjørundfjord (альтернатива Гейрангеру)",
          time: "опционально",
          description:
            "Дикий фьорд — Urke Kaihus (вафли) или Rekkedal Gjestegard",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Urke+Kaihus",
          notes: "Более аутентичная альтернатива Гейрангеру. Тишина и покой",
        },
        {
          name: "Hotel Union Øye",
          time: "11:15-12:00",
          description: "Исторический отель 1891 г.; кофе с видом на фьорд",
          type: "optional",
          maps: "https://maps.google.com/?q=Hotel+Union+%C3%98ye",
          notes: "Гости: Кайзер Вильгельм II, Ибсен, Амундсен",
        },
        {
          name: "Паром Hellesylt → Geiranger",
          time: "14:00-15:10",
          description: "Круиз 1 ч 10 мин по Geirangerfjord (UNESCO)",
          type: "transport",
          maps: "https://maps.google.com/?q=Hellesylt+ferjekai",
          notes: "Бронируйте онлайн заранее!",
        },
        {
          name: "Dalsnibba Skywalk",
          time: "16:00-17:30",
          description: "Панорама с 1500 м; 21 км серпантина",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Dalsnibba+Skywalk",
          notes: "260 NOK за авто; не ехать в туман",
        },
        {
          name: "🐐 Westerås Gard (ужин с видом)",
          time: "опционально",
          description:
            "Ферма-ресторан на уступе над Гейрангером — ламы, козы, лучшие виды",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Wester%C3%A5s+Gard+Geiranger",
          notes:
            "Узкий серпантин. Требует бронирования. Над туристической суетой",
        },
        {
          name: "✨ Пикник на Dalsnibba (закат)",
          time: "опционально",
          description: "Закатный пикник на 1500м с купленными деликатесами",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Dalsnibba+Skywalk",
          notes:
            "Когда автобусы уехали — бесценный момент восхищения. Свобода кемпера!",
        },
        {
          name: "Geiranger Camping",
          time: "15:30",
          description: "Кемпинг на берегу знаменитого фьорда",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Geiranger+Camping",
          notes: "Рекомендуется бронирование за 1-2 мес.",
        },
      ],
    },

    /* ───────────────────────  DAY 6  ─────────────────────── */
    {
      day: 6,
      date: "7 июля",
      title: "Geiranger → Lillehammer",
      distance: "510 км",
      time: "7 часов",
      status: "planned",
      locations: [
        {
          name: "Lom (Fossheim Bakery + Stave Church)",
          time: "10:30-11:30",
          description: "Булочки skillingsbolle и ставкирка 1170 г.",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Lom+Stave+Church",
          notes: "Вход 100 NOK; стойка выпечки легендарна",
        },
        {
          name: "🥐 Bakeriet i Lom (альтернатива)",
          time: "опционально",
          description:
            "Легендарная пекарня с дровяной печью — лучшие kanelsnurrer в Норвегии",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Bakeriet+i+Lom",
          notes:
            "Оставить кемпер в Lom Camping, дойти пешком 10 мин. Нет своей парковки",
        },
        {
          name: "Lillehammer Camping",
          time: "17:00",
          description: "Кемпинг у озера Mjøsa, рядом олимпийские трамплины",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Lillehammer+Camping",
          notes: "Вечером пройтись к Lysgårdsbakken",
        },
        {
          name: "☕ Atelier Cocoa / Cafe Sorgenfri (вечер)",
          time: "опционально",
          description:
            "Нетуристические кафе — горячий шоколад и норвежский уют (kos)",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Atelier+Cocoa+Lillehammer",
          notes: "Завершение путешествия на душевной ноте. Городская парковка",
        },
      ],
    },

    /* ───────────────────────  DAY 7  ─────────────────────── */
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
          description: "Осмотр и трансфер в аэропорт Gardermoen",
          type: "logistics",
          maps: "https://maps.google.com/?q=Oslo+Airport+Gardermoen",
          notes: "Полный бак, уборка салона, слить серую воду",
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
    amount: "18 000–30 000 NOK (≈ 1 570–2 620 €)",
    note: "7 дней, средний кемпер 2 200–3 200 NOK/сутки с страховкой",
  },
  {
    category: "Топливо и дороги",
    amount: "5 000–7 000 NOK (≈ 440–610 €)",
    note: "≈200 л дизеля по 19,7 NOK + AutoPASS/платные дороги",
  },
  {
    category: "Кемпинги",
    amount: "2 000–3 500 NOK (≈ 175–305 €)",
    note: "6 ночей, 250–350 NOK/ночь с электричеством",
  },
  {
    category: "Паромы",
    amount: "1 000–2 000 NOK (≈ 90–175 €)",
    note: "Eidsdal-Linge, Åfarnes-Sølsnes, Molde-Vestnes, Geiranger и др.",
  },
  {
    category: "Еда",
    amount: "6 000–10 000 NOK (≈ 525–875 €)",
    note: "Продукты + 2 ресторана в Ålesund/Loen",
  },
  {
    category: "Развлечения",
    amount: "3 000–5 000 NOK (≈ 265–435 €)",
    note: "Via Ferrata Loen, Romsdalsgondolen, Dalsnibba",
  },
  {
    category: "Прочее",
    amount: "2 000–5 000 NOK (≈ 175–435 €)",
    note: "Сувениры, душевые жетоны, мелкие расходы",
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
