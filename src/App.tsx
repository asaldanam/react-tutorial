import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokedex from "./components/Pokedex";
import Game from "./components/Game";
import Login from "./components/Login/Login";
import Character from './components/Character/Character';

export default function App() {
  return (
    <>
      <Router>
        <div>
          <h1 className="asdfasdf">Mi App</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/game" element={<Game />} />
            <Route path="/character" element={<Character />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}