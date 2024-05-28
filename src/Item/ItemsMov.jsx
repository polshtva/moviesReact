import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ItemsMov.css';

export default function ItemsMov({ movie }) {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(state => state.favoriteMovies);
  const watchLaterMovies = useSelector(state => state.watchLaterMovies);

  const isFavClicked = favoriteMovies.some(favMovie => favMovie.id === movie.id);
  const isLaterClicked = watchLaterMovies.some(laterMovie => laterMovie.id === movie.id);

  const handleFavClick = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: movie });
  };

  const handleLaterClick = () => {
    dispatch({ type: 'TOGGLE_WATCH_LATER', payload: movie });
  };

  return (
    <div className="movie-card">
      <img className="movie-image" src={movie.photo} alt={movie.title} />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-details">
          <p className="movie-rating">Рейтинг: {movie.rating}</p>
        </div>
        <div className="movie__choose">
          <img
            className='movie__icon movie__icon-fav'
            src={isFavClicked ? "heart click.png" : "heart no-click.png"}
            alt=""
            onClick={handleFavClick}
          />
          <img
            className='movie__icon movie__icon-later'
            src={isLaterClicked ? "lateer click.png" : "later no-click.png"}
            alt=""
            onClick={handleLaterClick}
          />
        </div>
      </div>
    </div>
  );
}
