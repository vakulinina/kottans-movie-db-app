import renderApp from './framework/render';
import currentState from './data/currentState';
import App from './components/App';
import { loadPopularMovies, performSearch } from './data/moviesData';

window.performSearch = performSearch;
window.currentState = currentState;

(function initApp() {
  loadPopularMovies().finally(renderApp);
})();
