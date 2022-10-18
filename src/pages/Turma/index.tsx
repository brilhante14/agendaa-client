import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import CardParticipante from "../../components/CardParticipante";

import editIcon from "../../assets/svg/pencilBackground.svg";

import './index.css';
import { DateComponent } from "../../components/DateComponent";
import { allDays } from "../../utils/date";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

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
   _id: string,
   photo: string
}

const Turma = () => {
   const [turmaInfo, setTurmaInfo] = useState<turmaProps>();
   const [professor, setProfessor] = useState<user>();
   const [participantes, setParticipantes] = useState<user[]>();
   const [days, setDays] = React.useState(allDays);

   const [edit, setEdit] = React.useState(false);
   const [editedName, setEditedName] = React.useState("");
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

      const daysToChange = days;
      turmaInfo?.cronograma.forEach((day, index) => {
         days[index].active = day;
      })
      setDays(daysToChange);

      if (turmaInfo) {
         setStartDate(new Date(turmaInfo.inicio));
         setEndDate(new Date(turmaInfo.fim));
      }
   }, [turmaInfo])

   const handlePatchingClass = () => {
      const cronograma: boolean[] = [];
      days.forEach((day) => cronograma.push(day.active));

      api.patch(`/turmas/${id}/editTurma`, {
         inicio: startDate,
         fim: endDate,
         cronograma,
         nome: editedName ? editedName : turmaInfo?.nome
      })
      
      setEdit(false)
   }

   const handleFinishClass = () => {
      api.get(`/turmas/${id}/finishTurma`)
   }

   if (!turmaInfo || !professor || !participantes) return (<p>Loading</p>)
   return (
      <div className="turma_container">
         <div className="turma_titleContainer">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
               {
                  edit ?
                     <TextInput onChange={(e: any) => { setEditedName(e.target.value) }} value={editedName} placeholder="Nome da turma" />
                     :
                     <h1 className="turma_title">{turmaInfo.nome}</h1>

               }
               {user.role !== "aluno" &&
                  <button className="turma_titleButton" onClick={() => { setEdit(true); setEditedName(turmaInfo.nome) }}>
                     <img
                        src={editIcon}
                        alt="Ícone de lápis com background roxo"
                        className="cardParticipante_editIcon"
                     />
                  </button>
               }
            </div>
            {user.role !== "aluno" &&
               <div style={{ width: 500, display: 'flex' }}>
                  <div>
                     <DateComponent days={days} startDate={startDate} endDate={endDate} handleDays={setDays} handleStartDate={setStartDate} handleEndDate={setEndDate} />
                  </div>
                  <div style={{ marginLeft: 20, gap: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                     <Button onClick={handlePatchingClass} title={"Salvar alteração"} size={{ width: 148, height: 38 }} backgroundColor={"#656ED3"} />
                     <Button onClick={handleFinishClass} title={"Finalizar turma"} size={{ width: 148, height: 38 }} backgroundColor={"#FB6262"} />
                  </div>
               </div>
            }
         </div>

         <span className="turma_categories">Professor</span>
         <CardParticipante email={professor.email} nome={professor.nome} _id={professor._id} turmaId={id || ""} isProfessor={true} image={professor.photo} />
         <span className="turma_categories participantes">Participantes</span>
         <div className="turma_gridContainer">
            {participantes.map((participante, index) => {
               return (
                  <CardParticipante
                     key={index}
                     image={participante.photo}
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