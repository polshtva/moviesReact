import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import Home from '../Pages/Home'; 
import Favorite from '../Pages/Favorite';
import WatchLater from '../Pages/WatchLater';
import './Header.css';
import Search from '../Pages/Search';
import MovieDetails from '../Pages/MovieDetails ';

export default function Header() {
  const favoriteMovies = useSelector(state => state.favoriteMovies);
  const watchLaterMovies = useSelector(state => state.watchLaterMovies);

  return (
    <Router>
      <header className="header">
        <div className="header-block">
          <div className="nav">
            <ul className='nav__list'>
              <li className='nav__item'>
                <Link to="/">Моё кино</Link>
              </li>
              <li className='nav__item'>
                <Link to="/favorite">Избранные</Link>
              </li>
              <li className='nav__item'>
                <Link to="/later">Посмотреть позже</Link>
              </li>
              <li className='nav__item'>
                <Link to="/search">Поиск</Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite favoriteMovies={favoriteMovies} />} />
          <Route path="/later" element={<WatchLater watchLaterMovies={watchLaterMovies} />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
        </Routes>
      </header>
    </Router>
  );
}
