const CACHE_NAME = 'ltc-cache-v1';
const CORE_ASSETS = [
  '/',
  '/docs',
  '/calculators',
  '/pt-chart',
  '/errors',
  '/equipment',
  '/favicon.svg',
  '/logo.png',
];
const MANUALS = [
  '/manuals/hoshizaki.pdf',
  '/manuals/turbochef.pdf',
  '/manuals/perlick.pdf',
  '/manuals/frosty.pdf',
  '/manuals/southbend.pdf',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([...CORE_ASSETS, ...MANUALS]);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.status === 200 && response.type === 'basic') {
        cache.put(request, response.clone());
      }
      return response;
    } catch (err) {
      return cached || new Response('Offline', { status: 503 });
    }
  })());
});


