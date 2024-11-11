import { FC, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { EditNodeModalProps } from "./EditNodeModal.types";
import { useNodeContext } from "@/contexts/NodeContext";
import { NodeType } from "@/components/nodes/type";
import { toast } from "react-toastify";
import "./EditNodeModal.css";

const EditNodeModal: FC<EditNodeModalProps> = ({ addNode, updateNode, closeModalHandler }) => {
  const { currentNode, newNode, setNewNode } = useNodeContext();
  const [nodeName, setNodeName] = useState(!newNode ? !currentNode ? "" : currentNode.data.label : newNode.id);

  const actionHandler = () => {
    if (!nodeName) {
      toast.error("You should input a new Node Name.");
    } else {
      if (newNode) {
        const _newNode: NodeType = {
          ...newNode,
          data: {
            label: nodeName,
          },
        };
        setNewNode(null);
        addNode(_newNode);
      } else if(currentNode) {
        const _newNode: NodeType = {
          ...currentNode,
          data: {
            label: nodeName,
          },
        };
        updateNode(_newNode);
      } else {
        toast.error("Creating Node Error!");
      }
      closeModalHandler();
    }
  };

  return (
    <ModalWrapper closeModalHandler={closeModalHandler}>
      <div className="add-node-modal-content">
        <h3 className="modal-title">{newNode == null ? 'Modify Node' : 'Create Node'}</h3>
        <label htmlFor="newnodename" className="modal-label">
          Input Node Name:
        </label>
        <input
          type="text"
          id="newnodename"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          className="modal-input"
          placeholder="Enter node name..."
        />
        <button className="modal-submit-button" onClick={actionHandler}>
          Submit
        </button>
      </div>
    </ModalWrapper>
  );
};

export default EditNodeModal;
