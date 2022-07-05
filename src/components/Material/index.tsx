import React from "react";
import draft from "../../assets/svg/draft.svg";
import styles from "./Material.module.css";

interface Props {
  nome: string;
  link: string;
  autor: string;
  deleteItem?: () => void;
}

const Material: React.FC<Props> = ({ nome, link, autor, deleteItem }) => {
  return (
    <a className={styles.material} href={link}>
      {deleteItem && (
        <button className={styles.delete} onClick={deleteItem}>
          X
        </button>
      )}
      <img src={draft} alt="" />
      <span className={styles.name}>{nome}</span>
      <span className={styles.author}>{autor}</span>
    </a>
  );
};

export default Material;
