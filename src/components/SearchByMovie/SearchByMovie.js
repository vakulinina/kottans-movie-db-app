/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';
import styles from './SearchByMovie.css';

export default function SearchByMovie({ value, onChange }) {
  return (
    <input
      class={styles['search-input']}
      type="search"
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
}
