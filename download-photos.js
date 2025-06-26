#!/usr/bin/env node

/**
 * Расширенный скрипт для массовой загрузки фотографий норвежских локаций
 * Загружает множество вариантов для каждой локации для вдохновения
 *
 * Установка зависимостей:
 * npm install axios sharp
 *
 * Использование:
 * node download-photos.js [опции]
 *
 * Опции:
 * --all - загрузить все варианты (по умолчанию)
 * --best - загрузить только лучшие фото
 * --manual - показать ссылки для ручной загрузки
 */

const axios = require("axios");
const axiosRetry = require("axios-retry");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const cliProgress = require("cli-progress");

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryNumber = 0) => {
    const delay = Math.pow(2, retryNumber) * 1000;
    const randomSum = delay * 0.2 * Math.random();
    return delay + randomSum;
  },
});

// AICODE-NOTE: CLI args parsing with yargs for professional interface
const argv = yargs(hideBin(process.argv))
  .option("count", {
    alias: "c",
    type: "number",
    default: 20,
    describe: "photos per location",
  })
  .option("providers", {
    alias: "p",
    type: "string",
    default: "pixabay,unsplash,pexels",
    describe: "comma-separated: pixabay,unsplash,pexels",
  })
  .option("dry-run", {
    type: "boolean",
    default: false,
    describe: "simulate without downloading",
  })
  .option("gallery", {
    type: "boolean",
    default: true,
    describe: "generate HTML gallery",
  })
  .help().argv;

const PROVIDERS = argv.providers.split(",").map((p) => p.trim().toLowerCase());
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || "";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "";

const OUTPUT_DIR = path.join(__dirname, "images", "landscapes");
const INSPIRATION_DIR = path.join(__dirname, "images", "inspiration");
const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1200;
const JPEG_QUALITY = 85;

const SIZES = [
  { suffix: "large", width: 1600, quality: 85 },
  //   { suffix: "medium", width: 1200, quality: 80 },
  //   { suffix: "small", width: 800, quality: 75 },
  //   { suffix: "thumb", width: 400, quality: 70 },
];

