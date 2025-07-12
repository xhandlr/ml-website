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
  // Intro (manual part)
  {
    text: "¡Hola! Soy un 'agente', y mi misión es aprender a navegar este 'entorno' para llegar al trofeo.",
    thought: "Soy el agente, la entidad que aprende.",
    position: 1,
    highlight: 'agent',
  },
  {
    text: "El 'entorno' es todo el laberinto. Cada casilla es un posible 'estado'.",
    thought: "Este es mi mundo. Mi 'estado' actual es la casilla 1.",
    position: 1,
    highlight: 'environment',
  },
  {
    text: "Para moverme, tomo 'acciones'. Internamente, asigno un valor a cada acción posible (Q-Value). Al principio, todos los valores son cero.",
    thought: "Aún no sé nada. ¿Qué acción es mejor aquí? Ni idea.",
    position: 1,
    highlight: 'state',
  },
  // Start of auto-play: Bad path exploration
  {
    text: "Empezaré a explorar para obtener información. ¡Vamos a la derecha!",
    thought: "Acción: derecha. A ver qué pasa.",
    position: 2,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Continuaré explorando hacia abajo.",
    thought: "Este camino parece libre.",
    position: 7,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Sigo adentrándome en lo desconocido...",
    thought: "Espero que esto lleve a algo bueno.",
    position: 12,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Ahora probaré a la derecha.",
    thought: "Un giro por aquí.",
    position: 13,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Llegando a una nueva bifurcación.",
    thought: "A ver a dónde lleva esto.",
    position: 14,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Probaré yendo hacia arriba.",
    thought: "¡Uy! Esta zona no parece segura...",
    position: 9,
    highlight: 'action',
    action: 'up',
  },
  {
    text: "¡Oh no! Una trampa de fuego. Esto es malo.",
    thought: "Registrando una experiencia muy negativa en esta ruta.",
    position: 10,
    highlight: 'danger',
    feedback: '-1',
    action: 'right',
  },
  // Pause and reflect (manual part)
  {
    text: "¡Auch! Esa quemadura me dio una 'recompensa negativa'. Ahora sé que ese camino es malo y no debo repetirlo.",
    thought: "Mi Q-Table se actualizó. El valor de esa ruta es bajísimo.",
    position: 1,
    highlight: 'agent',
  },
  {
    text: "Mi objetivo es la recompensa final, pero las recompensas futuras valen un poco menos que las inmediatas. Esto se llama 'Factor de Descuento'.",
    thought: "Prefiero un premio seguro ahora que uno incierto después.",
    position: 1,
    highlight: 'state',
  },
  // Restart and second attempt (good path)
  {
    text: "Ahora repetiré la ruta que me llevó al punto de decisión, usando mi memoria.",
    thought: "Volviendo sobre mis pasos...",
    position: 2,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Avanzando por el camino ya conocido...",
    thought: "Manteniendo el curso.",
    position: 7,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Casi he llegado al punto crítico.",
    thought: "Recordando la lección aprendida.",
    position: 12,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "Continuo hacia la bifurcación.",
    thought: "El momento de la verdad se acerca.",
    position: 13,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "He llegado al punto donde me equivoqué.",
    thought: "Ahora sé que 'arriba' es malo.",
    position: 14,
    highlight: 'action',
    action: 'right',
  },
  {
    text: "Mi Q-Table me dice que no vaya 'arriba'. Así que, basándome en mi aprendizaje, tomaré el camino 'abajo'.",
    thought: "Aprendizaje en acción. Tomo la decisión correcta.",
    position: 19,
    highlight: 'action',
    action: 'down',
  },
  {
    text: "¡Este camino parece mucho más prometedor!",
    thought: "¡Buena decisión! Esto se ve bien.",
    position: 24,
    highlight: 'action',
    action: 'down',
  },
  // Final manual steps
  {
    text: "¡Genial! Al llegar al trofeo, recibo una 'recompensa positiva'. ¡El valor de esta ruta aumenta muchísimo!",
    thought: "¡Lo logré! Propagaré esta recompensa hacia atrás.",
    position: 25,
    highlight: 'reward',
    feedback: '+1',
    action: 'right',
  },
  {
    text: "Después de explorar, mi Q-Table está llena de valores. La 'Política' es mi estrategia final: la mejor acción en cada estado.",
    thought: "¡Esta es mi chuleta! El mapa del tesoro que he creado.",
    position: 25,
    highlight: 'policy',
    path: [1, 2, 7, 12, 13, 14, 19, 24, 25],
  },
  {
    text: "¡Excelente! Ahora que entiendes los conceptos, estás listo para ver a un agente aprender por sí mismo.",
    thought: "¡A seguir aprendiendo!",
    position: 25,
    highlight: 'none',
  },
];

const ReinforcementLearning = () => {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [jumpToPosition, setJumpToPosition] = useState<number | null>(null);
  
  const autoPlayStartIndex = 3;
  const pauseIndex1 = 10; // After hitting the fire
  const pauseIndex2 = 11; // After explaining the error
  const endOfAutoPlayIndex = 19; // When it reaches the trophy

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

  const isManualStep = step < autoPlayStartIndex || step === pauseIndex1 || step === pauseIndex2 || step >= endOfAutoPlayIndex;

  useEffect(() => {
    const isAutoPlay = !isManualStep && step < steps.length - 1;
    if (isAutoPlay) {
      const timerId = setInterval(() => {
        setStep(prev => prev + 1);
      }, 2500);
      return () => clearInterval(timerId);
    }
  }, [step, isManualStep]);

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSkip = () => {
    if (step >= autoPlayStartIndex && step < pauseIndex1) {
      // Skipping to fire
      setStep(pauseIndex1);
    } else if (step > pauseIndex2 && step < endOfAutoPlayIndex) {
      // Skipping to trophy
      setStep(endOfAutoPlayIndex);
    }
  };

  const showSkipButton = !isManualStep && (
    (step >= autoPlayStartIndex && step < pauseIndex1) ||
    (step > pauseIndex2 && step < endOfAutoPlayIndex)
  );

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
                {isManualStep && step < steps.length - 1 && (
                  <>
                    {step > 0 && (
                      <button
                        onClick={prevStep}
                        className="text-gray-400 border border-gray-600 px-4 py-1.5 rounded-md hover:border-gray-400 transition-all"
                      >
                        Anterior
                      </button>
                    )}
                    <button
                      onClick={nextStep}
                      className="text-[#6CDFBC] border border-[#46AA8C] px-5 py-1.5 rounded-md
                        hover:border-[#05F4F5] hover:text-[#05F4F5] transition-all duration-300 text-sm"
                    >
                      Siguiente
                    </button>
                  </>
                )}
                {showSkipButton && (
                  <button
                    onClick={handleSkip}
                    className="text-yellow-400 border border-yellow-600 px-4 py-1.5 rounded-md hover:border-yellow-400 transition-all text-sm"
                  >
                    Omitir
                  </button>
                )}

                {step === steps.length - 1 && (
                  <Link to="/ReinforcementLearningMenu">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      <button
                        className="text-[#6CDFBC] border border-[#46AA8C] px-5 py-1.5 rounded-md
                          hover:border-[#05F4F5] hover:text-[#05F4F5] transition-all duration-300 text-sm"
                      >
                        ¡Vamos!
                      </button>
                    </motion.div>
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
            <ReinforcementFlowExample stepData={currentStepData} jumpToPosition={jumpToPosition} setJumpToPosition={setJumpToPosition} />
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
