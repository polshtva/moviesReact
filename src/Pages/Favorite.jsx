import React from 'react';
import './Css/block-visual.css';
import { useNavigate } from 'react-router-dom';

export default function Favorite({ favoriteMovies = [] }) {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="favorite-movies">
      <div className="container">
      <h2>Избранные фильмы</h2>
      <div className="movies__main-block">
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map(movie => (
          <div key={movie.id} className="favorite-movie">
            <img className="favorite-movie-image" src={movie.photo} alt={movie.title} onClick={() => handleMovieClick(movie.id)}/>
            <div className="favorite-movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Рейтинг: {movie.rating}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Нет избранных фильмов</p>
      )}
      </div>
    </div>
    </div>
  );
}
