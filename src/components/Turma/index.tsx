import React, { MouseEventHandler } from "react";
import styles from "./Turma.module.css";

interface Turma {
  nome: string;
  professor: string;
  participantes: number;
}

/**
 * Componente para ser mostrado na seleção de turmas
 *
 * @component
 * @param {Turma} turma objeto contendo detalhes da turma
 * @todo obter as imagens dos participantes e do professor dinamicamente
 */
const Turma = ({
  turma,
  onClick,
}: {
  turma: Turma;
  onClick: MouseEventHandler;
}) => {
  const participantes = ["#", "#", "#"];
  const imagemProfessor = "#";

  return (
    <div className={styles.turma}>
      <div>
        <header className={styles.header}>
          <div className={styles.imgWrapper + " " + styles.professor}>
            <img src={imagemProfessor} alt="" />
          </div>
          <h2>Professor: {turma.professor}</h2>
        </header>
        <main>
          <h1 className={styles.name}>{turma.nome}</h1>
          <div className={styles.participantes}>
            {participantes.map((participante) => (
              <div className={styles.imgWrapper + " " + styles.aluno}>
                <img src={participante} alt="" />
              </div>
            ))}
          </div>
        </main>
        <footer className={styles.footer}>
          <h3>{turma.participantes} participantes</h3>
          <button onClick={onClick}>Acessar</button>
        </footer>
      </div>
    </div>
  );
};

export default Turma;
