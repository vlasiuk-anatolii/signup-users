import React from 'react';
import { Button } from '../button/Button';
import './Header.scss';
import Logo from '../../assets/images/Logo.svg';

export const Header = () => {
  const handleClickBtnUsers = () => {
    console.log('Button clicked!');
  };

  const handleClickBtnSignUp = () => {
    console.log('Button clicked!');
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
