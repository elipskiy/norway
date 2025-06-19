# 🚀 Инструкции по деплою на GitHub Pages

## Быстрый старт

### 1. Создание репозитория на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Назовите репозиторий `norway-trip`
4. Сделайте его публичным
5. НЕ инициализируйте с README (мы уже создали его)

### 2. Загрузка файлов

#### Вариант A: Через веб-интерфейс GitHub

1. В созданном репозитории нажмите "uploading an existing file"
2. Перетащите все файлы проекта:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.gitignore`
   - `sw.js`
   - `manifest.json`
   - `DEPLOY.md`
3. Добавьте коммит "Initial commit"
4. Нажмите "Commit changes"

#### Вариант B: Через Git (рекомендуется)

```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/norway-trip.git
cd norway-trip

# Скопируйте все файлы проекта в папку
# (скопируйте index.html, styles.css, script.js и т.д.)

# Добавьте файлы в Git
git add .

# Создайте коммит
git commit -m "Initial commit: Norway Trip Planner"

# Отправьте на GitHub
git push origin main
```

### 3. Настройка GitHub Pages

1. В репозитории перейдите в **Settings**
2. Прокрутите вниз до секции **Pages**
3. В **Source** выберите **Deploy from a branch**
4. В **Branch** выберите **main** и папку **/ (root)**
5. Нажмите **Save**

### 4. Обновление ссылок

После деплоя обновите ссылки в файлах:

#### В `index.html`:

```html
<!-- Замените yourusername на ваше имя пользователя -->
<meta property="og:url" content="https://yourusername.github.io/norway-trip/" />
<meta
  property="twitter:url"
  content="https://yourusername.github.io/norway-trip/"
/>
```

#### В `README.md`:

```markdown
**[Открыть планировщик](https://yourusername.github.io/norway-trip/)**
```

### 5. Проверка

Через несколько минут ваш сайт будет доступен по адресу:
`https://yourusername.github.io/norway-trip/`

## 🔧 Дополнительные настройки

### Кастомный домен (опционально)

1. В настройках Pages добавьте ваш домен
2. Создайте CNAME файл в корне репозитория
3. Добавьте ваш домен в CNAME файл

### HTTPS

GitHub Pages автоматически предоставляет SSL сертификат

### Кэширование

Service Worker автоматически кэширует ресурсы для офлайн работы

## 🐛 Устранение проблем

### Сайт не загружается

- Проверьте, что все файлы загружены в корень репозитория
- Убедитесь, что GitHub Pages включен в настройках
- Подождите 5-10 минут после первого деплоя

### Стили не применяются

- Проверьте, что `styles.css` находится в корне
- Убедитесь, что путь в `index.html` правильный

### JavaScript не работает

- Проверьте консоль браузера на ошибки
- Убедитесь, что `script.js` загружен

### PWA не работает

- Проверьте, что `manifest.json` и `sw.js` загружены
- Убедитесь, что сайт работает по HTTPS

## 📱 Тестирование

### Локальное тестирование

```bash
# Запустите локальный сервер
python -m http.server 8000
# или
npx serve .

# Откройте http://localhost:8000
```

### Мобильное тестирование

- Откройте сайт на мобильном устройстве
- Проверьте адаптивность
- Протестируйте PWA установку

## 🔄 Обновления

Для обновления сайта:

1. Измените файлы локально
2. Загрузите изменения на GitHub
3. GitHub Pages автоматически обновится

```bash
git add .
git commit -m "Update: описание изменений"
git push origin main
```

## 📊 Аналитика (опционально)

Добавьте Google Analytics:

1. Создайте аккаунт в Google Analytics
2. Добавьте код отслеживания в `index.html`

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

---

**Удачи с деплоем! 🚀**
