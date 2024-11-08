import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import "./NodeStyles.css";

type DefaultNode = Node<{ label: string }, "m_default">;

const DefaultNode = ({ data, selected }: NodeProps<DefaultNode>) => {
  return (
    <div className={`node default-node${selected ? " selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-label">
        <strong>{data.label}</strong>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(DefaultNode);
