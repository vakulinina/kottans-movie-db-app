export function performSearch(value) {
  window.currentState.searchValue = value;
  const { searchValue } = window.currentState;
  if (searchValue) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchValue}`,
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

export function loadPopularMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  )
    .then(response => response.json())
    .then(data => {
      window.currentState.popularMovies = data.results;
    });
}
