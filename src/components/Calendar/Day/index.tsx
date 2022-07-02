import React from "react";
import styles from "./Day.module.css";

interface Props {
  day: number;
  hasClass: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Day: React.FC<Props> = ({ day, hasClass, isSelected }) => {
  const className =
    styles.day +
    (hasClass
      ? " | " + styles.hasClass + (isSelected ? " | " + styles.selected : "")
      : "");
  return <button className={className}>{day}</button>;
};

export default Day;
