import React from 'react';

const ConceptCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#293548] p-4 rounded-lg">
    <h4 className="text-lg font-bold text-[#6CDFBC] mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{children}</p>
  </div>
);

const ReinforcementExplanation: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-8 rounded-2xl shadow-2xl mt-8 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Una Mirada Profunda al Aprendizaje por Refuerzo</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          El Aprendizaje por Refuerzo (RL) es enseñar a un agente a pensar por sí mismo. En lugar de darle instrucciones explícitas, le damos un objetivo y lo dejamos interactuar con un entorno. El agente es recompensado por acciones que lo acercan a su meta y penalizado por las que lo alejan. Con el tiempo, a través de la prueba y el error, el agente construye una "intuición" —una estrategia o política— sobre cómo actuar para maximizar sus recompensas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard title="Agente 🤖">
          El aprendiz o tomador de decisiones. Su único objetivo es maximizar la recompensa total. En este caso, es el robot que se mueve por el laberinto.
        </ConceptCard>
        <ConceptCard title="Entorno 🌐">
          El mundo con el que interactúa el agente. Define las reglas y lo que sucede después de cada acción. Es el laberinto con sus muros, trampas y tesoros.
        </ConceptCard>
        <ConceptCard title="Estado (State)">
          Una instantánea de la situación actual del agente. En nuestro caso, el estado es simplemente la coordenada (fila, columna) donde se encuentra el robot.
        </ConceptCard>
        <ConceptCard title="Acción (Action)">
          Un movimiento que el agente puede realizar. Aquí, las acciones posibles son moverse arriba, abajo, izquierda o derecha.
        </ConceptCard>
        <ConceptCard title="Recompensa (Reward) 🏆/🔥">
          El feedback que el entorno le da al agente. Es una señal numérica que le dice si una acción fue buena o mala desde su estado actual.
        </ConceptCard>
        <ConceptCard title="Política (Policy) 🗺️">
          La estrategia o "cerebro" que el agente desarrolla. Es una guía que le dice cuál es la mejor acción a tomar en cada estado para obtener la máxima recompensa a largo plazo.
        </ConceptCard>
      </div>
    </div>
  );
};

export default ReinforcementExplanation;