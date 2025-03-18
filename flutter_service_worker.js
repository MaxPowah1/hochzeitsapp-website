'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "c7a407662fe7b439bf8e52f107735e96",
"assets/AssetManifest.bin.json": "b441735fb56353c5cb9c338f7921c23c",
"assets/AssetManifest.json": "6f363ad27018bb447f8d11370f44782a",
"assets/assets/images/bg1.png": "4766da5dc738916cfcbe85671ba6970b",
"assets/assets/images/bg2.png": "500c65371e303ceabd4ffaf06cc26a23",
"assets/assets/images/bg3.png": "2a0f7042932cc92096a310cdcf2ebeb0",
"assets/assets/images/bg4.png": "34ae233bc320c2b11b71899e313e1fe2",
"assets/assets/images/luxury_bg.png": "8711015dac3f9095fd75c7f17c3a84b1",
"assets/assets/images/steampunk.png": "994e50d0409f1299f2ae5caf577ec284",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "2f59df62c3fd99d9d298a96f62777675",
"assets/NOTICES": "f83e2ab8c372ea255de8ac44ffe92f92",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/map_launcher/assets/icons/amap.svg": "00409535b144c70322cd4600de82657c",
"assets/packages/map_launcher/assets/icons/apple.svg": "6fe49a5ae50a4c603897f6f54dec16a8",
"assets/packages/map_launcher/assets/icons/baidu.svg": "22335d62432f9d5aac833bcccfa5cfe8",
"assets/packages/map_launcher/assets/icons/citymapper.svg": "58c49ff6df286e325c21a28ebf783ebe",
"assets/packages/map_launcher/assets/icons/copilot.svg": "b412a5f02e8cef01cdb684b03834cc03",
"assets/packages/map_launcher/assets/icons/doubleGis.svg": "ab8f52395c01fcd87ed3e2ed9660966e",
"assets/packages/map_launcher/assets/icons/flitsmeister.svg": "44ba265e6077dd5bf98668dc2b8baec1",
"assets/packages/map_launcher/assets/icons/google.svg": "cb318c1fc31719ceda4073d8ca38fc1e",
"assets/packages/map_launcher/assets/icons/googleGo.svg": "cb318c1fc31719ceda4073d8ca38fc1e",
"assets/packages/map_launcher/assets/icons/here.svg": "aea2492cde15953de7bb2ab1487fd4c7",
"assets/packages/map_launcher/assets/icons/kakao.svg": "1c7c75914d64033825ffc0ff2bdbbb58",
"assets/packages/map_launcher/assets/icons/mappls.svg": "1a75722e15a1700115955325fe34502b",
"assets/packages/map_launcher/assets/icons/mapswithme.svg": "87df7956e58cae949e88a0c744ca49e8",
"assets/packages/map_launcher/assets/icons/mapyCz.svg": "f5a198b01f222b1201e826495661008c",
"assets/packages/map_launcher/assets/icons/naver.svg": "ef3ef5881d4a2beb187dfc87e23b6133",
"assets/packages/map_launcher/assets/icons/osmand.svg": "639b2304776a6794ec682a926dbcbc4c",
"assets/packages/map_launcher/assets/icons/osmandplus.svg": "31c36b1f20dc45a88c283e928583736f",
"assets/packages/map_launcher/assets/icons/petal.svg": "76c9cfa1bfefb298416cfef6a13a70c5",
"assets/packages/map_launcher/assets/icons/sygicTruck.svg": "242728853b652fa765de8fba7ecd250f",
"assets/packages/map_launcher/assets/icons/tencent.svg": "4e1babec6bbab0159bdc204932193a89",
"assets/packages/map_launcher/assets/icons/tmap.svg": "50c98b143eb16f802a756294ed04b200",
"assets/packages/map_launcher/assets/icons/tomtomgo.svg": "493b0844a3218a19b1c80c92c060bba7",
"assets/packages/map_launcher/assets/icons/tomtomgofleet.svg": "5b12dcb09ec0a67934e6586da67a0149",
"assets/packages/map_launcher/assets/icons/truckmeister.svg": "416d2d7d2be53cd772bc59b910082a5b",
"assets/packages/map_launcher/assets/icons/waze.svg": "311a17de2a40c8fa1dd9022d4e12982c",
"assets/packages/map_launcher/assets/icons/yandexMaps.svg": "3dfd1d365352408e86c9c57fef238eed",
"assets/packages/map_launcher/assets/icons/yandexNavi.svg": "bad6bf6aebd1e0d711f3c7ed9497e9a3",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"css/style.css": "5d00f63a47f270626f76bc80c4a20010",
"Datenschuterklaerung.md": "11b9c3e54ef8b43a4e8eeec3ff553bd0",
"Debug_paypal.py": "365e2278736ba9424839d2510c2f9f8d",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "94c8d53b3450824653e44f3e5c029a2c",
"HochzeitsApp_Demo.apk": "281016aa9ccc6b1945551dcef2127351",
"Icon2_512x512.png": "716e9d5eb646052dff2a73633c4edcbc",
"images/1231.webp": "64c2c4962c987f23deb9e9a32b91d986",
"images/asd.webp": "10cf9f1d3390bbd08b826fb33716cae9",
"images/bg1.png": "7d52ab57ef3454038cf76f01c0781d0a",
"images/bg1_16zu9.png": "7a07456427f25b6f9a972f6129d8109b",
"images/bg2.png": "f425dc0b3a787070a761423fc1c2e5a1",
"images/bg3.png": "41967912b619ae9a5bcf691a4435c6b8",
"images/bg4.png": "a89d1d60ca4bb00522511e07a454be69",
"images/bild1.jpg": "34d180223550b0a90a976ccb9624326c",
"images/bild1.png": "1e08ebbfae0b51ce75720223e8c59cb8",
"images/bild1_1024x500.png": "d372ef42991972fa1219f9724bb46d1d",
"images/bild2.jpg": "6b83dca2fe2f596e39cd9b0be6f3d664",
"images/bild3.jpg": "0bfe8276b3770c6a4367fa0f9f92beb7",
"images/bild4.jpg": "ac4fe8b08a8d931ee12f8b1f41821a0a",
"images/countdown.png": "3cbb593bfbafcacdd1bffd46bd8ea340",
"images/DALL%C2%B7E%202025-02-05%2019.16.49%20-%20A%20modern%20smartphone%20displayed%20from%20four%20different%20perspectives_%20front%20view,%20back%20view,%20side%20view,%20and%20top-down%20view.%20The%20smartphone%20has%20a%20sleek,%20minim.webp": "a1f1e3027bb0e1d3d49765d9a232d4c4",
"images/DALL%C2%B7E%202025-02-17%2020.06.06%20-%20A%20smartphone%20with%20a%20floating%20animation,%20moving%20up%20and%20down%20over%20a%20transparent%20background.%20The%20smartphone's%20screen%20should%20display%20different%20wedding%20app.webp": "d483dfbbd1aad3e39b41d08e917ca37b",
"images/DALL%C2%B7E%202025-03-02%2011.59.17%20-%20A%20modern%20and%20elegant%20logo%20for%20a%20wedding%20app.%20The%20design%20should%20feature%20a%20minimalistic%20heart%20shape%20intertwined%20with%20a%20wedding%20ring,%20symbolizing%20love%20an.webp": "538d61caca4671ab3b5adca9778dd524",
"images/Erstgespraech.png": "58e4b0b4db34a13f4eceda37e9b2cfec",
"images/fertigeapp.png": "316f1b824f3e3bd64f576b41367950bb",
"images/h2ixk92d.png": "3d4d37a5f9f7a43fa8b1519295a96cb7",
"images/handy.png": "c18a4b9e9aa0dc7c54e8f7ba15afd9a4",
"images/handy2.png": "7c55c36089b5f92b49e32ede52431c18",
"images/Handy_Webseite_Startseite_mit_Schrift.png": "381938ea6c57f3fd92dda3c15e6227e7",
"images/Handy_Webseite_Startseite_ohne_Schrift.png": "8008da2c7bc45eba4eadab06d264e92b",
"images/hochzeitsapp-website%20-%20Shortcut.lnk": "e857d24668ba19f8bdfe665f6f236d4c",
"images/Icon.png": "fc22872e01c0f06a6d4ffd4884656242",
"images/Icon1.png": "743b7cff6d2ef72232d58fb947c830c9",
"images/Icon2.png": "c2dd83a9301799f14bcf68f8a5c5bf73",
"images/impression1.jpg": "e311ded743fefe3c69fb4b9bb269ba0c",
"images/impression2.jpg": "9aab6e12ff8c84520872555c81b800de",
"images/impression3.jpg": "138e609f2d52d8a7fc732d3083393e4b",
"images/impression4.jpg": "f0493e935b3415e6e49e442cb0befb32",
"images/impression5.jpg": "fb6189b686fc19c8bf6806356042110f",
"images/Konzept.png": "2f309bfef5d21dee0186b8696c1ce2e6",
"images/logo.png": "80f7ca97f45fb29fe653e463659f50d4",
"images/logo.psd": "4281a597b2239c6d8c596bfef95c0a1a",
"images/parallax.html": "d5694b3de22b4c582f0d909b2482072d",
"images/Umsetzung.png": "849e1f9e799dc6e36654ef351fe8fa7c",
"images/wir.png": "70d8f79a3c2fce54e59eb82ff3f6a160",
"images/wir_negativ.png": "5374a32ca81da448d5cb684d0067cf03",
"index.html": "1281a793043294e6c0087854dd92c1be",
"/": "1281a793043294e6c0087854dd92c1be",
"index_de.html": "6e371b70f5a6faba18e22c8dc454a5be",
"index_en.html": "46d96c297ee85619b473289262b45e08",
"js/captureOrder.js": "c9220996d2b19a2dbd6b0216cda08094",
"js/checkout-paypal.js": "ec5de7938f96473a90862a4f145f98d1",
"js/createOrder.js": "adaf03432049997d2a6321004836e008",
"js/createPendingOrder.js": "372e79aa038a85c054278a9dc422baf1",
"js/paypalClient.js": "fbc0d40ad8edabf9bdaf35822637d228",
"js/script.js": "40b50039f40194869275f17ce324a9e1",
"main.dart.js": "e18dee92fe7efd920a7f77789d10f11c",
"models/Configuration.js": "8f8a4d7cfc4f179cc819cc26f91851c4",
"models/Order.js": "5a02b4b1b2cd490b958eee3a6cc8a452",
"server.js": "a87be78cfc93f684214c74afb1b72b39",
"version.json": "b3cba2a71364b234158409f8c335c0f4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
