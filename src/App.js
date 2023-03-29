import React from 'react';
import './App.scss';
import { Assigment } from './components/assigment/Assigment';
import { Header } from './components/header/Header';
import { List } from './components/list/List';
import { Form } from './components/form/Form';

function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const elementRef = React.useRef(null);
  const elementRefList = React.useRef(null);
  return (
    <div className="app">
      <Header elementRef={elementRef} elementRefList={elementRefList} />
      <Assigment elementRef={elementRef} />
      <List isRegistered={isRegistered} elementRefList={elementRefList} />
      <Form setIsRegistered={setIsRegistered} elementRef={elementRef} />
    </div>
  );
}

export default App;
