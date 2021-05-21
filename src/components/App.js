/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import PopularMovie from './PopularMovie/PopularMovie';
import SearchByMovie from './SearchByMovie/SearchByMovie';
import MoviesGrid from './MoviesGrid/MoviesGrid';

export default function App() {
  return (
    <>
      <PopularMovie />
      <SearchByMovie />
      <MoviesGrid />
    </>
  );
}
