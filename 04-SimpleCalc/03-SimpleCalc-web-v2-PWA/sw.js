var cacheName = 'simplecalc-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/pocketgrid.min.css',
  '/font/SourceSansPro-ExtraLight.woff',
  '/js/app/main.js',
  '/js/app/calculator.js',
  '/js/lib/jquery-3.1.1.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});