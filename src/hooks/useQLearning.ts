import { useState, useEffect, useCallback, useRef } from 'react';

// --- Constants ---
const GRID_SIZE = 8;
const ACTIONS = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3 };
const ACTION_VECTORS = {
  [ACTIONS.UP]: { x: 0, y: -1 },
  [ACTIONS.DOWN]: { x: 0, y: 1 },
  [ACTIONS.LEFT]: { x: -1, y: 0 },
  [ACTIONS.RIGHT]: { x: 1, y: 0 },
};
const CELL_TYPES = { EMPTY: 0, WALL: 1, REWARD: 2, DANGER: 3, START: 4 };
const REWARDS = {
  [CELL_TYPES.REWARD]: 100,
  [CELL_TYPES.DANGER]: -100,
  [CELL_TYPES.WALL]: -10, // Should not happen, but good to have
  [CELL_TYPES.EMPTY]: -0.1, // Small negative reward to encourage shorter paths
};

// --- Grid Layout ---
const initialGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(CELL_TYPES.EMPTY));
initialGrid[0][0] = CELL_TYPES.START;
initialGrid[7][7] = CELL_TYPES.REWARD;
initialGrid[5][5] = CELL_TYPES.DANGER;
initialGrid[3][4] = CELL_TYPES.DANGER;
// Walls
initialGrid[1][1] = CELL_TYPES.WALL;
initialGrid[1][2] = CELL_TYPES.WALL;
initialGrid[1][3] = CELL_TYPES.WALL;
initialGrid[2][3] = CELL_TYPES.WALL;
initialGrid[3][3] = CELL_TYPES.WALL;
initialGrid[4][1] = CELL_TYPES.WALL;
initialGrid[5][1] = CELL_TYPES.WALL;
initialGrid[6][1] = CELL_TYPES.WALL;
initialGrid[6][2] = CELL_TYPES.WALL;
initialGrid[6][3] = CELL_TYPES.WALL;

const START_POS = { x: 0, y: 0 };
const REWARD_POS = { x: 7, y: 7 };

