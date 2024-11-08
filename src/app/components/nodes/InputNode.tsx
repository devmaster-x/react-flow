import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import { useNodeContext } from "@/contexts/NodeContext";
import "./NodeStyles.css";

type InputNode = Node<{ label: string }, "m_input">;

const InputNode = ({ data, selected }: NodeProps<InputNode>) => {
  const { setCurrentNode } = useNodeContext();

  return (
    <div className={`node input-node${selected ? " selected" : ""}`} onClick={()=>{setCurrentNode(null)}}>
      <div className="node-label">
        <strong>{data.label}</strong>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(InputNode);
