/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import styles from './MoviesGrid.css';
import MoviesGridItem from '../MoviesGridItem/MoviesGridItem';

export default function MoviesGrid() {
  let title;
  let gridItems;
  const { searchValue, searchResult, popularMovies } = window.currentState;
  if (searchValue) {
    gridItems = (
      <>
        {searchResult.map(movie => (
          <MoviesGridItem original_title={movie.original_title} poster_path={movie.poster_path} />
        ))}
      </>
    );
    // gridItems = searchResult.map(movie => MoviesGridItem(movie));
    title = 'Search Result';
  } else {
    gridItems = (
      <>
        {popularMovies.map(movie => (
          <MoviesGridItem original_title={movie.original_title} poster_path={movie.poster_path} />
        ))}
      </>
    );
    // gridItems = popularMovies.map(movie => MoviesGridItem(movie));
    title = 'Popular Movies';
  }
  return (
    <div class={styles['movies-list-wrap']}>
      <h3>{title}</h3>
      <div class={styles['movies-list']}>{gridItems}</div>
    </div>
  );
}
