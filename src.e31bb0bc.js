// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"framework/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFragment = exports.createElement = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Creates DOM Node. Implements jsx-parser's createElement API
 * @param {string|Function} tag - HTML tag as string or Component function
 * @param {object} props - element properties as parsed by jsx-parser
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment|Element}
 */
const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    /*
      Passing children as the 2nd argument is required as jsx transformer puts component functions
      and regular tags in wrapper functions that expect children as the 2nd param
     */
    return tag(_objectSpread(_objectSpread({}, props), {}, {
      children
    }), children);
  }

  const element = tag === '' ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2),
      /** @type {Function} */
      value);
    } else {
      try {
        if (!(element instanceof DocumentFragment)) {
          // Boolean attributes are considered to be true if they're present on the element at all, regardless of their actual value
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#example
          if (['disabled', 'checked'].includes(name) && !value) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value);
          }
        }
      } catch (e) {
        console.error('createElement caught', e, 'on', element);
      }
    }
  });
  children.forEach(child => appendChild(element, child));
  return element;
};
/**
 * Appends child elements from an unbound array of children, recursively
 * @param {Node} parent
 * @param {Node|[Node]} child
 */


exports.createElement = createElement;

const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(subChild => appendChild(parent, subChild));
  } else {
    // Skip null and undefined
    if (child != null) {
      parent.appendChild(child.nodeType ? child : document.createTextNode(child.toString()));
    }
  }
};
/**
 * Creates Fragment. Implements jsx-parser's createFragment API
 * @param {object} props - effectively a placeholder, fragment never has any properties
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment}
 */


const createFragment = (props, ...children) => createElement('', props, ...children);

exports.createFragment = createFragment;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"components/PopularMovie/PopularMovie.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "popular-movie": "_popular-movie_82438",
  "popular-movie-img": "_popular-movie-img_82438",
  "popular-movie-description": "_popular-movie-description_82438"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/PopularMovie/PopularMovie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PopularMovie;

var _element = require("../../framework/element");

var _PopularMovie = _interopRequireDefault(require("./PopularMovie.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function PopularMovie() {
  const {
    backdrop_path,
    original_title,
    overview
  } = window.currentState.popularMovies[0];
  return (0, _element.createElement)("article", {
    class: _PopularMovie.default['popular-movie']
  }, (0, _element.createElement)("img", {
    class: _PopularMovie.default['popular-movie-img'],
    src: `http://image.tmdb.org/t/p/w1280/${backdrop_path}`
  }), (0, _element.createElement)("div", {
    class: _PopularMovie.default['popular-movie-description']
  }, (0, _element.createElement)("h2", null, original_title), (0, _element.createElement)("p", null, overview)));
}
},{"../../framework/element":"framework/element.js","./PopularMovie.css":"components/PopularMovie/PopularMovie.css"}],"components/SearchByMovie/SearchByMovie.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "search-input": "_search-input_b8246"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/SearchByMovie/SearchByMovie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchByMovie;

var _element = require("../../framework/element");

var _SearchByMovie = _interopRequireDefault(require("./SearchByMovie.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function SearchByMovie() {
  return (0, _element.createElement)("input", {
    class: _SearchByMovie.default['search-input'],
    type: "search",
    value: window.currentState.searchValue || '',
    onChange: event => window.performSearch(event.target.value)
  });
}
},{"../../framework/element":"framework/element.js","./SearchByMovie.css":"components/SearchByMovie/SearchByMovie.css"}],"components/MoviesGrid/MoviesGrid.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "movies-list-wrap": "_movies-list-wrap_7ed64",
  "movies-list": "_movies-list_7ed64"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/MoviesGridItem/MoviesGridItem.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "movies-item": "_movies-item_ef796",
  "movies-item-img": "_movies-item-img_ef796"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/MoviesGridItem/MoviesGridItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoviesGridItem;

var _element = require("../../framework/element");

var _MoviesGridItem = _interopRequireDefault(require("./MoviesGridItem.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function MoviesGridItem({
  original_title,
  poster_path
}) {
  return (0, _element.createElement)("a", {
    class: _MoviesGridItem.default['movies-item'],
    href: "#",
    title: original_title
  }, (0, _element.createElement)("img", {
    class: _MoviesGridItem.default['movies-item-img'],
    src: `http://image.tmdb.org/t/p/w500/${poster_path}`,
    alt: original_title
  }));
}
},{"../../framework/element":"framework/element.js","./MoviesGridItem.css":"components/MoviesGridItem/MoviesGridItem.css"}],"components/MoviesGrid/MoviesGrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoviesGrid;

