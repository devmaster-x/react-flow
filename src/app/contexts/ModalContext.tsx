"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type ContextType = {
  fileModalOpen: boolean;
  nodeModalOpen: boolean;
  edgeModalOpen: boolean;
  visibleDetailBar: boolean;
  setFileModalOpen: (_f: boolean) => void;
  setNodeModalOpen: (_f: boolean) => void;
  setEdgeModalOpen: (_f: boolean) => void;
  setVisibleDetailBar: (_f: boolean) => void;
};

const ModalContext = createContext<ContextType>({} as ContextType);

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [nodeModalOpen, setNodeModalOpen] = useState(false);
  const [edgeModalOpen, setEdgeModalOpen] = useState(false);
  const [visibleDetailBar, setVisibleDetailBar] = useState(false);

  const value = useMemo(() => {
    return { fileModalOpen, nodeModalOpen, edgeModalOpen, visibleDetailBar, setFileModalOpen, setNodeModalOpen, setEdgeModalOpen, setVisibleDetailBar };
  }, [nodeModalOpen, edgeModalOpen, visibleDetailBar, fileModalOpen]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export default ModalContext;

export const useModalContext = () => {
  return useContext(ModalContext);
};
