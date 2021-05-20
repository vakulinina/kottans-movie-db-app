import styles from '../style.css';
import { performSearch } from '../data/moviesData';

export default function SearchByMovie() {
  return `
    <input
      class="${styles['search-input']}"
      type="search"
      value="${window.currentState.searchValue || ''}"
      onchange="window.performSearch(this.value);">
  `;
}
