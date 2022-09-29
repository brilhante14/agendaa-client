import {  useEffect, useState } from "react";
import api from "../../api/api";
import "./styles.css";

type PropsControlaFaltas = {
  faltasPermitidas: number;
  idTurma: number;
 
};
function ControlaFaltas({
  faltasPermitidas,
  idTurma,

}: PropsControlaFaltas) {
  const [faltas, setFaltas] = useState(0);
  

  let user: any = {};
   const storage = localStorage.getItem("user");
   if (storage)
      user = JSON.parse(storage);
  
  const updateFaltas = async (method: string, qtdFaltas: number) => {
   if(qtdFaltas < 0)  return
    api
      .post(`turmas/${idTurma}/setFaltas`, {
        userId: user?.userId,
        faltas:qtdFaltas,
      })
      .then((response) => {
        if (response.status === 200) {
          if (method === "add") {
            setFaltas(qtdFaltas !== faltasPermitidas ? qtdFaltas : faltas);
          }else {
            setFaltas(qtdFaltas === 0 ?   0 :qtdFaltas)
          }
        }else {
            alert('Erro ao atualizar faltas!')
        }
      });
  };
  

  const handleGetFaltas = async () => {
   
    api
    .post(`turmas/${idTurma}/getFaltas`, {
      userId: user?.userId,
    })
    .then((response) => {

      if (response.status === 200) {
        const data = response.data;
   /*      setFaltas(data.Faltas); */
   setFaltas(0)
      }else {
          alert('Erro ao buscar faltas!')
      }
    });
  }


  useEffect(()=> {
    handleGetFaltas()
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTurma])


  return (
    <div className="container-ControlaFaltas">
      <h1>Total de faltas:</h1>
      <div className="container-buttons">
        <button
          className="content-button"
          onClick={() =>updateFaltas('', faltas - 1) }
        >
          <p className="p">-</p>
        </button>{" "}
        <span>
          {faltas} / {faltasPermitidas}
        </span>{" "}
        <button className="content-button" onClick={() =>updateFaltas('add' , faltas +1)}>
          <p className="p">+</p>
        </button>
      </div>
    </div>
  );
}

export default ControlaFaltas;
