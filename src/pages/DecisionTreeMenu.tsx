import React, { useState } from "react";
import Sidebar from "../components/DecisionTreeMenu/Sidebar";
import CourseGradingFlow from "../components/GradeExample/GradeClassifierFlow";
import IrisClassifierFlow from "../components/IrisExample/IrisClassifierFlow";
import DecisionTreeExplanation from "../components/DecisionTreeMenu/DecisionTreeExplanation";
import type { CourseAverageType } from "../components/DecisionTreeMenu/types";

const DecisionTreeMenu: React.FC = () => {
  const [selectedCourseAverage, setSelectedCourseAverage] = useState<CourseAverageType>("calificacion");

  const titleMap: Record<CourseAverageType, string> = {
    calificacion: "Clasificador de Calificación Final",
    iris: "Clasificador de Flores Iris",
  };

  const subtitleMap: Record<CourseAverageType, string> = {
    calificacion: "Simula cómo un árbol de decisión clasifica a estudiantes según sus promedios.",
    iris: "Observa cómo se clasifican las flores por características como pétalo y sépalo.",
  };

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex">
      <Sidebar selected={selectedCourseAverage} onSelect={setSelectedCourseAverage} />
      
      <div className="flex-grow flex flex-col items-center justify-start px-6 pt-2 pb-6 w-full">

        <header className="text-center mb-6 mt-4">
          <h1 className="text-3xl font-bold text-white">{titleMap[selectedCourseAverage]}</h1>
          <p className="text-gray-400 mt-2 text-base max-w-xl">
            {subtitleMap[selectedCourseAverage]}
          </p>
        </header>

        {selectedCourseAverage === "calificacion" ? (
          <CourseGradingFlow />
        ) : (
          <IrisClassifierFlow />
        )}

        <DecisionTreeExplanation />
      </div>
    </div>
  );
};

export default DecisionTreeMenu;
