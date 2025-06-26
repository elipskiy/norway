const defaultNotes = [
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

const StorageService = {
  loadNotes() {
    return JSON.parse(localStorage.getItem("norwayTripNotes")) || [...defaultNotes];
  },
  saveNotes(notes) {
    localStorage.setItem("norwayTripNotes", JSON.stringify(notes));
  },
  loadChecklist() {
    return JSON.parse(localStorage.getItem("norwayTripChecklist")) || {};
  },
  saveChecklist(data) {
    localStorage.setItem("norwayTripChecklist", JSON.stringify(data));
  },
  loadCurrentSection() {
    return localStorage.getItem("norwayTripCurrentSection") || "itinerary";
  },
  saveCurrentSection(section) {
    localStorage.setItem("norwayTripCurrentSection", section);
  },
};

if (typeof module !== 'undefined') { module.exports = { StorageService, defaultNotes }; }
