/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","61c3db9e813c3d5c632ffd2f4f9f972e"],["/bower_components/app-layout/app-drawer/app-drawer.html","f1f415946d3047c9f1d6f80a4e75f966"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","8ebe815b2512238cc88cb8357037ca05"],["/bower_components/app-layout/app-header/app-header.html","f394d840429251c485b1d2845ab84c69"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","64a7d70a0c083c5b14eff0e4de84901c"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","01f2cc4ec5bc5ef0ee6ae093306c6cfa"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","dc33edfb659ed2a9b3295e539fca984a"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","04f84437d5b5d04d20536b0a8362e616"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","788f120ef69f52c1408d302efb9cacd4"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","a9839a893753f0211bcc2c402f1717cd"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","00edfd8b1a0739658a2d24d5d6c0cfce"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","39e1c1de22fecb8ff4b363e0e4e13e47"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","3b6fa9d400aaab40001ce4a926cf6976"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","0060112752628039e3dba93c7a3eac6d"],["/bower_components/app-layout/helpers/helpers.html","e56092e61aee801d35a0fa71a43996d4"],["/bower_components/app-route/app-location.html","9cb6017d7151b4fd90a51716632525fa"],["/bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["/bower_components/app-route/app-route.html","0287c675050687c2e41b870aa91a7d48"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","3e261775abad2e8b7892e6e0887778c0"],["/bower_components/iron-behaviors/iron-button-state.html","f2ff4494ed4aad33bb6f6142237af334"],["/bower_components/iron-behaviors/iron-control-state.html","1a28e6782b37d7e3235020caf2c80d4e"],["/bower_components/iron-flex-layout/iron-flex-layout.html","c751f83cb8605871f486cac373e58f8e"],["/bower_components/iron-icon/iron-icon.html","73ec2f53b3f02cb23c86d06858a4f70b"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","ec84fc0b0e3253fb9a87e217fef2c7b0"],["/bower_components/iron-location/iron-location.html","c7e6d106ecba08875f74c6b3c4f50707"],["/bower_components/iron-location/iron-query-params.html","2c9459915187b025f8d090831685cb90"],["/bower_components/iron-media-query/iron-media-query.html","feb5f313b41dc3e77b7e09cc020dbbfd"],["/bower_components/iron-meta/iron-meta.html","4646d276780813e22e760092797e08ac"],["/bower_components/iron-pages/iron-pages.html","9c339fbee4a93484dd638849e86aef8c"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","1981eab91d9541e14117ada0e34320a3"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","a611f60f31975ffea1a16e7d64d7a862"],["/bower_components/iron-selector/iron-multi-selectable.html","a391e25a70adb1ef006e29acb494cf64"],["/bower_components/iron-selector/iron-selectable.html","4e2cd8e0abb6c34b77fd7d23b557e320"],["/bower_components/iron-selector/iron-selection.html","2de6f9f42b8e93523c79a3063d69b560"],["/bower_components/iron-selector/iron-selector.html","0fd7957e8cefa80872f24d15edbaaf4b"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","c4f2d4f5bf416944492b04a693f4b582"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","6ee58ee9088ac5268775e29451824cf4"],["/bower_components/paper-icon-button/paper-icon-button.html","2c6e53474f0e99760db897d175636718"],["/bower_components/paper-ripple/paper-ripple.html","02955018b3fd7bd9543a3da55234b8d4"],["/bower_components/paper-styles/color.html","51e72248b48c46b1bb5cdc329f1c4d10"],["/bower_components/paper-styles/default-theme.html","5c5ffe9afd98067500b2bf802e27b388"],["/bower_components/polymer/polymer-micro.html","7f7b3da62505a75ebe3012b9d5981a35"],["/bower_components/polymer/polymer-mini.html","2caa35d9e36e3ae49911c72d83635b7e"],["/bower_components/polymer/polymer.html","cb60902bedbd97ae7750daea10ec26e4"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","f8fccfe970131481fb0a5e07ffcf32be"],["/manifest.json","39a400389f05600d3ec8c419680017c6"],["/src/my-app.html","0c13723faf7ea1c3da5596ba398ba895"],["/src/my-icons.html","3815417599e336f9acaeaaa986963f4c"],["/src/my-view1.html","9e40319c2a791e81081eac8ff78a4e95"],["/src/my-view2.html","d5b47f6a607105e1e5578116ae5e77e8"],["/src/my-view3.html","46f899a969e0ba1ec1d70ac5a72d5357"],["/src/my-view404.html","0000af96aca28403d7bdaedcbd7e71ac"],["/src/shared-styles.html","912ac662022939b583dd2f1787242243"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







