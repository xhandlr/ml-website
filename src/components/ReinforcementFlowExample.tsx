import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const gridLayout = [
  { id: 1, type: 'start', content: '' }, { id: 2, type: 'empty', content: '' }, { id: 3, type: 'wall', content: '' }, { id: 4, type: 'empty', content: '' }, { id: 5, type: 'empty', content: '' },
  { id: 6, type: 'wall', content: '' }, { id: 7, type: 'empty', content: '' }, { id: 8, type: 'wall', content: '' }, { id: 9, type: 'empty', content: '' }, { id: 10, type: 'danger', content: '🔥' },
  { id: 11, type: 'empty', content: '' }, { id: 12, type: 'empty', content: '' }, { id: 13, type: 'empty', content: '' }, { id: 14, type: 'empty', content: '' }, { id: 15, type: 'wall', content: '' },
  { id: 16, type: 'wall', content: '' }, { id: 17, type: 'empty', content: '' }, { id: 18, type: 'wall', content: '' }, { id: 19, type: 'empty', content: '' }, { id: 20, type: 'empty', content: '' },
  { id: 21, type: 'empty', content: '' }, { id: 22, type: 'empty', content: '' }, { id: 23, type: 'wall', content: '' }, { id: 24, type: 'empty', content: '' }, { id: 25, type: 'reward', content: '🏆' },
];

interface StepData {
  position: number;
  highlight: string;
  feedback?: string;
  path?: number[];
  action?: 'up' | 'down' | 'left' | 'right';
}

// Add new props to ReinforcementFlowExample
interface ReinforcementFlowExampleProps {
  stepData: StepData;
  jumpToPosition: number | null;
  setJumpToPosition: (pos: number | null) => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ReinforcementFlowExample: React.FC<ReinforcementFlowExampleProps> = ({ stepData, jumpToPosition, setJumpToPosition }) => {
  const ref = useRef<SVGSVGElement>(null);
  const prevStepData = usePrevious(stepData);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const cellSize = 50;
    const gap = 6;
    const cols = 5;
    const rows = 5;
    const width = cols * (cellSize + gap) - gap;
    const height = rows * (cellSize + gap) - gap;

    svg.attr('viewBox', `0 0 ${width} ${height}`);
    const g = svg.append('g');

    // Celdas
    const cells = g.selectAll('rect')
      .data(gridLayout)
      .enter()
      .append('rect')
      .attr('x', (_, i) => (i % cols) * (cellSize + gap))
      .attr('y', (_, i) => Math.floor(i / cols) * (cellSize + gap))
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('rx', 6)
      .attr('fill', d => {
        if (d.type === 'wall') return '#334155';
        if (d.type === 'danger') return '#ef444420';
        if (d.type === 'reward') return '#22c55e20';
        if (d.type === 'start') return '#3b82f620';
        return '#1e293b';
      })
      .attr('stroke', d => {
        const { highlight } = stepData;
        if (highlight === 'danger' && d.type === 'danger') return '#f87171';
        if (highlight === 'reward' && d.type === 'reward') return '#4ade80';
        if (highlight === 'wall' && d.type === 'wall') return '#64748b';
        if (highlight === 'environment') return '#6CDFBC';
        if (highlight === 'state' && d.id === stepData.position) return '#60a5fa';
        return 'none';
      })
      .attr('stroke-width', 2);

    // Animación de pulso para el estado
    if (stepData.highlight === 'state') {
      cells.filter(d => d.id === stepData.position)
        .append('animate')
        .attr('attributeName', 'stroke-width')
        .attr('values', '2; 4; 2')
        .attr('dur', '1.5s')
        .attr('repeatCount', 'indefinite');
    }

    // Ruta óptima (Política)
    if (stepData.highlight === 'policy' && stepData.path) {
      const lineGenerator = d3.line<{ id: number }>()
        .x(d => ((d.id - 1) % cols) * (cellSize + gap) + cellSize / 2)
        .y(d => Math.floor((d.id - 1) / cols) * (cellSize + gap) + cellSize / 2)
        .curve(d3.curveLinear);
      
      const pathData = stepData.path.map(id => gridLayout.find(cell => cell.id === id)!);

      g.append('path')
        .datum(pathData)
        .attr('fill', 'none')
        .attr('stroke', '#6CDFBC')
        .attr('stroke-width', 3)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineGenerator)
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .style('opacity', 0.7);
    }

