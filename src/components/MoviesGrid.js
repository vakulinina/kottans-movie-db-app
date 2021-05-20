import styles from '../style.css';
import MoviesGridItem from './MoviesGridItem';

export default function MoviesGrid() {
  let title;
  let gridItems;
  const { searchValue, searchResult, popularMovies } = window.currentState;
  if (searchValue) {
    gridItems = searchResult.map(movie => MoviesGridItem(movie));
    title = 'Search Result';
  } else {
    gridItems = popularMovies.map(movie => MoviesGridItem(movie));
    title = 'Popular Movies';
  }
  return `
    <div class="${styles['movies-list-wrap']}">
      <h3>${title}</h3>
      <div class="${styles['movies-list']}">${gridItems.join('')}</div>
    </div>
  `;
}
