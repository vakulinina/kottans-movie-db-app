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
})({"framework/hooks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFunctionElement = createFunctionElement;
exports.useState = useState;
exports.useEffect = useEffect;
exports.current = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const current = {
  shouldReRender: true,
  wipComponent: null,
  hookIndex: null
};
exports.current = current;

function createFunctionElement(tag, props, children) {
  current.wipComponent = tag;
  current.hookIndex = 0;
  current.wipComponent.hooks = current.wipComponent.hooks || [];
  return tag(_objectSpread(_objectSpread({}, props), {}, {
    children
  }), children);
}

function useState(initial) {
  const {
    wipComponent,
    hookIndex
  } = current;
  const oldHook = wipComponent.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = typeof action === 'function' ? action(hook.state) : action;
  });

  const setState = action => {
    current.shouldReRender = true;
    hook.queue.push(action);
  };

  wipComponent.hooks[hookIndex] = hook;
  current.hookIndex++;
  return [hook.state, setState];
}

function useEffect(effect, deps) {
  const {
    wipComponent,
    hookIndex
  } = current;
  const oldHook = wipComponent.hooks[hookIndex];
  const oldDeps = oldHook ? oldHook.deps : undefined;
  const hasChanged = hasDepsChanged(oldDeps, deps);
  current.hookIndex++;
  if (!hasChanged) return;

  if (oldHook && oldHook.unmount) {
    window.removeEventListener('beforeunload', oldHook.unmount);
  }

  wipComponent.hooks[hookIndex] = {
    unmount: effect(),
    deps
  };
  window.addEventListener('beforeunload', wipComponent.hooks[hookIndex].unmount);
}

const hasDepsChanged = (prevDeps, nextDeps) => !prevDeps || !nextDeps || prevDeps.length !== nextDeps.length || prevDeps.some((dep, index) => dep !== nextDeps[index]);
},{}],"framework/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFragment = exports.createElement = void 0;

var _hooks = require("./hooks");

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
    return (0, _hooks.createFunctionElement)(tag, props, children);
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
},{"./hooks":"framework/hooks.js"}],"framework/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.default = void 0;

var _element = require("./element");

var _hooks = require("./hooks");

/** @jsx createElement */

/** @jsxFrag createFragment */
let timer;

function render(Component, target) {
  function workLoop() {
    if (_hooks.current.shouldReRender) {
      _hooks.current.shouldReRender = false;
      target.replaceChildren((0, _element.createElement)(Component, null));
    }

    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(workLoop);
  }

  timer = requestAnimationFrame(workLoop);
}

var _default = render;
exports.default = _default;
},{"./element":"framework/element.js","./hooks":"framework/hooks.js"}],"framework/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function () {
    return _element.createElement;
  }
});
Object.defineProperty(exports, "createFragment", {
  enumerable: true,
  get: function () {
    return _element.createFragment;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function () {
    return _hooks.useState;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function () {
    return _hooks.useEffect;
  }
});
exports.default = void 0;

var _element = require("./element");

var _render = require("./render");

var _hooks = require("./hooks");

var _default = {
  createElement: _element.createElement,
  createFragment: _element.createFragment,
  useState: _hooks.useState,
  useEffect: _hooks.useEffect,
  render: _render.render
};
exports.default = _default;
},{"./element":"framework/element.js","./render":"framework/render.js","./hooks":"framework/hooks.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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

var _framework = require("../../framework");

var _PopularMovie = _interopRequireDefault(require("./PopularMovie.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function PopularMovie({
  movie
}) {
  if (!movie) return (0, _framework.createElement)("p", null, "Loading...");
  const {
    backdrop_path,
    original_title,
    overview
  } = movie;
  return (0, _framework.createElement)("article", {
    class: _PopularMovie.default['popular-movie']
  }, (0, _framework.createElement)("img", {
    class: _PopularMovie.default['popular-movie-img'],
    src: `http://image.tmdb.org/t/p/w1280/${backdrop_path}`
  }), (0, _framework.createElement)("div", {
    class: _PopularMovie.default['popular-movie-description']
  }, (0, _framework.createElement)("h2", null, original_title), (0, _framework.createElement)("p", null, overview)));
}
},{"../../framework":"framework/index.js","./PopularMovie.css":"components/PopularMovie/PopularMovie.css"}],"components/SearchByMovie/SearchByMovie.css":[function(require,module,exports) {
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

var _framework = require("../../framework");

var _SearchByMovie = _interopRequireDefault(require("./SearchByMovie.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function SearchByMovie({
  value,
  onChange: _onChange
}) {
  return (0, _framework.createElement)("input", {
    class: _SearchByMovie.default['search-input'],
    type: "search",
    value: value,
    onChange: event => _onChange(event.target.value)
  });
}
},{"../../framework":"framework/index.js","./SearchByMovie.css":"components/SearchByMovie/SearchByMovie.css"}],"components/MoviesGrid/MoviesGrid.css":[function(require,module,exports) {
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
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/MoviesGridItem/no_image_backdrop.jpg":[function(require,module,exports) {
module.exports = "/no_image_backdrop.226ba52f.jpg";
},{}],"components/MoviesGridItem/*.jpg":[function(require,module,exports) {
module.exports = {
  "no_image_backdrop": require("./no_image_backdrop.jpg")
};
},{"./no_image_backdrop.jpg":"components/MoviesGridItem/no_image_backdrop.jpg"}],"components/MoviesGridItem/MoviesGridItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoviesGridItem;

