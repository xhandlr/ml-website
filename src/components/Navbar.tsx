import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-[#0D111A] text-white shadow-md z-50 border-b border-[#358E8C]">
      <div className="container mx-auto px-6 py-4 flex gap-10 justify-center items-center">
        <h1 className="text-xl font-bold">ML Interactivo</h1>
        <ul className="flex gap-10">
          <li><Link to="/" className="text-white hover:text-yellow-300">Inicio</Link></li>
          <li><Link to="/decision-tree" className="text-white hover:text-yellow-300">Árboles de Decisión</Link></li>
          <li><Link to="/reinforcement-learning" className="text-white hover:text-yellow-300">Reinforcement Learning</Link></li>
          <li><Link to="/conclusiones" className="text-white hover:text-yellow-300">Conclusiones</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
