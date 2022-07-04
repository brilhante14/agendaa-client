import { Outlet, useNavigate } from "react-router-dom";
import api from "../../api/api";
import styles from "./SelecaoTurma.module.css";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import add from "../../assets/svg/add.svg";
import Turma from "../../components/Turma";
import { useEffect, useState } from "react";

interface Props {
  user?: {
    isProfessor: boolean;
    turmasMatriculadas: Array<string>;
  };
}

async function getClassById(id: string) {
  const res = await api.get(`/turmas/${id}`);
  console.log(res);
  return {
    nome: res.data.nome,
    professor: res.data.professor,
    participantes: res.data.participantes.length,
    id: res.data._id,
  };
}

/**
 * @todo Substituir o fakeClass por função da API
 * @todo Adicionar modal de criação de turma
 */
const SelecaoTurma: React.FC<Props> = ({
  user = {
    isProfessor: true,
    turmasMatriculadas: [
      "62c1d72f1de31d9a6d66e7ff",
      "62c31b3cb9554f098d0907fe",
    ],
  },
}) => {
  let navigate = useNavigate();
  let [turmas, setTurmas] = useState<
    Array<{
      nome: string;
      professor: string;
      participantes: number;
      id: string;
    }>
  >([]);

  useEffect(() => {
    Promise.all(user.turmasMatriculadas.map(getClassById)).then((res) => {
      setTurmas(res);
    });
  }, [user.turmasMatriculadas]);

  return (
    <>
      <div className={styles.content}>
        <Header />
        <main className={styles.mainContent}>
          <nav className={styles.sidebar}>
            <div className={styles.sideheader}>
              <h2>
                {user?.isProfessor
                  ? "Turmas Ministradas"
                  : "Turmas Matriculadas"}
              </h2>
              <IconButton
                icon={add}
                onClick={
                  user?.isProfessor
                    ? () => alert("Turma criada!")
                    : () => navigate("/turmas")
                }
                showTitle={true}
                title={user?.isProfessor ? "Criar" : "Entrar"}
                variant="secondary"
              />
            </div>
            <div className={styles.classList}>
              {turmas.length > 0 ? (
                turmas.map((turma) => (
                  <Turma
                    turma={turma}
                    onClick={() => navigate(`./${turma.id}`)}
                    key={turma.id}
                  />
                ))
              ) : (
                <p className={styles.emptyWarning}>
                  Você não está{" "}
                  {user.isProfessor ? "ministrando" : "matriculado em"} nenhuma
                  disciplina! Use o botão acima para{" "}
                  {user.isProfessor ? "criar" : "entrar em"} uma turma
                </p>
              )}
            </div>
          </nav>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SelecaoTurma;
