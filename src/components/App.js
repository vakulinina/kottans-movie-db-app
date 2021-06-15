import React from 'react';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';

export default function App() {
  if (window.location.hash) { // TODO ??? if hash wouldn't be id
    return <MoviePage />;
  }
  return <HomePage />;
}
