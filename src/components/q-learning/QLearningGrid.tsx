import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CELL_TYPES = { EMPTY: 0, WALL: 1, REWARD: 2, DANGER: 3, START: 4 };
const ACTIONS = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3 };

const COLORS = {
  [CELL_TYPES.WALL]: '#475569', // Slate-600
  [CELL_TYPES.DANGER]: '#ef4444', // Red-500
  [CELL_TYPES.REWARD]: '#22c55e', // Green-500
  [CELL_TYPES.START]: '#3b82f6', // Blue-500
  [CELL_TYPES.EMPTY]: '#1e293b', // Slate-800
  AGENT: '#6CDFBC',
  POLICY: '#94a3b8' // Slate-400
};

interface GridProps {
  grid: number[][];
  agentPosition: { x: number; y: number };
  qTable: { [state: string]: number[] };
  lastActionInfo: { state: string; action: number; optimal: boolean } | null;
}

const QLearningGrid: React.FC<GridProps> = ({ grid, agentPosition, qTable, lastActionInfo }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    const viewBoxSize = 800;
    svg.attr('viewBox', `0 0 ${viewBoxSize} ${viewBoxSize}`);
    
    const gridSize = grid.length;
    const cellSize = viewBoxSize / gridSize;

    // Add a subtle background pattern
    svg.append('defs').append('pattern')
      .attr('id', 'grid-pattern')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('fill', '#1a2436') // Darker background for pattern
      .attr('stroke', '#1e293b') // Lighter grid lines
      .attr('stroke-width', 1);

    svg.selectAll('.background-rect')
      .data([null])
      .join('rect')
      .attr('class', 'background-rect')
      .attr('width', viewBoxSize)
      .attr('height', viewBoxSize)
      .attr('fill', 'url(#grid-pattern)');

    const flatGrid = grid.flatMap((row, y) => row.map((cell, x) => ({ id: `${y}-${x}`, x, y, type: cell })));

    // --- Draw Cells ---
    interface CellData { id: string; x: number; y: number; type: number; }
    svg.selectAll<SVGRectElement, CellData>('.cell')
      .data(flatGrid, (d: CellData) => d.id)
      .join('rect')
      .attr('class', 'cell')
      .attr('x', d => d.x * cellSize)
      .attr('y', d => d.y * cellSize)
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('fill', d => COLORS[d.type] || COLORS[CELL_TYPES.EMPTY])
      .attr('stroke', '#2d3a50') // Darker, more prominent border
      .attr('stroke-width', 3) // Thicker border
      .attr('rx', 5) // Rounded corners
      .attr('ry', 5);

    // --- Draw Icons ---
    svg.selectAll('.icon').data([]).exit().remove(); // Clear old icons
    svg.selectAll('.icon')
      .data(flatGrid.filter(d => d.type === CELL_TYPES.REWARD || d.type === CELL_TYPES.DANGER))
      .join('text')
      .attr('class', 'icon')
      .attr('x', d => (d.x + 0.5) * cellSize)
      .attr('y', d => (d.y + 0.5) * cellSize)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', cellSize * 0.6)
      .text(d => d.type === CELL_TYPES.REWARD ? '🏆' : '🔥');

    // --- Visualize Q-Table (Policy) ---
    const qData = Object.entries(qTable).map(([state, values]) => {
      const [y, x] = state.split(',').map(Number);
      return { id: `${y}-${x}-policy`, x, y, values };
    });

    const qValues = qData.flatMap(d => d.values);
    const qScale = d3.scaleLinear().domain([d3.min(qValues) || 0, d3.max(qValues) || 0]).range([0.2, 1]); // Adjusted range for better visibility

    interface QData {
      id: string;
      x: number;
      y: number;
      values: number[];
    }
    svg.selectAll<SVGPathElement, QData>('.policy-arrow')
      .data(qData, (d: QData) => d.id)
      .join(
        enter => enter.append('path').attr('class', 'policy-arrow').style('opacity', 0),
        update => update,
        exit => exit.remove()
      )
      .attr('d', `M${cellSize*0.5},${cellSize*0.3} L${cellSize*0.5},${cellSize*0.7} L${cellSize*0.7},${cellSize*0.5} Z`) // Slightly larger arrow
      .attr('fill', d => {
        if (lastActionInfo && lastActionInfo.state === `${d.y},${d.x}` && lastActionInfo.action === d.values.indexOf(Math.max(...d.values))) {
          return lastActionInfo.optimal ? '#22c55e' : '#ef4444'; // Green for optimal, Red for suboptimal
        }
        return COLORS.POLICY;
      })
      .transition()
      .duration(100) // Shorter animation duration
      .style('opacity', d => qScale(d.values[d.values.indexOf(Math.max(...d.values))]))
      .attr('transform', d => {
        const bestAction = d.values.indexOf(Math.max(...d.values));
        let rotation = 0;
        switch (bestAction) {
          case ACTIONS.UP: rotation = -90; break;
          case ACTIONS.DOWN: rotation = 90; break;
          case ACTIONS.LEFT: rotation = 180; break;
          case ACTIONS.RIGHT: rotation = 0; break;
        }
        return `translate(${d.x * cellSize}, ${d.y * cellSize}) rotate(${rotation}, ${cellSize/2}, ${cellSize/2})`;
      });

    // --- Draw Agent ---
    const agentGroup = svg.selectAll<SVGGElement, unknown>('#agent-group').data([agentPosition]);

    const agentEnter = agentGroup.enter().append('g').attr('id', 'agent-group');
    agentEnter.append('circle')
      .attr('r', cellSize * 0.3)
      .attr('fill', COLORS.AGENT)
      .attr('filter', 'url(#glow)'); // Apply glow filter
    agentEnter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', cellSize * 0.4)
      .text('🤖');

    agentGroup.merge(agentEnter)
      .transition()
      .duration(100)
      .attr('transform', d => `translate(${(d.x + 0.5) * cellSize}, ${(d.y + 0.5) * cellSize})`);

  }, [grid, agentPosition, qTable, lastActionInfo]);

  return (
    <div className="bg-[#0f172a] p-2 rounded-lg shadow-2xl aspect-square max-w-full">
      <svg ref={ref} className="w-full h-full">
        {/* Glow filter for agent */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default QLearningGrid;
