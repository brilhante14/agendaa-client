import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import CardParticipante from "../../components/CardParticipante";

import editIcon from "../../assets/svg/pencilBackground.svg";

import './index.css';
import { DateComponent } from "../../components/DateComponent";
import { allDays } from "../../utils/date";

type turmaProps = {
   nome: string;
   professor: string;
   participantes: string[];
   comments: string[];
   _id: string;
   cronograma: boolean[];
   inicio: string;
   fim: string;
}

type user = {
   nome: string,
   user: string,
   email: string,
   role: string,
   _id: string
}

const Turma = () => {
   const [turmaInfo, setTurmaInfo] = useState<turmaProps>();
   const [professor, setProfessor] = useState<user>();
   const [participantes, setParticipantes] = useState<user[]>();
   const [days, setDays] = React.useState(allDays);
   const [startDate, setStartDate] = React.useState<Date | null>(null);
   const [endDate, setEndDate] = React.useState<Date | null>(null);
   const { id } = useParams();

   let user;
   const storage = localStorage.getItem("user");
   if (storage)
      user = JSON.parse(storage);
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
         setProfessor(response.data.professor);
         setParticipantes(response.data.participantes)
      })
   }, [turmaInfo])

   if (!turmaInfo || !professor || !participantes) return (<p>Loading</p>)

   return (
      <div className="turma_container">
         <div className="turma_titleContainer">
            <div style={{ display: 'flex', flexDirection: 'row' }}>

               <h1 className="turma_title">{turmaInfo.nome}</h1>
               {user.role !== "aluno" &&
                  <button className="turma_titleButton">
                     <img
                        src={editIcon}
                        alt="Ícone de lápis com background roxo"
                        className="cardParticipante_editIcon"
                     />
                  </button>
               }
            </div>
            <div style={{ width: 450 }}>
               <DateComponent days={days} startDate={startDate} endDate={endDate} handleDays={setDays} handleStartDate={setStartDate} handleEndDate={setEndDate} />
            </div>
         </div>

         <span className="turma_categories">Professor</span>
         <CardParticipante email={professor.email} nome={professor.nome} _id={professor._id} turmaId={id || ""} />
         <span className="turma_categories participantes">Participantes</span>
         <div className="turma_gridContainer">
            {participantes.map((participante) => {
               return (
                  <CardParticipante
                     email={participante.email}
                     nome={participante.nome}
                     isMonitor={participante.role === "monitor"}
                     _id={participante._id}
                     turmaId={id || ""}
                  />
               )
            })}
         </div>
      </div>
   )
}

export default Turma;