import React from "react";
import type { CourseAverageType } from "./types";

interface SidebarProps {
  selected: CourseAverageType;
  onSelect: (value: CourseAverageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => (
  <div className="w-64 bg-[#1e293b] p-4 border-r border-[#334155] flex">
    <div className="my-auto flex flex-col w-full">
      <h2 className="text-xl font-bold mb-6 text-[#6CDFBC] p-2 border-b border-[#334155]">
        Ejemplos Disponibles
      </h2>
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
          <span>{type === "calificacion" ? "Calificación Final" : "Clasificador Iris"}</span>
        </button>
      ))}
      <div className="mt-6 pt-4 border-t border-[#334155] text-sm text-[#94a3b8]">
        <p>Selecciona un ejemplo para comenzar</p>
      </div>
    </div>
  </div>
);

export default Sidebar;
