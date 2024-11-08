"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { NodeType } from "@/components/nodes/type";

type ContextType = {
  currentNode: NodeType | null;
  newNode: NodeType | null;
  setCurrentNode: (_new: NodeType | null) => void;
  setNewNode: (_new: NodeType | null) => void;
};

const NodeContext = createContext<ContextType>({} as ContextType);

export const NodeContextProvider = ({ children }: PropsWithChildren) => {  
  const [currentNode, setCurrentNode] = useState<NodeType | null>(null);
  const [newNode, setNewNode] = useState<NodeType | null>(null);
  const value = useMemo(() => {
    return { currentNode, newNode, setCurrentNode, setNewNode };
  }, [currentNode, newNode]);

  return <NodeContext.Provider value={value}>{children}</NodeContext.Provider>;
};

export default NodeContext;

export const useNodeContext = () => {
  return useContext(NodeContext);
};
