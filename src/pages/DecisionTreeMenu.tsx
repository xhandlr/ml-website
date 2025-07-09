import React, { useState } from "react";
import { Slider, Button } from "antd";
import DecisionTreeCourseAverage from "../components/DecisionTreeCourseAverage";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

type CourseAverageType = "calificacion" | "iris";

const CustomSlider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  label?: string;
}> = ({ value, onChange, label }) => (
  <div className="mb-4">
    {label && <label className="block mb-2">{label}</label>}
    <Slider
      min={1.0}
      max={7.0}
      step={0.1}
      value={value}
      onChange={onChange}
      trackStyle={{ backgroundColor: "#059669" }}
      handleStyle={{ borderColor: "#6CDFBC" }}
      railStyle={{ backgroundColor: "#4b5563" }}
    />
    <div className="text-center mt-2">{value.toFixed(2)}</div>
  </div>
);

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const DecisionTreeMenu: React.FC = () => {
  const [grades, setGrades] = useState<number[]>([1, 1, 1]);
  const [examGrade, setExamGrade] = useState<number>(1);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCourseAverage, setSelectedCourseAverage] = useState<CourseAverageType>("calificacion");

  const calculateAverage = () => grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

  const resetEvaluation = () => {
    setGrades([1, 1, 1]);
    setExamGrade(1);
    setActivePath([]);
    setCurrentStep(0);
    setModalMessage(null);
    setShowConfetti(false);
  };

  const evaluateDecision = () => {
    setActivePath([]);
    setCurrentStep(0);
    setModalMessage(null);
    setShowConfetti(false);

    const average = calculateAverage();
    const path: string[] = [];

    setTimeout(() => {
      path.push("promedio");
      setActivePath([...path]);
      setCurrentStep(1);

      if (average >= 4.0) {
        setTimeout(() => {
          path.push("aprueba-directo");
          setActivePath([...path]);
          setCurrentStep(2);
          setModalMessage("✅ ¡Has aprobado el curso! 🎉");
          setShowConfetti(true);
        }, 1000);
      } else {
        setTimeout(() => {
          path.push("bajo36");
          setActivePath([...path]);
          setCurrentStep(2);

          if (average < 3.6) {
            setTimeout(() => {
              path.push("reprueba-directo");
              setActivePath([...path]);
              setModalMessage("❌ No apruebas (promedio insuficiente)");
              setCurrentStep(3);
              setShowConfetti(false);
            }, 1000);
          } else {
            setTimeout(() => {
              path.push("eval-final");
              setActivePath([...path]);
              setCurrentStep(3);

              const requiredExam = Math.max(1.0, Math.min(7.0, (4.0 - 0.6 * average) / 0.4));

              if (examGrade >= requiredExam) {
                setTimeout(() => {
                  path.push("aprueba-final");
                  setActivePath([...path]);
                  setModalMessage("✅ ¡Has aprobado el curso! 🎉");
                  setShowConfetti(true);
                  setCurrentStep(4);
                }, 1000);
              } else {
                setTimeout(() => {
                  path.push("reprueba-final");
                  setActivePath([...path]);
                  setModalMessage("❌ No apruebas (nota de examen insuficiente)");
                  setCurrentStep(4);
                  setShowConfetti(false);
                }, 1000);
              }
            }, 1000);
          }
        }, 1000);
      }
    }, 500);
  };

  const updateGrade = (index: number, value: number) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] p-4 border-r border-[#334155] flex">
        <div className="my-auto flex flex-col w-full">
          <h2 className="text-xl font-bold mb-6 text-[#6CDFBC] p-2 border-b border-[#334155]">
            Ejemplos Disponibles
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedCourseAverage("calificacion")}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                selectedCourseAverage === "calificacion"
                  ? "bg-[#8b5cf6] text-white shadow-md"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-[#94a3b8]"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 p-1 rounded ${
                    selectedCourseAverage === "calificacion" ? "bg-white text-[#8b5cf6]" : "bg-[#1e293b]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Calificación Final</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedCourseAverage("iris")}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                selectedCourseAverage === "iris"
                  ? "bg-[#8b5cf6] text-white shadow-md"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-[#94a3b8]"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 p-1 rounded ${
                    selectedCourseAverage === "iris" ? "bg-white text-[#8b5cf6]" : "bg-[#1e293b]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Clasificador Iris</span>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#334155] text-sm text-[#94a3b8]">
            <p>Selecciona un ejemplo para comenzar</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 w-full">
        {selectedCourseAverage === "calificacion" ? (
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/3 bg-[#1e293b] p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">Ingreso de Notas</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-3">Notas de Pruebas (3)</h3>
                  {grades.map((grade, index) => (
                    <CustomSlider
                      key={index}
                      value={grade}
                      onChange={(value) => updateGrade(index, value)}
                      label={`Prueba ${index + 1}`}
                    />
                  ))}
                  <div className="mt-4 p-3 bg-[#0f172a] rounded-lg">
                    <p>
                      Promedio: <span className="font-bold">{calculateAverage().toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                <CustomSlider value={examGrade} onChange={setExamGrade} label="Nota de Examen:" />

                <Button
                  type="primary"
                  onClick={evaluateDecision}
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed] w-full"
                  size="large"
                  disabled={!!modalMessage}
                >
                  Evaluar
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-2/3"
            >
              <DecisionTreeCourseAverage
                activePath={activePath}
                currentStep={currentStep}
                averageGrade={calculateAverage()}
                examGrade={examGrade}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full max-w-6xl bg-[#1e293b] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">Clasificador Iris</h2>
            <p className="text-[#94a3b8]">Contenido del clasificador Iris aparecerá aquí</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalMessage && (
          <>
            {showConfetti && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={500}
                style={{ position: 'fixed', zIndex: 45 }} // Asegurar que esté detrás del popup
              />
            )}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={resetEvaluation}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-[#1e293b] rounded-xl p-8 max-w-md w-full text-center shadow-lg relative">
                <p className="text-2xl font-bold mb-6">{modalMessage}</p>
                <Button
                  type="primary"
                  onClick={resetEvaluation}
                  size="large"
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed]"
                >
                  Seguir probando
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DecisionTreeMenu;
