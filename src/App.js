import './App.scss';
import { Assigment } from './components/assigment/Assigment';
import { Header } from './components/header/Header';
import { List } from './components/list/List';

function App() {
  return (
    <div className="App">
      <Header />
      <Assigment />
      <List />
    </div>
  );
}

export default App;
