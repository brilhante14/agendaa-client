import React from "react";
import api from "../../api/api";

import starIcon from "../../assets/svg/star.svg";
import starFilled from "../../assets/svg/starFilled.svg";
import trashIcon from "../../assets/svg/trash.svg";

import './index.css';

type propsCardParticipante = {
   nome: string;
   email: string;
   isMonitor?: boolean;
   _id: string;
   turmaId: string
}

const CardParticipante = ({ nome, email, _id, isMonitor = false, turmaId }: propsCardParticipante) => {
   let user;
   const storage = localStorage.getItem("user");
   if (storage)
      user = JSON.parse(storage);

   const removeFromClass = async () => {
      api.post(`/turmas/${turmaId}/removeFromClass`, {
         userId: _id
      })
   }

   const alterRole = () => {
      api.patch(`/usuarios/editUser/${_id}`, {
         role: "monitor"
      });
   }

   return (
      <div className="cardParticipante_container">
         <div className="cardParticipante_profileContainer">
            <img className="cardParticipante_profilePic" src={`https://i.pravatar.cc/150?img=${Math.round(Math.random() * 50)}`} alt={"Foto de perfil"} />
            <div className="cardParticipante_info">
               <p className="cardParticipante_name">{nome}</p>
               <p className="cardParticipante_email">{email}</p>
            </div>
         </div>
         {user.role !== "aluno" ?
            <div className="cardParticipante_iconContainer">
               <button onClick={alterRole}>
                  <img
                     src={isMonitor ? starFilled : starIcon}
                     alt="Ícone de estrela"
                     className="cardParticipante_icon"
                  />
               </button>
               <button onClick={removeFromClass}>
                  <img
                     src={trashIcon}
                     alt="Ícone de lixeira"
                     className="cardParticipante_icon"
                  />
               </button>
            </div>
            :
            <div className="cardParticipante_iconContainer">
               {isMonitor &&
                  <img
                     src={starFilled}
                     alt="Ícone de estrela"
                     className="cardParticipante_icon"
                  />
               }
            </div>
         }



      </div>
   );
}

export default CardParticipante;