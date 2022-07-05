import React from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Calendar from "../../components/Calendar";

const TurmaSelecionada: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   api(`/turma/${id}`).then(() => {

  //   })
  // }, []);
  const today = new Date();

  return <>
    <h1>Nome da Turma</h1>
    <Calendar
      initialYear={today.getFullYear()}
      initialMonth={today.getMonth()}
      navigate={(d: Date) => navigate(`./${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)}
    />
    {id}
    <Outlet />
  </>;
};

export default TurmaSelecionada;
