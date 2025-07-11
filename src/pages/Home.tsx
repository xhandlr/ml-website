import cerebroImg from '../../src/assets/sistema-nervioso-humano.png';
import InteractiveNode from '../components/Home/InteractiveNode';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollDownButton from '../components/Home/ScrollDownButton';
import DecisionTreeSimpleAnimation from '../components/DecisionTreeSimpleAnimation';

const descriptionML = [
  "Rama de la inteligencia artificial.",
  "Permite que las computadoras aprendan de datos.",
  "No requiere programación explícita para cada tarea.",
];

const descriptionArbolesDecision = [
  "Dividen los datos en ramas basándose en preguntas.",
  "Cada nodo representa una decisión.",
  "Cada hoja representa una clasificación.",
];

const descriptionAprendizajeRefuerzo = [
  "Agente toma decisiones en un entorno.",
  "Recibe recompensas según su comportamiento.",
  "Aprende estrategias óptimas mediante ensayo y error.",
];

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#151C29]">
      <div className="relative w-full max-w-7xl mx-auto px-8 pt-0 pb-12 flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          className="md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Aprende <span className="text-[#65DCB8]">Machine Learning</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-md">
            Domina los conceptos fundamentales de ML con nuestro curso interactivo diseñado para todos los niveles.
          </p>
          <Link
            to="/path"
            className="px-8 py-3 lg:px-10 lg:py-4 
                      bg-gradient-to-r from-[#1c5a83] via-[#2c786e] to-[#3aa58d] 
                      bg-[length:200%_100%] hover:bg-right 
                      text-white font-bold rounded-lg 
                      transition-all duration-500 ease-in-out 
                      text-lg w-fit shadow-lg text-center"
          >
            Empieza a aprender
          </Link>

          <div className="mt-6 flex items-center gap-4 text-gray-400 text-sm font-medium select-none justify-center md:justify-start">
            <span className="text-xs text-gray-500 italic">Desarrollado por</span>
            <span className="hover:text-[#65DCB8] cursor-default transition-colors duration-300">
              Carlos Pradenas y Camille Elgueta
            </span>
          </div>
        </motion.div>

        <motion.div
          className="md:w-[50%] flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.img
            src={cerebroImg}
            alt="Sistema nervioso humano representando Machine Learning"
            className="w-full max-w-xl lg:max-w-2xl object-contain animate-float"
            animate={{
              filter: [
                'saturate(0.8) brightness(0.95) drop-shadow(0 0 0px transparent) hue-rotate(0deg)',
                'saturate(1.3) brightness(1.05) drop-shadow(0 0 10px #f97316) hue-rotate(20deg)',
                'saturate(1.3) brightness(1.05) drop-shadow(0 0 10px #f97316) hue-rotate(20deg)',
                'saturate(0.8) brightness(0.95) drop-shadow(0 0 0px transparent) hue-rotate(0deg)'
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.7, 1],
            }}
          />
        </motion.div>

        <ScrollDownButton />
      </div>

      <div
        id="inicio-aprendizaje"
        className="w-full max-w-7xl mx-auto px-8 flex flex-col items-center py-24 bg-[#121b2a]"
      >
        <InteractiveNode
          title="ML"
          descriptionPoints={descriptionML}
          clickText="Haz clic en los círculos para explorar"
          titleColor="#65DCB8"
          titleTextColor="#1d0735ff"
          nodeSize={80}
        >
          <div className="flex flex-row gap-8 w-full items-center">
          <InteractiveNode
            title=""
            descriptionPoints={descriptionArbolesDecision}
            titleColor="#f97316"
            clickText="Árboles de decisión"
            titleTextColor="#000"
            nodeSize={30}
          >
            {/* Aquí pegamos directo la animación sin margen */}
            <DecisionTreeSimpleAnimation />
          </InteractiveNode>

            <InteractiveNode
              title=""
              descriptionPoints={descriptionAprendizajeRefuerzo}
              titleColor="#d4b7efff"
              clickText="Aprendizaje por refuerzo"
              titleTextColor="#000"
              nodeSize={30}
            />
          </div>
        </InteractiveNode>
      </div>
    </div>
  );
};

export default Home;
