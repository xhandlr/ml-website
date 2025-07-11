import React from "react";
import { motion } from "framer-motion";
import IrisDecisionTreeDiagram from "../IrisExample/IrisDecisionTreeDiagram";

interface Props {
  activePath: string[];
  petalLength: number;
  petalWidth: number;
}

const IrisVisualizer: React.FC<Props> = ({
  activePath,
  petalLength,
  petalWidth,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full lg:w-2/3"
  >
    <IrisDecisionTreeDiagram
      activePath={activePath}
      petalLength={petalLength}
      petalWidth={petalWidth}
    />
  </motion.div>
);

export default IrisVisualizer;
