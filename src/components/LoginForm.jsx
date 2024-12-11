import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext); // Accede al contexto de autenticación
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [name, setName] = useState(""); // Solo para el registro
  const [document, setDocument] = useState(""); // Solo para el registro
  const [error, setError] = useState(""); // Estado para el error
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/todos"); // Si hay un token, redirigir al usuario a /todos
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto de enviar el formulario
    setError(""); // Limpiar errores anteriores
    setIsLoading(true); // Mostrar el estado de carga

    try {
      let response;
      if (isLogin) {
        // Hacer la solicitud POST para el login
        response = await axios.post("http://localhost:5000/users/login", {
          email, // Body: { email, password }
          password,
        });
      } else {
        // Hacer la solicitud POST para el registro
        response = await axios.post("http://localhost:5000/users/register", {
          name,
          document,
          email,
          password,
        });
      }

      // Obtener el token y usuario de la respuesta
      const { token, user } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem("authToken", token);

      // Guardar el usuario en el contexto global
      login(token, user);

      // Redirigir al usuario a la página /todos después de un inicio exitoso
      navigate("/todos");
    } catch (err) {
      // Si ocurre un error, mostrar mensaje de error
      setError(
        err.response?.data?.message ||
          "Ocurrió un error. Verifica tus datos e inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false); // Detener el estado de carga
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Iniciar Sesión" : "Registrar Cuenta"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar errores si hay */}
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
                onChange={(e) => setName(e.target.value)} // Manejar cambio del nombre
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
                onChange={(e) => setDocument(e.target.value)} // Manejar cambio del documento
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
            onChange={(e) => setEmail(e.target.value)} // Manejar cambio del email
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
            onChange={(e) => setPassword(e.target.value)} // Manejar cambio de la contraseña
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
