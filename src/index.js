import renderApp from './framework/render';
import currentState from './data/currentState';
import { loadPopularMovies, performSearch } from './data/moviesData';

window.performSearch = performSearch;
window.currentState = currentState;

function initApp() {
  loadPopularMovies().finally(renderApp);
}

initApp();
