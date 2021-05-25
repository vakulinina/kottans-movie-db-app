/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';
import styles from './MoviesGrid.css';
import MoviesGridItem from '../MoviesGridItem/MoviesGridItem';

export default function MoviesGrid({ searchValue, searchResult, popularMovies }) {
  let title;
  let gridItems;

  if (!popularMovies) {
    return <p>Loading...</p>;
  }

  if (searchValue) {
    gridItems = (
      <>
        {searchResult.map(movie => (
          <MoviesGridItem originalTitle={movie.original_title} posterPath={movie.poster_path} />
        ))}
      </>
    );
    title = 'Search Result';
  } else {
    gridItems = (
      <>
        {popularMovies.map(movie => (
          <MoviesGridItem originalTitle={movie.original_title} posterPath={movie.poster_path} />
        ))}
      </>
    );
    title = 'Popular Movies';
  }

  return (
    <div class={styles['movies-list-wrap']}>
      <h3>{title}</h3>
      <div class={styles['movies-list']}>{gridItems}</div>
    </div>
  );
}
