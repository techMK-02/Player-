import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from './components/Player';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/player" element={<Player />} />
        <Route path="/" element={<h1>Welcome to Video Player</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
