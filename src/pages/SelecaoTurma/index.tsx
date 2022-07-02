import { Outlet, useNavigate } from "react-router-dom";
import styles from "./SelecaoTurma.module.css";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import add from "../../assets/svg/add.svg";
import Turma from "../../components/Turma";

interface Props {
  user?: {
    isProfessor: boolean;
    turmasMatriculadas: Array<string>;
  };
}

function fakeClass(id: string) {
  return {
    nome: "Turma",
    professor: "Fulano de Tal",
    participantes: 120,
  };
}

/**
 * @todo Substituir o fakeClass por função da API
 * @todo Adicionar modal de criação de turma
 */
const SelecaoTurma: React.FC<Props> = ({
  user = {
    isProfessor: true,
    turmasMatriculadas: ["123", "FA41", "14"],
  },
}) => {
  let navigate = useNavigate();

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
              {user.turmasMatriculadas.length > 0 ? (
                user?.turmasMatriculadas.map((id_turma) => (
                  <Turma
                    turma={fakeClass(id_turma)}
                    onClick={() => navigate(`./${id_turma}`)}
                    key={id_turma}
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
