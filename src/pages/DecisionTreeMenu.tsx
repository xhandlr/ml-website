import React, { useState } from "react";
import Sidebar from "../components/DecisionTreeMenu/Sidebar";
import CourseGradingFlow from "../components/DecisionTreeMenu/flows/CourseGradingFlow";
import IrisClassifierFlow from "../components/DecisionTreeMenu/flows/IrisClassifierFlow";
import type { CourseAverageType } from "../components/DecisionTreeMenu/types";

const DecisionTreeMenu: React.FC = () => {
  const [selectedCourseAverage, setSelectedCourseAverage] =
    useState<CourseAverageType>("calificacion");

  return (
    <div className="min-h-screen bg-[#151C29] text-white flex">
      <Sidebar
        selected={selectedCourseAverage}
        onSelect={setSelectedCourseAverage}
      />
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 w-full">
        {selectedCourseAverage === "calificacion" ? (
          <CourseGradingFlow />
        ) : (
          <IrisClassifierFlow />
        )}
      </div>
    </div>
  );
};

export default DecisionTreeMenu;
