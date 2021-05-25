/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect } from '../framework';
import PopularMovie from './PopularMovie/PopularMovie';
import SearchByMovie from './SearchByMovie/SearchByMovie';
import MoviesGrid from './MoviesGrid/MoviesGrid';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    if (searchValue) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchValue}`,
      )
        .then(response => response.json())
        .then(data => {
          setSearchResult(data.results);
        });
    }
  }, [searchValue]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    )
      .then(response => response.json())
      .then(data => {
        setPopularMovies(data.results);
      });
  }, []);

  return (
    <>
      <PopularMovie movie={popularMovies ? popularMovies[0] : null} />
      <SearchByMovie value={searchValue} onChange={setSearchValue} />
      <MoviesGrid
        searchValue={searchValue}
        searchResult={searchResult}
        popularMovies={popularMovies}
      />
    </>
  );
}
