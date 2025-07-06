import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const DecisionFlowExample: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Dimensiones mayores para el árbol
    const width = 1200;
    const height = 800;

    // Nueva estructura con la lógica corregida
    const data: TreeNode = {
      name: '¿Remitente está en contactos?',
      children: [
        {
          name: "No es spam",
        },
        {
          name: "¿El correo contiene \"gratis\"?",
          children: [
            {
              name: "¿Tiene más de 2 enlaces?",
              children: [
                { name: "Es spam" },
                { name: "Posible spam" },
              ],
            },
            {
              name: "Revisar manualmente",
            },
          ],
        },
      ],
    };

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree<TreeNode>().size([width - 200, height - 200]);
    treeLayout(root);

    // Centramos el árbol
    const g = svg.append("g").attr("transform", `translate(100,100)`);

    // Animación de las líneas
    const links = g
      .selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x!)
      .attr("y1", d => d.source.y!)
      .attr("x2", d => d.source.x!)
      .attr("y2", d => d.source.y!)
      .attr("stroke", "#059669")
      .attr("stroke-width", 2)
      .attr("opacity", 0);

    links
      .transition()
      .delay((d, i) => i * 600)
      .duration(600)
      .attr("x2", d => d.target.x!)
      .attr("y2", d => d.target.y!)
      .attr("opacity", 1);

    // Nodos con mejor espaciado
    const nodes = g
      .selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("opacity", 0);

    nodes
      .transition()
      .delay((d, i) => i * 600)
      .duration(500)
      .attr("opacity", 1);

    // Tamaños ajustados para mejor visualización
    const boxHeight = 80;
    const fontSize = "20px";

    nodes.each(function (d) {
      const group = d3.select(this);

      // Decidimos ancho según si es nodo hoja (sin children) o no
      const isLeaf = !d.children || d.children.length === 0;
      const boxWidth = isLeaf ? 160 : 280; // hojas más estrechas, padres más anchos

      // Rectángulo del nodo
      group
        .append("rect")
        .attr("x", -boxWidth / 2)
        .attr("y", -boxHeight / 2)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#064e3b")
        .attr("stroke", "#059669")
        .attr("stroke-width", 3);

      // Texto con mejor formato
      group
        .append("foreignObject")
        .attr("x", -boxWidth / 2)
        .attr("y", -boxHeight / 2)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .append("xhtml:div")
        .style("width", "100%")
        .style("height", "100%")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")
        .style("color", "white")
        .style("font-size", fontSize)
        .style("text-align", "center")
        .style("font-family", "Arial, sans-serif")
        .style("line-height", "1.4")
        .style("padding", "8px")
        .style("word-break", "break-word")
        .text(d.data.name);
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '80vh', overflow: 'visible' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          overflow: 'visible'
        }}
      ></svg>
    </div>
  );
};

export default DecisionFlowExample;
