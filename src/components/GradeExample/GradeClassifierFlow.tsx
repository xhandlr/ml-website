import React, { useState } from "react";
import GradeInputs from "./GradeInputs";
import TreeVisualizer from "./GradeVisualizer";
import ResultModal from "../DecisionTreeMenu/ResultModal";

const CourseGradingFlow: React.FC = () => {
  const [grades, setGrades] = useState<number[]>([1, 1, 1]);
  const [examGrade, setExamGrade] = useState<number>(1);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

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
    <>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        <GradeInputs
          grades={grades}
          examGrade={examGrade}
          onGradeChange={updateGrade}
          onExamChange={setExamGrade}
          onEvaluate={evaluateDecision}
          disabled={!!modalMessage}
          average={calculateAverage()}
        />
        <TreeVisualizer
          activePath={activePath}
          currentStep={currentStep}
          averageGrade={calculateAverage()}
          examGrade={examGrade}
        />
      </div>

      <ResultModal
        show={!!modalMessage}
        message={modalMessage}
        showConfetti={showConfetti}
        onClose={resetEvaluation}
      />
    </>
  );
};

export default CourseGradingFlow;
