import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Inicializamos correctamente
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthenticated(true);
    setUser(user);
    console.log("Usuario autenticado:", user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
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
      .get("http://localhost:5000/users/me", {
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
      .finally(() => setLoading(false)); // Finalizamos siempre la carga
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ authenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
