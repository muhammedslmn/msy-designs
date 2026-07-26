/* =============================================================================
   Tuhfetü'l-Etfâl — Service Worker (offline / PWA)
   Çevrimdışı kullanım: tüm uygulama varlıklarını önbelleğe alır; sonraki
   açılışlarda internet olmadan da çalışır. "cache-first" + çalışma anı önbelleği.
   ============================================================================= */
var CACHE = "tuhfe-cache-v3";

var CORE = [
  "./",
  "./index.html",
  "./site.webmanifest",
  "./favicon.svg",
  "./styles.css?v=16",
  "./brand.js?v=6",
  "./verses.js?v=1",
  "./i18n.js?v=5",
  "./content.js?v=4",
  "./quiz.js?v=1",
  "./app.js?v=15",
  "./fonts/amiri-400.woff2",
  "./fonts/amiri-700.woff2",
  "./fonts/clash-display-500.woff2",
  "./fonts/clash-display-600.woff2",
  "./fonts/clash-display-700.woff2",
  "./fonts/satoshi-400.woff2",
  "./fonts/satoshi-500.woff2",
  "./fonts/satoshi-700.woff2"
];

// Kurulum: çekirdek varlıkları en iyi çabayla önbelleğe al (biri düşse de kurulum sürer).
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(CORE.map(function (u) {
        return cache.add(new Request(u, { cache: "reload" })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

// Etkinleşme: eski önbellekleri temizle.
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Getirme: aynı köken GET istekleri için önce önbellek, sonra ağ (ağdan geleni de sakla).
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        }
        return res;
      }).catch(function () {
        // Çevrimdışı yedeği: gezinme isteklerinde ana sayfayı ver.
        if (req.mode === "navigate") return caches.match("./index.html");
        return caches.match("./");
      });
    })
  );
});
