import { useState } from "react";
import { motion } from "framer-motion";
import robotImg from "../assets/robot.png";

const steps = [
  {
    text: "¡Hola! Imagina que eres un robot y debes tomar una decisión.",
    img: "🤖",
  },
  {
    text: "Para eso, haces una pregunta como: ¿Tengo hambre?",
    img: "🍽️",
  },
  {
    text: "Si la respuesta es SÍ, haces una cosa. Si es NO, haces otra.",
    img: "🔀",
  },
  {
    text: "Esto lo puedes poner en un dibujo como un árbol... ¡Un árbol de decisiones!",
    img: "🌳",
  },
  {
    text: "¡Cada rama del árbol es una decisión diferente!",
    img: "🌿",
  },
  {
    text: "¡Muy bien! Ahora creemos tu primer árbol de decisiones 🎉",
    img: "🎓",
  },
];

const DecisionTree = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        
        {/* Robot con tarjeta arriba */}
        <div className="relative flex flex-col items-center">
          {/* Globo de diálogo */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1e293b] p-6 rounded-xl shadow-lg max-w-xs text-center relative"
          >
            {/* Triángulo tipo globo */}
            <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1e293b]" />
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
                <button
                  disabled
                  className="text-gray-400 cursor-not-allowed border border-gray-600 px-5 py-1.5 rounded-md text-sm"
                >
                  ¡Vamos!
                </button>
              )}
            </div>
          </motion.div>

          {/* Robot debajo del texto */}
          <img
            src={robotImg}
            alt="Robot"
            className="w-32 md:w-40 mt-6 object-contain"
          />
        </div>

        {/* Lado derecho */}
        <div className="flex-1 h-[300px] flex items-center justify-center">
          {/* En proceso */}
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
