import cerebroImg from '../../src/assets/sistema-nervioso-humano.png';

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-[#151C29]">
      {/* Contenedor principal con márgenes */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-12">
        {/* Sección de texto - ahora con ancho más controlado */}
        <div className="md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Aprende <span className="text-yellow-400">Machine Learning</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-md">
            Domina los conceptos fundamentales de ML con nuestro curso interactivo diseñado para todos los niveles.
          </p>
          <button className="px-8 py-3 lg:px-10 lg:py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg w-fit">
            Empieza a aprender
          </button>
        </div>

        {/* Sección de imagen - con márgenes controladas */}
        <div className="md:w-[50%] flex justify-center">
          <img 
            src={cerebroImg} 
            alt="Sistema nervioso humano representando Machine Learning" 
            className="w-full max-w-xl lg:max-w-2xl object-contain animate-float" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;