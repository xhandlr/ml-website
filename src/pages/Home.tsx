import cerebroImg from '../../src/assets/sistema-nervioso-humano.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-[#151C29]">
      {/* Contenedor principal con márgenes */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-8 pt-0 pb-12 gap-8 md:gap-6 lg:gap-4">
        {/* Sección de texto */}
        <motion.div
          className="md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Aprende <span className="text-[#65DCB8]">Machine Learning</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-md">
            Domina los conceptos fundamentales de ML con nuestro curso interactivo diseñado para todos los niveles.
          </p>
          <Link
            to="/path"
            className="px-8 py-3 lg:px-10 lg:py-4 
                      bg-gradient-to-r from-[#1c5a83] via-[#2c786e] to-[#3aa58d] 
                      bg-[length:200%_100%] hover:bg-right 
                      text-white font-bold rounded-lg 
                      transition-all duration-500 ease-in-out 
                      text-lg w-fit shadow-lg text-center"
          >
            Empieza a aprender
          </Link>
        </motion.div>

        {/* Sección de imagen animada */}
        <motion.div
          className="md:w-[50%] flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.img
            src={cerebroImg}
            alt="Sistema nervioso humano representando Machine Learning"
            className="w-full max-w-xl lg:max-w-2xl object-contain animate-float"
            animate={{
              filter: [
                'saturate(0.8) brightness(0.95) drop-shadow(0 0 0px transparent) hue-rotate(0deg)',
                'saturate(1.3) brightness(1.05) drop-shadow(0 0 10px #f97316) hue-rotate(20deg)',
                'saturate(1.3) brightness(1.05) drop-shadow(0 0 10px #f97316) hue-rotate(20deg)',
                'saturate(0.8) brightness(0.95) drop-shadow(0 0 0px transparent) hue-rotate(0deg)'
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.7, 1],
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
