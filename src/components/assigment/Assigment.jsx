import React from 'react';
import { Button } from '../button/Button';
import './Assigment.scss';
import PropTypes from 'prop-types';

export const Assigment = ({ elementRef }) => {
  const handleClickBtnSignUp = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='assigment'>
      <div className='assigment__box-content'>
        <h1 className='assigment__title'>Test assignment for front-end developer</h1>
        <p className='assigment__text'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they&apos;ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <Button
          className='assigment__button'
          type="button"
          onClick={handleClickBtnSignUp}
          name="Sign up"
        />
      </div>
    </div >
  );
};

Assigment.propTypes = {
  elementRef: PropTypes.shape({
    current: PropTypes.any
  })
};
