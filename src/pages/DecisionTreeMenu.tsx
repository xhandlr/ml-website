import React, { useState } from "react";
import { Slider, Button, InputNumber } from "antd";
import DecisionTreeExample from "../components/DecisionTreeExample";
import { motion } from "framer-motion";

type ExampleType = "calificacion" | "iris";

const DecisionTreeMenu: React.FC = () => {
  const [grades, setGrades] = useState<number[]>([0, 0, 0]);
  const [examGrade, setExamGrade] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [activePath, setActivePath] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedExample, setSelectedExample] = useState<ExampleType>("calificacion");

  const calculateAverage = () => {
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
  };

  const evaluateDecision = () => {
    setCurrentStep(0);
    setActivePath([]);
    setResult("");

    const average = calculateAverage();
    const path: string[] = [];

    setTimeout(() => {
      path.push("promedio");
      setActivePath([...path]);
      setCurrentStep(1);

      if (average >= 4.0) {
        setTimeout(() => {
          path.push("examen");
          setActivePath([...path]);
          setCurrentStep(2);

          if (examGrade >= 3.95) {
            setTimeout(() => {
              path.push("aprobado");
              setActivePath([...path]);
              setResult("✅ ¡Aprueba el curso!");
              setCurrentStep(3);
            }, 1000);
          } else {
            setTimeout(() => {
              path.push("reprobado-examen");
              setActivePath([...path]);
              setResult("❌ No aprueba (nota de examen insuficiente)");
              setCurrentStep(3);
            }, 1000);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          path.push("reprobado-promedio");
          setActivePath([...path]);
          setResult("❌ No aprueba (promedio insuficiente)");
          setCurrentStep(2);
        }, 1000);
      }
    }, 500);
  };

  const updateGrade = (index: number, value: number | null) => {
    const newGrades = [...grades];
    newGrades[index] = value || 0;
    setGrades(newGrades);
  };

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex">
      
      {/* Barra lateral fija con ejemplos */}
      <div className="w-64 bg-[#1e293b] p-4 border-r border-[#334155] flex">
        <div className="my-auto flex flex-col w-full">
          <h2 className="text-xl font-bold mb-6 text-[#6CDFBC] p-2 border-b border-[#334155]">
            Ejemplos Disponibles
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedExample("calificacion")}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                selectedExample === "calificacion"
                  ? "bg-[#8b5cf6] text-white shadow-md"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-[#94a3b8]"
              }`}
            >
              <div className="flex items-center">
                <div className={`mr-3 p-1 rounded ${
                  selectedExample === "calificacion" ? "bg-white text-[#8b5cf6]" : "bg-[#1e293b]"
                }`}>
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
              onClick={() => setSelectedExample("iris")}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                selectedExample === "iris"
                  ? "bg-[#8b5cf6] text-white shadow-md"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-[#94a3b8]"
              }`}
            >
              <div className="flex items-center">
                <div className={`mr-3 p-1 rounded ${
                  selectedExample === "iris" ? "bg-white text-[#8b5cf6]" : "bg-[#1e293b]"
                }`}>
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

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 w-full">
        {selectedExample === "calificacion" ? (
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
            {/* Panel de control izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/3 bg-[#1e293b] p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">
                Ingreso de Notas
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-3">Notas de Tareas (3)</h3>
                  {grades.map((grade, index) => (
                    <div key={index} className="mb-4">
                      <label className="block mb-2">Tarea {index + 1}</label>
                      <InputNumber
                        min={1.0}
                        max={7.0}
                        step={0.1}
                        value={grade}
                        onChange={(value) => updateGrade(index, value)}
                        className="w-full"
                      />
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-[#0f172a] rounded-lg">
                    <p>
                      Promedio:{" "}
                      <span className="font-bold">
                        {calculateAverage().toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Nota de Examen:</label>
                  <Slider
                    min={1.0}
                    max={7.0}
                    step={0.1}
                    value={examGrade}
                    onChange={setExamGrade}
                    trackStyle={{ backgroundColor: "#059669" }}
                    handleStyle={{ borderColor: "#6CDFBC" }}
                  />
                  <div className="text-center mt-2">{examGrade.toFixed(2)}</div>
                </div>

                <Button
                  type="primary"
                  onClick={evaluateDecision}
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed] w-full"
                  size="large"
                >
                  Evaluar
                </Button>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-center text-lg font-medium ${
                      result.includes("✅") ? "bg-green-900" : "bg-red-900"
                    }`}
                  >
                    {result}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Visualizador del árbol derecho */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-2/3"
            >
              <DecisionTreeExample
                activePath={activePath}
                currentStep={currentStep}
                averageGrade={calculateAverage()}
                examGrade={examGrade}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full max-w-6xl bg-[#1e293b] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">
              Clasificador Iris
            </h2>
            <p className="text-[#94a3b8]">
              Contenido del clasificador Iris aparecerá aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionTreeMenu;
