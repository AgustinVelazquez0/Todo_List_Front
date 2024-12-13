import { LogoutButton } from "./LogoutButton"; // Importamos el botón de logout

export function Navbar() {
  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>Mi Aplicación</h1>
      <LogoutButton /> {/* Incluimos el botón aquí */}
    </nav>
  );
}

// Estilos básicos para el navbar
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f8f9fa",
  borderBottom: "1px solid #dee2e6",
};

const logoStyle = {
  fontSize: "1.5rem",
  color: "#333",
  margin: 0,
};
