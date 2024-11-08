import React, { useState } from "react";
import { useDnD } from "../contexts/DnDContext";
import { useReactFlow } from "@xyflow/react";
// import Modal from "react-modal";
import "./styles.css";
import { NodeType, EdgeType } from "./nodes/type";

const Toolbar = () => {
  const { setType } = useDnD();
  const { getNodes, getEdges, setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle drag start for creating new nodes
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Handle node management actions
  const renameNode = () => {
    if (selectedNode) {
      const newLabel = prompt("Enter new name:", selectedNode.data.label);
      if (newLabel) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === selectedNode.id ? { ...node, data: { ...node.data, label: newLabel } } : node
          )
        );
      }
    }
  };

  const deleteNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setSelectedNode(null); // Deselect after deletion
    }
  };

  const copyNode = () => {
    if (selectedNode) {
      const newNode = {
        ...selectedNode,
        id: `${selectedNode.id}-copy`,
        position: { x: selectedNode.position.x + 50, y: selectedNode.position.y + 50 }, // Offset position
      };
      setNodes((nds) => [...nds, newNode]);
    }
  };

  const viewNodeEdgeInfo = () => {
    setIsModalOpen(true);
  };

  // Generate nodes and edges info for modal
  const nodes = getNodes();
  const edges = getEdges();

  return (
    <aside className="toolbar">
      <div className="toolbar-section">
        <div className="description">Create Nodes:</div>
        <div
          className="toolbar-item"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </div>
        <div
          className="toolbar-item"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Default Node
        </div>
        <div
          className="toolbar-item"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        >
          Output Node
        </div>
      </div>

      <div className="toolbar-section">
        <div className="description">Node Actions:</div>
        <button onClick={renameNode} disabled={!selectedNode}>Rename</button>
        <button onClick={deleteNode} disabled={!selectedNode}>Delete</button>
        <button onClick={copyNode} disabled={!selectedNode}>Copy</button>
      </div>

      <div className="toolbar-section">
        <button onClick={viewNodeEdgeInfo}>View Nodes & Edges</button>
      </div>

      {isModalOpen && <div>
        <h2>Nodes & Edges Information</h2>
        <div>
          <h3>Nodes:</h3>
          <ul>
            {nodes.map((node) => (
              <li key={node.id}>{`ID: ${node.id}, Type: ${node.type}, Label: ${node.data.label || 'N/A'}`}</li>
            ))}
          </ul>
          <h3>Edges:</h3>
          <ul>
            {edges.map((edge : EdgeType) => (
              <li key={edge.id}>{`ID: ${edge.id}, Source: ${edge.source}, Target: ${edge.target}`}</li>
            ))}
          </ul>
        </div>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </div>
      }
    </aside>
  );
};

export default Toolbar;
