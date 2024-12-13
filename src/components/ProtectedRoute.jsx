import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Si la aplicación está en estado de carga, mostramos un mensaje o spinner
  if (loading) {
    return <div>Loading...</div>; // Aquí puedes agregar un spinner si lo prefieres
  }

  // Si el usuario no está autenticado, redirige a la página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, se permite el acceso a la ruta protegida
  return children;
}

export default ProtectedRoute;
