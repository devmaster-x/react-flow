"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  OnConnect,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import { useDnD } from "@/contexts/DnDContext";
import { useModalContext } from "@/contexts/ModalContext";
import { useNodeContext } from "@/contexts/NodeContext";
import { EditNodeModal, OpenFileModal } from "./modal";
import { ToolBoxPannel } from "./toolboxPannel";
import { EdgeType, NodeType } from "./nodes/type";
import { DetailsBar } from "./detailsBar";
import { InputNode, OutputNode, DefaultNode } from "./nodes";
import "./styles.css";

let id = 0;
const getId = () => `Node ${id++}`;

const nodeTypes : NodeTypes = {
  m_input: InputNode,
  m_output: OutputNode,
  m_default: DefaultNode
}
// list of possible node types

const AutomationBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();
  const { nodeModalOpen, setNodeModalOpen, fileModalOpen, setFileModalOpen } = useModalContext();
  const { currentNode, setNewNode, setCurrentNode } = useNodeContext();

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeType>([]);

  // we load the data from the server on mount
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("/api/automation");
      const automation = await data.json();
      setNodes(automation.nodes);
      setEdges(automation.edges);
    };
    getData();
    toast.success("success");
  }, [setNodes, setEdges]);

  // various callbacks
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!type) {
        return;
      }


      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode : NodeType = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodeModalOpen(true);
      setNewNode(newNode);
    },
    [type, setNodeModalOpen, screenToFlowPosition, setNewNode]
  );

  const onAddNewNode = (_newNode : NodeType) => {
    if(!_newNode) toast.error("adding new node error.");
    else {
      setNodes((nds) => [...nds, _newNode!]);
      toast.success(`new ${_newNode.data.label} added.`);
      setNewNode(null)
    }
  }

  const onUpdateNode = (_updateNode: NodeType) => {
    if (!_updateNode) {
      toast.error("Updating node error.");
    } else {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === _updateNode.id ? { ...node, ..._updateNode } : node
        )
      );
      toast.success(`${_updateNode.data.label} updated.`);
      setNewNode(null);
    }
  };

  const onDeleteNode = () => {
    const nodeId = currentNode?.id;
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
    toast.success("Node deleted successfully.");
  };

  const onNodeClick = (event: React.MouseEvent, node: NodeType) => {
    const _newNode = {
      id: node.id,
      data: node.data,
      position: node.position,
      type: node.type
    };
    setCurrentNode(_newNode);
  };

  const onSave = async () => {
    const data = { nodes, edges };

    try {
      const response = await fetch('/api/nodes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Data saved successfully!');
      } else {
        toast.error('Failed to save data.');
      }
    } catch (error) {
      toast.error('Error saving data.');
      console.error(error);
    }
  }
  const onLoad = async () => {
    try {
      const response = await fetch('/api/nodes');
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
          toast.success('Data loaded successfully!');
        } else {
          toast.error('Invalid data format!');
        }
      } else {
        toast.error('Failed to load data.');
      }
    } catch (error) {
      toast.error('Error loading data.');
      console.error(error);
    }
  }

  const saveToFile = () => {
    const data = { nodes, edges };
    const dataStr = JSON.stringify(data, null, 2);
    const file = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'nodes_data.json';
    link.click();
  };

  const onLoadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileModalOpen(false);
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Load File data failed.")
      return;
    }

    const reader = new FileReader();

    // Read the file as text
    reader.onload = (e) => {
      try {
        // Parse the JSON content
        const data = JSON.parse(e.target?.result as string);

        // Assuming data contains "nodes" and "edges"
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
          toast.success("Data loaded successfully!");
        } else {
          toast.error("Invalid data format!");
        }
      } catch (error) {
        toast.error("Error reading the file.");
        console.log(error);
      }
    };

    // Read the file content
    reader.readAsText(file);
  };

  return (
    <div className="automation-builder">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="overview"
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background />
          <Panel position="top-center" >
            <ToolBoxPannel 
              deleteNode={onDeleteNode}
              onSave={saveToFile}
              onSaveEndPoint={onSave}
              onLoadEndPoint={onLoad}
            />
          </Panel>
        </ReactFlow>
      </div>
      {nodeModalOpen && <EditNodeModal addNode={onAddNewNode} updateNode={onUpdateNode} closeModalHandler={()=>setNodeModalOpen(false)} />}
      {fileModalOpen && <OpenFileModal onLoad={onLoadFromFile} closeModalHandler={()=>setFileModalOpen(false)}/>}
      <DetailsBar />
      <ToastContainer hideProgressBar position='top-right' autoClose={1000}/>
    </div>
  );
};

export default AutomationBuilder;
