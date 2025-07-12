import React from 'react';
import { Tooltip, Slider, Button, Space } from 'antd';
import { CaretRightOutlined, PauseOutlined, RedoOutlined } from '@ant-design/icons';

interface QLearningControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLearningRateChange: (value: number) => void;
  onDiscountFactorChange: (value: number) => void;
  onPresetChange: (preset: 'slow' | 'fast' | 'explorer' | 'exploiter' | 'balanced' | 'optimal') => void;
  episode: number;
  steps: number;
  learningRate: number;
  discountFactor: number;
  explorationRate: number;
}

const ParameterSlider: React.FC<{
  label: string;
  tooltip: string;
  value: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}> = ({ label, tooltip, value, onChange, min, max, step, disabled }) => (
  <div className="mb-2">
    <label className="flex items-center gap-2 text-gray-300 text-sm mb-1">
      {label}
      <Tooltip title={tooltip}>
        <span className="cursor-help text-gray-500 hover:text-white transition-colors">(?)</span>
      </Tooltip>
    </label>
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      disabled={disabled}
      styles={{ track: { background: '#6CDFBC' }, handle: { background: '#6CDFBC', borderColor: '#6CDFBC' } }}
    />
  </div>
);

const QLearningControls: React.FC<QLearningControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onLearningRateChange,
  onDiscountFactorChange,
  onPresetChange,
  episode,
  steps,
  learningRate,
  discountFactor,
  explorationRate,
}) => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl h-full flex flex-col text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Controles</h2>

      <div className="grid grid-cols-2 gap-4 mb-6 text-center bg-[#1a2436] p-4 rounded-lg shadow-inner">
        <div>
          <p className="text-gray-300 text-base font-semibold flex items-center justify-center gap-2">
            Episodio
            <Tooltip title="Número de ciclos completos de entrenamiento que el agente ha realizado para aprender el entorno.">
              <span className="cursor-help text-gray-500 hover:text-white transition-colors">(?)</span>
            </Tooltip>
          </p>
          <p className="text-4xl font-mono text-[#6CDFBC] mt-1">{episode}</p>
        </div>
        <div>
          <p className="text-gray-300 text-base font-semibold flex items-center justify-center gap-2">
            Pasos
            <Tooltip title="Número total de acciones que el agente ha tomado en el entorno a lo largo de todos los episodios.">
              <span className="cursor-help text-gray-500 hover:text-white transition-colors">(?)</span>
            </Tooltip>
          </p>
          <p className="text-4xl font-mono text-[#6CDFBC] mt-1">{steps}</p>
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-[#1a2436] rounded-lg shadow-inner">
        <h3 className="text-xl font-bold mb-4 text-gray-200 flex items-center gap-2 justify-center">
          Selección Rápida
          <Tooltip title="Ajusta automáticamente los parámetros de Tasa de Aprendizaje y Factor de Descuento para diferentes estrategias de entrenamiento.">
            <span className="cursor-help text-gray-500 hover:text-white transition-colors">(?)</span>
          </Tooltip>
        </h3>
        <Space className="w-full grid grid-cols-2 gap-2" size={[8, 8]}>
          <Button
            block
            onClick={() => onPresetChange('slow')}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            style={{ height: 'auto' }}
          >
            Lento y Seguro
          </Button>
          <Button
            block
            onClick={() => onPresetChange('fast')}
            className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            style={{ height: 'auto' }}
          >
            Rápido y Arriesgado
          </Button>
          <Button
            block
            onClick={() => onPresetChange('explorer')}
            className="bg-purple-600 hover:bg-purple-700 border-purple-600 hover:border-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            style={{ height: 'auto' }}
          >
            Explorador
          </Button>
          <Button
            block
            onClick={() => onPresetChange('exploiter')}
            className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            style={{ height: 'auto' }}
          >
            Explotador
          </Button>
          <Button
            block
            onClick={() => onPresetChange('balanced')}
            className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            style={{ height: 'auto' }}
          >
            Equilibrado
          </Button>
          <Button
            block
            onClick={() => onPresetChange('optimal')}
            className="bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 col-span-2"
            style={{ height: 'auto' }}
          >
            Óptimo
          </Button>
        </Space>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Parámetros del Agente</h3>
        <ParameterSlider
          label="Tasa de Aprendizaje (α)"
          tooltip="Controla qué tan grande es el cambio en las estimaciones del agente. Valores altos hacen que aprenda más rápido, pero puede ser inestable."
          value={learningRate}
          onChange={onLearningRateChange}
          min={0.1} max={1} step={0.1}
        />
        <ParameterSlider
          label="Factor de Descuento (γ)"
          tooltip="Determina la importancia de las recompensas futuras. Un valor bajo hace al agente 'miope', mientras que un valor alto lo hace planificar a largo plazo."
          value={discountFactor}
          onChange={onDiscountFactorChange}
          min={0.1} max={0.99} step={0.01}
        />
        <ParameterSlider
          label="Tasa de Exploración (ε)"
          tooltip="Probabilidad de que el agente tome una acción al azar en lugar de la mejor que conoce. Esencial para descubrir nuevas rutas. Disminuye con el tiempo."
          value={explorationRate}
          min={0.01} max={1} step={0.01}
          disabled={true} // Exploration rate is always disabled for manual input
        />
      </div>

      <div className="flex-grow flex flex-col justify-end mt-4">
        <Space direction="vertical" className="w-full" size="large">
          <Button
            type="primary"
            icon={isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
            size="large"
            block
            onClick={isRunning ? onPause : onStart}
            className={`font-bold text-lg py-3 rounded-xl transition-all duration-300 
              ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600' : 'bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600'}
            `}
            style={{ height: 'auto' }}
          >
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button 
            icon={<RedoOutlined />} 
            size="large" 
            block 
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 border-gray-600 hover:border-gray-700 text-white font-bold text-lg py-3 rounded-xl transition-all duration-300"
            style={{ height: 'auto' }}
          >
            Reiniciar
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default QLearningControls;
