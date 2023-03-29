import React from 'react';
import { Button } from '../button/Button';
import './Header.scss';
import Logo from '../../assets/images/Logo.svg';
import PropTypes from 'prop-types';

export const Header = ({ elementRef }) => {
  const handleClickBtnUsers = () => {
    console.log('Button clicked!');
  };

  const handleClickBtnSignUp = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className='header'>
      <div className='header__container'>
        <img src={Logo} alt="Logo" />
        <div className='header__box-button'>
          <Button
            type="button"
            onClick={handleClickBtnUsers}
            name="Users"
          />
          <Button
            type="button"
            onClick={handleClickBtnSignUp}
            name="Sign up"
          />
        </div>
      </div>
    </div >
  );
};

Header.propTypes = {
  elementRef: PropTypes.shape({
    current: PropTypes.any
  })
};