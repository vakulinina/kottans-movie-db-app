import styles from './SearchByMovie.css';

export default function SearchByMovie() {
  return `
    <input
      class="${styles['search-input']}"
      type="search"
      value="${window.currentState.searchValue || ''}"
      onchange="window.performSearch(this.value);">
  `;
}
