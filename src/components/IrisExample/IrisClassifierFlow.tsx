import React, { useState } from "react";
import IrisInputs from "./IrisInputs";
import ResultModal from "../DecisionTreeMenu/ResultModal"; 
import IrisVisualizer from "./IrisVisualizer";

const IrisClassifierFlow: React.FC = () => {
  const [features, setFeatures] = useState<number[]>([5.0, 3.5, 1.4, 0.2]);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const updateFeature = (index: number, value: number) => {
    const copy = [...features];
    copy[index] = value;
    setFeatures(copy);
  };

  const classify = () => {
    setActivePath([]);
    setModalMessage(null);
    const [, , petLen, petWid] = features;
    const path: string[] = [];

    setTimeout(() => {
      path.push("petalLength");
      setActivePath([...path]);

      if (petLen < 2.5) {
        setTimeout(() => {
          path.push("setosa");
          setActivePath([...path]);
          setModalMessage("🌸 Setosa");
        }, 800);
      } else {
        setTimeout(() => {
          path.push("petalWidth");
          setActivePath([...path]);

          if (petWid < 1.8) {
            setTimeout(() => {
              path.push("versicolor");
              setActivePath([...path]);
              setModalMessage("🌿 Versicolor");
            }, 800);
          } else {
            setTimeout(() => {
              path.push("virginica");
              setActivePath([...path]);
              setModalMessage("💐 Virginica");
            }, 800);
          }
        }, 800);
      }
    }, 500);
  };

  const resetEvaluation = () => {
    setActivePath([]);
    setModalMessage(null);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        <IrisInputs
          features={features}
          onChange={updateFeature}
          onClassify={classify}
          disabled={!!modalMessage}
        />
        <IrisVisualizer
          activePath={activePath}
          petalLength={features[2]}
          petalWidth={features[3]}
        />
      </div>

      <ResultModal
        show={!!modalMessage}
        message={modalMessage}
        onClose={resetEvaluation}
      />
    </>
  );
};

export default IrisClassifierFlow;
