/**
 * Seleção das Rotas da aplicação.
 * */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import Turmas from "../pages/Turmas";
import { ComponentsView } from "../pages/ComponentsView";

// Renderer
export default function SignedRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/turmas" element={<Turmas />} />
                {/* TEMPORÁRIO, APENAS PARA VER OS COMPONENTES */}
                <Route path="/componentsView" element={<ComponentsView />} />
                {/* REDIRECIONAR PARA PAGINA INICIAL */}
                <Route path="*" element={<Navigate to="/turmas" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
