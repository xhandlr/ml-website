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
for (let i = 0; i < 5; i++) initialGrid[2][i] = CELL_TYPES.WALL;
for (let i = 4; i < 8; i++) initialGrid[5][i] = CELL_TYPES.WALL;
initialGrid[5][5] = CELL_TYPES.DANGER; // Overwrite wall with danger
initialGrid[3][3] = CELL_TYPES.WALL;
initialGrid[4][3] = CELL_TYPES.WALL;
initialGrid[5][3] = CELL_TYPES.WALL;

const START_POS = { x: 0, y: 0 };

// --- Helper Functions ---
const posToState = (pos: { x: number; y: number }) => `${pos.y},${pos.x}`;

const useQLearning = () => {
  const [grid] = useState(initialGrid);
  const [qTable, setQTable] = useState<{ [state: string]: number[] }>({});
  const [agentPosition, setAgentPosition] = useState(START_POS);
  const [isRunning, setIsRunning] = useState(false);
  const [episode, setEpisode] = useState(0);
  const [steps, setSteps] = useState(0);

  // Hyperparameters
  const learningRate = useRef(0.1);
  const discountFactor = useRef(0.9);
  const explorationRate = useRef(1.0);
  const maxExplorationRate = 1.0;
  const minExplorationRate = 0.01;
  const explorationDecayRate = 0.001;

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

  const takeAction = (action: number) => {
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

    return { nextPos, reward: REWARDS[cellType] };
  };

  const updateQValue = (state: string, action: number, reward: number, nextState: string) => {
    const oldQ = getQ(state)[action];
    const nextMaxQ = Math.max(...getQ(nextState));
    const newQ = oldQ + learningRate.current * (reward + discountFactor.current * nextMaxQ - oldQ);

    setQTable(prev => ({
      ...prev,
      [state]: Object.assign([...(prev[state] || [0,0,0,0])], { [action]: newQ }),
    }));
  };

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

    setLastActionInfo({ state: currentState, action, optimal: isOptimal });

    const nextCellType = grid[nextPos.y][nextPos.x];
    if (nextCellType === CELL_TYPES.REWARD || nextCellType === CELL_TYPES.DANGER) {
      // End of episode
      setAgentPosition(START_POS);
      setEpisode(prev => prev + 1);
      setSteps(0);
      // Decay exploration rate
      explorationRate.current = minExplorationRate + 
        (maxExplorationRate - minExplorationRate) * Math.exp(-explorationDecayRate * (episode + 1));
      setLastActionInfo(null); // Clear last action info at episode end
    }
  }, [agentPosition, chooseAction, grid, getQ, episode]);

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
    explorationRate.current = maxExplorationRate;
  }, []);

  const applyPreset = useCallback((preset: 'slow' | 'fast') => {
    handleReset();
    if (preset === 'slow') {
      learningRate.current = 0.1;
      discountFactor.current = 0.9;
      explorationRate.current = 0.7;
    } else { // fast
      learningRate.current = 0.8;
      discountFactor.current = 0.5;
      explorationRate.current = 1.0;
    }
  }, [handleReset]);

  return {
    grid,
    agentPosition,
    qTable,
    isRunning,
    episode,
    steps,
    learningRate: learningRate.current,
    discountFactor: discountFactor.current,
    explorationRate: explorationRate.current,
    handleStart,
    handlePause,
    handleReset,
    setLearningRate: (rate: number) => { learningRate.current = rate; },
    setDiscountFactor: (factor: number) => { discountFactor.current = factor; },
    applyPreset,
    lastActionInfo,
  };
};

export default useQLearning;