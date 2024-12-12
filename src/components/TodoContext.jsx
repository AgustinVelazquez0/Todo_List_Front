// src/context/TodoContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // Asegúrate de que el hook useAuth esté correcto

const TodoContext = createContext(); // Creamos el contexto

// TodoProvider es el componente que proveerá el contexto a sus hijos
export function TodoProvider({ children }) {
  const { authenticated } = useAuth(); // Obtenemos el estado de autenticación desde el hook useAuth
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar los todos cuando el estado de autenticación cambie
  useEffect(() => {
    if (!authenticated) {
      // Si no está autenticado, redirigimos al login solo si no estamos ya en la página de login
      if (window.location.pathname !== "/login") {
        window.location.replace("/login"); // Manteniendo la lógica de redirección
      }
      return; // Evitamos ejecutar el resto del código si no está autenticado
    }

    axios
      .get("http://localhost:5000/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Usamos el token del localStorage
        },
      })
      .then((response) => {
        setTodos(response.data); // Guardamos los todos obtenidos
      })
      .catch(() => {
        setTodos([]); // Si ocurre un error, establecemos los todos como vacíos
      })
      .finally(() => {
        setLoading(false); // Al terminar la petición, desactivamos el estado de carga
      });
  }, [authenticated]); // Dependencia solo de authenticated

  // Funciones para manejar las tareas
  const addTodo = (todo) => {
    setTodos([...todos, todo]); // Agregar tarea
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Eliminar tarea por ID
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo))); // Actualizar tarea
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Exportamos el contexto para que se pueda usar en otros componentes
export { TodoContext };
