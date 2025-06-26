# 🇳🇴 Norway Trip Planner 2025

Интерактивный планировщик путешествия по Норвегии на кемпере с детальным маршрутом, чек-листом и бюджетом.

## 🚀 Live Demo

**[Открыть планировщик](https://elipskiy.github.io/norway/)**

## ⚙️ Настройка

### Для работы интерактивной карты требуется Google Maps API ключ:

1. **Скопируйте конфигурационный файл:**

   ```bash
   cp config.example.js config.js
   ```

2. **Получите Google Maps API ключ:**

   - Перейдите в [Google Cloud Console](https://console.developers.google.com/)
   - Создайте новый проект или выберите существующий
   - Включите Maps JavaScript API
   - Создайте API ключ и ограничьте его использование

3. **Добавьте ключ в config.js:**

   ```javascript
   const CONFIG = {
     GOOGLE_MAPS_API_KEY: "ваш_реальный_ключ_здесь",
   };
   ```

4. **Файл config.js уже добавлен в .gitignore** и не будет попадать в репозиторий

### Настройка GitHub Pages:

Для работы интерактивной карты на GitHub Pages:

1. **Перейдите в Settings репозитория → Secrets and variables → Actions**

2. **Добавьте новый Repository Secret:**

   - Name: `GOOGLE_MAPS_API_KEY`
   - Value: ваш Google Maps API ключ

3. **Включите GitHub Pages:**

   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

4. **GitHub Actions автоматически создаст config.js** с вашим API ключом при деплое

## ✨ Особенности

- 📅 **Детальный маршрут** - 7 дней, 16 локаций, 1970 км
- 🗺️ **Интерактивная карта** - реальные автомобильные маршруты через Google Maps
- ✅ **Интерактивный чек-лист** - подготовка к поездке
- 💭 **Заметки команды** - добавление и сохранение идей
- 💰 **Бюджет** - примерные расходы на поездку
- 💎 **Скрытые жемчужины** - тайные места, известные только местным
- 📱 **Адаптивный дизайн** - работает на всех устройствах
- 💾 **Локальное сохранение** - прогресс сохраняется в браузере
- 🚗 **Hover эффекты** - интерактивные маркеры на карте
- ⚡ **Кэширование маршрутов** - быстрая загрузка повторных посещений

## 🗺️ Маршрут

### День 1: Oslo → Loen (482 км)

- Получение кемпера в аэропорту
- Закупка продуктов
- Кемпинг Lo-Vik у фьорда

### День 2: Via Ferrata → Valldal (160 км)

- Via Ferrata Loen с подвесным мостом
- Долина Norangsdalen
- Паром через фьорд
- Кемпинг в Valldal

### День 3: Trollstigen → Atlantic Road (290 км)

- Дорога Троллей (Trollstigen)
- Стена Троллей (Trollveggen)
- Atlantic Road с мостами над океаном

### День 4: Ålesund → Runde (240 км)

- Город Ålesund в стиле ар-нуво
- Остров Runde - наблюдение за тупиками

### День 5: Hjørundfjord → Geiranger (275 км)

- Фьорд Hjørundfjord
- Паром по Geirangerfjord (UNESCO)
- Смотровая площадка Dalsnibba

### День 6: Geiranger → Lillehammer (510 км)

- Деревня Lom с церковью
- Олимпийский город Lillehammer

### День 7: Возвращение в Oslo (134 км)

- Сдача кемпера

## 🛠️ Технологии

- **HTML5** - семантическая разметка
- **CSS3** - современные стили с анимациями
- **JavaScript (ES6+)** - интерактивность
- **Tailwind CSS** - утилитарные классы
- **LocalStorage** - сохранение данных
- **PWA** - прогрессивное веб-приложение

## 📦 Установка и запуск

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/yourusername/norway-trip.git
   cd norway-trip
   ```

2. **Откройте в браузере:**

   ```bash
   # Просто откройте index.html в браузере
   # Или используйте локальный сервер:
   python -m http.server 8000
   # Затем откройте http://localhost:8000
   ```

3. **Для деплоя на GitHub Pages:**
   - Создайте репозиторий на GitHub
   - Загрузите файлы
   - В настройках репозитория включите GitHub Pages
   - Выберите ветку `main` и папку `/ (root)`

## 📁 Структура проекта

```
norway-trip/
├── index.html          # Главная страница
├── styles.css          # Стили
├── scripts/index.js           # JavaScript логика
├── README.md           # Документация
├── .gitignore          # Git ignore файл
├── scripts/data.js          # Данные маршрута
└── sw.js              # Service Worker (опционально)
```

## 🎨 Кастомизация

### Изменение маршрута

Отредактируйте массив `tripData.days` в файле `scripts/data.js`:

```javascript
const tripData = {
  days: [
    {
      day: 1,
      date: "2 июля",
      title: "Ваш маршрут",
      // ... остальные данные
    },
  ],
};
```

### Изменение чек-листа

Отредактируйте объект `checklistData` в файле `scripts/data.js`:

```javascript
const checklistData = {
  documents: [
    "Ваш пункт",
    // ... другие пункты
  ],
};
```

### Изменение бюджета

Отредактируйте массив `budgetData` в файле `scripts/data.js`:

```javascript
const budgetData = [
  {
    category: "Ваша категория",
    amount: "1000-2000",
    note: "Описание",
  },
];
```

## 🔧 Функции

### Сохранение данных

- Заметки сохраняются в LocalStorage
- Прогресс чек-листа сохраняется автоматически
- Текущая секция запоминается

### Печать

- Нажмите `Ctrl+P` для печати
- Скрываются ненужные элементы
- Оптимизированная верстка для печати

### Адаптивность

- Мобильные устройства
- Планшеты
- Десктопы
- Большие экраны

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.

## 🙏 Благодарности

- [Tailwind CSS](https://tailwindcss.com/) - за отличную CSS библиотеку
- [Inter Font](https://rsms.me/inter/) - за красивый шрифт
- [Norway Tourism](https://www.visitnorway.com/) - за вдохновение

## 📞 Контакты

Если у вас есть вопросы или предложения, создайте [Issue](https://github.com/yourusername/norway-trip/issues) в репозитории.

---

**Создано с ❤️ для путешественников** 🇳🇴

# Norway Trip Photo Downloader

Multi-provider photo downloader for Norwegian landscapes with CLI interface and HTML gallery generation.

## Features

- **Multi-provider support**: Pixabay, Unsplash, Pexels
- **CLI interface** with progress bar
- **HTML gallery generation** with filters
- **Multiple image sizes** (large, medium, small, thumb)
- **Dry run mode** for testing
- **Professional error handling** with retries

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file or set environment variables:

```bash
export PIXABAY_API_KEY="your_pixabay_key"
export UNSPLASH_ACCESS_KEY="your_unsplash_key"
export PEXELS_API_KEY="your_pexels_key"
```

## Usage

```bash
# Download 20 photos per location from all providers
node download-photos.js

# Download 10 photos per location from specific providers
node download-photos.js --count 10 --providers pixabay,unsplash

# Dry run to test without downloading
node download-photos.js --dry-run

# Skip gallery generation
node download-photos.js --no-gallery
```

## CLI Options

- `--count, -c`: Photos per location (default: 20)
- `--providers, -p`: Comma-separated providers (default: "pixabay,unsplash,pexels")
- `--dry-run`: Simulate without downloading
- `--gallery`: Generate HTML gallery (default: true)
- `--help`: Show help

## Output Structure

```
images/
├── landscapes/           # Main photos (one per location)
│   ├── location1.jpg
│   └── location2.jpg
├── inspiration/          # Multiple variants by category
│   ├── fjord/
│   │   ├── location1-v1-large.jpg
│   │   ├── location1-v1-medium.jpg
│   │   └── ...
│   └── mountain/
├── gallery.html          # Interactive gallery
└── photo-info.json       # Metadata
```

## Locations

The script downloads photos for 21 Norwegian locations across categories, covering **ALL key stops from the trip route**:

### 🗺️ **From Trip Route:**

- **Day 1**: Kjenndalstova glacier view
- **Day 2**: Via Ferrata Loen, Norangsdalen valley
- **Day 3**: Trollstigen road, Romsdalsgondolen, Trollveggen, Atlantic Road
- **Day 4**: Ålesund/Aksla, Runde puffins
- **Day 5**: Hjørundfjord, Hotel Union Øye, Geiranger/Dalsnibba
- **Day 6**: Lom Stave Church, Lillehammer Olympics

### 📸 **Additional Inspiration:**

- **Fjords**: Geirangerfjord, Hjørundfjord
- **Mountains**: Trollveggen, Grotli, Loen skylift
- **Roads**: Trollstigen, Eagle Road, Atlantic Road
- **Architecture**: Stave churches, historic hotels
- **Adventure**: Via ferrata climbing
- **Sports**: Olympic venues
- **Natural phenomena**: Midnight sun
- **Cliffs**: Preikestolen
- **Islands**: Runde (puffins)
- **Cities**: Ålesund
- **Valleys**: Norangsdalen
- **Glaciers**: Kjenndalstova

## AICODE Notes

- **AICODE-NOTE**: CLI interface uses yargs for professional argument parsing
- Clean class-based architecture separating concerns
- Error handling with axios-retry for network resilience
- Progress tracking with cli-progress for better UX
