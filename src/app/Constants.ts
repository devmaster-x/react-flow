import { NodeType, EdgeType } from "@/components/nodes/type";
export const initialNodes: NodeType[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "m_input",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
    type: "m_default"
  },
  {
    id: "3",
    position: { x: 200, y: 100 },
    data: { label: "Node 3" },
    type: "m_output",
  },
];

export const initialEdges: EdgeType[] = [{ id: "e1-2", source: "1", target: "2" }];
