import React from 'react';
import './Button.scss';

export const Button = (props) => {
  const { type, onClick, name = 'Button' } = props;
  
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
