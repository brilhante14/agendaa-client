import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import CardParticipante from "../../components/CardParticipante";

import editIcon from "../../assets/svg/pencilBackground.svg";

import './index.css';

type turmaProps = {
   nome: string;
   professor: string;
   participantes: string[];
   comments: string[];
   id: string;
}

type user = {
   nome: string,
   user: string,
   email: string,
}

const Turma = () => {
   const [turmaInfo, setTurmaInfo] = useState<turmaProps>();
   const [professor, setProfessor] = useState<user>();
   const [participantes, setParticipantes] = useState<user[]>();

   let { id } = useParams();

   useEffect(() => {
      async function fetchData() {
        const response = await api.get(`/turmas/${id}`);
        return response;
      }
  
      fetchData().then((response) => setTurmaInfo(response.data));
   }, [id]);

   useEffect(() => {
      async function fetchParticipantes() {
         const response = await api.post("usuarios/getParticipantes", {
            idProfessor: turmaInfo?.professor,
            listParticipantes: turmaInfo?.participantes
         })
         return response;
      }

      fetchParticipantes().then((response) => {
         setProfessor(response.data.pop());
         setParticipantes(response.data)
      })
   }, [turmaInfo])

   if(!turmaInfo || !professor || !participantes) return (<p>Loading</p>)

   return(
      <div className="turma_container">
         <div className="turma_titleContainer">
            <h1 className="turma_title">{turmaInfo.nome}</h1>
            <button className="turma_titleButton">
               <img
                     src={editIcon}
                     alt="Ícone de lápis com background roxo"
                     className="cardParticipante_editIcon"
                  />
               </button>
         </div>
         
         <span className="turma_categories">Professor</span>
         <CardParticipante email={professor.email} nome={professor.nome} />
         <span className="turma_categories participantes">Participantes</span>
         <div className="turma_gridContainer"> 
            {participantes.map((participante) => {
               return(
                  <CardParticipante email={participante.email} nome={participante.nome} />
               )
            })}
         </div>
      </div>
   )
}

export default Turma;