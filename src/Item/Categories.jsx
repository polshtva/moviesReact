import React from 'react';
import './ItemsMov.css';

const CategoriesBlock = ({ categories, onCategorySelect }) => {
  return (
    <div>
      <h2>Категории:</h2>
      <ul className='categories'>
        <li key="all" onClick={() => onCategorySelect('')}>ВСЕ ФИЛЬМЫ</li>
        {categories.map((category, index) => (
          <li className='categories__item' key={index} onClick={() => onCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesBlock;