// Расширенный список локаций с дополнительными вариантами поиска
const locations = [
  {
    name: "kjenndalstova-glacier-view",
    searchTerms: [
      "Jostedalsbreen glacier Norway",
      "Kjenndalsbreen glacier",
      "Norway glacier landscape",
      "Jostedal glacier national park",
      "Blue ice glacier Norway",
    ],
    description: "Glacier view from Kjenndalstova",
    category: "glacier",
  },
  {
    name: "dalsnibba-geirangerfjord-panorama",
    searchTerms: [
      "Dalsnibba viewpoint",
      "Geirangerfjord panorama",
      "Dalsnibba skywalk Norway",
      "Geiranger from above",
      "Norway fjord aerial view",
      "Seven Sisters waterfall Geiranger",
    ],
    description: "Geirangerfjord panorama from Dalsnibba",
    category: "fjord",
  },
  {
    name: "trollstigen-serpentine-road",
    searchTerms: [
      "Trollstigen road Norway",
      "Troll Path serpentine",
      "Norwegian mountain road",
      "Trollstigen hairpin bends",
      "Stigfossen waterfall",
      "Norway scenic route",
    ],
    description: "Trollstigen serpentine road",
    category: "road",
  },
  {
    name: "atlantic-road-storseisundet-bridge",
    searchTerms: [
      "Atlantic Ocean Road Norway",
      "Storseisundet bridge",
      "Atlanterhavsveien storm",
      "Norway bridge ocean",
      "Atlantic road sunset",
      "Norwegian coastal road",
    ],
    description: "Storseisundet bridge on Atlantic road",
    category: "bridge",
  },
  {
    name: "norangsdalen-submerged-village",
    searchTerms: [
      "Norangsdalen valley Norway",
      "Lygnstøylvatnet lake",
      "Norway mountain valley",
      "Sunken village Norway",
      "Norwegian alpine valley",
      "Norangsdalen autumn",
    ],
    description: "Norangsdalen valley with submerged village",
    category: "valley",
  },
  {
    name: "alesund-aksla-panoramic-view",
    searchTerms: [
      "Alesund panorama view",
      "Aksla viewpoint Alesund",
      "Art Nouveau Alesund",
      "Alesund from above",
      "Norway coastal town",
      "Alesund sunset view",
    ],
    description: "Panoramic view of Alesund from Aksla",
    category: "city",
  },
  {
    name: "hjorundfjord-wild-landscape",
    searchTerms: [
      "Hjorundfjorden Norway",
      "Sunnmore Alps fjord",
      "Norway wild fjord",
      "Hjorundfjord mountains",
      "Norwegian pristine fjord",
      "Sæbø Hjørundfjord",
    ],
    description: "Wild landscapes of Hjørundfjord",
    category: "fjord",
  },
  {
    name: "trollveggen-wall",
    searchTerms: [
      "Trollveggen cliff Norway",
      "Troll Wall vertical",
      "Europe tallest wall",
      "Romsdalen valley",
      "Norway climbing wall",
      "Trollveggen dramatic",
    ],
    description: "Vertical Trollveggen wall",
    category: "mountain",
  },
  {
    name: "runde-island-puffins",
    searchTerms: [
      "Runde island Norway",
      "Puffins Norway coast",
      "Norwegian bird cliffs",
      "Runde lighthouse",
      "Atlantic puffins",
      "Norway seabird colony",
    ],
    description: "Runde island with puffins",
    category: "island",
  },
  {
    name: "grotli-mountain-lodge",
    searchTerms: [
      "Grotli Norway mountain",
      "Norwegian mountain plateau",
      "Grotli highland hotel",
      "Norway mountain pass",
      "Strynefjellet mountain",
      "Norwegian highlands",
    ],
    description: "Mountain landscape near Grotli",
    category: "mountain",
  },
  {
    name: "geiranger-eagle-road",
    searchTerms: [
      "Ørneveien Geiranger",
      "Eagle Road Norway",
      "Geiranger hairpin turns",
      "Norwegian scenic drive",
    ],
    description: "Eagle road in Geiranger",
    category: "road",
  },
  {
    name: "loen-skylift-view",
    searchTerms: [
      "Loen Skylift Norway",
      "Mount Hoven view",
      "Nordfjord panorama",
      "Norway cable car view",
    ],
    description: "View from Loen skylift",
    category: "mountain",
  },
  {
    name: "preikestolen-cliff",
    searchTerms: [
      "Preikestolen Norway",
      "Pulpit Rock cliff",
      "Lysefjord view",
      "Norway famous cliff",
    ],
    description: "Preikestolen cliff",
    category: "cliff",
  },
  {
    name: "norwegian-stave-church",
    searchTerms: [
      "Borgund stave church",
      "Norwegian wooden church",
      "Medieval church Norway",
      "Viking church architecture",
    ],
    description: "Norwegian stave church",
    category: "architecture",
  },
  {
    name: "midnight-sun-nordkapp",
    searchTerms: [
      "Midnight sun Norway",
      "Nordkapp summer",
      "Arctic sun Norway",
      "North Cape midnight",
    ],
    description: "Midnight sun",
    category: "phenomenon",
  },
  {
    name: "via-ferrata-loen",
    searchTerms: [
      "Via Ferrata Loen Norway",
      "Loen climbing adventure",
      "Gjølmunne suspension bridge",
      "Norwegian via ferrata",
      "Loen Active climbing",
    ],
    description: "Via Ferrata climbing route in Loen",
    category: "adventure",
  },
  {
    name: "romsdalsgondolen-view",
    searchTerms: [
      "Romsdalsgondolen cable car",
      "Åndalsnes gondola view",
      "Romsdal valley panorama",
      "Norwegian mountain gondola",
      "Trollveggen from above",
    ],
    description: "Panoramic view from Romsdalsgondolen",
    category: "mountain",
  },
  {
    name: "hotel-union-oye",
    searchTerms: [
      "Hotel Union Øye historic",
      "Hjørundfjord luxury hotel",
      "Norwegian historic hotel",
      "Union Øye vintage interior",
      "Sunnmøre Alps hotel",
    ],
    description: "Historic Hotel Union Øye on Hjørundfjord",
    category: "hotel",
  },
  {
    name: "lillehammer-olympic-sites",
    searchTerms: [
      "Lillehammer ski jump",
      "Lysgårdsbakken Olympic",
      "Norway winter Olympics",
      "Lillehammer Olympic Park",
      "Norwegian ski jumping",
    ],
    description: "Lillehammer Olympic ski jumping venue",
    category: "sports",
  },
  {
    name: "lom-stave-church",
    searchTerms: [
      "Lom Stave Church Norway",
      "Medieval wooden church",
      "Norwegian stavkirke 1170",
      "Gudbrandsdalen church",
      "Historic Norwegian architecture",
    ],
    description: "Historic Lom Stave Church from 1170",
    category: "architecture",
  },
];

