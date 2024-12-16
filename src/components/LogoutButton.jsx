import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Styles/LogoutButton.module.css";

export function LogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Llamamos a la función de logout del contexto
  };

  return (
    <button
      onClick={handleLogout}
      className={styles.button}
      aria-label="Cerrar sesión"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
