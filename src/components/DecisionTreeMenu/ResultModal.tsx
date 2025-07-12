import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "antd";

import aprobarImg from "../../assets/aprobar.png";
import reprobarImg from "../../assets/reprobar.png";
import setosaImg from "../../assets/iris-setosa.jpg";
import versicolorImg from "../../assets/iris-versicolor.jpg";
import virginicaImg from "../../assets/iris-virginica.jpg";

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

interface Props {
  show: boolean;
  message: string | null;
  onClose: () => void;
}

const ResultModal: React.FC<Props> = ({ show, message = null, onClose }) => {
  const getImage = () => {
    if (!message) return null;
    const lower = message.toLowerCase();

    if (lower.includes("aprobado")) return aprobarImg;
    if (lower.includes("reprobado")) return reprobarImg;
    if (lower.includes("setosa")) return setosaImg;
    if (lower.includes("versicolor")) return versicolorImg;
    if (lower.includes("virginica")) return virginicaImg;

    return null;
  };

  const image = getImage();

  return (
    <AnimatePresence>
      {show && message && (
        <>
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
              <p className="text-4xl mb-6">{message}</p>

              {image && (
                <img
                  src={image}
                  alt="Resultado"
                  className="mx-auto mb-6 max-h-48 rounded-md object-contain"
                />
              )}

              <Button
                type="primary"
                onClick={onClose}
                size="large"
                className="bg-[#8b5cf6] hover:bg-[#7c3aed]"
              >
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
