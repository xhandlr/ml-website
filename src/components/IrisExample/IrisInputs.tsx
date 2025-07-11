import React from "react";
import { Slider, Button } from "antd";

type Props = {
  features: number[];
  onChange: (index: number, value: number) => void;
  onClassify: () => void;
  disabled: boolean;
};

const labels = [
  "Largo del sépalo (cm)",
  "Ancho del sépalo (cm)",
  "Largo del pétalo (cm)",
  "Ancho del pétalo (cm)",
];

const IrisInputs: React.FC<Props> = ({ features, onChange, onClassify, disabled }) => {
  return (
    <div className="w-full lg:w-1/3 bg-[#1e293b] p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-[#6CDFBC]">Características de la Flor</h2>
      <div className="space-y-6">
        {features.map((value, i) => (
          <div key={i}>
            <label className="block mb-2">{labels[i]}</label>
            <Slider
              min={i < 2 ? 4 : 1}
              max={i < 2 ? 8 : 7}
              step={0.1}
              value={value}
              onChange={(val) => onChange(i, val)}
              trackStyle={{ backgroundColor: "#059669" }}
              handleStyle={{ borderColor: "#6CDFBC" }}
              railStyle={{ backgroundColor: "#4b5563" }}
            />
            <div className="text-center mt-2">{value.toFixed(1)} cm</div>
          </div>
        ))}

        <Button
          type="primary"
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] w-full"
          onClick={onClassify}
          size="large"
          disabled={disabled}
        >
          Clasificar
        </Button>
      </div>
    </div>
  );
};

export default IrisInputs;
