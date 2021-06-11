import React from 'react';
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
        {searchResult.map(({ id, original_title, poster_path }) => (
          <MoviesGridItem key={id} originalTitle={original_title} posterPath={poster_path} />
        ))}
      </>
    );
    title = 'Search Result';
  } else {
    gridItems = (
      <>
        {popularMovies.map(({ id, original_title, poster_path }) => (
          <MoviesGridItem key={id} originalTitle={original_title} posterPath={poster_path} />
        ))}
      </>
    );
    title = 'Popular Movies';
  }

  return (
    <div className={styles['movies-list-wrap']}>
      <h3>{title}</h3>
      <div className={styles['movies-list']}>{gridItems}</div>
    </div>
  );
}
