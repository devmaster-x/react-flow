import { ModalWrapperProps } from "../ModalWrapper.types"

export interface OpenFileModalProps extends ModalWrapperProps {
  onLoad: (e: React.ChangeEvent<HTMLInputElement>) => void
  closeModalHandler: () => void
}
