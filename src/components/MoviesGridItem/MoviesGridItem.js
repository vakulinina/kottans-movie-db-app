import React from 'react';
import styles from './MoviesGridItem.css';
import { no_image_backdrop } from '../MoviesGridItem/*.jpg';

export default function MoviesGridItem({ originalTitle, posterPath, id }) {
  const path = `movie/${id}`;
  return (
    <a className={styles['movies-item']} href={path} title={originalTitle}>
      <img
        className={styles['movies-item-img']}
        src={posterPath ? `http://image.tmdb.org/t/p/w500/${posterPath}` : no_image_backdrop}
        alt={originalTitle}
      />
    </a>
  );
}
