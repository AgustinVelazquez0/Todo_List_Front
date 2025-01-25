import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
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
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
      return;
    }

    axios
      .get("https://todolistback-production-13b3.up.railway.app/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setAuthenticated(true);
          setUser(response.data);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => setLoading(false)); // Asegura que 'loading' se ponga a false al final
  }, [navigate]);

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
