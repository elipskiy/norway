# Настройка Google Maps для карт путешествия

Чтобы карты работали, необходимо получить API ключ Google Maps и заменить `YOUR_API_KEY` в файлах карт.

## Получение API ключа Google Maps

### 1. Создайте проект в Google Cloud Console

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Войдите в свой Google аккаунт
3. Создайте новый проект или выберите существующий
4. Запишите ID проекта

### 2. Включите Google Maps JavaScript API

1. Перейдите в раздел "APIs & Services" → "Library"
2. Найдите "Maps JavaScript API"
3. Нажмите "Enable"

### 3. Создайте API ключ

1. Перейдите в "APIs & Services" → "Credentials"
2. Нажмите "Create Credentials" → "API key"
3. Скопируйте созданный ключ
4. (Рекомендуется) Настройте ограничения:
   - Application restrictions: HTTP referrers
   - Добавьте ваш домен (например, `yourdomain.com/*`)
   - API restrictions: Restrict key → Maps JavaScript API

### 4. Замените ключ в файлах

Замените `YOUR_API_KEY` на ваш реальный ключ в файлах:

**route-map.html** (строка ~317):
```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=ВАШ_КЛЮЧ_ЗДЕСЬ&callback=initMap">
</script>
```

**overview-map.html** (строка ~360):
```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=ВАШ_КЛЮЧ_ЗДЕСЬ&callback=initOverviewMap">
</script>
```

## Для локального тестирования

Для тестирования на localhost Google Maps API работает без ограничений, но для продакшена обязательно настройте ограничения безопасности.

## Безопасность

⚠️ **ВАЖНО**: 
- Никогда не коммитьте API ключи в публичные репозитории
- Всегда используйте ограничения API ключа
- Мониторьте использование ключа в Google Cloud Console

## Возможные ошибки

- **"This page can't load Google Maps correctly"** - неверный или ограниченный API ключ
- **Карта серая** - проблемы с загрузкой, проверьте консоль браузера
- **"For development purposes only"** - нужно настроить биллинг в Google Cloud

## Примерная стоимость

Google Maps предоставляет $200 кредитов в месяц бесплатно, что покрывает ~28,000 загрузок карт. Для личного сайта этого более чем достаточно.