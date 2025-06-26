export const tripData = {
  days: [
    {
      day: 1,
      date: "2 июля",
      title: "Oslo → Loen",
      distance: "482 км",
      time: "8 часов",
      status: "planned",
      coordinates: [60.1939, 11.1004], // Oslo Airport Gardermoen
      locations: [
        {
          name: "Получение кемпера",
          time: "12:00-12:30",
          description: "Аэропорт Gardermoen, проверка документов и инструктаж",
          type: "logistics",
          maps: "https://maps.google.com/?q=Oslo+Airport+Gardermoen",
          coordinates: [60.1939, 11.1004],
          notes: "Взять телефон прокатчика, проверить все системы кемпера",
        },
        {
          name: "Закупка продуктов",
          time: "12:30-13:30",
          description: "Rema 1000 или Kiwi рядом с аэропортом",
          type: "shopping",
          maps: "https://maps.google.com/?q=Kiwi+Gardermoen",
          coordinates: [60.143723, 11.161695], // ← fixed
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
          coordinates: [61.531216, 10.13819],
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
          coordinates: [61.66317, 6.82336], // ← fixed
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
          coordinates: [61.779667, 7.010478], // ← fixed
          notes:
            "Узкая платная дорога (наличные). Уединенный ужин вдали от толпы",
        },
        {
          name: "Lo-Vik Camping",
          time: "21:30",
          description: "Кемпинг прямо у фьорда в Лоэне",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Lo-Vik+Camping+Loen",
          coordinates: [61.867649, 6.849223],
          notes:
            "Запасной вариант — Sande Camping ( https://maps.google.com/?q=Sande+Camping+Loen )",
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
      coordinates: [62.3173, 7.2946], // Valldal Camping
      locations: [
        {
          name: "Via Ferrata Loen",
          time: "08:00-13:30",
          description: "Маршрут 'Classic', подвесной мост Gjølmunne (750 м)",
          type: "activity",
          maps: "https://maps.google.com/?q=Loen+Active",
          coordinates: [61.874744, 6.838921],
          notes: "Бронь на 08:00; перчатки, 1½ л воды, слойная одежда",
        },
        {
          name: "Долина Norangsdalen",
          time: "13:30-15:30",
          description:
            "Озеро Lygnstøylvatnet (затонувшая деревня) и водопад Norangsfossen",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Lygnstøylvatnet",
          coordinates: [62.174722, 6.729167],
          notes: "Фантастические фото сквозь прозрачную воду",
        },
        {
          name: "Паром Eidsdal → Linge",
          time: "16:00-17:10",
          description: "Переправа 10 мин, отправления каждые 20-30 мин летом",
          type: "transport",
          maps: "https://maps.google.com/?q=Eidsdal+ferjekai",
          coordinates: [62.262619, 7.171835], // ← fixed
          notes: "~200 NOK, возможна очередь до 40 мин",
        },
        {
          name: "🍎 Lingebakken Gardsutsalg (по пути)",
          time: "опционально",
          description: "Фермерский магазин сидра — дегустация и свежие фрукты",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Lingebakken+Gardsutsalg",
          coordinates: [62.289, 7.203],
          notes: "Домашний сидр и сезонные фрукты. Открыто 9-17",
        },
        {
          name: "Valldal Camping",
          time: "17:30",
          description: "Кемпинг в 'клубничной столице' Норвегии",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Valldal+Camping",
          coordinates: [62.3173, 7.2946],
          notes:
            "Успеете в Jordbærstova ( https://maps.google.com/?q=Jordbærstova+Valldal ) если до 17:00",
        },
        {
          name: "🍓 Jordbærstova (вечером)",
          time: "опционально",
          description: "Легендарное кафе — лучший клубничный торт в Норвегии",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Jordbærstova+Valldal",
          coordinates: [62.3277, 7.3175],
          notes: "Главная цель в 'клубничной столице'. Бесплатная парковка",
        },
      ],
    },
    {
      day: 3,
      date: "4 июля",
      title: "Trollstigen (плато) → Åndalsnes → Atlantic Road",
      distance: "295 км",
      time: "6 часов",
      status: "planned",
      coordinates: [63.0249, 7.3674], // Atlanterhavsveien Camping
      locations: [
        {
          name: "Trollstigen плато (дорога закрыта ↓ Åndalsnes)",
          time: "08:00-09:30",
          description:
            "Подъём на плато со стороны Valldal; лучшие виды на серпантин",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Trollstigen+plat%C3%A5",
          coordinates: [62.4566, 7.6719],
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
          coordinates: [62.480486, 7.665235],
          notes:
            "Начало от визит-центра. Уникальные виды, недоступные с основных площадок",
        },
        {
          name: "Romsdalsgondolen",
          time: "10:45-12:00",
          description: "Канатка 708 м, панорама 360° на Trollveggen и Romsdal",
          type: "activity",
          maps: "https://maps.google.com/?q=Romsdalsgondolen",
          coordinates: [62.566, 7.6865],
          notes: "Билеты онлайн дешевле; заложить ≥ 75 мин с фото",
        },
        {
          name: "Trollveggen Visitor Centre",
          time: "12:00-12:30",
          description:
            "Вертикальная стена 1100 м; смотровая площадка у подножия",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Trollveggen+visitor+center",
          coordinates: [62.488996, 7.759931], // ← fixed
          notes: "Иногда видны альпинисты",
        },
        {
          name: "🦀 Bjartmars Favorittkro (обед)",
          time: "опционально",
          description:
            "Ресторан у Атлантической дороги — отмеченный наградами бакалао",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Bjartmars+Favorittkro",
          coordinates: [62.9984, 7.3296],
          notes: "Кулинарная жемчужина с разумными ценами. Удобная парковка",
        },
        {
          name: "Atlantic Road (Atlanterhavsvegen)",
          time: "15:30-18:00",
          description:
            "8,3 км мостов над океаном; Eldhusøya trail, Storseisundet Bridge",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Atlanterhavsveien",
          coordinates: [63.01674, 7.35431],
          notes: "Заглянуть в Kvernes Stave Church по дороге (11-17)",
        },
        {
          name: "🐟 Деревня Буд (детур)",
          time: "опционально",
          description:
            "Рыбацкая деревня — густой сливочный рыбный суп в Bryggjen i Bud",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Bryggjen+i+Bud",
          coordinates: [62.9066, 6.9141],
          notes: "Атмосфера настоящей рыбацкой деревни. Большая парковка",
        },
        {
          name: "Atlanterhavsveien Camping",
          time: "18:00",
          description: "Кемпинг с видом на океан",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Atlanterhavsveien+Camping",
          coordinates: [63.0249, 7.3674],
          notes: "Ресторан на территории, душ за жетон",
        },
      ],
    },
    // DAY 4
    {
      day: 4,
      date: "5 июля",
      title: "Ålesund → Runde",
      distance: "240 км",
      time: "4.5 часа",
      status: "planned",
      coordinates: [62.3995, 5.6015], // Runde Camping
      locations: [
        {
          name: "Ålesund (Aksla)",
          time: "10:30-13:00",
          description:
            "418 ступеней к платформе Fjellstua; ар-нуво-центр города",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Aksla+viewpoint+%C3%85lesund",
          coordinates: [62.475, 6.163], // Aksla viewpoint
          notes: "Обед на рыбном рынке Brogata",
        },
        {
          name: "🏙️ Прогулка по Ålesund (альтернатива)",
          time: "опционально",
          description:
            "Маршрут местных: кофе в Racoon, Apotekergata 5, бар Trankokeriet",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Racoon+Coffee+%C3%85lesund",
          coordinates: [62.472, 6.1525], // Racoon Coffee (Apotekergata 10)
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
          coordinates: [62.341, 5.632], // Fosnavåg harbor (departure point)
          notes:
            "Требует бронирования (booking@skotholmen.no). Ужин-приключение",
        },
        {
          name: "Runde Camping",
          time: "15:00",
          description: "Кемпинг на северной стороне острова",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Runde+Camping",
          coordinates: [62.3995, 5.6015],
          notes: "Уютно и безветренно",
        },
        {
          name: "Наблюдение за тупиками",
          time: "19:00-22:00",
          description: "Маршрут Rundebranden (45 мин подъёма)",
          type: "activity",
          maps: "https://maps.google.com/?q=Rundebranden+trailhead",
          coordinates: [62.399, 5.592], // Rundebranden trailhead (Goksøyr)
          notes: "Птицы возвращаются 19-22:30; взять бинокль, ветрозащиту",
        },
      ],
    },
    // DAY 5
    {
      day: 5,
      date: "6 июля",
      title: "Hjørundfjord → Geiranger",
      distance: "275 км",
      time: "5 часов",
      status: "optional",
      coordinates: [62.099, 7.205], // Geiranger Camping
      locations: [
        {
          name: "Паром Sæbø → Trandal (по расписанию!)",
          time: "10:30-11:00",
          description: "20 мин через Hjørundfjord; 'Альпы у океана'",
          type: "transport",
          maps: "https://maps.google.com/?q=S%C3%A6b%C3%B8+ferjekai",
          coordinates: [62.2, 6.483], // Sæbø ferjekai
          notes: "Если рейса нет — ехать через Ørsta (+55 км)",
        },
        {
          name: "🦅 Hjørundfjord (альтернатива Гейрангеру)",
          time: "опционально",
          description:
            "Дикий фьорд — Urke Kaihus (вафли) или Rekkedal Gjestegard",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Urke+Kaihus",
          coordinates: [62.213, 6.578], // Urke Kaihus
          notes: "Более аутентичная альтернатива Гейрангеру. Тишина и покой",
        },
        {
          name: "Hotel Union Øye",
          time: "11:15-12:00",
          description: "Исторический отель 1891 г.; кофе с видом на фьорд",
          type: "optional",
          maps: "https://maps.google.com/?q=Hotel+Union+%C3%98ye",
          coordinates: [62.1975, 6.653],
          notes: "Гости: Кайзер Вильгельм II, Ибсен, Амундсен",
        },
        {
          name: "Паром Hellesylt → Geiranger",
          time: "14:00-15:10",
          description: "Круиз 1 ч 10 мин по Geirangerfjord (UNESCO)",
          type: "transport",
          maps: "https://maps.google.com/?q=Hellesylt+ferjekai",
          coordinates: [62.086, 6.87], // Hellesylt ferjekai
          notes: "Бронируйте онлайн заранее!",
        },
        {
          name: "Dalsnibba Skywalk",
          time: "16:00-17:30",
          description: "Панорама с 1500 м; 21 км серпантина",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Dalsnibba+Skywalk",
          coordinates: [62.05, 7.28],
          notes: "260 NOK за авто; не ехать в туман",
        },
        {
          name: "🐐 Westerås Gard (ужин с видом)",
          time: "опционально",
          description:
            "Ферма-ресторан на уступе над Гейрангером — ламы, козы, лучшие виды",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Wester%C3%A5s+Gard+Geiranger",
          coordinates: [62.109, 7.23],
          notes:
            "Узкий серпантин. Требует бронирования. Над туристической суетой",
        },
        {
          name: "✨ Пикник на Dalsnibba (закат)",
          time: "опционально",
          description: "Закатный пикник на 1500м с купленными деликатесами",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Dalsnibba+Skywalk",
          coordinates: [62.05, 7.28], // Same as Dalsnibba Skywalk
          notes:
            "Когда автобусы уехали — бесценный момент восхищения. Свобода кемпера!",
        },
        {
          name: "Geiranger Camping",
          time: "15:30", // Note: Ferry arrives 15:10, Dalsnibba is after. This time might be for check-in before Dalsnibba.
          description: "Кемпинг на берегу знаменитого фьорда",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Geiranger+Camping",
          coordinates: [62.099, 7.205],
          notes: "Рекомендуется бронирование за 1-2 мес.",
        },
      ],
    },
    // DAY 6
    {
      day: 6,
      date: "7 июля",
      title: "Geiranger → Lillehammer",
      distance: "510 км",
      time: "7 часов",
      status: "planned",
      coordinates: [61.1, 10.47], // Lillehammer Camping
      locations: [
        {
          name: "Lom (Fossheim Bakery + Stave Church)",
          time: "10:30-11:30",
          description: "Булочки skillingsbolle и ставкирка 1170 г.",
          type: "sightseeing",
          maps: "https://maps.google.com/?q=Lom+Stave+Church",
          coordinates: [61.8385, 8.566], // Lom Stave Church
          notes: "Вход 100 NOK; стойка выпечки легендарна",
        },
        {
          name: "🥐 Bakeriet i Lom (альтернатива)",
          time: "опционально",
          description:
            "Легендарная пекарня с дровяной печью — лучшие kanelsnurrer в Норвегии",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Bakeriet+i+Lom",
          coordinates: [61.839, 8.567],
          notes:
            "Оставить кемпер в Lom Camping, дойти пешком 10 мин. Нет своей парковки",
        },
        {
          name: "Lillehammer Camping",
          time: "17:00",
          description: "Кемпинг у озера Mjøsa, рядом олимпийские трамплины",
          type: "accommodation",
          maps: "https://maps.google.com/?q=Lillehammer+Camping",
          coordinates: [61.1, 10.47],
          notes: "Вечером пройтись к Lysgårdsbakken",
        },
        {
          name: "☕ Atelier Cocoa / Cafe Sorgenfri (вечер)",
          time: "опционально",
          description:
            "Нетуристические кафе — горячий шоколад и норвежский уют (kos)",
          type: "hidden_gem",
          maps: "https://maps.google.com/?q=Atelier+Cocoa+Lillehammer",
          coordinates: [61.115, 10.465], // Atelier Cocoa
          notes: "Завершение путешествия на душевной ноте. Городская парковка",
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
      coordinates: [60.1939, 11.1004], // Oslo Airport Gardermoen
      locations: [
        {
          name: "Сдача кемпера",
          time: "11:30-12:00",
          description: "Осмотр и трансфер в аэропорт Gardermoen",
          type: "logistics",
          maps: "https://maps.google.com/?q=Oslo+Airport+Gardermoen",
          coordinates: [60.1939, 11.1004],
          notes: "Полный бак, уборка салона, слить серую воду",
        },
      ],
    },
  ],
};

export const checklistData = {
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

export const budgetData = [
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
