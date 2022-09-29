import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { PropsParticipantes, PropsProfessor, PropsTurma } from "../../types";

import "./index.css";





const CardTurma: React.FC<PropsTurma> = ( turma ) => {
  const [professor, setProfessor] = useState<PropsProfessor>(
    {} as PropsProfessor
  );
  const [photo, setPhoto] = useState("");
  const [participantes, setParticipantes] = useState<PropsParticipantes>(
    [] as PropsParticipantes
  );

  let user: any;
  const storage = localStorage.getItem("user");
  if (storage) {
    user = JSON.parse(storage);
  }

  function handleClass() {
    api
      .post(`/turmas/${turma.id}/joinClass`, {
        userId: String(user.id),
      })
      .then(() => {
        window.location.href = "home";
      });
  }

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

  const isInClass = participantes.some(
    (participante: any) => participante.userId === user.id
  );

  return (
    <div className="turma_card" key={turma.id}>
      <div className="turma_cardHeader">
        <img
          src={photo}
          alt={"Foto de perfil"}
          style={{ width: 24, height: 24, borderRadius: "50%" }}
        />
        <span title={professor.name}>{professor.name}</span>
      </div>
      <p title={turma.name}>{turma.name}</p>
      <hr color="#DBCCCC" />
      <div className="turmas_cardFooter">
        <span>{`${participantes.length} Participantes`}</span>
        <button
          className="turmas_cardButton"
          disabled={isInClass}
          onClick={handleClass}
        >
          {isInClass ? "Membro" : "Entrar"}
        </button>
      </div>
    </div>
  );
};

export default CardTurma;
