const CACHE_NAME = 'stream-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './channels.html',
  './channel.html',
  './create-channel.html',
  './broadcast.html',
  './group-broadcast.html',
  './admin.html',
  './login.html',
  './styles.css',
  './script.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            if (event.request.method === 'GET' && response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
