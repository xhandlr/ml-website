import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Slider, Button, Input, Select } from "antd";
import "antd/dist/reset.css";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isDecision?: boolean;
  condition?: string;
}

const DecisionTreeCreator: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode>({
    id: "1",
    name: "Nodo Raíz",
    isDecision: true,
    condition: ""
  });
  const [maxDepth, setMaxDepth] = useState<number>(3);
  const [currentDepth, setCurrentDepth] = useState<number>(1);
  const [splitCriterion, setSplitCriterion] = useState<string>("gini");
  const [nodeName, setNodeName] = useState<string>("");
  const [nodeCondition, setNodeCondition] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Generar un ID único
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Agregar un nodo hijo
  const addChildNode = (parentId: string, isDecision: boolean = true) => {
    if (currentDepth >= maxDepth) {
      alert("Has alcanzado la profundidad máxima configurada");
      return;
    }

    const newNode: TreeNode = {
      id: generateId(),
      name: nodeName || (isDecision ? "Nueva Decisión" : "Nuevo Resultado"),
      isDecision,
      condition: nodeCondition || ""
    };

    const addNode = (node: TreeNode): TreeNode => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode]
        };
      }

      if (node.children) {
        return {
          ...node,
          children: node.children.map(addNode)
        };
      }

      return node;
    };

    setTreeData(addNode(treeData));
    setNodeName("");
    setNodeCondition("");
    setCurrentDepth(currentDepth + 1);
  };

  // Eliminar un nodo
  const removeNode = (nodeId: string) => {
    const removeNodeFromTree = (node: TreeNode): TreeNode | null => {
      if (node.id === nodeId) return null;
      
      if (node.children) {
        return {
          ...node,
          children: node.children
            .map(removeNodeFromTree)
            .filter(Boolean) as TreeNode[]
        };
      }

      return node;
    };

    const newTree = removeNodeFromTree(treeData);
    if (newTree) setTreeData(newTree);
  };

  // Visualizar el árbol con D3
  useEffect(() => {
    if (!svgRef.current || !treeData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree<TreeNode>().size([width - 200, height - 200]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(100,100)");

    // Dibujar líneas
    g.selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x!)
      .attr("y1", d => d.source.y!)
      .attr("x2", d => d.target.x!)
      .attr("y2", d => d.target.y!)
      .attr("stroke", "#059669")
      .attr("stroke-width", 2);

    // Dibujar nodos
    const nodes = g.selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .on("click", (_, d) => setSelectedNode(d.data.id));

    // Cajas de nodos
    nodes.append("rect")
      .attr("x", -100)
      .attr("y", -30)
      .attr("width", 200)
      .attr("height", 60)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", d => d.data.isDecision ? "#064e3b" : "#1e40af")
      .attr("stroke", d => d.data.isDecision ? "#059669" : "#3b82f6")
      .attr("stroke-width", 2);

    // Texto de nodos
    nodes.append("text")
      .text(d => d.data.name)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .style("font-size", "14px");

    // Condiciones (si existe)
    nodes.filter(d => d.data.condition !== undefined && d.data.condition !== "")
        .append("text")
        .text(d => d.data.condition as string)  // Type assertion
        .attr("fill", "#d1d5db")
        .attr("text-anchor", "middle")
        .attr("dy", 25)
        .style("font-size", "12px");

  }, [treeData]);

  return (
    <div className="min-h-screen bg-[#151C29] text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#6CDFBC]">
        Creador de Árbol de Decisiones
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Panel de control izquierdo */}
        <div className="w-full md:w-1/3 bg-[#1e293b] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#6CDFBC]">
            Configuración del Árbol
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Profundidad Máxima: {maxDepth}</label>
              <Slider
                min={1}
                max={10}
                value={maxDepth}
                onChange={setMaxDepth}
                trackStyle={{ backgroundColor: '#059669' }}
                handleStyle={{ borderColor: '#6CDFBC' }}
              />
            </div>

            <div>
              <label className="block mb-2">Criterio de División</label>
              <Select
                className="w-full"
                value={splitCriterion}
                onChange={setSplitCriterion}
                options={[
                  { value: 'gini', label: 'Índice Gini' },
                  { value: 'entropy', label: 'Ganancia de Información' },
                ]}
              />
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-medium mb-3">Nodo Seleccionado</h3>
              
              {selectedNode && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2">Nombre del Nodo</label>
                    <Input
                      value={nodeName}
                      onChange={(e) => setNodeName(e.target.value)}
                      placeholder="Nombre del nodo"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Condición</label>
                    <Input
                      value={nodeCondition}
                      onChange={(e) => setNodeCondition(e.target.value)}
                      placeholder="Ej: ¿Edad > 30?"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="primary" 
                      onClick={() => addChildNode(selectedNode, true)}
                      className="bg-[#059669] hover:bg-[#047857]"
                    >
                      Agregar Decisión
                    </Button>
                    <Button 
                      onClick={() => addChildNode(selectedNode, false)}
                      className="text-white bg-[#1d4ed8] hover:bg-[#1e40af]"
                    >
                      Agregar Resultado
                    </Button>
                    <Button 
                      danger 
                      onClick={() => removeNode(selectedNode)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </>
              )}

              {!selectedNode && (
                <p className="text-gray-400">Selecciona un nodo en el árbol para editarlo</p>
              )}
            </div>
          </div>
        </div>

        {/* Visualizador del árbol derecho */}
        <div className="w-full md:w-2/3 bg-[#0f172a] rounded-xl shadow-lg p-4">
          <div className="h-full w-full">
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              style={{ minHeight: '600px', background: 'transparent' }}
            ></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeCreator;