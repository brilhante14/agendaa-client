import React, { MouseEventHandler } from "react";
import styles from "./Turma.module.css";

interface Props {
  turma: {
    nome: string;
    professor: string;
    participantes: Array<string>;
  };
  onClick: MouseEventHandler;
}

/**
 * Componente para ser mostrado na seleção de turmas
 *
 * @component
 * @param turma objeto contendo detalhes da turma
 * @todo obter as imagens dos participantes e do professor dinamicamente
 */
const Turma: React.FC<Props> = ({ turma, onClick }) => {
  return (
    <div className={styles.turma}>
      <div>
        <header className={styles.header}>
          <div className={styles.imgWrapper}>
            <img
              src={`https://i.pravatar.cc/150?img=${Math.round(
                Math.random() * 50
              )}`}
              alt={turma.professor}
            />
          </div>
          <h2>Professor: {turma.professor}</h2>
        </header>
        <main>
          <h1 className={styles.name}>{turma.nome}</h1>
          <div className={styles.participantes}>
            {turma.participantes.map((participante) => (
              <div className={styles.imgWrapper} key={participante}>
                <img
                  src={`https://i.pravatar.cc/150?img=${Math.round(
                    Math.random() * 50
                  )}`}
                  alt=""
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
