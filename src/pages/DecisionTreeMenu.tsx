import React, { useState } from "react";
import Sidebar from "../components/DecisionTreeMenu/Sidebar";
import GradeInputs from "../components/DecisionTreeMenu/GradeInputs";
import TreeVisualizer from "../components/DecisionTreeMenu/TreeVisualizer";
import ResultModal from "../components/DecisionTreeMenu/ResultModal";
import type { CourseAverageType } from "../components/DecisionTreeMenu/types";

const DecisionTreeMenu: React.FC = () => {
  const [grades, setGrades] = useState<number[]>([1, 1, 1]);
  const [examGrade, setExamGrade] = useState<number>(1);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCourseAverage, setSelectedCourseAverage] =
    useState<CourseAverageType>("calificacion");

  const calculateAverage = () =>
    grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

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

              const requiredExam = Math.max(
                1.0,
                Math.min(7.0, (4.0 - 0.6 * average) / 0.4)
              );

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
      {/* Sidebar de selección */}
      <Sidebar
        selected={selectedCourseAverage}
        onSelect={setSelectedCourseAverage}
      />

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 w-full">
        {selectedCourseAverage === "calificacion" ? (
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
            {/* Ingreso de notas */}
            <GradeInputs
              grades={grades}
              examGrade={examGrade}
              onGradeChange={updateGrade}
              onExamChange={setExamGrade}
              onEvaluate={evaluateDecision}
              disabled={!!modalMessage}
              average={calculateAverage()}
            />

            {/* Visualización del árbol */}
            <TreeVisualizer
              activePath={activePath}
              currentStep={currentStep}
              averageGrade={calculateAverage()}
              examGrade={examGrade}
            />
          </div>
        ) : (
          <div className="w-full max-w-6xl bg-[#1e293b] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">Clasificador Iris</h2>
            <p className="text-[#94a3b8]">Contenido del clasificador Iris aparecerá aquí</p>
          </div>
        )}
      </div>

      {/* Modal de resultado */}
      <ResultModal
        show={!!modalMessage}
        message={modalMessage}
        showConfetti={showConfetti}
        onClose={resetEvaluation}
      />
    </div>
  );
};

export default DecisionTreeMenu;
