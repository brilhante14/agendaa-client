/**
 * Seleção das Rotas da aplicação.
 * */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import Turmas from "../pages/Turmas";
import SelecaoTurma from "../pages/SelecaoTurma";

// Renderer
export default function SignedRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelecaoTurma />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
