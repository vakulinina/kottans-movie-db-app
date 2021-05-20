import PopularMovie from './PopularMovie';
import SearchByMovie from './searchByMovie';
import MoviesGrid from './MoviesGrid';

export default function App() {
  return `
    <div>
    ${PopularMovie()}
    ${SearchByMovie()}
    ${MoviesGrid()}
    </div>
  `;
}
