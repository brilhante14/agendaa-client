import { Outlet, useNavigate } from "react-router-dom";
import api from "../../api/api";
import styles from "./SelecaoTurma.module.css";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import newClass from "../../assets/new_topic_black.png"
import add from "../../assets/svg/add.svg";
import Turma from "../../components/Turma";
import { useEffect, useState } from "react";
import { ClassModal } from "../../components/Modal/ClassModal";

interface Props {
  isProfessor?: boolean;
  turmasMatriculadas?: Array<string>;
}

async function getClassById(turma: any) {
  return {
    nome: turma.nome,
    professor: (await api.get(`/usuarios/getById/${turma.professor}`)).data.nome,
    participantes: turma.participantes,
    id: turma._id,
  };
}

/**
 * @todo Substituir o fakeClass por função da API
 * @todo Adicionar modal de criação de turma
 */
const SelecaoTurma: React.FC<Props> = ({
  isProfessor = false,
  turmasMatriculadas = [
    "62c1d72f1de31d9a6d66e7ff",
    "62c31b3cb9554f098d0907fe",
  ],
}) => {
  let navigate = useNavigate();
  let [turmas, setTurmas] = useState<
    Array<{
      nome: string;
      professor: string;
      participantes: Array<string>;
      id: string;
    }>
  >([]);
  let [modalTurmasIsOpen, setModalTurmas] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage)
      api.post("/turmas/getTurmasByParticipantes/", {
        "userId": user._id
      }).then((turmas) => {
        Promise.all(turmas.data.map(getClassById)).then((t) => setTurmas(t))
      })
    }
  }, []);

  return (
    <div className={styles.content}>
      <main className={styles.mainContent}>
        <nav className={styles.sidebar}>
          <div className={styles.sideheader}>
            <h2>
              {isProfessor
                ? "Turmas Ministradas"
                : "Turmas Matriculadas"}
            </h2>
            <IconButton
              icon={newClass}
              onClick={
                isProfessor
                  ? () => setModalTurmas(true)
                  : () => navigate("/turmas")
              }
              showTitle={true}
              title={isProfessor ? "Criar" : "Entrar"}
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
                {isProfessor ? "ministrando" : "matriculado em"} nenhuma
                disciplina! Use o botão acima para{" "}
                {isProfessor ? "criar" : "entrar em"} uma turma
              </p>
            )}
          </div>
        </nav>
        <Outlet />
      </main>
      {/* <ClassModal isOpen={modalTurmasIsOpen} /> */}
    </div>
  );
};

export default SelecaoTurma;
