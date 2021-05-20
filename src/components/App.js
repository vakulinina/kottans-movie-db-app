import PopularMovie from './PopularMovie/PopularMovie';
import SearchByMovie from './SearchByMovie/SearchByMovie';
import MoviesGrid from './MoviesGrid/MoviesGrid';

export default function App() {
  return `
    <div>
    ${PopularMovie()}
    ${SearchByMovie()}
    ${MoviesGrid()}
    </div>
  `;
}
