import React, { useState } from "react";
import DecisionTreeSimpleAnimation from "../components/DecisionTreeSimpleAnimation";
import MiniMazeAnimation from "../components/MiniMazeAnimation";

const comparaciones = [
  {
    tecnica: "Árboles de Decisión",
    icon: "🌳",
    ventajas: [
      "Fáciles de entender e interpretar visualmente",
      "Adecuados para datos categóricos y numéricos",
      "Pueden manejar clasificación multiclase",
      "Requieren poco preprocesamiento de datos"
    ],
    limitaciones: [
      "Propensos a sobreajuste si no se podan",
      "Inestables con pequeñas variaciones en los datos",
      "Dificultad para aprender relaciones no lineales complejas"
    ],
    aplicaciones: [
      "Diagnóstico médico basado en síntomas",
      "Evaluación de riesgo crediticio",
      "Clasificación de clientes para marketing",
      "Sistemas expertos interpretables"
    ],
    recomendacion: "Ideal para introducir conceptos de ML, explicar importancia de variables y cuando se necesita transparencia en las decisiones."
  },
  {
    tecnica: "Aprendizaje por Refuerzo",
    icon: "🤖",
    ventajas: [
      "Aprende estrategias óptimas mediante interacción",
      "Excelente para problemas secuenciales",
      "Se adapta a entornos dinámicos y cambiantes",
      "Puede descubrir soluciones innovadoras"
    ],
    limitaciones: [
      "Requiere gran cantidad de interacciones",
      "Dificultad en diseñar funciones de recompensa",
      "Altos requerimientos computacionales",
      "Complejidad para depurar y evaluar"
    ],
    aplicaciones: [
      "Control de robots y vehículos autónomos",
      "Optimización de estrategias en juegos",
      "Gestión de recursos en tiempo real",
      "Personalización de recomendaciones"
    ],
    recomendacion: "Perfecto para enseñar toma de decisiones secuenciales, exploración vs explotación, y cuando el aprendizaje por prueba y error es viable."
  }
];

