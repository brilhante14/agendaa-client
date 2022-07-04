import React from "react";

import starIcon from "../../assets/svg/star.svg";
import starFilled from "../../assets/svg/starFilled.svg";
import trashIcon from "../../assets/svg/trash.svg";

import './index.css';

type propsCardParticipante = {
   fotoPerfil?: string;
   nome: string;
   email: string
}

const CardParticipante = ({nome, email, fotoPerfil}: propsCardParticipante) => {

   return(
      <div className="cardParticipante_container">
         <div className="cardParticipante_profileContainer">
            {fotoPerfil ? 
               <span className="cardParticipante_profilePic" />
            :
               <span className="cardParticipante_profilePic" />
            }
            <div className="cardParticipante_info">
               <p className="cardParticipante_name">{nome}</p>   
               <p className="cardParticipante_email">{email}</p>   
            </div>
         </div>
         <div className="cardParticipante_iconContainer">
            <img
               src={starIcon}
               alt="Ícone de estrela"
               className="cardParticipante_icon"
            />
            <img
               src={trashIcon}
               alt="Ícone de lixeira"
               className="cardParticipante_icon"
            />
         </div>

      </div>
   );
}

export default CardParticipante;