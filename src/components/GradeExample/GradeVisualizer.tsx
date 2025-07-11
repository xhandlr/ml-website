import React from "react";
import { motion } from "framer-motion";
import GradeDecisionTreeDiagram from "./GradeDecisionTreeDiagram";

interface TreeVisualizerProps {
  activePath: string[];
  currentStep: number;
  averageGrade: number;
  examGrade: number;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  activePath,
  currentStep,
  averageGrade,
  examGrade,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full lg:w-2/3"
  >
    <GradeDecisionTreeDiagram
      activePath={activePath}
      currentStep={currentStep}
      averageGrade={averageGrade}
      examGrade={examGrade}
    />
  </motion.div>
);

export default TreeVisualizer;
