/**
 * Seleção das Rotas da aplicação.
 * */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import Turmas from "../pages/Turmas";
import SelecaoTurma from "../pages/SelecaoTurma";
import { ComponentsView } from "../pages/ComponentsView";

// Renderer
export default function UserRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: Ao autenticar, passar o usuário logado para as rotas (e redirecionar de acordo com a autenticação) */}
        <Route path="/turma" element={<SelecaoTurma />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* TEMPORÁRIO, APENAS PARA VER OS COMPONENTES */}
        <Route path="/componentsView" element={<ComponentsView />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
