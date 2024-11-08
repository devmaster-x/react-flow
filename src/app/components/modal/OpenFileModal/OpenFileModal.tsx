import { FC } from "react";
import ModalWrapper from "../ModalWrapper";
import { OpenFileModalProps } from "./OpenFileModal.types";
import "./OpenFileModal.css";

const OpenFileModal: FC<OpenFileModalProps> = ({ onLoad, closeModalHandler }) => {

  return (
    <ModalWrapper closeModalHandler={closeModalHandler}>
      <div className="add-node-modal-content">
        <h3 className="modal-title">Load From File</h3>
        <label htmlFor="newnodename" className="modal-label">
          Select File:
        </label>
        <input type="file" accept=".json" onChange={onLoad} />
      </div>
    </ModalWrapper>
  );
};

export default OpenFileModal;