    // Iconos
    g.selectAll('.icon')
      .data(gridLayout.filter(d => d.content))
      .enter()
      .append('text')
      .attr('class', 'icon')
      .attr('x', (d) => ((d.id - 1) % cols) * (cellSize + gap) + cellSize / 2)
      .attr('y', (d) => Math.floor((d.id - 1) / cols) * (cellSize + gap) + cellSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '24px')
      .text(d => d.content);

    // Robot
    const currentPos = stepData.position; // Moved declaration here
    let initialX, initialY;
    let targetX, targetY;

    if (jumpToPosition !== null) {
      // If skipping, immediately set position without transition
      const jumpPosCoords = gridLayout.find(cell => cell.id === jumpToPosition)!;
      targetX = ((jumpPosCoords.id - 1) % cols) * (cellSize + gap);
      targetY = Math.floor((jumpPosCoords.id - 1) / cols) * (cellSize + gap);
      initialX = targetX; // Start and end at the same position
      initialY = targetY;
      setJumpToPosition(null); // Clear the jump flag
    } else {
      // Normal animation
      const previousPos = prevStepData?.position || currentPos;
      initialX = ((previousPos - 1) % cols) * (cellSize + gap);
      initialY = Math.floor((previousPos - 1) / cols) * (cellSize + gap);
      
      targetX = ((currentPos - 1) % cols) * (cellSize + gap);
      targetY = Math.floor((currentPos - 1) / cols) * (cellSize + gap);
    }

    const robot = g.append('g')
      .attr('transform', `translate(${initialX}, ${initialY})`)
      .attr('id', 'robot');

    robot.append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('rx', 8)
      .attr('fill', stepData.highlight === 'agent' ? '#6CDFBC' : '#3b82f6')
      .attr('stroke', stepData.highlight === 'agent' ? '#fff' : 'none')
      .attr('stroke-width', 2);

    robot.append('text')
      .attr('x', cellSize / 2)
      .attr('y', cellSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '24px')
      .text('🤖');

    // Only apply transition if not jumping
    if (jumpToPosition === null) {
      d3.select<d3.BaseType, unknown>('#robot')
        .transition()
        .duration(800)
        .ease(d3.easeCubicOut)
        .attr('transform', `translate(${targetX}, ${targetY})`);
    } else {
      // If jumping, ensure robot is immediately at target position
      d3.select<d3.BaseType, unknown>('#robot')
        .attr('transform', `translate(${targetX}, ${targetY})`);
    }

    // Flecha de acción
    if (stepData.highlight === 'action' && prevStepData && prevStepData.position !== currentPos) {
      const arrow = g.append('path')
        .attr('d', 'M0,-5L8,0L0,5')
        .attr('fill', '#fb923c')
        .style('opacity', 0);

      let rotation = 0;
      if (stepData.action === 'down') rotation = 90;
      if (stepData.action === 'up') rotation = -90;
      if (stepData.action === 'left') rotation = 180;

      arrow.transition()
        .delay(300)
        .duration(400)
        .style('opacity', 1)
        .attr('transform', `translate(${initialX + cellSize / 2}, ${initialY + cellSize / 2}) rotate(${rotation})`)
        .transition()
        .duration(400)
        .style('opacity', 0)
        .remove();
    }

    // Feedback de recompensa/castigo
    const showFeedback = (text: string, color: string) => {
      const feedback = g.append('text')
        .attr('x', targetX + cellSize / 2)
        .attr('y', targetY + cellSize / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .attr('font-weight', 'bold')
        .attr('fill', color)
        .style('opacity', 0)
        .text(text);

      feedback.transition()
        .duration(1200)
        .ease(d3.easeQuadOut)
        .style('opacity', 1)
        .attr('y', targetY - 15)
        .transition()
        .duration(500)
        .style('opacity', 0)
        .remove();
    };

    if (stepData.feedback === '+1') showFeedback('+1', '#4ade80');
    if (stepData.feedback === '-1') showFeedback('-1', '#f87171');

  }, [stepData, prevStepData, jumpToPosition, setJumpToPosition]);

  return (
    <div className="w-full max-w-md p-4 bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col items-center">
      <svg ref={ref}></svg>
    </div>
  );
};

export default ReinforcementFlowExample;
