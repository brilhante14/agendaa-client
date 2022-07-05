/**
 * Seleção das Rotas da aplicação.
 * */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header"

// Components
import Turmas from "../pages/Turmas";
import Turma from "../pages/Turma";
import SelecaoTurma from "../pages/SelecaoTurma";
import TurmaSelecionada from "../pages/TurmaSelecionada";
import NenhumaTurma from "../pages/NenhumaTurma";

// Renderer
export default function SignedRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home/" element={<SelecaoTurma />}>
          <Route path="" element={<NenhumaTurma />} />
          <Route path=":id" element={<TurmaSelecionada />}>
            {/* <Route path="/" element={<NenhumaTurma />} /> */}
            <Route path=":date" element={<NenhumaTurma />} />
          </Route>
        </Route>
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/turma/:id" element={<Turma />} />
        <Route path="*" element={<Navigate to="/home/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
