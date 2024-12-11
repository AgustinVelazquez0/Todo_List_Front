import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si el usuario no está autenticado, redirige a /login, excepto cuando la ruta sea /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children; // Permite el acceso a la ruta protegida
}

export default ProtectedRoute;
