import React from 'react';
import './Css/Card.css'

const ActorCard = ({ actor }) => {
  if (!actor.profile_path) {
    return null; 
  }

  return (
    <div className="actor-card">
      <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} className="actor-card__image" />
      <h3 className="actor-card__name">{actor.name}</h3>
    </div>
  );
};

export default ActorCard;
