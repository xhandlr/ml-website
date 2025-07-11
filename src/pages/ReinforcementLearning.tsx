import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import robotImg from "../assets/robot.png";
import ReinforcementFlowExample from "../components/ReinforcementFlowExample";

type StepData = {
  text: string;
  thought: string;
  position: number;
  highlight: string;
  action?: "up" | "down" | "left" | "right";
  feedback?: string;
  path?: number[];
};

const steps: StepData[] = [
  {
    text: "¡Hola! Soy un 'agente' y mi misión es aprender a navegar este 'entorno' para llegar al trofeo.",
    thought: "Soy el agente, el que aprende.",
    position: 1,
    highlight: 'agent',
  },
  {
    text: "El 'entorno' es todo el laberinto. Mi campo de juego.",
    thought: "Este es mi mundo y sus reglas.",
    position: 1,
    highlight: 'environment',
  },
  {
    text: "Mi 'estado' actual es mi ubicación. Ahora, en la casilla de inicio.",
    thought: "¿Dónde estoy? Ese es mi estado.",
    position: 1,
    highlight: 'state',
  },
  {
    text: "Para moverme, tomo una 'acción'. Empezaré a explorar para ver qué encuentro.",
    thought: "¡Vamos a la aventura!",
    position: 2,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Sigo explorando el mapa...",
    thought: "A ver qué hay por aquí.",
    position: 7,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Este camino parece interesante, voy a continuar.",
    thought: "Espero que esto lleve a algo bueno.",
    position: 12,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Un giro por aquí...",
    thought: "Cambiando de dirección.",
    position: 13,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Y otro por acá.",
    thought: "Veamos qué hay al final.",
    position: 14,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "¡Uy! Esta zona no parece segura.",
    thought: "Creo que me equivoqué de camino.",
    position: 9,
    highlight: 'action',
    action: 'up',
  },
  {
    text: "¡Auch! Caer en el fuego me da una 'recompensa negativa'. He aprendido que este camino es malo.",
    thought: "¡Error! Esto no lo repito.",
    position: 10,
    highlight: 'danger',
    feedback: '-1',
    action: 'right',
  },
  {
    text: "Ahora que aprendí del error, vuelvo a empezar para encontrar la ruta correcta.",
    thought: "Ok, a empezar de cero con más sabiduría.",
    position: 1,
    highlight: 'agent',
  },
  {
    text: "Probaré una ruta diferente, evitando el error anterior.",
    thought: "Evitar el fuego, buscar el trofeo.",
    position: 2,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Este camino parece más prometedor.",
    thought: "Mucho mejor que el anterior.",
    position: 7,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Continuo por la ruta segura.",
    thought: "Manteniendo el curso.",
    position: 12,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Aquí es donde me desvié antes. Ahora tomaré el camino correcto.",
    thought: "Aprendizaje en acción.",
    position: 13,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Sigo avanzando por la nueva ruta.",
    thought: "Esto se ve bien.",
    position: 14,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Un giro hacia abajo, acercándome al objetivo.",
    thought: "Casi lo tengo.",
    position: 19,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "¡Ya casi llego!",
    thought: "¡Puedo sentir la victoria!",
    position: 24,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "¡Genial! Al llegar al trofeo, recibo una 'recompensa positiva'. ¡Este es el camino correcto!",
    thought: "¡Lo logré! Este es el camino bueno.",
    position: 25,
    highlight: 'reward',
    feedback: '+1',
    action: 'right',
  },
  {
    text: "Tras aprender de mi error, he definido una 'política': la mejor ruta a seguir para ganar.",
    thought: "¡Esta es mi estrategia ganadora!",
    position: 25,
    highlight: 'policy',
    path: [1, 2, 7, 12, 13, 14, 19, 24, 25],
  },
  {
    text: "¡Excelente! Ahora que entiendes los conceptos, estás listo para el siguiente desafío.",
    thought: "¡A seguir aprendiendo!",
    position: 25,
    highlight: 'none',
  },
];

const ReinforcementLearning = () => {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStepData = steps[step];

  useEffect(() => {
    if (currentStepData.feedback === '+1') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [step, currentStepData.feedback]);


  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex items-center justify-center px-6 py-12 overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl">
        {/* Columna del Robot y el diálogo */}
        <div className="relative flex flex-col justify-center items-center w-full md:w-[400px] flex-shrink-0">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xs flex flex-col items-center"
          >
            {/* Burbuja de pensamiento */}
            <div className="relative mb-4 flex justify-center items-center h-16 w-full">
              <div className="bg-gray-700/50 backdrop-blur-sm p-3 rounded-full px-5">
                <p className="text-sm italic text-gray-300 text-center">"{currentStepData.thought}"</p>
              </div>
            </div>

            {/* Burbuja de diálogo principal */}
            <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg text-center relative">
              <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1e293b]" />
              <h2 className="text-base md:text-lg h-[160px] flex items-center justify-center">{currentStepData.text}</h2>

              <div className="mt-4 h-12 flex justify-center items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="text-gray-400 border border-gray-600 px-4 py-1.5 rounded-md hover:border-gray-400 transition-all"
                  >
                    Anterior
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="text-[#6CDFBC] border border-[#46AA8C] px-5 py-1.5 rounded-md
                      hover:border-[#05F4F5] hover:text-[#05F4F5] transition-all duration-300 text-sm"
                  >
                    Siguiente
                  </button>
                ) : (
                  <Link to="/reinforcement-learning-menu">
                    <button
                      className="text-[#6CDFBC] border border-[#46AA8C] px-5 py-1.5 rounded-md
                        hover:border-[#05F4F5] hover:text-[#05F4F5] transition-all duration-300 text-sm"
                    >
                      ¡Vamos!
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          <img
            src={robotImg}
            alt="Robot Agente"
            className="w-36 md:w-48 mt-6 object-contain"
          />
        </div>

        {/* Columna de la visualización */}
        <div className="w-full flex-1 h-[500px] flex flex-col items-center justify-center relative">
          <motion.div
            key="visualizacion"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <ReinforcementFlowExample stepData={currentStepData} />
          </motion.div>
          
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === step ? 'bg-[#6CDFBC]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReinforcementLearning;
