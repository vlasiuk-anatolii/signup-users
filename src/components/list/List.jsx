import React, { useState, useEffect } from 'react';
import './List.scss';
import { Card } from '../card/Card';
import { Button } from '../button/Button';
import { getPeople } from '../../api';
import { Loader } from '../loader/Loader';
import PropTypes from 'prop-types';

export const List = ({ isRegistered }) => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [count] = useState(6);
  const [totalPages, setTotalPages] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  async function handleClickBtnShowMore() {
    if (currentPage === totalPages - 1) {
      setIsButtonVisible(false);
    }
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const { success, total_pages, users } = await getPeople(nextPage, count);
    if (success) {
      setPeople([...people, ...users]);
      setTotalPages(total_pages);
      setCurrentPage(nextPage);
    } else {
      setError('Something went wrong');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    async function fetchPeople() {
      setIsLoading(true);
      const { success, total_pages, users, message } = await getPeople(1, 6);
      if (success) {
        setPeople(users);
        setTotalPages(total_pages);
      } else {
        setError(message);
      }
      setIsLoading(false);
    }
    fetchPeople();
  }, [isRegistered]);

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list">
      <h1 className="list__title">Working with GET request</h1>
      <div className="list__box-cards">
        {people.map(person =>
          <Card
            key={person.id}
            image={person.photo}
            name={person.name}
            occupation={person.position}
            email={person.email}
            phone={person.phone}
          />
        )}
      </div >
      {isButtonVisible && (
        <Button
          type='button'
          onClick={handleClickBtnShowMore}
          name='Show more'
          width='120px'
        />
      )}
    </div>
  );
};

List.propTypes = {
  isRegistered: PropTypes.bool,
};

