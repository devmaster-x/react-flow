import { type FC } from "react"
import ReactModal from "react-modal"
import { useModalContext } from "@/contexts/ModalContext"
import { ModalWrapperProps } from "./ModalWrapper.types"
import { IoIosClose } from "react-icons/io";
import './ModalWrapper.css'

const ModalWrapper: FC<ModalWrapperProps> = ({ children, closeModalHandler }) => {
  const { nodeModalOpen, fileModalOpen } = useModalContext();

  return (
    <ReactModal isOpen={nodeModalOpen || fileModalOpen } contentLabel="New Node" className="modal-wrapper" ariaHideApp={false}>
      {closeModalHandler && (
        <button className="close-icon" onClick={closeModalHandler}><IoIosClose /></button>
      )}
      <div className="w-full p-4 text-gray-500">{children}</div>
    </ReactModal>
  )
}

export default ModalWrapper
