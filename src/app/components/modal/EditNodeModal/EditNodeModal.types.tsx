import { ModalWrapperProps } from "../ModalWrapper.types"
import { NodeType } from "@/components/nodes/type"

export interface EditNodeModalProps extends ModalWrapperProps {
  addNode: (_new : NodeType) => void
  updateNode: (_new : NodeType) => void
  closeModalHandler: () => void
}
