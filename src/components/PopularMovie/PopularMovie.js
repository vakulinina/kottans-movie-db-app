import styles from './PopularMovie.css';

export default function PopularMovie() {
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
