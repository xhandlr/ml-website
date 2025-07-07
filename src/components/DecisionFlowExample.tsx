import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import treeImg from "../assets/tree.png";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface Props {
  animateTree?: boolean;
  showTreeImage?: boolean;
  highlightPart?: "node" | "decision" | "branch" | "leaf";
}

const DecisionFlowExample: React.FC<Props> = ({
  animateTree = false,
  showTreeImage = false,
  highlightPart
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1200;
    const height = 800;
    const boxHeight = 80;
    const fontSize = "20px";

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

    const links = g
      .selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x!)
      .attr("y1", d => d.source.y!)
      .attr("x2", d => animateTree ? d.source.x! : d.target.x!)
      .attr("y2", d => animateTree ? d.source.y! : d.target.y!)
      .attr("stroke", "#059669")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)")
      .attr("opacity", animateTree ? 0 : 1);

    if (animateTree) {
      links.transition()
        .delay((_, i) => i * 100)
        .duration(500)
        .attr("x2", d => d.target.x!)
        .attr("y2", d => d.target.y!)
        .attr("opacity", 1);
    }

    if (highlightPart === "branch") {
      links
        .transition()
        .delay((_, i) => i * 100)
        .duration(600)
        .attr("stroke", "#facc15");
    }

    const linkLabels = ["Sí", "No", "Sí", "No"];

    const textGroup = g
      .selectAll("g.link-label-group")
      .data(root.links())
      .enter()
      .append("g")
      .attr("transform", d => {
        const x = (d.source.x! + d.target.x!) / 2;
        const y = (d.source.y! + d.target.y!) / 2 - 20;
        return `translate(${x}, ${y})`;
      })
      .attr("opacity", animateTree ? 0 : 1);

    textGroup.append("rect")
      .attr("x", -30)
      .attr("y", -16)
      .attr("width", 60)
      .attr("height", 28)
      .attr("rx", 6)
      .attr("fill", "#151C29");

    textGroup.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-size", "18px")
      .text((_, i) => linkLabels[i] || "");

    if (animateTree) {
      textGroup.transition()
        .delay((_, i) => i * 100 + 300)
        .duration(300)
        .attr("opacity", 1);
    }

    const nodes = g
      .selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("opacity", animateTree ? 0 : 1);

    if (animateTree) {
      nodes.transition()
        .delay((_, i) => i * 500)
        .duration(300)
        .attr("opacity", 1);
    }

    nodes.each(function (d) {
      const group = d3.select(this);
      const isLeaf = !d.children || d.children.length === 0;
      const boxWidth = isLeaf ? 160 : 280;
      const isDecision = d.depth === 0 || d.children;

      const rect = group
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

      if (highlightPart === "node" && d.data.name) {
        rect
          .classed("flash", true)
          .transition()
          .duration(100)
          .attr("stroke", "#b10606")
          .attr("fill", "#b10606");
      }

      if (highlightPart === "decision" && isDecision) {
        rect
          .classed("flash", true)
          .transition()
          .duration(100)
          .attr("stroke", "#0f50d3")
          .attr("fill", "#0f50d3");
      }

      if (highlightPart === "leaf" && isLeaf) {
        rect
          .classed("flash", true)
          .transition()
          .duration(100)
          .attr("stroke", "#36a413")
          .attr("fill", "#36a413");
      }

      group
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("fill", "white")
        .style("font-size", fontSize)
        .text(d.data.name);
    });

  }, [animateTree, highlightPart]);

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
        }}
      />

      {showTreeImage && (
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
        .flash {
          transition: fill 2s ease, stroke 2s ease;
        }
      `}</style>
    </div>
  );
};

export default DecisionFlowExample;
