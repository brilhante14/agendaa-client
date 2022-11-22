import { Outlet, useNavigate } from "react-router-dom";
import api from "../../api/api";
import styles from "./SelecaoTurma.module.css";
import IconButton from "../../components/IconButton";
import newClass from "../../assets/new_topic_black.png";
import Turma from "../../components/Turma";
import { useEffect, useState } from "react";
import { ClassModal } from "../../components/Modal/ClassModal";

async function getClassById(turma: any) {
  return {
    nome: turma.nome,
    professor: await getParticipanteDetails(turma.professorId),
    // participantes: await Promise.all(
    //   turma.participantes.map((id: string) => getParticipanteDetails(id))
    // ),
    id: turma.id,
  };
}

async function getParticipanteDetails(id: string) {
  const participante = (await api.get(`/usuarios/${id}`)).data;
  return {
    nome: participante?.nome,
    img: participante?.photo,
  };
}

const SelecaoTurma: React.FC = () => {
  let navigate = useNavigate();
  let [turmas, setTurmas] = useState<any>([]);
  const [isProfessor, setIsProfessor] = useState(false);
  let [modalTurmasIsOpen, setModalTurmas] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage);
      if (user.role === "professor") {
        setIsProfessor(true);
        api
          .post("/turmas/getTurmasByProfessor/", {
            professorId: user.userId,
          })
          .then((turmas) => {
            Promise.all(turmas.data.map(getClassById)).then((t) =>
              setTurmas(t)
            );
          });
      } else {
        api
          .post("/turmas/getTurmasByParticipantes/", {
            userId: user.userId,
          })
          .then(({ data }) => {
            setTurmas(data);
          });
      }
    }
  }, []);
  return (
    <div className={styles.content}>
      <main className={styles.mainContent}>
        <nav className={styles.sidebar}>
          <div className={styles.sideheader}>
            <h2 className={styles.componentTitle}>
              {isProfessor ? "Turmas Ministradas" : "Turmas Matriculadas"}
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
            {turmas?.length > 0 ? (
              turmas.map((turma: any) => (
                <Turma
                  turma={turma}
                  onClick={() => navigate(`./${turma.id}`)}
                  key={turma.id}
                />
              ))
            ) : (
              <p className={styles.emptyWarning}>
                Você não está {isProfessor ? "ministrando" : "matriculado em"}{" "}
                nenhuma disciplina! Use o botão acima para{" "}
                {isProfessor ? "criar" : "entrar em"} uma turma
              </p>
            )}
          </div>
        </nav>
        <div className={styles.selectedTurma}>
          <Outlet />
        </div>
      </main>
      {modalTurmasIsOpen && (
        <ClassModal isOpen={modalTurmasIsOpen} handleOpen={setModalTurmas} />
      )}
    </div>
  );
};

export default SelecaoTurma;
