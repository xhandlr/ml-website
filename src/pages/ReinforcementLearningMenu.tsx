import React from 'react';
import QLearningSimulator from '../components/q-learning/QLearningSimulator';
import ReinforcementExplanation from '../components/q-learning/ReinforcementExplanation';

const ReinforcementLearningMenu: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6CDFBC]">Laboratorio de Q-Learning</h1>
        <p className="text-lg text-gray-300 mt-2">Experimenta con un agente de IA y descubre cómo aprende a través de la prueba y el error.</p>
      </header>
      
      <main className="flex flex-col items-center gap-8">
        <QLearningSimulator />
        <ReinforcementExplanation />
      </main>
    </div>
  );
};

export default ReinforcementLearningMenu;
