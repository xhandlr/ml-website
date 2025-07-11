import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveNodeProps {
  title: string;
  description?: string;
  descriptionPoints?: string[]; 
  clickText?: string;
  titleColor?: string;       // Fondo del círculo
  titleTextColor?: string;   // Color del texto dentro del botón
  nodeSize?: number;         // Tamaño (width y height) del botón circular en px
  children?: ReactNode;
}

const InteractiveNode = ({
  title,
  description,
  descriptionPoints,
  clickText = "Haz clic en el círculo",
  titleColor = "#65DCB8",
  titleTextColor = "#FFFFFF",
  nodeSize = 80,
  children,
}: InteractiveNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const duration = 700;
      const startScroll = window.pageYOffset;
      const endScroll =
        containerRef.current.getBoundingClientRect().top + window.pageYOffset - 100;

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOutQuad =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        const scrollPos = startScroll + (endScroll - startScroll) * easeInOutQuad;
        window.scrollTo(0, scrollPos);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isOpen]);

  return (
    <div
      className="flex flex-col items-center w-full max-w-4xl min-h-[500px] mb-12"
      ref={containerRef}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-md cursor-pointer
                   flex items-center justify-center font-semibold text-center relative"
        style={{
          backgroundColor: titleColor,
          color: titleTextColor,
          width: nodeSize,
          height: nodeSize,
          fontSize: nodeSize / 3, // tamaño relativo para texto
          lineHeight: 1,
          userSelect: "none",
        }}
        whileHover={{ scale: 1.1 }}
        animate={{
          boxShadow: isOpen
            ? `0 0 20px 6px ${titleColor}99`
            : `0 0 10px 3px ${titleColor}66`,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        }}
        aria-expanded={isOpen}
        aria-controls="node-description"
      >
        {title || " "}
      </motion.button>

      <p className="mt-3 text-white text-center max-w-xs select-none">{clickText}</p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="desc"
            id="node-description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 flex flex-col items-center space-y-8"
            style={{ overflow: "hidden" }}
            ref={contentRef}
          >
            {descriptionPoints ? (
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-6 bg-[#1e293b] rounded-lg shadow-lg max-w-md text-white list-disc list-inside"
                style={{ listStyleType: "none" }}
              >
                {descriptionPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2 mb-2">
                    <span className="text-[#65DCB8] font-bold select-none">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </motion.ul>
            ) : description ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-6 bg-[#1e293b] rounded-lg shadow-lg max-w-md text-white text-center"
              >
                <p>{description}</p>
              </motion.div>
            ) : null}

            {children && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-row gap-8 justify-center flex-wrap"
                >
                  {children}
                </motion.div>
              </>
            )}

            <div style={{ height: 50 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveNode;
