# 📸 Руководство по добавлению фотографий к маршруту

## Структура фотографий

Все ландшафтные фотографии должны быть размещены в:
```
images/landscapes/
```

## Уже добавленные локации

В data.js уже добавлены поля `photo` для следующих ключевых локаций:

### 🏔️ Основные пейзажи:
1. **Kjenndalstova** - `kjenndalstova-glacier-view.jpg`
2. **Dalsnibba Skywalk** - `dalsnibba-geirangerfjord-panorama.jpg`
3. **Trollstigen** - `trollstigen-serpentine-road.jpg`
4. **Atlantic Road** - `atlantic-road-storseisundet-bridge.jpg`
5. **Norangsdalen** - `norangsdalen-submerged-village.jpg`
6. **Ålesund Aksla** - `alesund-aksla-panoramic-view.jpg`
7. **Hjørundfjord** - `hjorundfjord-wild-landscape.jpg`

## Рекомендуемые источники бесплатных фотографий

### 🌐 Лучшие сайты:
1. **Pixabay** - https://pixabay.com/
   - Поиск: "Geirangerfjord", "Trollstigen", "Atlantic Road Norway"
   - Лицензия: Pixabay License (бесплатно для коммерческого использования)

2. **Unsplash** - https://unsplash.com/
   - Поиск: "Norway fjord", "Norwegian landscape", "Lofoten"
   - Лицензия: Unsplash License (бесплатно)

3. **Pexels** - https://pexels.com/
   - Поиск: "Norway mountains", "Scandinavian landscape"
   - Лицензия: Pexels License (бесплатно)

### 🔍 Поисковые запросы:
- **Geirangerfjord**: "Geirangerfjord", "Dalsnibba viewpoint", "Seven Sisters waterfall"
- **Trollstigen**: "Trollstigen road", "Norwegian serpentine", "Troll's Path"
- **Atlantic Road**: "Atlanterhavsveien", "Storseisundet bridge", "Atlantic Ocean Road Norway"
- **Ålesund**: "Alesund panorama", "Aksla viewpoint", "Art Nouveau Alesund"

## Требования к фотографиям

### 📐 Технические параметры:
- **Разрешение**: минимум 1200x800px
- **Формат**: JPG (для оптимизации)
- **Соотношение сторон**: 16:9 или 3:2 (горизонтальные)
- **Размер файла**: до 500KB (для быстрой загрузки)

### 🎨 Качество контента:
- Четкие, высококачественные пейзажи
- Хорошее освещение (избегать слишком темных/засвеченных)
- Показывать характерные особенности локации
- Без людей на переднем плане (фокус на природе)

## Как добавить новую фотографию

1. **Скачайте фото** с одного из рекомендуемых сайтов
2. **Переименуйте файл** согласно схеме: `lokatsiya-opisanie.jpg`
3. **Оптимизируйте** (сжмите до ~300-500KB)
4. **Поместите** в `images/landscapes/`
5. **Добавьте поле** в data.js:
   ```javascript
   photo: "images/landscapes/your-photo-name.jpg",
   ```

## Дополнительные локации для фотографий

Локации в data.js, которые еще можно дополнить фотографиями:

### День 3:
- **Trollveggen Visitor Centre** - вертикальная стена 1100м
- **Romsdalsgondolen** - канатная дорога с панорамными видами

### День 4:
- **Runde Island** - наблюдение за тупиками на скалах

### День 5:
- **Westerås Gard** - ферма-ресторан над Гейрангером
- **Geiranger Camping** - кемпинг на берегу фьорда

### День 6-7:
- **Grotli Mountain Lodge** - горная локация
- **Лестница троллей** - если найдете хорошие виды

## Интеграция в карту

Фотографии автоматически появятся:
- ✅ В info window при клике на маркер
- ✅ С возможностью увеличения в новой вкладке
- ✅ С обработкой ошибок (скрытие при неудачной загрузке)
- ✅ Оптимизированный размер для мобильных устройств

## Советы по поиску

### 🏷️ Эффективные теги:
- Добавляйте "landscape", "scenic", "panoramic", "viewpoint"
- Используйте местные названия на английском
- Поиск по координатам: "62.05N 7.28E Norway"

### ⭐ Приоритет качества:
1. Официальные туристические фото Visit Norway
2. Фотографии профессиональных путешественников
3. Пользовательский контент высокого качества

Удачного поиска! 🇳🇴✨