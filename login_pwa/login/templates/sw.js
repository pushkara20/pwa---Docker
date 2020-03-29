
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('version1').then((cache) => {
      return cache.addAll(
        [
          '/',
          'admin/',
          'user_login/',
        ]);
    })
  );
console.log("cache Installed");
});





self.addEventListener('fetch', (event) => {
  const version = 'version1';
  event.respondWith(
   caches.open(version).then((cache) => {
      return cache.match(event.request).then((response) => {
        let fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        event.waitUntil(fetchPromise);
        return response;
      })
    })
  );
});
