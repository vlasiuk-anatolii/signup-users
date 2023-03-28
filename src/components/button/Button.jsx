import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export const Button = (props) => {
  const { type, onClick, name = 'Button', width = '100px' } = props;
  const buttonStyle = { width };
  console.log(buttonStyle);
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      style={buttonStyle}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};
