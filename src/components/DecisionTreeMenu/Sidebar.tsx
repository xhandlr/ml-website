import React from "react";
import type { CourseAverageType } from "./types";

interface SidebarProps {
  selected: CourseAverageType;
  onSelect: (value: CourseAverageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => (
  <div className="w-64 bg-[#1e293b] p-4 border-r border-[#334155] flex">
    <div className="my-auto flex flex-col w-full">
      <h2 className="text-xl font-bold mb-6 text-[#65DCB8] p-2 border-b border-[#334155]">
        Ejemplos Disponibles
      </h2>
      <div className="flex flex-col space-y-4">
        {["calificacion", "iris"].map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type as CourseAverageType)}
            className={`w-full px-4 py-3 rounded-md text-left font-medium tracking-wide transition-all duration-300
              ${
                selected === type
                  ? "bg-gradient-to-r from-[#3aa58d] to-[#65DCB8] text-[#1e293b] shadow-lg"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-[#cbd5e1] border border-transparent hover:border-[#334155]"
              }`}
          >
            {type === "calificacion" ? "📊 Calificación Final" : "🌸 Clasificador Iris"}
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-[#334155] text-sm text-[#94a3b8]">
        <p>Selecciona un ejemplo para comenzar</p>
      </div>
    </div>
  </div>
);

export default Sidebar;

