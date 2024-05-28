import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsMov from '../Item/ItemsMov'; 
import CategoriesBlock from '../Item/Categories';
import MyCarousel from '../Carousel/Carousel';

const API_KEY = '33770de3b32de7cd8c2d2afe8f4ac116'; 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`;
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`;

export default function Home({ favoriteMovies, setFavoriteMovies, watchLaterMovies, setWatchLaterMovies }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const [moviesResponse, genresResponse] = await Promise.all([
          axios.get(API_URL),
          axios.get(GENRES_URL)
        ]);

        const genresMap = genresResponse.data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const formattedMovies = moviesResponse.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          rating: movie.vote_average,
          photo: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          categories: movie.genre_ids.map(id => genresMap[id] || 'Unknown'),
          actors: [] 
        }));

        setMovies(formattedMovies);
        setGenres(Object.values(genresMap));
      } catch (error) {
        console.error('Ошибка при получении фильмов или жанров:', error);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };



  const handleToggleFavorite = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      if (prevFavorites.some(fav => fav.id === movie.id)) {
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const handleToggleWatchLater = (movie) => {
    setWatchLaterMovies((prevWatchLater) => {
      if (prevWatchLater.some(watch => watch.id === movie.id)) {
        return prevWatchLater.filter(watch => watch.id !== movie.id);
      } else {
        return [...prevWatchLater, movie];
      }
    });
  };

  const filteredMovies = selectedCategory
    ? movies.filter(movie => movie.categories.includes(selectedCategory))
    : movies;

  const searchedMovies = searchQuery
    ? filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredMovies;

  const sortedMovies = [...searchedMovies].sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.rating - b.rating;
    } else if (sortOrder === 'descending') {
      return b.rating - a.rating;
    }
    return 0;
  });
  

  return (
    <div>
      <MyCarousel />
      <div className="container">
      <CategoriesBlock categories={genres} onCategorySelect={handleCategorySelect} />
      <div className="sort-container">
        <label htmlFor="sort" className="sort-label">Сортировка по рейтингу:</label>
        <select id="sort" value={sortOrder} onChange={handleSortChange} className="sort-select">
          <option value="">Все</option>
          <option value="ascending">По возрастанию</option>
          <option value="descending">По убыванию</option>
        </select>
      </div>
      <div className="search-container">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Поиск по названию фильма" className="search-input" />
      </div>
      <main className="movies-block">
        {sortedMovies.map(movie => (
          <ItemsMov  onClick={() => handleMovieClick(movie.id)} key={movie.id} movie={movie} toggleFavorite={handleToggleFavorite} toggleWatchLater={handleToggleWatchLater} />
        ))}
      </main>
      </div>
    </div>
  );
}
