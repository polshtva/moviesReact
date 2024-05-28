import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarMovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };
    if (!movie.poster_path) {
        return null; 
    }

    return (
        <div className="similar-movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="similar-movie-card__image" onClick={() => handleMovieClick(movie.id)} />
            <h3 className="similar-movie-card__title">{movie.title}</h3>
        </div>
    );
};

export default SimilarMovieCard;
