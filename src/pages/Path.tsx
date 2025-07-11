import cerebroImg from '../../src/assets/cerebro.png';
import { motion } from 'framer-motion';
import DecisionTreeSimpleAnimation from '../components/DecisionTreeSimpleAnimation';
import { Link } from 'react-router-dom';

const Path = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col items-center justify-start bg-[#151C29] px-4 pt-6 relative"
    >
      {/* Botón arriba a la izquierda, absoluto dentro del contenedor */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <button
            className="text-[#6CDFBC] border border-[#46AA8C] px-4 py-2 rounded-md
                       hover:border-[#05F4F5]
                       transition-all duration-300 hover:text-[#05F4F5]
                       bg-transparent
                       font-semibold whitespace-nowrap"
          >
            Volver al inicio
          </button>
        </Link>
      </div>

      {/* Título y subtítulo centrados */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-6 px-2 md:px-0">
        <h2 className="text-l md:text-2xl lg:text-3xl font-bold text-white mb-1 text-center">
          ¿Qué deseas aprender hoy?
        </h2>
        <h4 className="text-base md:text-lg text-[#cbd5e1] tracking-wide text-center">
          Selecciona el tema que te gustaría aprender
        </h4>
      </div>

      {/* Contenedor de tarjetas */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-2xl px-2 md:px-0">
        {/* Tarjeta 1 envuelta en Link */}
        <Link to="/path-decision-tree" className="flex-1">
          <div className="h-full bg-[#020617] rounded-xl overflow-hidden shadow-2xl 
                          hover:shadow-[0_0_30px_rgba(101,220,184,0.3)] transition-all 
                          duration-300 hover:-translate-y-2 border border-[#46AA8C] 
                          hover:border-[#05F4F5]">
            <div className="h-48 bg-[#0f172a] flex items-center justify-center p-4">
              <DecisionTreeSimpleAnimation />
            </div>
            <div className="p-8">
              <p className="text-lg text-white mb-4">
                ¿Quieres saber cómo los algoritmos <span className="font-bold text-[#6CDFBC]">toman decisiones</span>?
              </p>
              <h3 className="text-3xl font-bold text-white">Árboles de decisión</h3>
            </div>
          </div>
        </Link>

        {/* Tarjeta 2 */}
        <Link to="/path-reinforcement-learning" className="flex-1">
          <div className="h-full bg-[#020617] rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(101,220,184,0.3)] transition-all duration-300 hover:-translate-y-2 border border-[#46AA8C] hover:border-[#05F4F5]">
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
        </Link>
      </div>
    </motion.div>
  );
};

export default Path;
