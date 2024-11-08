import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import "./NodeStyles.css";

type OutputNode = Node<{ label: string }, "m_output">;

const OutputNode = ({ data, selected }: NodeProps<OutputNode>) => {
  return (
    <div className={`node output-node${selected ? " selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-label">
        <strong>{data.label}</strong>
      </div>
    </div>
  );
};

export default memo(OutputNode);
