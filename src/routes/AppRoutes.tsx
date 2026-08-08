import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Clients from "../pages/Clients";
import ProtectedRoute from "../components/ProtectedRoute";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route element={<ProtectedRoute />}>

          <Route
            path="/clients"
            element={<Clients />}
          />

        </Route>


        {/* Неизвестный адрес → Login */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default AppRoutes;