import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import treeImg from "../assets/tree.png";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface Props {
  animate?: boolean;
}

const DecisionFlowExample: React.FC<Props> = ({ animate = true }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1200;
    const height = 800;
    const boxHeight = 80;
    const fontSize = "20px";

    // Aquí está el árbol modificado con el ejemplo de hambre y galletas
    const data: TreeNode = {
      name: "¿Tengo hambre?",
      children: [
        {
          name: "¿Hay galletas?",
          children: [
            { name: "Comer galletas" },
            { name: "Ir a comprar" },
          ],
        },
        {
          name: "Seguir jugando",
        },
      ],
    };

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree<TreeNode>().size([width - 200, height - 200]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", `translate(100,100)`);

    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#059669");

    // Texto para las ramas, puedes ajustarlo si quieres
    const linkTexts = ["Sí", "No", "Sí", "No"];

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
      .attr("marker-end", "url(#arrow)")
      .attr("opacity", animate ? 0 : 1);

    if (animate) {
      links.transition()
        .delay((d, i) => i * 600)
        .duration(600)
        .attr("x2", d => d.target.x!)
        .attr("y2", d => d.target.y!)
        .attr("opacity", 1);
    } else {
      links
        .attr("x2", d => d.target.x!)
        .attr("y2", d => d.target.y!)
        .attr("opacity", 1);
    }

    const textLabels = g
      .selectAll("text.link-label")
      .data(root.links())
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("x", d => (d.source.x! + d.target.x!) / 2)
      .attr("y", d => (d.source.y! + d.target.y!) / 2 - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "22px")
      .attr("font-family", "Arial, sans-serif")
      .text((d, i) => linkTexts[i] || "")
      .attr("opacity", animate ? 0 : 1);

    if (animate) {
      textLabels
        .transition()
        .delay((d, i) => i * 600 + 300)
        .duration(500)
        .attr("opacity", 1);
    }

    const nodes = g
      .selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("opacity", animate ? 0 : 1);

    if (animate) {
      nodes.transition()
        .delay((d, i) => i * 600)
        .duration(500)
        .attr("opacity", 1);
    }

    nodes.each(function (d) {
      const group = d3.select(this);
      const isLeaf = !d.children || d.children.length === 0;
      const boxWidth = isLeaf ? 160 : 280;

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

    if (!animate) {
      setTimeout(() => setShowOverlay(true), 100);
    } else {
      setShowOverlay(false);
    }
  }, [animate]);

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          overflow: "visible",
          position: "relative",
          zIndex: 1,
        }}
      ></svg>

      {showOverlay && (
        <img
          src={treeImg}
          alt="Árbol decorativo"
          style={{
            position: "absolute",
            top: 0,
            left: "45%",
            transform: "translateX(-45%)",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0,
            animation: "fadeIn 2s ease forwards",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default DecisionFlowExample;
