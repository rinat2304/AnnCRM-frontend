import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Clients from '../pages/Clients'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes