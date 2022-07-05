import React from "react";
import styles from "./IconButton.module.css";

interface Props {
  icon: string;
  onClick: () => void;
  showTitle: boolean;
  title: string;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "alert" | "noBackground" | "toggleable";
  width?: number;
  isToggled?: boolean;
}

const IconButton: React.FC<Props> = ({
  icon,
  onClick,
  showTitle,
  title,
  type = "button",
  variant,
  width,
  isToggled = false,
}) => {
  return (
    <button
      className={styles.button + " | " + styles[variant] + " | " + (isToggled ? styles.toggled : "")}
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
