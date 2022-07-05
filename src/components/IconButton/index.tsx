import React from "react";
import styles from "./IconButton.module.css";

interface Props {
  icon: string;
  onClick: () => void;
  showTitle: boolean;
  title: string;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "alert";
}

const IconButton: React.FC<Props> = ({
  icon,
  onClick,
  showTitle,
  title,
  type = "button",
  variant,
}) => {
  return (
    <button
      className={styles.button + " | " + styles[variant]}
      type={type}
      onClick={onClick}
      style={{ width: 95, display: "flex", justifyContent: "center" }}
    >
      <>
        <img src={icon} alt={title} />
        {showTitle && <span>{title}</span>}
      </>
    </button>
  );
};

export default IconButton;
