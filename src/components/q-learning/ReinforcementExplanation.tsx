import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ConceptCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#293548] p-4 rounded-lg h-full">
    <h4 className="text-lg font-bold text-[#6CDFBC] mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{children}</p>
  </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <div className="text-sm rounded-lg overflow-hidden">
    <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem' }}>
      {code.trim()}
    </SyntaxHighlighter>
  </div>
);

const ReinforcementExplanation: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-8 rounded-2xl shadow-2xl mt-8 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Una Mirada Profunda al Aprendizaje por Refuerzo</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          El Aprendizaje por Refuerzo (RL) es enseñar a un agente a pensar por sí mismo. En lugar de darle instrucciones explícitas, le damos un objetivo y lo dejamos interactuar con un entorno. El agente es recompensado por acciones que lo acercan a su meta y penalizado por las que lo alejan. Con el tiempo, a través de la prueba y el error, el agente construye una "intuición" —una estrategia o política— sobre cómo actuar para maximizar sus recompensas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard title="Agente 🤖">
          El aprendiz o tomador de decisiones. Su único objetivo es maximizar la recompensa total. En este caso, es el robot que se mueve por el laberinto.
        </ConceptCard>
        <ConceptCard title="Entorno 🌐">
          El mundo con el que interactúa el agente. Define las reglas y lo que sucede después de cada acción. Es el laberinto con sus muros, trampas y tesoros.
        </ConceptCard>
        <ConceptCard title="Estado (State)">
          Una instantánea de la situación actual del agente. En nuestro caso, el estado es simplemente la coordenada (fila, columna) donde se encuentra el robot.
        </ConceptCard>
        <ConceptCard title="Acción (Action)">
          Un movimiento que el agente puede realizar. Aquí, las acciones posibles son moverse arriba, abajo, izquierda o derecha.
        </ConceptCard>
        <ConceptCard title="Recompensa (Reward) 🏆/🔥">
          El feedback que el entorno le da al agente. Es una señal numérica que le dice si una acción fue buena o mala desde su estado actual.
        </ConceptCard>
        <ConceptCard title="Política (Policy) 🗺️">
          La estrategia o "cerebro" que el agente desarrolla. Es una guía que le dice cuál es la mejor acción a tomar en cada estado para obtener la máxima recompensa a largo plazo.
        </ConceptCard>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-2xl font-bold text-center text-white mb-6">🤔 ¿Qué está pasando en la simulación?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ConceptCard title="El Agente está Aprendiendo">
            El robot (agente) está construyendo su "mapa mental" (la Política) del laberinto. Al principio, no sabe nada y explora al azar. Cada vez que recibe una recompensa o un castigo, actualiza el valor que le asigna a la acción que tomó en esa casilla.
          </ConceptCard>
          <ConceptCard title="El Significado de las Flechas">
            Las flechas en cada casilla representan la mejor acción que el agente cree que puede tomar desde ese punto, según su experiencia actual. La opacidad de la flecha indica la "confianza" del agente en esa decisión: una flecha más brillante significa mayor confianza.
          </ConceptCard>
          <ConceptCard title="La Tasa de Exploración (ε)">
            Este parámetro no es modificable manualmente porque es crucial que el agente explore mucho al principio y luego, gradualmente, confíe más en lo que ha aprendido. La tasa disminuye automáticamente con cada episodio, simulando un proceso de aprendizaje natural: de la curiosidad a la maestría.
          </ConceptCard>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-700">
        <h3 className="text-2xl font-bold text-center text-white mb-8">⚙️ ¿Cómo Funciona el Algoritmo? (Análisis Técnico)</h3>
        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-semibold text-[#6CDFBC] mb-3">1. La Q-Table: El Cerebro del Agente</h4>
            <p className="text-gray-300 mb-4">
              El corazón del algoritmo es la <strong>Q-Table</strong>, una estructura de datos (en nuestro caso, un objeto de JavaScript) que almacena el valor esperado de tomar una acción en un estado determinado. La clave es el estado (ej: "3,4") y el valor es un array de números, donde cada número es el "Q-Value" para una acción (Arriba, Abajo, Izquierda, Derecha).
            </p>
            <CodeBlock code={`const [qTable, setQTable] = useState<{ [state: string]: number[] }>({});`} />
          </div>

          <div>
            <h4 className="text-xl font-semibold text-[#6CDFBC] mb-3">2. Decisión: Explorar vs. Explotar</h4>
            <p className="text-gray-300 mb-4">
              En cada paso, el agente decide si explorar una nueva ruta al azar o explotar el conocimiento que ya tiene. Esto se controla con la <strong>Tasa de Exploración (ε)</strong>. Al principio, ε es alta (más exploración). Con el tiempo, decae, y el agente prefiere explotar las rutas que sabe que son buenas.
            </p>
            <CodeBlock code={`
const chooseAction = useCallback((state: string) => {
  if (Math.random() < explorationRate.current) {
    return Math.floor(Math.random() * 4); // Explorar
  } else {
    const qValues = getQ(state);
    return qValues.indexOf(Math.max(...qValues)); // Explotar
  }
}, [getQ]);
            `} />
          </div>

          <div>
            <h4 className="text-xl font-semibold text-[#6CDFBC] mb-3">3. La Ecuación de Bellman: Aprendizaje</h4>
            <p className="text-gray-300 mb-4">
              Aquí ocurre la magia. Después de cada acción, la Q-Table se actualiza usando una forma simplificada de la Ecuación de Bellman. Se calcula un nuevo Q-Value considerando la recompensa inmediata y la máxima recompensa posible desde el siguiente estado. La <strong>Tasa de Aprendizaje (α)</strong> controla cuánto peso se le da a esta nueva información.
            </p>
            <CodeBlock code={`
const updateQValue = useCallback((state: string, action: number, reward: number, nextState: string) => {
  const oldQ = getQ(state)[action];
  const nextMaxQ = Math.max(...getQ(nextState));
  const newQ = oldQ + learningRate * (reward + discountFactor * nextMaxQ - oldQ);

  setQTable(prev => ({
    ...prev,
    [state]: Object.assign([...(prev[state] || [0,0,0,0])], { [action]: newQ }),
  }));
}, [getQ, learningRate, discountFactor]);
            `} />
          </div>

          <div>
            <h4 className="text-xl font-semibold text-[#6CDFBC] mb-3">4. Recompensa por Proximidad (Reward Shaping)</h4>
            <p className="text-gray-300 mb-4">
              Para acelerar el aprendizaje, no solo recompensamos al agente al final. Le damos pequeñas recompensas positivas por acercarse al objetivo y pequeñas penalizaciones por alejarse. Esto le da pistas constantes sobre si va por buen camino.
            </p>
            <CodeBlock code={`
const currentDist = manhattanDistance(agentPosition, REWARD_POS);
const nextDist = manhattanDistance(nextPos, REWARD_POS);

let shapedReward = REWARDS[cellType];
if (nextDist < currentDist) {
  shapedReward += 0.5; // Premio por acercarse
} else if (nextDist > currentDist) {
  shapedReward -= 0.2; // Castigo por alejarse
}
            `} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReinforcementExplanation;
