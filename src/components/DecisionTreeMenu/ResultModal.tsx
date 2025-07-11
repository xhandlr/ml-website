import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import { Button } from "antd";

interface ResultModalProps {
  show: boolean;
  message: string | null;
  showConfetti: boolean;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ show, message, showConfetti, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {show && message && (
        <>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
              style={{ position: "fixed", zIndex: 45 }}
            />
          )}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-[#1e293b] rounded-xl p-8 max-w-md w-full text-center shadow-lg relative">
              <p className="text-2xl font-bold mb-6">{message}</p>
              <Button type="primary" onClick={onClose} size="large" className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
                Seguir probando
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
