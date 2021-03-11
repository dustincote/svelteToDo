var cacheName = "todo-cache-v3";
var filesToCache = [
    "/svelteToDo",
    "build/bundle.css",
    "build/bundle.js",
    "build/bundle.js.map",
    "index.html",
    "service-worker.js"

];
self.addEventListener("install", () => {
    console.log('service worker installed')
});
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.request)
            .then( res => {
                const resClone = res.clone();

                caches.open(cacheName).then( cache => {
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch( err => caches.match(e.request).then(res => res))
    );
});
