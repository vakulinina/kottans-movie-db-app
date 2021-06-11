import React from 'react';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';

export default function App() {
  if (window.location.pathname === '/') {
    return <HomePage />;
  }
  return <MoviePage />;
}
