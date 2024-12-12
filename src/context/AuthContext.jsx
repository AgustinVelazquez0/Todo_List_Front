import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    // Si no hay token, no intentamos autenticar y redirigimos
    if (!token) {
      setAuthenticated(false); // No está autenticado
      setLoading(false); // Se termina la carga
      // Solo redirigimos si no estamos ya en la página de login
      if (window.location.pathname !== "/login") {
        console.log("Redirigiendo a login...");
        navigate("/login"); // Redirigimos al login
      }
      return; // Evitamos la siguiente parte si no hay token
    }

    // Si hay token, hacemos la solicitud para verificar la autenticación
    axios
      .get("http://localhost:5000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Auth response:", response);
        if (response.data) {
          setAuthenticated(true); // Usuario autenticado
        } else {
          setAuthenticated(false); // No está autenticado
        }
      })
      .catch(() => {
        setAuthenticated(false); // En caso de error, no está autenticado
      })
      .finally(() => {
        console.log("Finalizando carga...");
        setLoading(false); // Marcamos como terminado el proceso de carga
      });
  }, [navigate]); // Dependemos de navigate para evitar ciclos innecesarios

  // Redirigir cuando la autenticación sea falsa y no estemos en la página de login
  useEffect(() => {
    // No realizar nada hasta que la carga termine
    if (loading) return;

    // Solo redirigimos si no estamos autenticados y no estamos en la página de login
    if (!authenticated && window.location.pathname !== "/login") {
      console.log("Redirigiendo al login por autenticación fallida...");
      navigate("/login");
    }
  }, [authenticated, loading, navigate]);

  // Si estamos cargando, mostramos una pantalla de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
