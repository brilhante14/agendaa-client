import React from "react";
import styles from "./NenhumaTurma.module.css";
import thinking from "../../assets/thinking.png";
import { ClassModal } from "../../components/Modal/ClassModal";

const NenhumaTurma = () => {
  return (
    <div className={styles.content}>
      <img src={thinking} alt="" />
      <h3 className={styles.title}>Nenhuma Turma Selecionada</h3>
      <h4>Selecione uma para ver os detalhes!</h4>
    </div>
  );
};

export default NenhumaTurma;
