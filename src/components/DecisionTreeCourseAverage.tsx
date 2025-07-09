import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface TreeNode {
  name: string;
  children?: TreeNode[];
  id: string;
}

interface DecisionTreeExampleProps {
  activePath: string[];
  currentStep: number;
  averageGrade: number;
  examGrade: number;
}

const DecisionTreeExample: React.FC<DecisionTreeExampleProps> = ({
  activePath,
  averageGrade,
  examGrade
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 900;
    const height = 600;
    const rectWidth = 260;
    const rectHeight = 60;

    const requiredExam = Math.max(1.0, Math.min(7.0, (4.0 - 0.6 * averageGrade) / 0.4));

    const data: TreeNode = {
      name: `¿Promedio >= 4.0? (${averageGrade.toFixed(2)})`,
      id: "promedio",
      children: [
        {
          name: "✅ Aprueba",
          id: "aprueba-directo"
        },
        {
          name: `¿Promedio < 3.6? (${averageGrade.toFixed(2)})`,
          id: "bajo36",
          children: [
            {
              name: "❌ No aprueba",
              id: "reprueba-directo"
            },
            {
              name: `¿Examen ≥ ${requiredExam.toFixed(2)}?`,
              id: "eval-final",
              children: [
                { name: "✅ Aprueba", id: "aprueba-final" },
                { name: "❌ No aprueba", id: "reprueba-final" }
              ]
            }
          ]
        }
      ]
    };

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree<TreeNode>().size([width + 200, height - 200]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(-110,70)");

    const isLinkActive = (d: any) => {
      const sourceId = d.source.data.id;
      const targetId = d.target.data.id;
      return activePath.includes(sourceId) && activePath.includes(targetId);
    };

    const linkVertical = d3.linkVertical()
      .x((d: any) => d.x)
      .y((d: any) => d.y);

    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d: any) => linkVertical(d)!)
      .attr("fill", "none")
      .attr("stroke", d => isLinkActive(d) ? "#8b5cf6" : "#6CDFBC")
      .attr("stroke-width", d => isLinkActive(d) ? 3 : 2)
      .attr("opacity", d => isLinkActive(d) ? 1 : 0.6);

    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHoveredId(d.data.id))
      .on("mouseleave", () => setHoveredId(null));

    nodes.append("rect")
      .attr("x", -rectWidth / 2)
      .attr("y", -rectHeight / 2)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("rx", 12)
      .attr("ry", 12)
      .attr("fill", d => {
        const isHovered = d.data.id === hoveredId;
        const isActive = activePath.includes(d.data.id);
        if (isActive) return isHovered ? "#5b21b6" : "#4c1d95";
        if (d.data.name.includes("✅")) return isHovered ? "#047857" : "#059669";
        if (d.data.name.includes("❌")) return isHovered ? "#b91c1c" : "#dc2626";
        return isHovered ? "#334155" : "#1e293b";
      })
      .attr("stroke", d =>
        activePath.includes(d.data.id) ? "#a78bfa" : "#6CDFBC"
      )
      .attr("stroke-width", d => (hoveredId === d.data.id ? 3.5 : 2))
      .style("transition", "fill 0.3s, stroke 0.3s");

    nodes.append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "18px")
      .style("font-family", "sans-serif")
      .text(d => d.data.name);

  }, [activePath, averageGrade, examGrade, hoveredId]);

  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg h-full">
      <svg
        ref={svgRef}
        width="100%"
        height="600"
        viewBox="0 0 900 600"
        style={{ background: "transparent" }}
      ></svg>
    </div>
  );
};

export default DecisionTreeExample;
