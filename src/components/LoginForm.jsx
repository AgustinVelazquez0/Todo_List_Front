import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/LoginForm.module.css";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    document: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        // Iniciar sesión
        response = await axios.post(
          "https://todolistback-production-13b3.up.railway.app/users/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
      } else {
        // Registrar nuevo usuario
        response = await axios.post(
          "https://todolistback-production-13b3.up.railway.app/users/register",
          {
            name: formData.name,
            document: formData.document,
            email: formData.email,
            password: formData.password,
          }
        );

        setSuccessMessage("¡Registro exitoso!");
        setTimeout(() => setSuccessMessage(""), 5000);
      }

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
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="document">Documento</label>
              <input
                id="document"
                type="text"
                name="document"
                placeholder="Documento de identidad"
                value={formData.document}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
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
