import React from 'react';
import './Css/block-visual.css';
import { useNavigate } from 'react-router-dom';

export default function WatchLater({ watchLaterMovies = [] }) {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="watch-later-movies">
      <div className="conatiner">
      <h2>Фильмы для просмотра позже</h2>
      <div className="movies__main-block">
      {watchLaterMovies.length > 0 ? (
        watchLaterMovies.map(movie => (
          <div key={movie.id} className="watch-later-movie">
            <img className="watch-later-movie-image" src={movie.photo} alt={movie.title} onClick={() => handleMovieClick(movie.id)} />
            <div className="watch-later-movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Рейтинг: {movie.rating}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Нет фильмов для просмотра позже</p>
      )}
    </div>
    </div>
    </div>
  );
}
