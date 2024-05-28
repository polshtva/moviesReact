import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Css/block-visual.css';

const API_KEY = '33770de3b32de7cd8c2d2afe8f4ac116';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=`;
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`;

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresResponse = await axios.get(GENRES_URL);
        setGenres(genresResponse.data.genres);
      } catch (error) {
        console.error('Ошибка при получении жанров:', error);
      }
    };

    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${SEARCH_URL}${searchQuery}`);
      const filteredMovies = response.data.results.filter(movie =>
        selectedGenres.length === 0 || selectedGenres.every(genre => movie.genre_ids.includes(genre))
      );
      setMovies(filteredMovies);
    } catch (error) {
      console.error('Ошибка при поиске фильмов:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, selectedGenres]);


  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="search-page">
      <input
        type="text"
        placeholder="Введите название фильма"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="search-results">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-image" />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description">{movie.overview}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Фильмы не найдены</p>
        )}
      </div>
    </div>
  );
}
