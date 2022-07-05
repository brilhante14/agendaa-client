import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import add from "../../assets/svg/add.svg";
import api from "../../api/api";
import styles from "./TurmaSelecionada.module.css";
import Calendar from "../../components/Calendar";
import Material from "../../components/Material";

interface Mat {
  nome: string;
  autor: string;
  link: string;
  id: string;
}

const TurmaSelecionada: React.FC = () => {
  const [nome, setNome] = useState("Carregando...");
  const [diasAula, setDiasAula] = useState<Array<number>>([]);
  const [materials, setMaterials] = useState<Array<Mat>>([
    {
      nome: "Material",
      autor: "Quem sane",
      link: "https://google.com",
      id: "12345",
    },
  ]);

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
      api(`/materiais/${id}`).then((res) => {
        const material = res.data.map((material: any): Mat => {
          return {
            nome: material.nome,
            autor: material.autor,
            link: material.link,
            id: material._id,
          };
        });
        setMaterials(material);
        console.log(res.data);
      });
      console.log(res.data);
    });
  }, [id]);
  const today = new Date();

  return (
    <div className={styles.container}>
      <h1 className={styles.className}>{nome}</h1>
      <div>
        <Calendar
          initialYear={today.getFullYear()}
          initialMonth={today.getMonth()}
          navigate={(d: Date) =>
            navigate(`./${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)
          }
          weekdays={diasAula}
        />
      </div>
      <div>
        <Outlet />
      </div>
      <div className={styles.materiais}>
        <h2>Materiais</h2>
        <div className={styles.materialList}>
          <button className={styles.addMaterial}>
            <img src={add} alt="" />
            Adicionar Material
          </button>
          {materials.map((material) => (
            <Material
              nome={material.nome}
              link={material.link}
              autor={material.autor}
              deleteItem={() => alert(material.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TurmaSelecionada;
