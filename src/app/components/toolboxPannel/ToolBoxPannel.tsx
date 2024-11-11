import { type FC } from 'react';
import { TfiLayoutWidthDefault } from "react-icons/tfi";
import { FaTrash, FaEdit, FaEye, FaEyeSlash, FaSave, FaFolderOpen } from "react-icons/fa";
import { MdInput, MdOutput } from "react-icons/md";
import { useDnD } from "@/contexts/DnDContext";
import { useModalContext } from "@/contexts/ModalContext";
import { useNodeContext } from "@/contexts/NodeContext";
import { ToolBoxPannelProps } from "./ToolBoxPannel.type";
import "./ToolBoxPannel.css";

const ToolBoxPannel: FC<ToolBoxPannelProps> = ({ deleteNode, onSave, onSaveEndPoint, onLoadEndPoint }) => {
  // Context hooks to manage drag-and-drop, modal states, and node information
  const { setType } = useDnD();
  const { visibleDetailBar, setVisibleDetailBar, setNodeModalOpen, setFileModalOpen } = useModalContext();
  const { currentNode } = useNodeContext();

  // Handle the drag start event, defining the node type to be created
  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Open modal to edit the currently selected node
  const handleEditNode = () => {
    setNodeModalOpen(true);
  };

  return (
    <div className="toolbox-horizontal">
      {/* Node Creation Buttons */}
      <div
        className="dndnode input"
        onDragStart={(event) => handleDragStart(event, "m_input")}
        draggable
        title="Create Input Node"
      >
        <MdInput className="icon" />
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => handleDragStart(event, "m_default")}
        draggable
        title="Create Default Node"
      >
        <TfiLayoutWidthDefault className="icon" />
      </div>

      <div
        className="dndnode output"
        onDragStart={(event) => handleDragStart(event, "m_output")}
        draggable
        title="Create Output Node"
      >
        <MdOutput className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Node Operation Buttons */}
      <div className={`dndnode ${currentNode == null ? 'disabled' : ''}`} onClick={handleEditNode} title="Edit Node">
        <FaEdit className="icon" />
      </div>
      <div className={`dndnode ${currentNode == null ? 'disabled' : ''}`} onClick={deleteNode} title="Delete Node">
        <FaTrash className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Toggle Details Button */}
      <div
        className="dndnode"
        onClick={() => setVisibleDetailBar(!visibleDetailBar)}
        title={visibleDetailBar ? "Hide Details" : "Show Details"}
      >
        {visibleDetailBar ? <FaEyeSlash className="icon" /> : <FaEye className="icon" />}
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* File Operations Section */}
      <span className="file-label">File:</span>
      <div className="dndnode" onClick={onSave} title="Save File">
        <FaSave className="icon" />
      </div>
      <div className="dndnode" onClick={() => setFileModalOpen(true)} title="Open File">
        <FaFolderOpen className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Endpoint Operations Section */}
      <span className="endpoint-label">End Point:</span>
      <div className="dndnode" onClick={onSaveEndPoint} title="Save Endpoint">
        <FaSave className="icon" />
      </div>
      <div className="dndnode" onClick={onLoadEndPoint} title="Open Endpoint">
        <FaFolderOpen className="icon" />
      </div>
    </div>
  );
};

export default ToolBoxPannel;
