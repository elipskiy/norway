// AICODE-NOTE: Route continuity improvement - when showing specific day,
// routes now start from previous day's accommodation (camping)
// This provides logical travel continuity for multi-day trips

import { tripData } from "./data.js";

let map;
let markers = [];
let routeLines = [];
let gemRoutes = [];
let infoWindow;
let directionsService;
let directionsRenderers = [];
let gemDirectionsRenderers = [];
let currentFilter = "all";
let currentDay = "all";
let showGemRoutes = true;

// API optimization - cache and throttling
let directionsCache = new Map();
let pendingRequests = 0;
let apiRequestCount = 0;
let cacheHits = 0;
const MAX_CONCURRENT_REQUESTS = 2;
const REQUEST_DELAY = 100; // ms between requests
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Color mapping for location types
const typeColors = {
  logistics: "#8B5CF6",
  shopping: "#F59E0B",
  accommodation: "#10B981",
  activity: "#EF4444",
  sightseeing: "#3B82F6",
  transport: "#6B7280",
  hidden_gem: "#EC4899",
  optional: "#F97316",
};

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

// Initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 61.5, lng: 8.0 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#a2daf2" }],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{ color: "#f5f5f2" }],
      },
    ],
  });

  infoWindow = new google.maps.InfoWindow();
  directionsService = new google.maps.DirectionsService();

  // Load cached directions
  loadCache();

  // Check if tripData is available before proceeding
  if (typeof tripData !== "undefined") {
    calculateStats();
    initializeMapWithoutZoom();
    renderLocationList();
  } else {
    console.error("tripData is not defined - check data.js loading");
  }

  // Log API usage stats after initialization
  setTimeout(() => {
    console.log(
      `API Usage Stats: ${apiRequestCount} requests, ${cacheHits} cache hits, ${directionsCache.size} cached routes`
    );
  }, 5000);
}

function clearMap() {
  markers.forEach((item) => item.marker.setMap(null));
  routeLines.forEach((line) => line.setMap(null));
  gemRoutes.forEach((line) => line.setMap(null));
  directionsRenderers.forEach((renderer) => renderer.setMap(null));
  gemDirectionsRenderers.forEach((renderer) => renderer.setMap(null));
  markers = [];
  routeLines = [];
  gemRoutes = [];
  directionsRenderers = [];
  gemDirectionsRenderers = [];
}

function addLocationMarker(location, dayNum) {
  if (!location.coordinates) return;

  const [lat, lng] = location.coordinates;
  const color = typeColors[location.type] || "#3B82F6";
  const emoji = getLocationTypeEmoji(location.type);

  const markerIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 12,
    fillColor: color,
    fillOpacity: 0.9,
    strokeColor: "white",
    strokeWeight: 3,
  };

  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: location.name,
    icon: markerIcon,
  });

  const contentString = `
    <div style="max-width: 300px; padding: 12px; font-family: system-ui, sans-serif;">
<h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">${emoji} ${
    location.name
  }</h3>
<p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; font-weight: 500;">День ${dayNum} • ${
    location.time
  }</p>
<p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.4; color: #374151;">${
    location.description
  }</p>
${
  location.notes
    ? `<div style="margin: 0 0 12px 0; padding: 8px; background: #fef3c7; border-radius: 6px; border-left: 3px solid #f59e0b;"><p style="margin: 0; font-size: 11px; color: #92400e; font-weight: 500;">💡 ${location.notes}</p></div>`
    : ""
}
<div style="display: flex; gap: 6px; flex-wrap: wrap;">
  ${
    location.maps
      ? `<a href="${location.maps}" target="_blank" style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 11px; font-weight: 600;">🗺️ Maps</a>`
      : ""
  }
  <button onclick="focusOnLocation(${lat}, ${lng})" style="background: #10b981; color: white; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600;">🎯 Центр</button>
