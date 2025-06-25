// Fallback конфигурация если config.js не найден
// Этот файл будет включен в репозиторий как резервный вариант

// Попробуем загрузить config.js, если не получится - используем fallback
if (typeof CONFIG === 'undefined') {
  console.warn('config.js не найден, используется fallback конфигурация');
  
  const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE'
  };
  
  // Экспорт для использования в других файлах
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
  } else {
    window.CONFIG = CONFIG;
  }
}