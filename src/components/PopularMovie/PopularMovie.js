import React from 'react';
import styles from './PopularMovie.css';

export default function PopularMovie({ movie }) {
  if (!movie) return <p>Loading...</p>;
  const { backdrop_path, original_title, overview } = movie;
  return (
    <article className={styles['popular-movie']}>
      <img
        className={styles['popular-movie-img']}
        src={`http://image.tmdb.org/t/p/w1280/${backdrop_path}`}
        alt={`${original_title} poster`}
      />
      <div className={styles['popular-movie-description']}>
        <h2>{original_title}</h2>
        <p>{overview}</p>
      </div>
    </article>
  );
}
