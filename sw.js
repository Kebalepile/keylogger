const cacheName = "keyloger-v1",
    urlsToCache = [
        '/',
        'main.css',
        'main.html',
        'main.js'
    ];

self.addEventListener('install', e => {
    console.log("service worker being installed");
    // perform install steps
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log("cache is open")
            return cache.addAll(urlsToCache);
        })
    )

    self.skipWaiting();
    console.log("service worker installed");
});

self.addEventListener('activate', e => {
    caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(name => {
            if (cacheName.indexOf(name) === -1) {
                return caches.delete(name)
            }
        }))
    });

    console.log("service worker activated")
});

self.addEventListener('fetch', e => {
    console.log("service worker is serving the asset.");
    e.respondWith(caches.match(e.request).then(res => {
        if (res) {
            return res
        }
        return fetch(e.request, {
            credentials: 'include'
        }).then(netWorkResponse => {
            if (!netWorkResponse || netWorkResponse !== 200 || netWorkResponse.type !== "basic") {
                return netWorkResponse
            }
            let resToCache = netWorkResponse.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resToCache);
            });
            return netWorkResponse
        }).catch(err => {
            console.error(`Bothata ke bo ${err}`)
        })
    }));
});