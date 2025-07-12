import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import robotLogo from "../assets/robot.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/path", label: "Ruta de Aprendizaje" },
    { path: "/decision-tree-menu", label: "Árboles de Decisión" },
    { path: "/reinforcement-learning", label: "Aprendizaje por Refuerzo" },
    { path: "/comparison", label: "Comparativa" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#0D111A] text-white shadow-md z-50 border-b border-[#358E8C]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo alineado a la izquierda */}
        <Link to={"/"}>
        <div className="flex items-center gap-2">
          <img src={robotLogo} alt="Logo" className="w-6 h-6" />
          <h1 className="text-xl font-bold whitespace-nowrap">ML Interactivo</h1>
        </div>
        </Link>

        {/* Desktop nav centrado */}
        <ul className="hidden md:flex gap-8 mx-auto">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors hover:text-yellow-300 ${
                  location.pathname === link.path
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 items-center">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block transition-colors hover:text-yellow-300 ${
                    location.pathname === link.path
                      ? "text-yellow-300 font-semibold"
                      : "text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
