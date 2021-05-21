/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import styles from './SearchByMovie.css';

export default function SearchByMovie() {
  return (
    <input
      class={styles['search-input']}
      type="search"
      value={window.currentState.searchValue || ''}
      onchange={event => window.performSearch(event.target.value)}
    />
  );
}
