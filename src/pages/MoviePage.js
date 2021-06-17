import React, { useState, useEffect } from 'react';
import styles from './MoviePage.css';

export default function MoviePage() {
  const id = window.location.hash.slice(1);

  const [currentMovie, setCurrentMovie] = useState('');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    )
      .then(response => response.json())
      .then(data => {
        setCurrentMovie(data);
      });
  }, []);

  return (
    <>
      <div className={styles['movie-details-container']}>
        <img
          className={styles['movie-details-background']}
          src={`http://image.tmdb.org/t/p/w1280/${currentMovie.backdrop_path}`}
          alt={`${currentMovie.original_title} poster`}
        />
        <article className={styles['movie-details']}>
          <div className={styles['movie-poster-container']}>
            <img
              className={styles['movie-poster']}
              src={`http://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
              alt={currentMovie.original_title}
            />
          </div>
          <div className={styles['movie-description']}>
            <h2>{currentMovie.original_title}</h2>
            <h3 className={styles['movie-description-title']}>PLOT</h3>
            <p>{currentMovie.overview}</p>
            <h3 className={styles['movie-description-title']}>GENRES</h3>
            <ul className={styles['genres-list']}>
              {currentMovie
                ? currentMovie.genres.map(({ id, name }) => (
                    <li key={id} className={styles['genre']}>
                      {name}
                    </li>
                  ))
                : ''}
            </ul>
            <h3 className={styles['movie-description-title']}>IMDB RATING</h3>
            <meter
              className={styles['rating-meter']}
              value={currentMovie.vote_average}
              max="10"
            ></meter>
            <span className={styles['rating']}> {currentMovie.vote_average}</span>
          </div>
        </article>
      </div>
      <section className={styles['movie-actors']}>
        <ul className={styles['actors-list']}>
          <li className={styles['actor-item']}></li>
          <li className={styles['actor-item']}></li>
        </ul>
      </section>
    </>
  );
}
