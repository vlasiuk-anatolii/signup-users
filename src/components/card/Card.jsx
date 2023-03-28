import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

export const Card = ({ image, name, occupation, email, phone }) => {
  return (
    <div className="card">
      <div className="card__box-image">
        <img src={image} alt={name} className="card__image" />
      </div>
      <div className="card__info">
        <h2 className="card__name">{name}</h2>
        <p className="card__occupation">{occupation}</p>
        <p className="card__email">{email}</p>
        <p className="card__phone">{phone}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};
