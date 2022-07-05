import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import add from "../../assets/new_topic_purple.png";
import api from "../../api/api";
import styles from "./TurmaSelecionada.module.css";
import Calendar from "../../components/Calendar";
import Atividades from "../../components/Atividades";
import Material from "../../components/Material";
import { Forum } from "../../components/Forum";
import { ModalMaterial } from "../../components/Modal/ModalMaterial";

interface Mat {
  nome: string;
  author: string;
  link: string;
  _id: string;
}

const TurmaSelecionada: React.FC = () => {
  const [nome, setNome] = useState("Carregando...");
  const [diasAula, setDiasAula] = useState<Array<number>>([]);
  const [materials, setMaterials] = useState<Array<Mat>>([]);
  const [addMaterial, setAddMaterial] = React.useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api(`/turmas/${id}`).then((res) => {
      setDiasAula(
        res.data.cronograma
          .map((x: boolean, i: number) => (x ? i + 1 : x))
          .filter((x: boolean) => x)
      );
      setNome(res.data.nome);
      api.get(`/materiais/${id}`).then((res) => {
        setMaterials(res.data)
      })
    });
  }, [id]);
  function handleDelete(id: string) {
    api.delete(`/materiais/${id}`).then(() => {
    })
  }
  const today = new Date();
  return (
    <div className={styles.container}>
      <h1 className={styles.className}>{nome}</h1>
      <h1 className={styles.subtitle}>Faltas Atuais: 3/12 | Média atual: 2.0 </h1>
      <div style={{ display: "flex" }}>
        <Calendar
          initialYear={today.getFullYear()}
          initialMonth={today.getMonth()}
          navigate={(d: Date) =>
            navigate(`./${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)
          }
          weekdays={diasAula}
        />

        <Atividades />
      </div>
      <div>
        <Outlet />
      </div>
      <div className={styles.materiais}>
        <h2>Materiais</h2>
        <div className={styles.materialList}>
          <button className={styles.addMaterial} onClick={() => { setAddMaterial(true) }}>
            <img src={add} alt="" />
            Adicionar Material
          </button>
          {materials.map((material) => (
            <Material
              nome={material.nome}
              link={material.link}
              autor={material.author}
              deleteItem={() => handleDelete(material._id)}
            />
          ))}
        </div>
      </div>
      <Forum id={id} />
      {
        addMaterial && <ModalMaterial isOpen={addMaterial} id={id} />
      }
    </div>
  );
};

export default TurmaSelecionada;
