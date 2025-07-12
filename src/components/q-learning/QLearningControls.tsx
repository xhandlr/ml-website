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
  onPresetChange: (preset: 'slow' | 'fast') => void;
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
  explorationRate
}) => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl h-full flex flex-col text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Controles</h2>

      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div>
          <p className="text-gray-400 text-sm font-medium">Episodio</p>
          <p className="text-3xl font-mono text-[#6CDFBC]">{episode}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium">Pasos</p>
          <p className="text-3xl font-mono text-[#6CDFBC]">{steps}</p>
        </div>
      </div>
      
      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Selección Rápida</h3>
        <Space className="w-full" size="middle">
          <Tooltip title="Usa baja exploración y aprendizaje lento. Es metódico pero puede tardar más en encontrar la ruta óptima.">
            <Button block onClick={() => onPresetChange('slow')}>Lento y Seguro</Button>
          </Tooltip>
          <Tooltip title="Usa alta exploración y aprendizaje rápido. Encuentra soluciones rápido pero pueden no ser las óptimas.">
            <Button block type="primary" danger onClick={() => onPresetChange('fast')}>Rápido y Arriesgado</Button>
          </Tooltip>
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
          disabled
        />
      </div>

      <div className="flex-grow flex flex-col justify-end mt-2">
        <Space direction="vertical" className="w-full">
          <Button
            type="primary"
            icon={isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
            size="large"
            block
            onClick={isRunning ? onPause : onStart}
            style={{ background: isRunning ? '#facc15' : '#22c55e', borderColor: isRunning ? '#facc15' : '#22c55e' }}
          >
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button icon={<RedoOutlined />} size="large" block onClick={onReset}>
            Reiniciar
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default QLearningControls;
