import React from "react";
import styles from "./IconButton.module.css";

interface Props {
  icon: string;
  onClick: () => void;
  showTitle: boolean;
  title: string;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "alert" | "noBackground";
  width?: number;
}

const IconButton: React.FC<Props> = ({
  icon,
  onClick,
  showTitle,
  title,
  type = "button",
  variant,
  width
}) => {
  return (
    <button
      className={styles.button + " | " + styles[variant]}
      type={type}
      onClick={onClick}
      style={{ width: width ? width : 100, display: "flex", justifyContent: "center" }}
    >
      <>
        <img src={icon} alt={title} />
        {showTitle && <span>{title}</span>}
      </>
    </button>
  );
};

export default IconButton;
