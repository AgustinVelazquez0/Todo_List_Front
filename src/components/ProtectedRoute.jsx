import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importamos PropTypes
import styles from "./Styles/ProtectedRoute.module.css"; // Para estilos personalizados

function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useContext(AuthContext);

  // Si la aplicación está en estado de carga, mostramos un spinner
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Estamos cargando tu información...</p>
      </div>
    );
  }

  // Si el usuario no está autenticado, redirige a la página de login (o ruta configurada)
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  // Si el usuario está autenticado, se permite el acceso a la ruta protegida
  return children;
}

// Validación de props con PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // 'children' debe ser un nodo React
  redirectTo: PropTypes.string, // 'redirectTo' debe ser un string (por defecto '/login')
};

export default ProtectedRoute;
