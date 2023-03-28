import React, { useState, useEffect } from 'react';
import './List.scss';
import { Card } from '../card/Card';
import { getPeople } from '../../api';

export const List = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchPeople() {
      setIsLoading(true);
      const { success, users } = await getPeople();
      if (success) {
        setPeople(users);
      } else {
        setError('Something went wrong');
      }
      setIsLoading(false);
    }
    fetchPeople();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card">
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
    </div>
  );
};
