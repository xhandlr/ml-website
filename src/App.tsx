import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Path from './pages/Path.tsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/path" element={<Path />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;