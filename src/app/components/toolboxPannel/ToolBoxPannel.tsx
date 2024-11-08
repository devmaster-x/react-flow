import { type FC } from 'react';
import { TfiLayoutWidthDefault } from "react-icons/tfi";
import { FaTrash, FaEdit, FaEye, FaEyeSlash, FaSave, FaFolderOpen } from "react-icons/fa";
import { MdInput, MdOutput } from "react-icons/md";
import { useDnD } from "@/contexts/DnDContext";
import { useModalContext } from "@/contexts/ModalContext";
import { useNodeContext } from "@/contexts/NodeContext";
import { ToolBoxPannelProps } from "./ToolBoxPannel.type";
import "./ToolBoxPannel.css";

const ToolBoxPannel: FC<ToolBoxPannelProps> = ( { deleteNode, onSave } ) => {
  const { setType } = useDnD();
  const { visibleDetailBar, setVisibleDetailBar, setNodeModalOpen, setFileModalOpen } = useModalContext();
  const { currentNode } = useNodeContext();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onEditNode = () => {
    setNodeModalOpen(true);
  }

  return (
    <div className="toolbox-horizontal">
      {/* Create Node Buttons */}
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "m_input")}
        draggable
        title="Create Input Node"
      >
        <MdInput className="icon" />
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "m_default")}
        draggable
        title="Create Default Node"
      >
        <TfiLayoutWidthDefault className="icon" />
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "m_output")}
        draggable
        title="Create Output Node"
      >
        <MdOutput className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Operation Buttons */}
      <div className={`dndnode ${currentNode==null ? 'disabled': ''}`} onClick={onEditNode} title="Edit Node">
        <FaEdit className="icon" />
      </div>
      <div className={`dndnode ${currentNode==null ? 'disabled': ''}`} onClick={deleteNode} title="Delete Node">
        <FaTrash className="icon" />
      </div>

      {/* Separator */}
      <div className="separator"></div>

      {/* Info Button */}
      <div className="dndnode" onClick={() => {setVisibleDetailBar(!visibleDetailBar)}} title="Show Details">
        {visibleDetailBar 
          ? <FaEyeSlash className="icon" />
          : <FaEye className="icon" />
        }
      </div>

      {/* Separator */}
      <div className="separator"></div>

      <div className="dndnode" onClick={onSave} title="Save">
        <FaSave className="icon" />
      </div>
      <div className="dndnode" onClick={()=> setFileModalOpen(true)} title="Open">
        <FaFolderOpen className='icon'/>
      </div>

    </div>
  );
};

export default ToolBoxPannel;
