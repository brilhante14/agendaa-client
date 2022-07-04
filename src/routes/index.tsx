/**
 * Seleção das Rotas da aplicação.
 * */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import SignedRoutes from "./signedIn";
import React from "react";
import AuthContext from "../context/auth";

// Renderer
export default function UserRoutes() {
  const { signed } = React.useContext(AuthContext);

  return (
    signed ? (
      <SignedRoutes />
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    )
  );
}
