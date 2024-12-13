import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta si es necesario

export function LogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Llamamos a la función de logout del contexto
  };

  return (
    <button onClick={handleLogout} style={buttonStyle}>
      Logout
    </button>
  );
}

// Estilo básico para el botón
const buttonStyle = {
  padding: "8px 16px",
  fontSize: "1rem",
  color: "#fff",
  backgroundColor: "#dc3545",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default LogoutButton;
