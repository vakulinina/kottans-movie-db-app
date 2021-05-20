import renderApp from './framework/render';
import currentState from './data/currentState';
import { loadPopularMovies, performSearch } from './data/moviesData';

window.initApp = initApp;
window.renderApp = renderApp;
window.performSearch = performSearch;
window.loadPopularMovies = loadPopularMovies;
window.currentState = currentState;

function initApp() {
  window.loadPopularMovies().finally(renderApp);
}

window.initApp();
