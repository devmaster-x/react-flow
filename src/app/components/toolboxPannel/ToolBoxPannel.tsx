import { useDnD } from "@/contexts/DnDContext";
import { TfiLayoutWidthDefault } from "react-icons/tfi";
import { FcViewDetails } from "react-icons/fc";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";

import "./ToolBoxPannel.css";

const ToolBoxPannel = () => {
  const { setType } = useDnD();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="toolbox-horizontal">
      {/* Create Node Buttons */}
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
        title="Create Input Node"
      >
        <CiInboxOut className="icon" />
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
        title="Create Default Node"
      >
        <TfiLayoutWidthDefault className="icon" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
        title="Create Output Node"
      >
        <CiInboxIn className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Operation Buttons */}
      <div className="dndnode" onClick={() => {}} title="Edit Node">
        <FaEdit className="icon" />
      </div>
      <div className="dndnode" onClick={() => {}} title="Delete Node">
        <FaTrash className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Info Button */}
      <div className="dndnode" onClick={() => {}} title="Show Details">
        <FcViewDetails className="icon" />
      </div>
    </div>
  );
};

export default ToolBoxPannel;
