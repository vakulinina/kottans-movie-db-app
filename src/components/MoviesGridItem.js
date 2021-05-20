import styles from '../style.css';

export default function MoviesGridItem({ original_title, poster_path }) {
  return `
    <a class="${styles['movies-item']}" href="#" title="${original_title}">
      <img src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="${original_title}">
    </a>
  `;
}
