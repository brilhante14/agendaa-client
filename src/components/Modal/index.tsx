import { ReactNodeLike } from "prop-types";
import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface props {
  isOpen: boolean;
  children: ReactNodeLike;
  root?: HTMLElement;
}

const Modal: React.FC<props> = ({ isOpen, children, root }) => {
  const modal = (
    <dialog open={isOpen} className={styles.dialog}>
      {children}
    </dialog>
  );

  useEffect(() => {
    if (modal instanceof HTMLDialogElement)
      if (isOpen) modal.show();
      else modal.close();
  });

  return root ? createPortal(modal, root) : modal;
};

export default Modal;
