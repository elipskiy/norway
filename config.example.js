// Пример конфигурационного файла
// Скопируйте этот файл как config.js и добавьте свои API ключи

const CONFIG = {
  // Получите ключ Google Maps API здесь: https://console.developers.google.com/
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE'
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}