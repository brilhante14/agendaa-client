import React from "react";
import styles from "./Day.module.css";

interface Props {
  day: number;
  hasClass: boolean;
  isSelected: boolean;
  onClick: () => void;
  column: number;
}

const Day: React.FC<Props> = ({
  day,
  hasClass,
  isSelected,
  onClick,
  column,
}) => {
  const className =
    styles.day +
    (hasClass
      ? " | " + styles.hasClass + (isSelected ? " | " + styles.selected : "")
      : "");
  return (
    <button
      className={className}
      style={{
        gridColumnStart: column,
      }}
      onClick={onClick}
    >
      {day}
    </button>
  );
};

export default Day;