// --- Helper Functions ---
const posToState = (pos: { x: number; y: number }) => `${pos.y},${pos.x}`;
const manhattanDistance = (a: {x: number, y: number}, b: {x: number, y: number}) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const useQLearning = () => {
  const [grid] = useState(initialGrid);
  const [qTable, setQTable] = useState<{ [state: string]: number[] }>({});
  const [agentPosition, setAgentPosition] = useState(START_POS);
  const [isRunning, setIsRunning] = useState(false);
  const [episode, setEpisode] = useState(0);
  const [steps, setSteps] = useState(0);
  const [pathHistory, setPathHistory] = useState<{x: number, y: number}[]>([]);

  // Hyperparameters
  const [learningRate, setLearningRate] = useState(0.8); // Start with a high learning rate
  const [discountFactor, setDiscountFactor] = useState(0.9);
  const explorationRate = useRef(1.0);
  const maxExplorationRate = 1.0;
  const minExplorationRate = 0.01;
  const explorationDecayRate = 0.01; // More aggressive decay
  const minLearningRate = 0.1;
  const learningRateDecay = 0.001;

  const simulationInterval = useRef<number | null>(null);

  // --- Q-Learning Core Logic ---

  const getQ = useCallback((state: string) => {
    return qTable[state] || [0, 0, 0, 0];
  }, [qTable]);

  const chooseAction = useCallback((state: string) => {
    if (Math.random() < explorationRate.current) {
      return Math.floor(Math.random() * 4); // Explore: random action
    } else {
      const qValues = getQ(state);
      return qValues.indexOf(Math.max(...qValues)); // Exploit: best known action
    }
  }, [getQ]);

  const takeAction = useCallback((action: number) => {
    const vector = ACTION_VECTORS[action];
    const nextPos = { x: agentPosition.x + vector.x, y: agentPosition.y + vector.y };

    // Check boundaries
    if (nextPos.x < 0 || nextPos.x >= GRID_SIZE || nextPos.y < 0 || nextPos.y >= GRID_SIZE) {
      return { nextPos: agentPosition, reward: REWARDS[CELL_TYPES.WALL] };
    }
    // Check walls
    const cellType = grid[nextPos.y][nextPos.x];
    if (cellType === CELL_TYPES.WALL) {
      return { nextPos: agentPosition, reward: REWARDS[CELL_TYPES.WALL] };
    }

    // Reward Shaping
    const currentDist = manhattanDistance(agentPosition, REWARD_POS);
    const nextDist = manhattanDistance(nextPos, REWARD_POS);
    
    let shapedReward = REWARDS[cellType];
    if (nextDist < currentDist) {
      shapedReward += 0.5; // Small reward for getting closer
    } else if (nextDist > currentDist) {
      shapedReward -= 0.2; // Small penalty for moving away
    }

    return { nextPos, reward: shapedReward };
  }, [agentPosition, grid]);

  const updateQValue = useCallback((state: string, action: number, reward: number, nextState: string) => {
    const oldQ = getQ(state)[action];
    const nextMaxQ = Math.max(...getQ(nextState));
    const newQ = oldQ + learningRate * (reward + discountFactor * nextMaxQ - oldQ);

    setQTable(prev => ({
      ...prev,
      [state]: Object.assign([...(prev[state] || [0,0,0,0])], { [action]: newQ }),
    }));
  }, [getQ, learningRate, discountFactor]);

  const [lastActionInfo, setLastActionInfo] = useState<{ state: string, action: number, optimal: boolean } | null>(null);

  const runOneStep = useCallback(() => {
    const currentState = posToState(agentPosition);
    const action = chooseAction(currentState);
    const { nextPos, reward } = takeAction(action);
    const nextState = posToState(nextPos);

    // Determine if the chosen action was optimal
    const qValuesForCurrentState = getQ(currentState);
    const optimalAction = qValuesForCurrentState.indexOf(Math.max(...qValuesForCurrentState));
    const isOptimal = action === optimalAction;

    updateQValue(currentState, action, reward, nextState);
    setAgentPosition(nextPos);
    setSteps(prev => prev + 1);
    setPathHistory(prev => [...prev, nextPos]);

    setLastActionInfo({ state: currentState, action, optimal: isOptimal });

    const nextCellType = grid[nextPos.y][nextPos.x];
    if (nextCellType === CELL_TYPES.REWARD || nextCellType === CELL_TYPES.DANGER) {
      // End of episode
      setAgentPosition(START_POS);
      const newEpisode = episode + 1;
      setEpisode(newEpisode);
      setSteps(0);
      setPathHistory([]);

      // Decay exploration rate
      explorationRate.current = minExplorationRate + 
        (maxExplorationRate - minExplorationRate) * Math.exp(-explorationDecayRate * newEpisode);
      
      // Decay learning rate
      const newLearningRate = Math.max(minLearningRate, learningRate * (1 - learningRateDecay));
      setLearningRate(newLearningRate);

      setLastActionInfo(null); // Clear last action info at episode end
    }
  }, [agentPosition, chooseAction, grid, getQ, episode, takeAction, updateQValue, learningRate]);

  // --- Simulation Control ---

  useEffect(() => {
    if (isRunning) {
      simulationInterval.current = window.setInterval(runOneStep, 50);
    } else {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    }
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, [isRunning, runOneStep]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setEpisode(0);
    setSteps(0);
    setAgentPosition(START_POS);
    setQTable({});
    setPathHistory([]);
    explorationRate.current = maxExplorationRate;
  }, []);

  const applyPreset: (preset: 'slow' | 'fast' | 'explorer' | 'exploiter' | 'balanced' | 'optimal') => void = useCallback((preset) => {
    handleReset();
    switch (preset) {
      case 'slow':
        setLearningRate(0.1);
        setDiscountFactor(0.9);
        explorationRate.current = 0.7;
        break;
      case 'fast':
        setLearningRate(0.8);
        setDiscountFactor(0.5);
        explorationRate.current = 1.0;
        break;
      case 'explorer':
        setLearningRate(0.3);
        setDiscountFactor(0.7);
        explorationRate.current = 0.9;
        break;
      case 'exploiter':
        setLearningRate(0.2);
        setDiscountFactor(0.95);
        explorationRate.current = 0.1;
        break;
      case 'balanced':
        setLearningRate(0.5);
        setDiscountFactor(0.8);
        explorationRate.current = 0.5;
        break;
      case 'optimal':
        setLearningRate(0.8);
        setDiscountFactor(0.95);
        explorationRate.current = 1.0;
        break;
    }
  }, [handleReset]);

  return {
    grid,
    agentPosition,
    qTable,
    isRunning,
    episode,
    steps,
    learningRate,
    discountFactor,
    explorationRate: explorationRate.current,
    handleStart,
    handlePause,
    handleReset,
    setLearningRate,
    setDiscountFactor,
    applyPreset,
    lastActionInfo,
    pathHistory,
  };
};

export default useQLearning;