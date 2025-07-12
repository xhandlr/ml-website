import React from "react";
import { Button, Slider } from "antd";

const CustomSlider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  label?: string;
}> = ({ value, onChange, label }) => (
  <div className="mb-4">
    {label && <label className="block mb-2">{label}</label>}
    <Slider
      min={1.0}
      max={7.0}
      step={0.1}
      value={value}
      onChange={onChange}
      trackStyle={{ backgroundColor: "#059669" }}
      handleStyle={{ borderColor: "#6CDFBC" }}
      railStyle={{ backgroundColor: "#4b5563" }}
    />
    <div className="text-center mt-2">{value.toFixed(2)}</div>
  </div>
);

interface GradeInputsProps {
  grades: number[];
  examGrade: number;
  onGradeChange: (index: number, value: number) => void;
  onExamChange: (value: number) => void;
  onEvaluate: () => void;
  disabled: boolean;
  average: number;
}

const GradeInputs: React.FC<GradeInputsProps> = ({
  grades,
  examGrade,
  onGradeChange,
  onExamChange,
  onEvaluate,
  disabled,
  average,
}) => (
  <div className="w-full lg:w-1/3 bg-[#1e293b] p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">Ingreso de Notas</h2>
    <div className="space-y-6">
      <div>
        {grades.map((grade, index) => (
          <CustomSlider
            key={index}
            value={grade}
            onChange={(value) => onGradeChange(index, value)}
            label={`Prueba ${index + 1}`}
          />
        ))}
        <div className="mt-4 p-3 bg-[#0f172a] rounded-lg">
          <p>
            Promedio: <span className="font-bold">{average.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <CustomSlider value={examGrade} onChange={onExamChange} label="Nota de Examen:" />
      <Button
        type="primary"
        onClick={onEvaluate}
        className="bg-[#8b5cf6] hover:bg-[#7c3aed] w-full"
        size="large"
        disabled={disabled}
      >
        Evaluar
      </Button>
    </div>
  </div>
);

export default GradeInputs;