</div>
    </div>
  `;

  // Hover effects with animation-like behavior
  marker.addListener("mouseover", () => {
    const hoveredIcon = {
      ...markerIcon,
      scale: 18, // Заметно увеличиваем размер
      strokeWeight: 5, // Утолщаем обводку
      fillOpacity: 1.0, // Делаем полностью непрозрачным
      strokeColor: "#FFD700", // Золотая обводка при hover
    };
    marker.setIcon(hoveredIcon);

    // Добавляем небольшую анимацию подпрыгивания
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 200); // Останавливаем анимацию через 200мс
  });

  marker.addListener("mouseout", () => {
    marker.setIcon(markerIcon); // Возвращаем исходный размер и цвет
  });

  marker.addListener("click", () => {
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
  });

  markers.push({ marker, location, day: dayNum, type: location.type });
}

function addRouteLines(dayData) {
  console.log(`Building routes for Day ${dayData.day}:`);
  console.log(
    "All locations:",
    dayData.locations.map((l) => ({ name: l.name, type: l.type }))
  );

  // Filter out hidden gems and optional locations from main route
  const mainRouteLocations = dayData.locations.filter(
    (location) => location.type !== "hidden_gem" && location.type !== "optional"
  );

  console.log(
    "Main route locations:",
    mainRouteLocations.map((l) => ({ name: l.name, type: l.type }))
  );

  const waypoints = [];

  // Add starting point from previous day's accommodation (camping)
  const previousDayAccommodation = findPreviousDayAccommodation(dayData.day);
  if (previousDayAccommodation) {
    waypoints.push({
      lat: previousDayAccommodation.coordinates[0],
      lng: previousDayAccommodation.coordinates[1],
    });
    console.log(
      `Added previous day accommodation as start: ${previousDayAccommodation.name}`
    );
  }

  // Add main route locations only (skip day coordinates as they might be end point)
  mainRouteLocations.forEach((location) => {
    if (location.coordinates) {
      waypoints.push({
        lat: location.coordinates[0],
        lng: location.coordinates[1],
      });
    }
  });

  // If we still don't have enough waypoints, but day has coordinates, use them as start
  if (waypoints.length < 2 && dayData.coordinates) {
    waypoints.unshift({
      lat: dayData.coordinates[0],
      lng: dayData.coordinates[1],
    });
    console.log(
      "Added day coordinates as start due to insufficient waypoints:",
      dayData.coordinates
    );
  }

  console.log("Total waypoints for main route:", waypoints.length);
  console.log("Waypoints:", waypoints);

  // Build driving route if we have enough points
  if (waypoints.length > 1) {
    buildDrivingRoute(waypoints);
  } else {
    console.warn(
      `Not enough waypoints for Day ${dayData.day}: ${waypoints.length}`
    );
  }

  // Add dashed lines for hidden gems and optional locations if enabled
  if (showGemRoutes) {
    addGemRoutes(dayData, mainRouteLocations);
  }
}

function createCacheKey(request) {
  const waypoints = [request.origin];
  if (request.waypoints) {
    waypoints.push(...request.waypoints.map((wp) => wp.location));
  }
  waypoints.push(request.destination);

  return waypoints
    .map((point) => `${point.lat.toFixed(4)},${point.lng.toFixed(4)}`)
    .join("|");
}

function loadCache() {
  try {
    const cached = localStorage.getItem("directionsCache");
    if (cached) {
      const cacheData = JSON.parse(cached);
      // Check if cache is still valid
      const now = Date.now();
      Object.entries(cacheData).forEach(([key, value]) => {
        if (now - value.timestamp < CACHE_EXPIRY) {
          directionsCache.set(key, value.result);
        }
      });
    }
  } catch (e) {
    console.warn("Failed to load directions cache:", e);
  }
}

function saveCache() {
  try {
    const cacheData = {};
    const now = Date.now();
    directionsCache.forEach((result, key) => {
      cacheData[key] = {
        result: result,
        timestamp: now,
      };
    });
    localStorage.setItem("directionsCache", JSON.stringify(cacheData));
  } catch (e) {
    console.warn("Failed to save directions cache:", e);
  }
}

function throttledDirectionsRequest(request, callback, isGemRoute = false) {
  const cacheKey = createCacheKey(request);

  // Check cache first
  if (directionsCache.has(cacheKey)) {
    const cachedResult = directionsCache.get(cacheKey);
    cacheHits++;
    setTimeout(() => callback(cachedResult, "OK"), 10);
    return;
  }

  // Throttle requests
  if (pendingRequests >= MAX_CONCURRENT_REQUESTS) {
    setTimeout(
      () => throttledDirectionsRequest(request, callback, isGemRoute),
      REQUEST_DELAY
    );
    return;
  }

  pendingRequests++;
  apiRequestCount++;

  setTimeout(() => {
    directionsService.route(request, (result, status) => {
      pendingRequests--;

      if (status === "OK") {
        // Cache successful result
        directionsCache.set(cacheKey, result);
        saveCache();
      }

      callback(result, status, isGemRoute);
    });
  }, REQUEST_DELAY * pendingRequests);
}

function buildDrivingRoute(waypoints) {
  if (waypoints.length < 2) return;

  // Google Directions API allows max 25 waypoints total (23 intermediate + origin + destination)
  const MAX_WAYPOINTS = 23;

  if (waypoints.length <= MAX_WAYPOINTS + 2) {
    // Build single route
    buildSingleDrivingRoute(waypoints);
  } else {
    // Split into multiple segments
    console.log(
      "Splitting long route into segments:",
      waypoints.length,
      "waypoints"
    );
    buildSegmentedDrivingRoute(waypoints);
  }
}

function buildSingleDrivingRoute(waypoints, isSegment = false) {
  const start = waypoints[0];
  const end = waypoints[waypoints.length - 1];
  const intermediateWaypoints = waypoints.slice(1, -1).map((point) => ({
    location: point,
    stopover: true,
  }));

  const request = {
    origin: start,
    destination: end,
    waypoints: intermediateWaypoints,
    travelMode: google.maps.TravelMode.DRIVING,
    optimizeWaypoints: false, // Keep original order
  };

  throttledDirectionsRequest(request, (result, status) => {
    if (status === "OK") {
      const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true, // We have our own markers
        preserveViewport: true,
        polylineOptions: {
          strokeColor: "#3B82F6",
          strokeOpacity: 0.8,
          strokeWeight: 4,
        },
      });

      directionsRenderer.setDirections(result);
      directionsRenderer.setMap(map);
      directionsRenderers.push(directionsRenderer);
      console.log(
        "Driving route built successfully with",
        waypoints.length,
        "waypoints"
      );
    } else {
      console.warn(
        "Directions request failed due to " + status + " for route with",
        waypoints.length,
        "waypoints"
      );
      console.log("Failed waypoints:", waypoints);

      // Try alternative strategies based on error type
      if (!isSegment && status === "ZERO_RESULTS" && waypoints.length > 3) {
        console.log("Trying segmented approach due to ZERO_RESULTS");
        buildSegmentedDrivingRoute(waypoints);
      } else if (!isSegment && status === "MAX_WAYPOINTS_EXCEEDED") {
        console.log("Forcing segmented approach due to too many waypoints");
        buildSegmentedDrivingRoute(waypoints);
      } else {
        // Fallback to straight lines if directions fail
        buildFallbackRoute(waypoints);
      }
    }
  });
}

function buildSegmentedDrivingRoute(waypoints) {
  const MAX_SEGMENT_SIZE = 8; // Smaller segments for better reliability

  for (let i = 0; i < waypoints.length - 1; i += MAX_SEGMENT_SIZE - 1) {
    const segmentEnd = Math.min(i + MAX_SEGMENT_SIZE, waypoints.length);
    const segmentWaypoints = waypoints.slice(i, segmentEnd);

    if (segmentWaypoints.length >= 2) {
      buildSingleDrivingRoute(segmentWaypoints, true);
    }
  }
}

function buildFallbackRoute(waypoints) {
  if (waypoints.length > 1) {
    const routeLine = new google.maps.Polyline({
      path: waypoints,
      geodesic: true,
      strokeColor: "#3B82F6",
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    routeLine.setMap(map);
    routeLines.push(routeLine);
  }
}

function addGemRoutes(dayData, mainRouteLocations) {
  const gemLocations = dayData.locations.filter(
    (location) => location.type === "hidden_gem" || location.type === "optional"
  );

  gemLocations.forEach((gemLocation) => {
    if (!gemLocation.coordinates) return;

    // Find the closest main route location
    let closestLocation = null;
    let minDistance = Infinity;

    const allMainCoords = [];
    if (dayData.coordinates) {
      allMainCoords.push({
        lat: dayData.coordinates[0],
        lng: dayData.coordinates[1],
      });
    }
    mainRouteLocations.forEach((loc) => {
      if (loc.coordinates) {
        allMainCoords.push({
          lat: loc.coordinates[0],
          lng: loc.coordinates[1],
        });
      }
    });

    allMainCoords.forEach((coord) => {
      const distance = calculateDistance(
        gemLocation.coordinates[0],
        gemLocation.coordinates[1],
        coord.lat,
        coord.lng
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = coord;
      }
    });

    // Build driving route to closest main route point
    // Only use API for routes longer than 5km to save quota
    if (closestLocation) {
      if (minDistance > 5) {
        buildGemDrivingRoute(
          closestLocation,
          {
            lat: gemLocation.coordinates[0],
            lng: gemLocation.coordinates[1],
          },
          gemLocation.type
        );
      } else {
        // Use fallback for short distances
        buildFallbackGemRoute(
          closestLocation,
          {
            lat: gemLocation.coordinates[0],
            lng: gemLocation.coordinates[1],
          },
          gemLocation.type
        );
      }
    }
  });
}

function buildGemDrivingRoute(fromPoint, toPoint, gemType) {
  const request = {
    origin: fromPoint,
    destination: toPoint,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  throttledDirectionsRequest(
    request,
    (result, status) => {
      if (status === "OK") {
        const directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true, // We have our own markers
          preserveViewport: true,
          polylineOptions: {
            strokeColor: gemType === "hidden_gem" ? "#EC4899" : "#F97316",
            strokeOpacity: 0.6,
            strokeWeight: 3,
            strokePattern: [10, 5], // Dashed line for gem routes
          },
        });

        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map);
        gemDirectionsRenderers.push(directionsRenderer);
      } else {
        console.warn("Gem directions request failed due to " + status);
        // Fallback to dashed straight line if directions fail
        buildFallbackGemRoute(fromPoint, toPoint, gemType);
      }
    },
    true
  );
}

function buildFallbackGemRoute(fromPoint, toPoint, gemType) {
  const gemLine = new google.maps.Polyline({
    path: [fromPoint, toPoint],
    geodesic: true,
    strokeColor: gemType === "hidden_gem" ? "#EC4899" : "#F97316",
    strokeOpacity: 0.6,
    strokeWeight: 3,
    icons: [
      {
        icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
        offset: "0",
        repeat: "20px",
      },
    ],
  });

  gemLine.setMap(map);
  gemRoutes.push(gemLine);
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function findPreviousDayAccommodation(currentDay) {
  if (currentDay <= 1) return null; // No previous day for day 1

  const previousDay = currentDay - 1;
  const previousDayData = tripData.days.find((day) => day.day === previousDay);

  if (!previousDayData) return null;

  // Find the last accommodation in the previous day
  const accommodations = previousDayData.locations.filter(
    (location) => location.type === "accommodation"
  );

  if (accommodations.length > 0) {
    // Return the last accommodation (usually the camping/hotel for the night)
    return accommodations[accommodations.length - 1];
  }

  // Fallback: if no accommodation found, use the last location of the day
  const lastLocation =
    previousDayData.locations[previousDayData.locations.length - 1];
  if (lastLocation && lastLocation.coordinates) {
    return lastLocation;
  }

  // Final fallback: use day coordinates if available
  if (previousDayData.coordinates) {
    return {
      name: `End of Day ${previousDay}`,
      coordinates: previousDayData.coordinates,
      type: "logistics",
    };
  }

  return null;
}

function showDay(dayNum) {
  currentDay = dayNum;
  clearMap();

  const dayData = tripData.days.find((day) => day.day === dayNum);
  if (!dayData) return;

  // Add marker for previous day's accommodation (starting point)
  const previousDayAccommodation = findPreviousDayAccommodation(dayNum);
  if (previousDayAccommodation) {
    addLocationMarker(previousDayAccommodation, dayNum - 1);
  }

  dayData.locations.forEach((location) => {
    if (currentFilter === "all" || location.type === currentFilter) {
      addLocationMarker(location, dayNum);
    }
  });

  addRouteLines(dayData);

  // Update active day button
  document
    .querySelectorAll(".day-button")
    .forEach((btn) => btn.classList.remove("active"));
  const targetButton = document.querySelector(
    `[onclick*="showDay(${dayNum})"]`
  );
  if (targetButton) {
    targetButton.classList.add("active");
  } else {
    // Fallback: find button by text content
    const buttons = document.querySelectorAll(".day-button");
    buttons.forEach((btn) => {
      if (btn.textContent.trim() === dayNum.toString()) {
        btn.classList.add("active");
      }
    });
  }

  renderLocationList();
}

function showAllDays() {
  currentDay = "all";
  clearMap();

  tripData.days.forEach((day) => {
    day.locations.forEach((location) => {
      if (currentFilter === "all" || location.type === currentFilter) {
        addLocationMarker(location, day.day);
      }
    });
    addRouteLines(day);
  });

  // Update active day button
  document
    .querySelectorAll(".day-button")
    .forEach((btn) => btn.classList.remove("active"));
  const allDaysButton = document.querySelector('[onclick*="showAllDays"]');
  if (allDaysButton) {
    allDaysButton.classList.add("active");
  } else {
    // Fallback: find button with "Все" text
    const buttons = document.querySelectorAll(".day-button");
    buttons.forEach((btn) => {
      if (btn.textContent.trim() === "Все") {
        btn.classList.add("active");
      }
    });
  }

  renderLocationList();
}

function filterLocations(type) {
  currentFilter = type;

  if (currentDay === "all") {
    showAllDays();
  } else {
    showDay(currentDay);
  }

  // Update active filter button
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const targetButton = document.querySelector(
    `[onclick*="filterLocations('${type}')"]`
  );
  if (targetButton) {
    targetButton.classList.add("active");
  } else {
    // Fallback: find button by class
    const fallbackButton = document.querySelector(`.btn-${type}`);
    if (fallbackButton) {
      fallbackButton.classList.add("active");
    }
  }
}

function initializeMapWithoutZoom() {
  // Показываем все дни но без автоматического позиционирования
  currentDay = "all";
  clearMap();

  tripData.days.forEach((day) => {
    day.locations.forEach((location) => {
      if (currentFilter === "all" || location.type === currentFilter) {
        addLocationMarker(location, day.day);
      }
    });
    addRouteLines(day);
  });

  // Update active day button without repositioning map
  document
    .querySelectorAll(".day-button")
    .forEach((btn) => btn.classList.remove("active"));
  const allDaysButton = document.querySelector('[onclick*="showAllDays"]');
  if (allDaysButton) {
    allDaysButton.classList.add("active");
  } else {
    const buttons = document.querySelectorAll(".day-button");
    buttons.forEach((btn) => {
      if (btn.textContent.trim() === "Все") {
        btn.classList.add("active");
      }
    });
  }
}

function fitMapToMarkers() {
  // Убираем автоматическое изменение зума и позиции
  // Карта остается в текущем положении
}

function clearOldCache() {
  try {
    const cached = localStorage.getItem("directionsCache");
    if (cached) {
      const cacheData = JSON.parse(cached);
      const now = Date.now();
      const validCacheData = {};

      Object.entries(cacheData).forEach(([key, value]) => {
        if (now - value.timestamp < CACHE_EXPIRY) {
          validCacheData[key] = value;
        }
      });

      localStorage.setItem("directionsCache", JSON.stringify(validCacheData));
      console.log("Cleaned old cache entries");
    }
  } catch (e) {
    console.warn("Failed to clean cache:", e);
  }
}

function calculateStats() {
  let totalLocations = 0;
  let hiddenGems = 0;
  let totalDistance = 0;

  tripData.days.forEach((day) => {
    totalLocations += day.locations.length;
    hiddenGems += day.locations.filter(
      (loc) => loc.type === "hidden_gem"
    ).length;

    const distanceMatch = day.distance.match(/(\d+)/);
    if (distanceMatch) {
      totalDistance += parseInt(distanceMatch[1]);
    }
  });

  document.getElementById("total-locations").textContent = totalLocations;
  document.getElementById("hidden-gems").textContent = hiddenGems;
  document.getElementById("total-distance").textContent = totalDistance;

  // Clean old cache entries on stats calculation
  clearOldCache();
}

function renderLocationList() {
  const container = document.getElementById("locations-container");
  container.innerHTML = "";

  const filteredMarkers = markers.filter(
    (item) =>
      (currentFilter === "all" || item.type === currentFilter) &&
      (currentDay === "all" || item.day === currentDay)
  );

  const locationsByDay = {};
  filteredMarkers.forEach((item) => {
    if (!locationsByDay[item.day]) {
      locationsByDay[item.day] = [];
    }
    locationsByDay[item.day].push(item);
  });

  Object.keys(locationsByDay)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach((day) => {
      const dayData = tripData.days.find((d) => d.day == day);
      const dayDiv = document.createElement("div");
      dayDiv.className = "day-locations";

      dayDiv.innerHTML = `
  <div class="day-title">День ${day}: ${dayData.title}</div>
  ${locationsByDay[day]
    .map(
      (item) => `
    <div class="location-item" 
         onclick="focusOnLocationAndOpen(${item.location.coordinates[0]}, ${
        item.location.coordinates[1]
      })"
         onmouseover="highlightMarker(${item.location.coordinates[0]}, ${
        item.location.coordinates[1]
      }, true)"
         onmouseout="highlightMarker(${item.location.coordinates[0]}, ${
        item.location.coordinates[1]
      }, false)">
      <div class="location-marker" style="background-color: ${
        typeColors[item.type]
      }"></div>
      <div class="location-info">
        <div class="location-name">${getLocationTypeEmoji(item.type)} ${
        item.location.name
      }</div>
        <div class="location-time">${item.location.time}</div>
      </div>
    </div>
  `
    )
    .join("")}
