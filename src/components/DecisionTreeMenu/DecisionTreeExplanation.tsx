import React from 'react';

const ConceptCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#293548] p-4 rounded-lg">
    <h4 className="text-lg font-bold text-[#6CDFBC] mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{children}</p>
  </div>
);

const DecisionTreeExplanation: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-8 rounded-2xl shadow-2xl mt-8 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Conceptos Clave de Árboles de Decisión</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Un árbol de decisión es una herramienta gráfica que ayuda a tomar decisiones clasificando datos paso a paso. Cada componente del árbol tiene un rol específico y facilita el proceso de inferencia a partir de datos estructurados.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard title="Nodo 📍">
          Representa una condición o pregunta sobre los datos. Según la respuesta, se sigue una u otra rama.
        </ConceptCard>
        <ConceptCard title="Rama 🌿">
          Conecta nodos y representa el camino que se toma según la respuesta a la pregunta de un nodo.
        </ConceptCard>
        <ConceptCard title="Hoja 🍃">
          Es un nodo terminal. Representa el resultado o clasificación final luego de evaluar todas las decisiones.
        </ConceptCard>
        <ConceptCard title="Decisión 🎯">
          Es el proceso de ir de nodo en nodo respondiendo preguntas hasta llegar a una hoja con una predicción.
        </ConceptCard>
      </div>
    </div>
  );
};

export default DecisionTreeExplanation;
