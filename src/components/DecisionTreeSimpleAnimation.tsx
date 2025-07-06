import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const positions = {
  root: { x: 120, y: 20 },  
  left: { x: 60, y: 120 },
  right: { x: 180, y: 120 },
};

const nodeStyle = "absolute rounded-full bg-[#65DCB8] w-6 h-6";

const DecisionTreeSimpleAnimation = () => {
  const [visibleNodes, setVisibleNodes] = useState(0);

  const restartAnimation = () => {
    setVisibleNodes(0);
    const delays = [200, 600, 1000];
    delays.forEach((delay, i) => {
      setTimeout(() => setVisibleNodes(i + 1), delay);
    });
  };

  useEffect(() => {
    setVisibleNodes(3);
  }, []);

  const lineAnimation: Variants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div
      className="relative w-[260px] h-[180px] bg-[#0f172a] rounded-md"
      onMouseEnter={restartAnimation}
    >
      {visibleNodes >= 2 && (
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 260 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#65DCB8" />
            </marker>
          </defs>

          {/* Línea del nodo raíz al nodo izquierdo */}
          <motion.line
            x1={positions.root.x + 12}  // Centro del nodo raíz: 118 + 12 = 130
            y1={positions.root.y + 12}  // 20 + 12 = 32
            x2={positions.left.x + 12}  // 60 + 12 = 72
            y2={positions.left.y + 12}  // 120 + 12 = 132
            stroke="#65DCB8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            variants={lineAnimation}
            initial="hidden"
            animate={visibleNodes >= 2 ? "visible" : "hidden"}
          />

          {/* Línea del nodo raíz al nodo derecho */}
          <motion.line
            x1={positions.root.x + 20}  // Igual que el izquierdo, para que salga del mismo centro
            y1={positions.root.y + 12}
            x2={positions.right.x + 12} // 180 + 12 = 192
            y2={positions.right.y + 12} // 120 + 12 = 132
            stroke="#65DCB8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            variants={lineAnimation}
            initial="hidden"
            animate={visibleNodes >= 3 ? "visible" : "hidden"}
          />
        </svg>
      )}

      {/* Nodo raíz */}
      {visibleNodes >= 1 && (
        <motion.div
          className={nodeStyle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          style={positions.root}
        />
      )}

      {/* Nodo izquierdo */}
      {visibleNodes >= 2 && (
        <motion.div
          className={nodeStyle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          style={positions.left}
        />
      )}

      {/* Nodo derecho */}
      {visibleNodes >= 3 && (
        <motion.div
          className={nodeStyle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          style={positions.right}
        />
      )}
    </div>
  );
};

export default DecisionTreeSimpleAnimation;
