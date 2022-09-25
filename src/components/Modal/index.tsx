import { ReactNodeLike } from "prop-types";
import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

import './styles.css'

interface props {
  children: ReactNodeLike;
  handleOpen: (status: boolean) => void;
}



const Modal: React.FC<props> = ({ children, handleOpen }) => {
  return (
    <div className="modalComponentModalHandler">
      <div className="modalComponentContainer">
        <div className="modalComponentContainerCloseButton" onClick={() => handleOpen(false)}>
          <button className="modalComponentContainerButton" onClick={() => handleOpen(false)}>X</button>
        </div>
        {children}
      </div>
    </div>
  )
};

export default Modal;
