import React from 'react';
import { Button } from '../button/Button';
import './Header.scss';
import Logo from '../../assets/images/Logo.svg';
import PropTypes from 'prop-types';

export const Header = ({ elementRef, elementRefList }) => {
  const handleClickBtnUsers = () => {
    if (elementRefList.current) {
      elementRefList.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClickBtnSignUp = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className='header'>
      <div className='header__container'>
        <img src={Logo} alt='Logo' />
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
    current: PropTypes.object
  }),
  elementRefList: PropTypes.shape({
    current: PropTypes.object
  })
};