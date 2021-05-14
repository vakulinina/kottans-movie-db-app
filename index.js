import styles from './style.css';

window.currentState = {
  searchValue: '',
  searchResult: [],
  popularMovies: [],
  selectedMovie: null,
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.loadPopularMovies = loadPopularMovies;

function App() {
  return `
    <div>
    ${PopularMovie()}
    ${SearchByMovie()}
    ${MoviesGrid()}
    </div>
  `;
}

function renderApp() {
  document.querySelector('#app-root').innerHTML = `${App()}`;
}

window.loadPopularMovies();
// window.renderApp();

function PopularMovie() {
  const { backdrop_path, original_title, overview } = window.currentState.popularMovies[0];
  return `
    <article class="${styles['popular-movie']}">
      <img class="${styles['popular-movie-img']}" src="http://image.tmdb.org/t/p/w1280/${backdrop_path}">
      <div class="${styles['popular-movie-description']}">
        <h2>${original_title}</h2>
        <p>${overview}</p>
      </div>
    </article>
  `;
}

function performSearch(value) {
  window.currentState.searchValue = value;
  const { searchValue } = window.currentState;
  if (searchValue) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&query=${searchValue}`,
    )
      .then(response => response.json())
      .then(data => {
        window.currentState.searchResult = data.results;
      })
      .finally(window.renderApp);
  } else {
    renderApp();
  }
}

function SearchByMovie() {
  return `
    <input
      class="${styles['search-input']}"
      type="search"
      value="${window.currentState.searchValue || ''}"
      onchange="window.performSearch(this.value);">
  `;
}

function loadPopularMovies() {
  fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=f99ccaaae4700adb92a679a409185d00&language=en-US',
  )
    .then(response => response.json())
    .then(data => {
      window.currentState.popularMovies = data.results;
    })
    .finally(window.renderApp);
}

function MoviesGrid() {
  let title = 'Popular Movies';
  let movies;
  const { searchValue, searchResult, popularMovies } = window.currentState;
  if (searchValue) {
    movies = getMoviesCards(searchResult);
    title = 'Search Result';
  } else {
    movies = getMoviesCards(popularMovies);
    title = 'Popular Movies';
  }
  return `
    <div class="${styles['movies-list-wrap']}">
      <h3>${title}</h3>
      <div class="${styles['movies-list']}">${movies}</div>
    </div>
  `;
}

function getMoviesCards(movies) {
  let moviesItems = '';
  movies.forEach(({ original_title, poster_path }) => {
    const moviesItem = `
      <a class="${styles['movies-item']}" href="#" title="${original_title}">
        <img src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="${original_title}">
      </a>
    `;
    moviesItems += moviesItem;
  });
  return moviesItems;
}
