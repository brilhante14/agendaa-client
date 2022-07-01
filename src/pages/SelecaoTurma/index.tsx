import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const SelecaoTurma = () => {
  return (
    <>
      <Header />
      <nav>Lista de Turmas</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SelecaoTurma;
