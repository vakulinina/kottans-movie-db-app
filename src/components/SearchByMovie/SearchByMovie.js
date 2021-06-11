import React from 'react';
import styles from './SearchByMovie.css';

export default function SearchByMovie({ value, onBlur }) {
  return (
    <input
      className={styles['search-input']}
      type="search"
      defaultValue={value}
      onBlur={event => onBlur(event.target.value)}
    />
  );
}
