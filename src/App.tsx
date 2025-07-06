import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Path from './pages/Path.tsx';
import DecisionTree from './pages/DecisionTree.tsx';
import DecisionTreeMenu from './pages/DecisionTreeMenu.tsx';
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
            <Route path="/path-decision-tree" element={<DecisionTree />} />
            <Route path='/decision-tree-menu' element={<DecisionTreeMenu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;