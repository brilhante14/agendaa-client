import React, { MouseEventHandler, useEffect, useState } from "react";
import api from "../../api/api";
import { PropsParticipantes, PropsProfessor, PropsTurma } from "../../types";
import styles from "./Turma.module.css";

interface Props {
  turma: PropsTurma;
  onClick: MouseEventHandler;
}

const Turma: React.FC<Props> = ({ turma, onClick }) => {


  const [professor, setProfessor] = useState<PropsProfessor>(
    {} as PropsProfessor
  );
  const [photo, setPhoto] = useState("");
  const [participantes, setParticipantes] = useState<PropsParticipantes>(
    [] as PropsParticipantes
  );

  useEffect(() => {
    api
      .post("/usuarios/getParticipantes", {
        idTurma: turma.id,
      })
      .then((response) => {
 
        setParticipantes(response.data.participantes);
        setProfessor(response.data.professor[0]);
        setPhoto(response.data.professor[0].photo);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  return (
    <div className={styles.turma}>
      <div>
        <header className={styles.header}>
          <div className={styles.imgWrapper}>
            <img
              src={professor.photo}
              alt={professor.name}
            />
          </div>
          <h2 style={{ color: "black" }}>Professor: {professor.name}</h2>
        </header>
        <main>
          <h1 className={styles.name}>{turma.name}</h1>
          <div className={styles.participantes}>
            {participantes.map((participante) => (
              <div className={styles.imgWrapper} key={participante.name}>
                <img
                  src={participante.photo}
                  alt={participante.name}
                />
              </div>
            ))}
          </div>
        </main>
        <footer className={styles.footer}>
          <h3>{participantes.length} participantes</h3>
          <button onClick={onClick}>Acessar</button>
        </footer>
      </div>
    </div>
  );
};

export default Turma;