`;

      container.appendChild(dayDiv);
    });
}

function focusOnLocation(lat, lng) {
  map.setCenter({ lat: lat, lng: lng });
  // Убираем автоматический зум
}

function focusOnLocationAndOpen(lat, lng) {
  map.setCenter({ lat: lat, lng: lng });
  // Убираем автоматический зум

  const markerItem = markers.find(
    (item) =>
      item.location.coordinates[0] === lat &&
      item.location.coordinates[1] === lng
  );

  if (markerItem) {
    google.maps.event.trigger(markerItem.marker, "click");
  }
}

function highlightMarker(lat, lng, highlight) {
  const markerItem = markers.find(
    (item) =>
      item.location.coordinates[0] === lat &&
      item.location.coordinates[1] === lng
  );

  if (markerItem) {
    if (highlight) {
      // Trigger mouseover effect
      google.maps.event.trigger(markerItem.marker, "mouseover");
    } else {
      // Trigger mouseout effect
      google.maps.event.trigger(markerItem.marker, "mouseout");
    }
  }
}

function togglePanel(panelType) {
  const panel = document.getElementById(`${panelType}-panel`);
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}

function toggleGemRoutes() {
  showGemRoutes = document.getElementById("show-gem-routes").checked;

  // Hide/show existing gem routes (polylines)
  gemRoutes.forEach((line) => {
    line.setMap(showGemRoutes ? map : null);
  });

  // Hide/show gem directions renderers
  gemDirectionsRenderers.forEach((renderer) => {
    renderer.setMap(showGemRoutes ? map : null);
  });

  // If showing gem routes and there are none, redraw the current view
  if (
    showGemRoutes &&
    gemRoutes.length === 0 &&
    gemDirectionsRenderers.length === 0
  ) {
    if (currentDay === "all") {
      showAllDays();
    } else {
      showDay(currentDay);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to buttons if onclick doesn't work
  document.querySelectorAll(".day-button").forEach((button) => {
    const onclick = button.getAttribute("onclick");
    if (onclick) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        if (onclick.includes("showAllDays")) {
          showAllDays();
        } else {
          const dayMatch = onclick.match(/showDay\((\d+)\)/);
          if (dayMatch) {
            showDay(parseInt(dayMatch[1]));
          }
        }
      });
    }
  });

  document.querySelectorAll(".filter-btn").forEach((button) => {
    const onclick = button.getAttribute("onclick");
    if (onclick) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const filterMatch = onclick.match(/filterLocations\('(\w+)'\)/);
        if (filterMatch) {
          filterLocations(filterMatch[1]);
        }
      });
    }
  });
});

// Make functions globally available
window.initMap = initMap;
window.showDay = showDay;
window.showAllDays = showAllDays;
window.filterLocations = filterLocations;
window.focusOnLocation = focusOnLocation;
window.focusOnLocationAndOpen = focusOnLocationAndOpen;
window.highlightMarker = highlightMarker;
window.togglePanel = togglePanel;
window.toggleGemRoutes = toggleGemRoutes;
// Load Google Maps API dynamically using config
function loadGoogleMapsAPI() {
  if (typeof CONFIG === "undefined") {
    console.error("CONFIG не найден! Убедитесь, что config.js загружен.");
    document.body.innerHTML =
      '<div style="padding: 20px; text-align: center; font-family: system-ui;"><h2>⚠️ Ошибка конфигурации</h2><p>Файл config.js не найден или не содержит API ключ.</p><p>Следуйте инструкциям в README.md для настройки.</p></div>';
    return;
  }

  if (
    !CONFIG.GOOGLE_MAPS_API_KEY ||
    CONFIG.GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE"
  ) {
    console.error("Google Maps API ключ не настроен!");
    document.body.innerHTML =
      '<div style="padding: 20px; text-align: center; font-family: system-ui;"><h2>🔑 Требуется API ключ</h2><p>Настройте Google Maps API ключ в файле config.js</p><p>Следуйте инструкциям в README.md</p></div>';
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.onerror = function () {
    console.error("Ошибка загрузки Google Maps API");
    document.body.innerHTML =
      '<div style="padding: 20px; text-align: center; font-family: system-ui;"><h2>🌐 Ошибка загрузки карты</h2><p>Не удалось загрузить Google Maps API.</p><p>Проверьте API ключ и подключение к интернету.</p></div>';
  };
  document.head.appendChild(script);
}

// Load API after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGoogleMapsAPI);
} else {
  loadGoogleMapsAPI();
}
