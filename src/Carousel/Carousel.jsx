import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carousel.css';

const API_KEY = '33770de3b32de7cd8c2d2afe8f4ac116';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`;

export default function MyCarousel() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        const moviesData = response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          photo: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }));
        setMovies(moviesData);
      })
      .catch(error => {
        console.error('Ошибка при получении фильмов:', error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [movies]);

  if (movies.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="my-carousel-container">
      <img className='my-carousel-image' src={movies[index].photo} alt={movies[index].title} />
      <div className="my-carousel-info">
        <h3>{movies[index].title}</h3>
      </div>
    </div>
  );
}
