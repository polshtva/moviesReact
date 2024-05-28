import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ActorCard from './ActorCard';
import SimilarMovieCard from './SimilarMovieCard';
import './Css/block-visual.css';

const API_KEY = '33770de3b32de7cd8c2d2afe8f4ac116';
const MOVIE_URL = `https://api.themoviedb.org/3/movie`;
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${MOVIE_URL}/${id}?api_key=${API_KEY}&language=ru-RU`);
        setMovie(response.data);
        fetchTrailerKey(response.data.original_title); // Загружаем ключ трейлера при получении данных о фильме
      } catch (error) {
        console.error('Ошибка при получении данных о фильме:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(`${MOVIE_URL}/${id}/similar?api_key=${API_KEY}&language=ru-RU`);
        setSimilarMovies(response.data.results);
      } catch (error) {
        console.error('Ошибка при получении данных о похожих фильмах:', error);
      }
    };

    fetchSimilarMovies();
  }, [id]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(`${MOVIE_URL}/${id}/credits?api_key=${API_KEY}`);
        setActors(response.data.cast);
      } catch (error) {
        console.error('Ошибка при получении данных об актерах:', error);
      }
    };

    fetchActors();
  }, [id]);

  // Добавление нового комментария
  const addComment = () => {
    // Ваша логика для добавления комментария
    console.log('Добавлен новый комментарий:', newComment);
    // Обновление списка комментариев
    setComments([...comments, { text: newComment, user: 'Анонимный пользователь' }]);
    // Очистка поля ввода после добавления комментария
    setNewComment('');
  };

  // Функция для загрузки ключа трейлера фильма с помощью запроса к YouTube API
  const fetchTrailerKey = async (movieTitle) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle}+trailer&key=${YOUTUBE_API_KEY}`
      );
      if (response.data.items.length > 0) {
        setTrailerKey(response.data.items[0].id.videoId);
      }
    } catch (error) {
      console.error('Ошибка при получении ключа трейлера:', error);
    }
  };

  if (!movie) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="movie-details">
      <div className="movie__info-data-main">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-details__image" />
      <div className="movie-details__info">
        <h2 className="movie-details__title">{movie.title}</h2>
        <div className="movie__info-data-second">
        <p className="movie-details__description">{movie.overview}</p>
        <p className="movie-details__rating">Рейтинг: {movie.vote_average}</p>
        <p className="movie-details__release-date">Дата выхода: {movie.release_date}</p>
        </div>
        </div>
        </div>
        {trailerKey && (
          <div className="trailer-container">
            <iframe
              title="trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <h3 className="movie-details__actors">Актеры:</h3>
        <div className="actors-list">
          {actors.map(actor => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
        <h3 className="movie-details__similar">Похожие фильмы:</h3>
        <div className="similar-movies-list">
          {similarMovies.map(similarMovie => (
            <SimilarMovieCard key={similarMovie.id} movie={similarMovie} />
          ))}
        </div>
        <div className="movie-details__comments">
          <h3>Комментарии к фильму на сайте</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
          <div>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Добавить комментарий..."
            />
            <button onClick={addComment}>Добавить комментарий</button>
          </div>
        </div>
      </div>
  );
}