class PhotoProviders {
  static async fromPixabay(term, need) {
    if (!PIXABAY_API_KEY || !PROVIDERS.includes("pixabay")) return [];

    const hits = [];
    let page = 1;

    while (hits.length < need) {
      const { data } = await axios.get("https://pixabay.com/api/", {
        params: {
          key: PIXABAY_API_KEY,
          q: term,
          orientation: "horizontal",
          per_page: 200,
          min_width: 1200,
          page,
          order: "popular",
          safesearch: true,
        },
        timeout: 20000,
      });

      hits.push(
        ...data.hits.map((h) => ({
          id: `pixabay-${h.id}`,
          url: h.largeImageURL || h.webformatURL,
          author: h.user,
          likes: h.likes,
          views: h.views,
          provider: "pixabay",
        }))
      );

      if (data.hits.length < 200) break;
      page++;
    }

    return hits.slice(0, need);
  }

  static async fromUnsplash(term, need) {
    if (!UNSPLASH_ACCESS_KEY || !PROVIDERS.includes("unsplash")) return [];

    const { data } = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: term,
        per_page: need,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        "Accept-Version": "v1",
      },
      timeout: 20000,
    });

    return data.results.map((r) => ({
      id: `unsplash-${r.id}`,
      url: r.urls.raw + "&w=2400",
      author: r.user.name,
      likes: r.likes,
      views: r.views || 0,
      provider: "unsplash",
    }));
  }

  static async fromPexels(term, need) {
    if (!PEXELS_API_KEY || !PROVIDERS.includes("pexels")) return [];

    const { data } = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: term,
        per_page: need,
      },
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      timeout: 20000,
    });

    return data.photos.map((p) => ({
      id: `pexels-${p.id}`,
      url: p.src.original,
      author: p.photographer,
      likes: p.liked ? 1 : 0,
      views: 0,
      provider: "pexels",
    }));
  }

  static async searchAll(term, need) {
    const results = await Promise.all([
      this.fromPixabay(term, need),
      this.fromUnsplash(term, need),
      this.fromPexels(term, need),
    ]);

    const flat = results.flat();
    const unique = [];
    const seen = new Set();

    for (const hit of flat) {
      if (!seen.has(hit.id)) {
        unique.push(hit);
        seen.add(hit.id);
      }
    }

    return unique.slice(0, need);
  }
}

class FileManager {
  static ensureDirectories() {
    const dirs = [OUTPUT_DIR, INSPIRATION_DIR];

    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    const categories = [...new Set(locations.map((l) => l.category))];
    categories.forEach((cat) => {
      const catDir = path.join(INSPIRATION_DIR, cat);
      if (!fs.existsSync(catDir)) {
        fs.mkdirSync(catDir, { recursive: true });
      }
    });
  }

  static async saveMultipleSizes(photo, baseName, category, isDryRun) {
    if (isDryRun) return true;

    try {
      const response = await axios.get(photo.url, {
        responseType: "arraybuffer",
        timeout: 30000,
      });

      await Promise.all(
        SIZES.map(({ suffix, width, quality }) => {
          const outputPath = path.join(
            INSPIRATION_DIR,
            category,
            `${baseName}-${suffix}.jpg`
          );

          return sharp(response.data)
            .rotate()
            .resize(width, null, {
              fit: "inside",
              withoutEnlargement: true,
            })
            .jpeg({ quality })
            .withMetadata()
            .toFile(outputPath);
        })
      );

      return true;
    } catch (error) {
      console.error(`Failed to save ${baseName}:`, error.message);
      return false;
    }
  }

  static async saveMainPhoto(photo, locationName, isDryRun) {
    if (isDryRun) return;

    const mainPath = path.join(OUTPUT_DIR, `${locationName}.jpg`);
    if (fs.existsSync(mainPath)) return;

    try {
      const response = await axios.get(photo.url, {
        responseType: "arraybuffer",
        timeout: 30000,
      });

      await sharp(response.data)
        .rotate()
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: JPEG_QUALITY })
        .withMetadata()
        .toFile(mainPath);
    } catch (error) {
      console.error(
        `Failed to save main photo for ${locationName}:`,
        error.message
      );
    }
  }
}

class GalleryGenerator {
  static generate(photos) {
    const categories = [...new Set(photos.map((p) => p.category))];

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Norwegian Landscapes - Inspiration Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #fff;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5em;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .filters {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 8px 20px;
            background: #1a1a1a;
            border: 1px solid #333;
            color: #fff;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
        }
        
        .filter-btn:hover {
            background: #333;
            transform: translateY(-2px);
        }
        
        .filter-btn.active {
            background: #667eea;
            border-color: #667eea;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .photo-card {
            background: #1a1a1a;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s;
            cursor: pointer;
        }
        
