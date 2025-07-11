import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; 

const ScrollDownButton = () => {
  const scrollToSection = () => {
    const section = document.getElementById('inicio-aprendizaje');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToSection}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-[#65DCB8] bg-transparent border-none"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      aria-label="Desplazar hacia abajo"
    >
      <ChevronDown size={32} />
    </motion.button>
  );
};

export default ScrollDownButton;
