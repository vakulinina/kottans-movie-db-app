import React from 'react';
import styles from './MoviesGrid.css';
import MoviesGridItem from '../MoviesGridItem/MoviesGridItem';

export default function MoviesGrid({ searchValue, searchResult, popularMovies }) {
  if (!popularMovies) {
    return <p>Loading...</p>;
  }

  const title = searchValue ? 'Search Result' : 'Popular Movies';
  const movies = searchValue ? searchResult : popularMovies;

  return (
    <div className={styles['movies-list-wrap']}>
      <h3>{title}</h3>
      <div className={styles['movies-list']}>
        {movies.map(({ id, original_title, poster_path }) => (
          <MoviesGridItem
            key={id}
            originalTitle={original_title}
            posterPath={poster_path}
            id={id}
          />
        ))}
      </div>
    </div>
  );
}
