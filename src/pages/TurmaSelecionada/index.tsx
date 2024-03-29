import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import add from "../../assets/new_topic_purple.png";
import api from "../../api/api";
import styles from "./TurmaSelecionada.module.css";
import Calendar from "../../components/Calendar";
import Atividades from "../../components/Atividades";
import Material from "../../components/Material";
import { Forum } from "../../components/Forum";
import { ModalMaterial } from "../../components/Modal/ModalMaterial";
import settingIcon from "../../assets/svg/settings.svg";
import ControlaFaltas from "../../components/ControlaFaltas";

interface Mat {
  nome: string;
  authorId: number;
  link: string;
  id: number;
}

const TurmaSelecionada: React.FC = () => {
  const [nome, setNome] = useState("Carregando...");
  const [diasAula, setDiasAula] = useState<Array<number>>([]);
  const [faltas, setFaltas] = useState(0);
  const [materials, setMaterials] = useState<Array<Mat>>([]);
  const [addMaterial, setAddMaterial] = React.useState(false);
  const [apiCalled, setApiCalled] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    api.get(`/turmas/${id}`).then((res) => {
      const turma = res.data[0]

      setFaltas(turma.faltasPermitidas);
      setNome(turma.name);

      if (turma.cronograma) {
        setDiasAula(
          turma?.cronograma
            .map((x: boolean, i: number) => (x ? i + 1 : x))
            .filter((x: boolean) => x)
        );
      }
    });
    api.get(`/materiais/${id}`).then((res) => {

      setMaterials(res.data);
    });
  }, [id, apiCalled, addMaterial]);

  function refreshMaterials() {
    api.get(`/materiais/${id}`).then((res) => {

      setMaterials(res.data);
    });
  }

  function handleDelete(id: number) {
    window.confirm("Deseja realmente excluir o material?") &&
      api.delete(`/materiais/${id}`).then(() => { refreshMaterials() });
    setApiCalled(!apiCalled);
  }

  function handleCreateMaterial(show: boolean) {
    setAddMaterial(show);
    setApiCalled(!apiCalled);
  }
  function handleTopic() {
    setApiCalled(!apiCalled);
  }
  const today = new Date();
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className={styles.className}>{nome}</h1>
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={() => navigate(`/turma/${id}`)}
        >
          <img
            src={settingIcon}
            alt="Setting Button"
            className="turmaSelecionada_settingIcon"
          />
        </button>
      </div>
      <div className={styles.containerFaltas}>
        <ControlaFaltas faltasPermitidas={faltas} idTurma={Number(id) ?? 0} />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
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
      <div className={styles.materiais}>
        <h2 className={styles.materiaisTitle}>Materiais</h2>
        <div className={styles.materialList}>
          <div className={styles.materialsCarousel}>
            <button
              className={styles.addMaterial}
              onClick={() => {
                setAddMaterial(true);
              }}
            >
              <img width="25px" height="25px" src={add} alt="" />
              Adicionar Material
            </button>
            {materials.map((material, index) => (
              <Material
                nome={material.nome}
                link={material.link}
                authorId={material.authorId}
                deleteItem={() => {handleDelete(material.id);}}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <Forum id={Number(id)} />
      {addMaterial && (
        <ModalMaterial id={id} handleOpen={handleCreateMaterial} refreshPage={refreshMaterials} />
      )}
    </div>
  );
};

export default TurmaSelecionada;
