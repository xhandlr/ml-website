import { useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import robotImg from "../assets/robot.png";
import robotDecision from "../assets/robot-decision.png";
import DecisionFlowExample from "../components/DecisionFlowExample";

const steps = [
  {
    text: "¡Hola! Imagina que eres un robot y debes tomar una decisión.",
    img: "🤖",
    thought: "", 
  },
  {
    text: "Te haces una pregunta, por ejemplo: ¿Tengo hambre?",
    img: "🍪",
    thought: "¿Tengo hambre?", 
  },
  {
    text: "Si la respuesta es SÍ, buscas galletas. Si es NO, sigues con tu rutina.",
    img: "🔀",
    thought: "¿Qué pasa si digo que no?",
  },
  {
    text: "Si lo miras bien, esto parece un árbol... ¡Un árbol de decisiones!",
    img: "🌳",
  },
  {
    text: "En un árbol de decisiones hay: nodos, decisiones, ramas y hojas.",
    img: "📌",
    thought: "¿Qué es cada cosa?",
  },
  {
    text: "¡Muy bien! Ahora creemos tu primer árbol de decisiones 🎉",
    img: "🎓",
    thought: "¡Estoy listo para decidir!",
  },
];

const DecisionTree = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">

        <div className="relative flex flex-col items-center">
          {/* Tarjeta de diálogo */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1e293b] p-6 rounded-xl shadow-lg max-w-xs text-center relative"
          >
            {/* Flecha tipo globo */}
            <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1e293b]" />
            <div className="text-4xl mb-3">{steps[step].img}</div>
            <h2 className="text-base md:text-lg">{steps[step].text}</h2>

            <div className="mt-4">
              {step < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="text-[#6CDFBC] border border-[#46AA8C] px-5 py-1.5 rounded-md
                        hover:border-[#05F4F5] hover:text-[#05F4F5] transition-all duration-300 text-sm"
                >
                  Siguiente
                </button>
              ) : (
                <Link to="/decision-tree-menu">
                  <button
                    className="text-[#6CDFBC] border border-[#46AA8C] px-5 py-1.5 rounded-md
                            hover:border-[#05F4F5] hover:text-[#05F4F5] transition-all duration-300 text-sm"
                  >
                    ¡Vamos!
                  </button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Robot pequeño debajo */}
          <img
            src={robotImg}
            alt="Robot"
            className="w-36 md:w-48 mt-6 object-contain"
          />
        </div>
        <div className="flex-1 h-[400px] flex items-center justify-center relative">
          {step === 2 || step === 3 ? (
            <DecisionFlowExample animate={step === 2} />
          ) : (
            <>
              <img
                src={robotDecision}
                alt="Robot"
                className="w-60 md:w-72 object-contain"
              />
              {steps[step].thought && (
                <motion.div
                  key={`thought-${step}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#064e3b] text-white 
                    text-sm md:text-base px-6 py-3 rounded-lg shadow-md border border-[#059669] 
                    max-w-md text-center"
                >
                  {steps[step].thought}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
