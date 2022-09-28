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

  const updateFaltas = async (method: string) => {
    api
      .post(`/${idTurma}/setFaltas`, {
        userId: user?._id,
        faltas,
      })
      .then((response) => {
        if (response.status === 200) {
          if (method === "add") {
            setFaltas(faltas !== 8 ? faltas + 1 : faltas);
          }else {
            setFaltas(faltas !== 0 ? faltas - 1 : 0)
          }
        }else {
            alert('Erro ao atualizar faltas!')
        }
      });
  };

  const handleGetFaltas = async () => {
    api
    .post(`/${idTurma}/getFaltas`, {
      userId: user?._id,
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setFaltas(data.Faltas);
      }else {
          alert('Erro ao buscar faltas!')
      }
    });
  }


  useEffect(()=> {
    handleGetFaltas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="container-ControlaFaltas">
      <h1>Total de faltas:</h1>
      <div className="container-buttons">
        <button
          className="content-button"
          onClick={() =>updateFaltas('') }
        >
          <p className="p">-</p>
        </button>{" "}
        <span>
          {faltas} / {faltasPermitidas}
        </span>{" "}
        <button className="content-button" onClick={() =>updateFaltas('add')}>
          <p className="p">+</p>
        </button>
      </div>
    </div>
  );
}

export default ControlaFaltas;
