import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/LoginForm.module.css";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Limpiar cualquier mensaje previo
    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        // Iniciar sesión
        response = await axios.post("http://localhost:5000/users/login", {
          email,
          password,
        });
        console.log("Enviando datos:", { email, password });
      } else {
        // Registrar nuevo usuario
        response = await axios.post("http://localhost:5000/users/register", {
          name,
          document,
          email,
          password,
        });
        console.log("Enviando datos:", { name, document, email, password });

        // Mostrar mensaje de éxito
        setSuccessMessage("¡Registro exitoso!");
        setTimeout(() => setSuccessMessage(""), 5000); // Opcional: borrar después de 5 segundos
      }

      // Lógica solo para login
      if (isLogin) {
        const { token, user } = response.data;
        login(token, user);
        navigate("/todos");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error, por favor intente de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isLogin ? "Iniciar Sesión" : "Registrar Cuenta"}
      </h2>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="document">Documento</label>
              <input
                id="document"
                type="text"
                placeholder="Documento de identidad"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
                aria-required="true"
              />
            </div>
          </>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading
            ? "Cargando..."
            : isLogin
            ? "Iniciar Sesión"
            : "Registrar Cuenta"}
        </button>
      </form>
      <div className={styles.switchButton}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className={styles.switchButtonText}
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
