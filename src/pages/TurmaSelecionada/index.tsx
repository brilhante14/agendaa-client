import React from "react";
import { useParams } from "react-router-dom";

interface Props {}

const TurmaSelecionada: React.FC<Props> = () => {
  let { id } = useParams();
  return <>{id}</>;
};

export default TurmaSelecionada;
