import React from 'react';
import QLearningGrid from './QLearningGrid';
import QLearningControls from './QLearningControls';
import useQLearning from '../../hooks/useQLearning';

const QLearningSimulator: React.FC = () => {
  const {
    grid,
    agentPosition,
    qTable,
    isRunning,
    episode,
    steps,
    learningRate,
    discountFactor,
    explorationRate,
    handleStart,
    handlePause,
    handleReset,
    setLearningRate,
    setDiscountFactor,
    applyPreset,
    lastActionInfo,
  } = useQLearning();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <QLearningGrid grid={grid} agentPosition={agentPosition} qTable={qTable} lastActionInfo={lastActionInfo} />
      </div>
      <div className="lg:w-1/3">
        <QLearningControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onLearningRateChange={setLearningRate}
          onDiscountFactorChange={setDiscountFactor}
          onPresetChange={applyPreset}
          episode={episode}
          steps={steps}
          learningRate={learningRate}
          discountFactor={discountFactor}
          explorationRate={explorationRate}
        />
      </div>
    </div>
  );
};

export default QLearningSimulator;