const ComparisonPage: React.FC = () => {
  const [tecnicaSeleccionada, setTecnicaSeleccionada] = useState(comparaciones[0].tecnica);
  const [modoComparacion, setModoComparacion] = useState(false);
  const [mostrarRecomendaciones, setMostrarRecomendaciones] = useState(false);

  const comparacionActual = comparaciones.find(c => c.tecnica === tecnicaSeleccionada)!;

  return (
    <div className="min-h-screen bg-[#151C29] text-white px-4 py-8 md:px-8 md:py-12 flex flex-col items-center max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-300 to-blue-400 text-transparent bg-clip-text">
        Conclusiones y Comparativa
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-2xl">
        Explora las características, usos y recomendaciones didácticas de cada técnica
      </p>

      {/* Selector y controles */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-4xl justify-between items-center">
        <div className="flex gap-2 flex-wrap justify-center">
          {comparaciones.map(c => (
            <button
              key={c.tecnica}
              onClick={() => {
                setTecnicaSeleccionada(c.tecnica);
                setModoComparacion(false);
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all flex items-center gap-2
                ${tecnicaSeleccionada === c.tecnica && !modoComparacion
                  ? "bg-[#65DCB8] text-[#1d0735] shadow-lg"
                  : "bg-[#334155] hover:bg-[#3B82F6] text-gray-300 hover:text-white"}`}
            >
              {c.icon} {c.tecnica}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setModoComparacion(!modoComparacion)}
            className={`px-4 py-2 rounded-md font-medium transition-colors
              ${modoComparacion 
                ? "bg-purple-600 hover:bg-purple-700" 
                : "bg-[#334155] hover:bg-[#3B82F6]"}`}
          >
            {modoComparacion ? "Ver individual" : "Comparar"}
          </button>
          
          <button
            onClick={() => setMostrarRecomendaciones(!mostrarRecomendaciones)}
            className="px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 font-medium"
          >
            {mostrarRecomendaciones ? "Ocultar consejos" : "Ver consejos didácticos"}
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      {modoComparacion ? (
        <div className="w-full">
          {/* Tabla comparativa */}
          <div className="bg-[#1e293b] rounded-lg shadow-xl overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left"></th>
                  {comparaciones.map(c => (
                    <th key={c.tecnica} className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.icon}</span>
                        <span>{c.tecnica}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-semibold text-gray-200">Ventajas</td>
                  {comparaciones.map(c => (
                    <td key={`ventajas-${c.tecnica}`} className="px-6 py-4">
                      <ul className="space-y-2">
                        {c.ventajas.map((v, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            {v}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-semibold text-gray-200">Limitaciones</td>
                  {comparaciones.map(c => (
                    <td key={`limitaciones-${c.tecnica}`} className="px-6 py-4">
                      <ul className="space-y-2">
                        {c.limitaciones.map((l, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-400 mr-2">✗</span>
                            {l}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-200">Aplicaciones</td>
                  {comparaciones.map(c => (
                    <td key={`aplicaciones-${c.tecnica}`} className="px-6 py-4">
                      <ul className="space-y-2">
                        {c.aplicaciones.map((a, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recomendaciones comparativas */}
          {mostrarRecomendaciones && (
            <div className="bg-gradient-to-r from-[#1e293b] to-[#1e3a8a] p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-400">📚</span> Recomendaciones Didácticas Comparativas
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {comparaciones.map(c => (
                  <div key={`recomendacion-${c.tecnica}`} className="bg-[#1e293b]/80 p-4 rounded-lg border-l-4 border-amber-500">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      {c.icon} {c.tecnica}
                    </h4>
                    <p className="text-gray-200">{c.recomendacion}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#1e293b] p-4 rounded-lg border-t-4 border-green-500">
                <h4 className="font-bold text-lg mb-2">💡 Conclusión general</h4>
                <p className="text-gray-200">
                  Ambas técnicas son complementarias en la enseñanza de IA. Los árboles de decisión son ideales para 
                  introducir conceptos básicos de aprendizaje supervisado, mientras que el aprendizaje por refuerzo 
                  es perfecto para enseñar toma de decisiones secuenciales y exploración de entornos complejos.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
          {/* Panel de información */}
          <div className="flex-1 bg-[#1e293b] p-6 rounded-lg shadow-lg border-l-4 border-[#65DCB8]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {comparacionActual.icon} {comparacionActual.tecnica}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-300">
                  <span>✅</span> Ventajas
                </h3>
                <ul className="space-y-2 pl-2">
                  {comparacionActual.ventajas.map((v, i) => (
                    <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-400 before:rounded-full">
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-red-300">
                  <span>⚠️</span> Limitaciones
                </h3>
                <ul className="space-y-2 pl-2">
                  {comparacionActual.limitaciones.map((l, i) => (
                    <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-red-400 before:rounded-full">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-300">
                  <span>🌍</span> Ámbitos de aplicación
                </h3>
                <ul className="space-y-2 pl-2">
                  {comparacionActual.aplicaciones.map((a, i) => (
                    <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-400 before:rounded-full">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {mostrarRecomendaciones && (
              <div className="mt-8 bg-[#1e293b] p-4 rounded-lg border-t-4 border-amber-500">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-amber-300">
                  <span>📝</span> Recomendación Didáctica
                </h3>
                <p className="text-gray-200">{comparacionActual.recomendacion}</p>
              </div>
            )}
          </div>

          {/* Panel de visualización */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="w-full max-w-xs bg-[#1e293b] p-6 rounded-lg shadow-lg border border-gray-700">
              {tecnicaSeleccionada === "Árboles de Decisión" ? (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                    <span>🌲</span> Visualización de Árbol
                  </h3>
                  <DecisionTreeSimpleAnimation />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                    <span>🧠</span> Agente de Aprendizaje
                  </h3>
                  <MiniMazeAnimation />
                </>
              )}
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg w-full">
              <h3 className="text-lg font-semibold mb-2 text-center">
                {tecnicaSeleccionada === "Árboles de Decisión" 
                  ? "Flujo de decisión en un árbol" 
                  : "Trayectoria de un agente"}
              </h3>
              <p className="text-gray-300 text-sm text-center">
                {tecnicaSeleccionada === "Árboles de Decisión"
                  ? "Cada nodo representa una condición que divide los datos"
                  : "El agente explora el entorno buscando maximizar recompensas"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;