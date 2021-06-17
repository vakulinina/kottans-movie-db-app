import React from 'react';
import styles from './SearchByMovie.css';

export default function SearchByMovie({ value, changeHandler }) {
  return (
    <input
      className={styles['search-input']}
      type="search"
      defaultValue={value}
      onChange={event => changeHandler(event.target.value)}
    />
  );
}
