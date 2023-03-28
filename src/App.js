import React from 'react';
import './App.scss';
import { Assigment } from './components/assigment/Assigment';
import { Header } from './components/header/Header';
import { List } from './components/list/List';
import { Form } from './components/form/Form';

function App() {
  return (
    <div className="App">
      <Header />
      <Assigment />
      <List />
      <Form />
    </div>
  );
}

export default App;
