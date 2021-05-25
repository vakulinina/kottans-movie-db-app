/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';
import styles from './MoviesGridItem.css';
import { no_image_backdrop } from '../MoviesGridItem/*.jpg';

export default function MoviesGridItem({ originalTitle, posterPath }) {
  return (
    <a class={styles['movies-item']} href="#" title={originalTitle}>
      <img
        class={styles['movies-item-img']}
        src={posterPath ? `http://image.tmdb.org/t/p/w500/${posterPath}` : no_image_backdrop}
        alt={originalTitle}
      />
    </a>
  );
}
