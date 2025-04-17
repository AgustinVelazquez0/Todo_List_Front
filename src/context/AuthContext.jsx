import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(() => {
    // Inicializar el estado de autenticación desde localStorage
    return localStorage.getItem("token") ? true : false;
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    // Inicializar el usuario desde localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const login = (token, user) => {
    // Guardamos el token y el usuario en el estado y localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthenticated(true);
    setUser(user);
    console.log("Usuario autenticado:", user);
  };

  const logout = () => {
    // Limpiamos el localStorage y el estado
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
    navigate("/login"); // Redirige al login
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        // Solo redirigir si no estamos ya en la página de login
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
        return;
      }

      try {
        // Usar la URL de la API desde la variable de entorno
        const apiUrl =
          import.meta.env.VITE_API_URL ||
          "https://todo-list-back-lnxn.onrender.com";
        const response = await axios.get(`${apiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setAuthenticated(true);
          setUser(response.data);
        } else {
          setAuthenticated(false);
          // No redireccionar automáticamente para evitar bucles de redirección
        }
      } catch (error) {
        console.error("Error verificando token:", error);
        // Si hay un error 401 (no autorizado) o 403 (prohibido), limpiar la sesión
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          logout();
        } else {
          // Para otros errores (como problemas de red), mantener la sesión activa basada en localStorage
          // Esto evita que la sesión se cierre por problemas temporales de conexión
          const savedUser = localStorage.getItem("user");
          if (token && savedUser) {
            setAuthenticated(true);
            setUser(JSON.parse(savedUser));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{ authenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
