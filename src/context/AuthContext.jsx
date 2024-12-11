// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Cargando el estado de la autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Verificar el token con el backend
      axios
        .get("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user); // Establecer el usuario si la autenticación es exitosa
          if (window.location.pathname !== "/todos") {
            navigate("/todos"); // Redirige a /todos si no estamos ya allí
          }
        })
        .catch(() => {
          // Si falla, eliminar el token y redirigir al login
          localStorage.removeItem("token");
          navigate("/login");
        })
        .finally(() => {
          setLoading(false); // Cambiar el estado de carga cuando la verificación termine
        });
    } else {
      setLoading(false); // Si no hay token, terminamos el estado de carga
    }
  }, [navigate]);

  const login = (token, userData) => {
    try {
      console.log("Token recibido:", token);
      console.log("Usuario:", userData);
      localStorage.setItem("token", token);
      setUser(userData);
      navigate("/todos"); // Redirige a /todos
    } catch (error) {
      console.error("Error en el login:", error);
      // Mostrar mensaje de error o redirigir de nuevo al login
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false); // Asegura que el loading esté en false
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar indicador de carga mientras verificamos el estado
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Crea el hook useAuth para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
