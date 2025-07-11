import React from "react";

type CourseAverageType = "calificacion" | "iris";

interface ExampleSelectorProps {
  selected: CourseAverageType;
  onSelect: (type: CourseAverageType) => void;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({ selected, onSelect }) => (
  <div className="w-64 bg-[#1e293b] p-4 border-r border-[#334155] flex">
    <div className="my-auto flex flex-col w-full">
      <h2 className="text-xl font-bold mb-6 text-[#6CDFBC] p-2 border-b border-[#334155]">
        Ejemplos Disponibles
      </h2>
      <div className="space-y-3">
        {["calificacion", "iris"].map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type as CourseAverageType)}
            className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
              selected === type
                ? "bg-[#8b5cf6] text-white shadow-md"
                : "bg-[#0f172a] hover:bg-[#1e293b] text-[#94a3b8]"
            }`}
          >
            <div className="flex items-center">
              <div className={`mr-3 p-1 rounded ${selected === type ? "bg-white text-[#8b5cf6]" : "bg-[#1e293b]"}`}>
                <svg className="h-20 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{type === "calificacion" ? "Calificación Final" : "Clasificador Iris"}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default ExampleSelector;