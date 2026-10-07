/* =====================================================================
   SERVICE WORKER — offline support.
   Independent module: delete this file and the app keeps working online.
   Files that do not exist are skipped silently when caching.
   ===================================================================== */
var DV_CACHE = 'dv-verse-v3';
var DV_FILES = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'information.js',
  'settings.js',
  'bible.js',
  'game.js',
  'new-version.js',
  'manifest.json'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(caches.open(DV_CACHE).then(function(c) {
    return Promise.all(DV_FILES.map(function(f) {
      return c.add(f).catch(function() {});
    }));
  }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== DV_CACHE; }).map(function(k) { return caches.delete(k); }));
  }).then(function() { return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Page loads (including deep links): network first, offline falls back to the app shell
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(function() {
      return caches.match('index.html').then(function(r) { return r || caches.match('./'); });
    }));
    return;
  }

  // Everything else: network first (always the latest files), cache as the offline fallback
  e.respondWith(fetch(req).then(function(res) {
    if (res && res.ok) {
      var copy = res.clone();
      caches.open(DV_CACHE).then(function(c) { c.put(req, copy); });
    }
    return res;
  }).catch(function() { return caches.match(req); }));
});
