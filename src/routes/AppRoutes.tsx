import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Clients from "../pages/Clients";
import ProtectedRoute from "../components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        <Route element={<ProtectedRoute />}>

          <Route
            path="/clients"
            element={<Clients />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;