// LoginForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await axios.post("http://localhost:5000/users/login", {
          email,
          password,
        });
      } else {
        response = await axios.post("http://localhost:5000/users/register", {
          name,
          document,
          email,
          password,
        });
      }

      const { token, user } = response.data;

      localStorage.setItem("authToken", token);

      login(token, user);

      navigate("/todos");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error, por favor intente de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Iniciar Sesión" : "Registrar Cuenta"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="document">Documento</label>
              <input
                id="document"
                type="text"
                placeholder="Documento de identidad"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading
            ? "Cargando..."
            : isLogin
            ? "Iniciar Sesión"
            : "Registrar Cuenta"}
        </button>
      </form>
      <div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
