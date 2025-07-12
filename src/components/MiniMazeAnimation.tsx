import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MiniMazeAnimation = () => {
  const ref = useRef<SVGSVGElement>(null);

  const cellSize = 36;
  const gap = 6;
  const cols = 3;
  const rows = 3;
  const width = cols * (cellSize + gap) - gap;
  const height = rows * (cellSize + gap) - gap;

  const layout = [
    { id: 0, type: 'start' },
    { id: 1, type: 'empty' },
    { id: 2, type: 'wall' },
    { id: 3, type: 'empty' },
    { id: 4, type: 'empty' },
    { id: 5, type: 'empty' },
    { id: 6, type: 'wall' },
    { id: 7, type: 'empty' },
    { id: 8, type: 'goal' },
  ];

  const path = [0, 1, 4, 5, 8];
  const delayAfterFinish = 3000;
  const stepDuration = 500;

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    const g = svg.append('g');

    // Render grid
    g.selectAll('rect')
      .data(layout)
      .enter()
      .append('rect')
      .attr('x', d => (d.id % cols) * (cellSize + gap))
      .attr('y', d => Math.floor(d.id / cols) * (cellSize + gap))
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('rx', 5)
      .attr('fill', d => {
        if (d.type === 'wall') return '#334155';
        if (d.type === 'start') return '#3b82f680';
        if (d.type === 'goal') return '#22c55e80';
        return '#1e293b';
      })
      .attr('stroke', d => path.includes(d.id) ? '#65DCB8' : 'none')
      .attr('stroke-width', 2);

    // Draw path
    const pathLine = d3.line<{ id: number }>()
      .x(d => (d.id % cols) * (cellSize + gap) + cellSize / 2)
      .y(d => Math.floor(d.id / cols) * (cellSize + gap) + cellSize / 2);

    const pathCoords = path.map(id => layout.find(cell => cell.id === id)!);

    g.append('path')
      .datum(pathCoords)
      .attr('fill', 'none')
      .attr('stroke', '#65DCB8')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('d', pathLine);

    // Agente
    const agent = g.append('circle')
      .attr('r', 10)
      .attr('fill', '#3b82f6');

    const moveAgent = () => {
      path.forEach((id, i) => {
        const x = (id % cols) * (cellSize + gap) + cellSize / 2;
        const y = Math.floor(id / cols) * (cellSize + gap) + cellSize / 2;

        agent.transition()
          .delay(i * stepDuration)
          .duration(stepDuration)
          .ease(d3.easeLinear)
          .attr('cx', x)
          .attr('cy', y);
      });

      // Esperar 3s después de terminar y reiniciar
      const totalAnimTime = stepDuration * path.length + delayAfterFinish;
      setTimeout(() => {
        // Reset sin transición
        const startId = path[0];
        const startX = (startId % cols) * (cellSize + gap) + cellSize / 2;
        const startY = Math.floor(startId / cols) * (cellSize + gap) + cellSize / 2;
        agent.interrupt().attr('cx', startX).attr('cy', startY);
        moveAgent();
      }, totalAnimTime);
    };

    // Posición inicial
    const startId = path[0];
    const startX = (startId % cols) * (cellSize + gap) + cellSize / 2;
    const startY = Math.floor(startId / cols) * (cellSize + gap) + cellSize / 2;
    agent.attr('cx', startX).attr('cy', startY);

    moveAgent();
  }, []);

  return (
    <div className="relative w-[260px] h-[180px] bg-transparent rounded-md flex items-center justify-center">
      <svg ref={ref} width={width} height={height} />
    </div>
  );
};

export default MiniMazeAnimation;
