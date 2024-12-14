import { useAuth } from "../hooks/useAuth";
import styles from "./Styles/Navbar.module.css";

function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>To Do List</h1>
      <button className={styles.button} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
