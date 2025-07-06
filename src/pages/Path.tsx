import cerebroImg from '../../src/assets/cerebro.png';
import { motion } from 'framer-motion';
import DecisionTreeAnimation from '../components/DecisionTreeAnimation';
import { Link } from 'react-router-dom';

const Path = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#151C29] py-16 px-4"
    >
      {/* Título principal centrado */}
      <h2 className="text-l md:text-2xl lg:text-3xl font-bold text-white mb-16 text-center">
        ¿Qué deseas aprender hoy?
      </h2>

      {/* Contenedor de tarjetas */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-2xl px-4">
        {/* Tarjeta 1 */}
        <div className="flex-1 bg-[#020617] rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(101,220,184,0.3)] transition-all duration-300 hover:-translate-y-2 border border-[#46AA8C] hover:border-[#05F4F5]">
          <div className="h-48 bg-[#0f172a] flex items-center justify-center p-4">
            <DecisionTreeAnimation />
          </div>
          <div className="p-8">
            <p className="text-lg text-white mb-4">
            ¿Quieres saber cómo los algoritmos <span className="font-bold text-[#6CDFBC]">toman decisiones</span>?
            </p>
            <h3 className="text-3xl font-bold text-white">Árboles de decisión</h3>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="flex-1 bg-[#020617] rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(101,220,184,0.3)] transition-all duration-300 hover:-translate-y-2 border border-[#46AA8C] hover:border-[#05F4F5]">
          <div className="h-48 bg-[#0f172a] flex items-center justify-center p-4">
            <img
              src={cerebroImg}
              alt="Aprendizaje por refuerzo"
              className="h-full object-contain opacity-80"
            />
          </div>
          <div className="p-8">
            <p className="text-lg text-white mb-4">
              ¿Quieres saber cómo se entrenan los modelos?
            </p>
            <h3 className="text-3xl font-bold text-white">Aprendizaje por refuerzo</h3>
          </div>
        </div>
      </div>

      {/* Botón atrás abajo alineado a la izquierda */}
      <div className="w-full max-w-6xl mt-12 flex justify-start">
        <Link to="/">
          <button
            className="text-[#6CDFBC] border border-[#46AA8C] px-4 py-2 rounded-md
                       hover:border-[#05F4F5]
                       transition-all duration-300 hover:text-[#05F4F5]
                       bg-transparent
                       font-semibold"
          >
            Volver al inicio
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Path;