var _element = require("../../framework/element");

var _MoviesGrid = _interopRequireDefault(require("./MoviesGrid.css"));

var _MoviesGridItem = _interopRequireDefault(require("../MoviesGridItem/MoviesGridItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function MoviesGrid() {
  let title;
  let gridItems;
  const {
    searchValue,
    searchResult,
    popularMovies
  } = window.currentState;

  if (searchValue) {
    gridItems = (0, _element.createElement)(_element.createFragment, null, searchResult.map(movie => (0, _element.createElement)(_MoviesGridItem.default, {
      original_title: movie.original_title,
      poster_path: movie.poster_path
    }))); // gridItems = searchResult.map(movie => MoviesGridItem(movie));

    title = 'Search Result';
  } else {
    gridItems = (0, _element.createElement)(_element.createFragment, null, popularMovies.map(movie => (0, _element.createElement)(_MoviesGridItem.default, {
      original_title: movie.original_title,
      poster_path: movie.poster_path
    }))); // gridItems = popularMovies.map(movie => MoviesGridItem(movie));

    title = 'Popular Movies';
  }

  return (0, _element.createElement)("div", {
    class: _MoviesGrid.default['movies-list-wrap']
  }, (0, _element.createElement)("h3", null, title), (0, _element.createElement)("div", {
    class: _MoviesGrid.default['movies-list']
  }, gridItems));
}
},{"../../framework/element":"framework/element.js","./MoviesGrid.css":"components/MoviesGrid/MoviesGrid.css","../MoviesGridItem/MoviesGridItem":"components/MoviesGridItem/MoviesGridItem.js"}],"components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _element = require("../framework/element");

var _PopularMovie = _interopRequireDefault(require("./PopularMovie/PopularMovie"));

var _SearchByMovie = _interopRequireDefault(require("./SearchByMovie/SearchByMovie"));

var _MoviesGrid = _interopRequireDefault(require("./MoviesGrid/MoviesGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function App() {
  return (0, _element.createElement)(_element.createFragment, null, (0, _element.createElement)(_PopularMovie.default, null), (0, _element.createElement)(_SearchByMovie.default, null), (0, _element.createElement)(_MoviesGrid.default, null));
}
},{"../framework/element":"framework/element.js","./PopularMovie/PopularMovie":"components/PopularMovie/PopularMovie.js","./SearchByMovie/SearchByMovie":"components/SearchByMovie/SearchByMovie.js","./MoviesGrid/MoviesGrid":"components/MoviesGrid/MoviesGrid.js"}],"framework/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderApp;

var _element = require("./element");

var _App = _interopRequireDefault(require("../components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
// let Component, Target;
function renderApp() {
  document.getElementById('app-root').innerHTML = '';
  document.getElementById('app-root').appendChild((0, _element.createElement)(_App.default, null));
}
},{"./element":"framework/element.js","../components/App":"components/App.js"}],"data/currentState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const currentState = {
  searchValue: '',
  searchResult: [],
  popularMovies: [],
  selectedMovie: null
};
var _default = currentState;
exports.default = _default;
},{}],"data/moviesData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performSearch = performSearch;
exports.loadPopularMovies = loadPopularMovies;

var _render = _interopRequireDefault(require("../framework/render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function performSearch(value) {
  window.currentState.searchValue = value;
  const {
    searchValue
  } = window.currentState;

  if (searchValue) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${"f99ccaaae4700adb92a679a409185d00"}&language=en-US&query=${searchValue}`).then(response => response.json()).then(data => {
      window.currentState.searchResult = data.results;
    }).finally(_render.default);
  } else {
    (0, _render.default)();
  }
}

function loadPopularMovies() {
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${"f99ccaaae4700adb92a679a409185d00"}&language=en-US`).then(response => response.json()).then(data => {
    window.currentState.popularMovies = data.results;
  });
}
},{"../framework/render":"framework/render.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _render = _interopRequireDefault(require("./framework/render"));

var _currentState = _interopRequireDefault(require("./data/currentState"));

var _App = _interopRequireDefault(require("./components/App"));

var _moviesData = require("./data/moviesData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.performSearch = _moviesData.performSearch;
window.currentState = _currentState.default;

(function initApp() {
  (0, _moviesData.loadPopularMovies)().finally(_render.default);
})();
},{"./framework/render":"framework/render.js","./data/currentState":"data/currentState.js","./components/App":"components/App.js","./data/moviesData":"data/moviesData.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51072" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map