var _framework = require("../../framework");

var _MoviesGridItem = _interopRequireDefault(require("./MoviesGridItem.css"));

var _ = require("../MoviesGridItem/*.jpg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function MoviesGridItem({
  originalTitle,
  posterPath
}) {
  return (0, _framework.createElement)("a", {
    class: _MoviesGridItem.default['movies-item'],
    href: "#",
    title: originalTitle
  }, (0, _framework.createElement)("img", {
    class: _MoviesGridItem.default['movies-item-img'],
    src: posterPath ? `http://image.tmdb.org/t/p/w500/${posterPath}` : _.no_image_backdrop,
    alt: originalTitle
  }));
}
},{"../../framework":"framework/index.js","./MoviesGridItem.css":"components/MoviesGridItem/MoviesGridItem.css","../MoviesGridItem/*.jpg":"components/MoviesGridItem/*.jpg"}],"components/MoviesGrid/MoviesGrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoviesGrid;

var _framework = require("../../framework");

var _MoviesGrid = _interopRequireDefault(require("./MoviesGrid.css"));

var _MoviesGridItem = _interopRequireDefault(require("../MoviesGridItem/MoviesGridItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function MoviesGrid({
  searchValue,
  searchResult,
  popularMovies
}) {
  let title;
  let gridItems;

  if (!popularMovies) {
    return (0, _framework.createElement)("p", null, "Loading...");
  }

  if (searchValue) {
    gridItems = (0, _framework.createElement)(_framework.createFragment, null, searchResult.map(movie => (0, _framework.createElement)(_MoviesGridItem.default, {
      originalTitle: movie.original_title,
      posterPath: movie.poster_path
    })));
    title = 'Search Result';
  } else {
    gridItems = (0, _framework.createElement)(_framework.createFragment, null, popularMovies.map(movie => (0, _framework.createElement)(_MoviesGridItem.default, {
      originalTitle: movie.original_title,
      posterPath: movie.poster_path
    })));
    title = 'Popular Movies';
  }

  return (0, _framework.createElement)("div", {
    class: _MoviesGrid.default['movies-list-wrap']
  }, (0, _framework.createElement)("h3", null, title), (0, _framework.createElement)("div", {
    class: _MoviesGrid.default['movies-list']
  }, gridItems));
}
},{"../../framework":"framework/index.js","./MoviesGrid.css":"components/MoviesGrid/MoviesGrid.css","../MoviesGridItem/MoviesGridItem":"components/MoviesGridItem/MoviesGridItem.js"}],"components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _framework = require("../framework");

var _PopularMovie = _interopRequireDefault(require("./PopularMovie/PopularMovie"));

var _SearchByMovie = _interopRequireDefault(require("./SearchByMovie/SearchByMovie"));

var _MoviesGrid = _interopRequireDefault(require("./MoviesGrid/MoviesGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function App() {
  const [searchValue, setSearchValue] = (0, _framework.useState)('');
  const [searchResult, setSearchResult] = (0, _framework.useState)([]);
  const [popularMovies, setPopularMovies] = (0, _framework.useState)([]);
  (0, _framework.useEffect)(() => {
    if (searchValue) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${"f99ccaaae4700adb92a679a409185d00"}&language=en-US&query=${searchValue}`).then(response => response.json()).then(data => {
        setSearchResult(data.results);
      });
    }
  }, [searchValue]);
  (0, _framework.useEffect)(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${"f99ccaaae4700adb92a679a409185d00"}&language=en-US`).then(response => response.json()).then(data => {
      setPopularMovies(data.results);
    });
  }, []);
  return (0, _framework.createElement)(_framework.createFragment, null, (0, _framework.createElement)(_PopularMovie.default, {
    movie: popularMovies ? popularMovies[0] : null
  }), (0, _framework.createElement)(_SearchByMovie.default, {
    value: searchValue,
    onChange: setSearchValue
  }), (0, _framework.createElement)(_MoviesGrid.default, {
    searchValue: searchValue,
    searchResult: searchResult,
    popularMovies: popularMovies
  }));
}
},{"../framework":"framework/index.js","./PopularMovie/PopularMovie":"components/PopularMovie/PopularMovie.js","./SearchByMovie/SearchByMovie":"components/SearchByMovie/SearchByMovie.js","./MoviesGrid/MoviesGrid":"components/MoviesGrid/MoviesGrid.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _framework = require("./framework");

var _App = _interopRequireDefault(require("./components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _framework.render)(_App.default, document.getElementById('app-root'));
},{"./framework":"framework/index.js","./components/App":"components/App.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56211" + '/');

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