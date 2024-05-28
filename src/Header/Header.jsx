import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import Home from '../Pages/Home'; 
import Favorite from '../Pages/Favorite';
import WatchLater from '../Pages/WatchLater';
import './Header.css';

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
                <Link to="/">Home</Link>
              </li>
              <li className='nav__item'>
                <Link to="/favorite">Favorite</Link>
              </li>
              <li className='nav__item'>
                <Link to="/later">Watch later</Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite favoriteMovies={favoriteMovies} />} />
          <Route path="/later" element={<WatchLater watchLaterMovies={watchLaterMovies} />} />
        </Routes>
      </header>
    </Router>
  );
}
