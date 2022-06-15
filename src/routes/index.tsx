/**
 * Seleção das Rotas da aplicação.
 * */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import { Login } from "../pages/Login";

// Renderer
export default function UserRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}   