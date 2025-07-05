import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-20 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
