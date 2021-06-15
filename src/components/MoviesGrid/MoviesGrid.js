import React from 'react';
import styles from './MoviesGrid.css';
import MoviesGridItem from '../MoviesGridItem/MoviesGridItem';

export default function MoviesGrid({ searchValue, searchResult, popularMovies }) {


  if (!popularMovies) {
    return <p>Loading...</p>;
  }

  const result = searchValue ? searchResult : popularMovies;
  const title = searchValue ? searchResult : popularMovies;
  // // if (searchValue) { // TODO simplify
  // //   gridItems = (
  //     <>
  //       {result.map(({ id, original_title, poster_path }) => (
  //         <MoviesGridItem
  //           key={id}
  //           originalTitle={original_title}
  //           posterPath={poster_path}
  //           id={id}
  //         />
  //       ))}
  //     </>
  //   );
  // //   title = 'Search Result';
  // // } else {
  // //   gridItems = (
  // //     <>
  // //       {popularMovies.map(({ id, original_title, poster_path }) => (
  // //         <MoviesGridItem
  // //           key={id}
  // //           originalTitle={original_title}
  // //           posterPath={poster_path}
  // //           id={id}
  // //         />
  // //       ))}
  // //     </>
  // //   );
  //   title = 'Popular Movies';
  // }

  return (
    <div className={styles['movies-list-wrap']}>
      <h3>{title}</h3>
      <div className={styles['movies-list']}>{
              result.map(({ id, original_title, poster_path }) => (
                <MoviesGridItem
                  key={id}
                  originalTitle={original_title}
                  posterPath={poster_path}
                  id={id}
                />
              ))
      }</div>
    </div>
  );
}
