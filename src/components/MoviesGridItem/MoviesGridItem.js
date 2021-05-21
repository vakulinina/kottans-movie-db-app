/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import styles from './MoviesGridItem.css';

export default function MoviesGridItem({ original_title, poster_path }) {
  return (
    <a class={styles['movies-item']} href="#" title={original_title}>
      <img
        class={styles['movies-item-img']}
        src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={original_title}
      />
    </a>
  );
}
