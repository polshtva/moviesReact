import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">О нас</h3>
          <p>Мы - ваш гид в мире кино. Подписывайтесь на наши социальные сети, чтобы быть в курсе всех новинок и событий!</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Контакты</h3>
          <p>Адрес: ул. Кинематографическая, д. 123</p>
          <p>Телефон: +7 (XXX) XXX-XX-XX</p>
          <p>Email: info@kinosite.ru</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Полезные ссылки</h3>
          <ul className="footer-links">
            <li><a href="#">Расписание сеансов</a></li>
            <li><a href="#">Купить билеты онлайн</a></li>
            <li><a href="#">Онлайн-кинотеатры</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Киносайт. Все права защищены.</p>
      </div>
    </footer>
  );
}

