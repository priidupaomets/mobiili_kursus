self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('test-store').then((cache) => cache.addAll([
      '/MobileCourse/03-Responsiivsus/04-manifest/',
      '/MobileCourse/03-Responsiivsus/04-manifest/index.html',
      '/MobileCourse/03-Responsiivsus/04-manifest/modernizr-custom.js',
      '/MobileCourse/03-Responsiivsus/04-manifest/calculator-icon-192x192.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  if (new URL(e.request.url).origin !== location.origin) return;

  if (e.request.mode === "navigate" && navigator.onLine) {
    e.respondWith(
        fetch(e.request).then(function(response) {
            return caches.open(cacheName).then(function(cache) {
                cache.put(e.request, response.clone());
                return response;
            });
        })
    );
    return;
  }

  e.respondWith(
    caches
        .match(e.request)
        .then((response) => response || fetch(e.request)),
  );
});
