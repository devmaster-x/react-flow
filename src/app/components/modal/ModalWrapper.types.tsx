import { PropsWithChildren } from "react"

export type ModalWrapperProps = PropsWithChildren<
  {
    closeModalHandler?: () => void
  }
>
