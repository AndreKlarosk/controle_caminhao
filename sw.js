const CACHE_NAME = 'fuel-app-cache-v1';
const URLS = ['/', '/index.html', '/css/style.css', '/js/app.js', '/js/db.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});