        .photo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .photo-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .photo-info {
            padding: 15px;
        }
        
        .photo-title {
            font-size: 1.1em;
            margin-bottom: 5px;
            color: #667eea;
        }
        
        .photo-meta {
            font-size: 0.9em;
            color: #888;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .stats {
            display: flex;
            gap: 15px;
        }
        
        .stat {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .close-lightbox {
            position: absolute;
            top: 20px;
            right: 40px;
            font-size: 3em;
            color: #fff;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>🇳🇴 Норвежские пейзажи - Галерея для вдохновения</h1>
    
    <div class="filters">
        <button class="filter-btn active" data-filter="all">Все фото</button>
        ${categories
          .map(
            (cat) =>
              `<button class="filter-btn" data-filter="${cat}">${cat}</button>`
          )
          .join("")}
    </div>
    
    <div class="gallery">
        ${photos
          .map(
            (photo) => `
            <div class="photo-card" data-category="${photo.category}" 
                 onclick="openLightbox('inspiration/${photo.category}/${
              photo.filename
            }-large.jpg')">
                <img src="inspiration/${photo.category}/${
              photo.filename
            }-small.jpg" 
                     alt="${photo.description}">
                <div class="photo-info">
                    <div class="photo-title">${photo.description}</div>
                    <div class="photo-meta">
                        <span>📸 ${photo.author}</span>
                        <div class="stats">
                            <span class="stat">👁 ${photo.views.toLocaleString()}</span>
                            <span class="stat">❤️ ${photo.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
          )
          .join("")}
    </div>
    
    <div class="lightbox" id="lightbox" onclick="closeLightbox()">
        <span class="close-lightbox">&times;</span>
        <img id="lightbox-img" src="" alt="">
    </div>
    
    <script>
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const filter = e.target.dataset.filter;
                document.querySelectorAll('.photo-card').forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });
        
        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox').classList.add('active');
        }
        
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    </script>
</body>
</html>`;

    const galleryPath = path.join(path.dirname(OUTPUT_DIR), "gallery.html");
    fs.writeFileSync(galleryPath, html);
    console.log(`\n🎨 Gallery generated: ${galleryPath}`);
  }
}

async function main() {
  console.log(
    `⚙️  Providers: ${PROVIDERS.join(", ")} • Photos: ${
      argv.count
    } per location`
  );

  FileManager.ensureDirectories();

  const progressBar = new cliProgress.SingleBar(
    {
      format: "{bar} {value}/{total} {eta}s {location}",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );

  const totalPhotos = argv.count * locations.length;
  let currentProgress = 0;

  progressBar.start(totalPhotos, 0, { location: "Starting..." });

  const downloadedPhotos = [];

  for (const location of locations) {
    progressBar.update(currentProgress, { location: location.name });

    const collected = [];

    for (const searchTerm of location.searchTerms) {
      if (collected.length >= argv.count) break;

      const needed = argv.count - collected.length;
      const hits = await PhotoProviders.searchAll(searchTerm, needed * 2);

      hits.forEach((hit) => {
        if (
          !collected.find((c) => c.id === hit.id) &&
          collected.length < argv.count
        ) {
          collected.push(hit);
        }
      });
    }

    if (collected[0]) {
      await FileManager.saveMainPhoto(
        collected[0],
        location.name,
        argv["dry-run"]
      );
    }

    let photoIndex = 1;
    for (const photo of collected) {
      const baseName = `${location.name}-v${photoIndex++}`;
      const success = await FileManager.saveMultipleSizes(
        photo,
        baseName,
        location.category,
        argv["dry-run"]
      );

      if (success) {
        downloadedPhotos.push({
          location: location.name,
          description: location.description,
          category: location.category,
          filename: baseName,
          author: photo.author,
          likes: photo.likes,
          views: photo.views,
          provider: photo.provider,
        });
      }

      currentProgress++;
      progressBar.update(currentProgress, { location: location.name });
    }
  }

  progressBar.stop();

  if (!argv["dry-run"]) {
    const infoPath = path.join(INSPIRATION_DIR, "photo-info.json");
    fs.writeFileSync(infoPath, JSON.stringify(downloadedPhotos, null, 2));

    if (argv.gallery) {
      GalleryGenerator.generate(downloadedPhotos);
    }
  }

  console.log(
    argv["dry-run"]
      ? "✅ Dry run completed"
      : `✅ Downloaded ${downloadedPhotos.length} photos successfully`
  );
}

if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
}

module.exports = { locations, PhotoProviders, FileManager, GalleryGenerator };
