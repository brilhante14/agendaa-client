import React, { MouseEventHandler } from "react";
import styles from "./Turma.module.css";

interface Props {
  turma: {
    nome: string;
    professor: {
      nome: string;
      img: string;
    };
    participantes: Array<{
      nome: string;
      img: string;
    }>;
  };
  onClick: MouseEventHandler;
}

/**
 * Componente para ser mostrado na seleção de turmas
 *
 * @component
 * @param turma objeto contendo detalhes da turma
 */
const Turma: React.FC<Props> = ({ turma, onClick }) => {
  return (
    <div className={styles.turma}>
      <div>
        <header className={styles.header}>
          <div className={styles.imgWrapper}>
            <img
              src={turma.professor.img}
              alt={turma.professor.nome}
            />
          </div>
          <h2 style={{ color: "black" }}>Professor: {turma.professor.nome}</h2>
        </header>
        <main>
          <h1 className={styles.name}>{turma.nome}</h1>
          <div className={styles.participantes}>
            {turma.participantes.map((participante) => (
              <div className={styles.imgWrapper} key={participante.nome}>
                <img
                  src={participante.img}
                  alt={participante.nome}
                />
              </div>
            ))}
          </div>
        </main>
        <footer className={styles.footer}>
          <h3>{turma.participantes.length} participantes</h3>
          <button onClick={onClick}>Acessar</button>
        </footer>
      </div>
    </div>
  );
};

export default Turma;
