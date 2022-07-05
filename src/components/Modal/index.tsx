import { ReactNodeLike } from "prop-types";
import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
// import styles from "./modal.module.css";
import { ModalHandler, Container, CloseButton, Button } from './styles'

interface props {
  isOpen: boolean;
  children: ReactNodeLike;
  root?: HTMLElement;
  handleOpen: (status: boolean) => void;
}



const Modal: React.FC<props> = ({ isOpen, children, root, handleOpen }) => {
  // const modal = (
  //   <div className={styles.modal}>
  //     <dialog open={isOpen} className={styles.dialog}>
  //       {children}
  //     </dialog>
  //   </div>
  // );

  // useEffect(() => {
  //   if (modal instanceof HTMLDialogElement)
  //     if (isOpen) modal.show();
  //     else modal.close();
  // });

  return (
    <ModalHandler>
      <Container>
        <CloseButton onClick={() => handleOpen(false)}>
          <Button onClick={() => handleOpen(false)}>X</Button>
        </CloseButton>
        {children}
      </Container>
    </ModalHandler>
  )
};

export default Modal;
