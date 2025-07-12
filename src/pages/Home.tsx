import { useState, useEffect } from 'react';
import cerebroImg from '../../src/assets/sistema-nervioso-humano.png';
import InteractiveNode from '../components/Home/InteractiveNode';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollDownButton from '../components/Home/ScrollDownButton';
import DecisionTreeSimpleAnimation from '../components/DecisionTreeSimpleAnimation';
import MiniMazeAnimation from '../components/MiniMazeAnimation';

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
  const [anyNodeOpen, setAnyNodeOpen] = useState(false);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);

  // Generar estrellas cuando algún nodo está abierto
  useEffect(() => {
    if (anyNodeOpen) {
      const newStars = Array.from({length: 100}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3
      }));
      setStars(newStars);
    } else {
      setStars([]);
    }
  }, [anyNodeOpen]);

  const handleNodeToggle = (isOpen: boolean) => {
    setAnyNodeOpen(isOpen);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#151C29] relative overflow-hidden">
      {/* Estrellas de fondo */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-blue-400 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: star.opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}

      <div className="relative w-full max-w-7xl mx-auto px-8 pt-0 pb-12 flex flex-col md:flex-row items-center justify-center gap-8 z-10">
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
        className="w-full max-w-7xl mx-auto px-8 flex flex-col items-center py-24 bg-transparent z-10"
      >
        <h2 className="text-2xl text-white mb-8">Haz clic en el círculo para explorar los conceptos</h2>
        
        <InteractiveNode
          title="ML"
          descriptionPoints={descriptionML}
          titleColor="#65DCB8"
          titleTextColor="#1d0735ff"
          nodeSize={80}
          showClickText={true}
          onNodeToggle={handleNodeToggle}
        >
          <div className="flex flex-row gap-8 w-full items-center">
            <InteractiveNode
              title=""
              descriptionPoints={descriptionArbolesDecision}
              titleColor="#7fff15"
              titleTextColor="#000"
              nodeSize={30}
              showClickText={true}
              onNodeToggle={handleNodeToggle}
            >
              <DecisionTreeSimpleAnimation />
            </InteractiveNode>

            <InteractiveNode
              title=""
              descriptionPoints={descriptionAprendizajeRefuerzo}
              titleColor="#29ffff"
              titleTextColor="#000"
              nodeSize={30}
              showClickText={true}
              onNodeToggle={handleNodeToggle}
            >
              <MiniMazeAnimation />
            </InteractiveNode>
          </div>
        </InteractiveNode>
      </div>
    </div>
  );
};

export default Home;