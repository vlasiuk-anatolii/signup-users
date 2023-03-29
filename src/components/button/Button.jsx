import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export const Button = (props) => {
  const {
    type = 'button',
    onClick, name = 'Button',
    width = '100px',
    disabled = false
  } = props;
  const buttonStyle = { width };
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      style={buttonStyle}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick:PropTypes.func,
  width: PropTypes.string,
  disabled: PropTypes.bool
};
