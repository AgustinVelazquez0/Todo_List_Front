// src/components/TodoList.jsx
import { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "./TodoContext"; // Asegúrate de que el contexto esté configurado correctamente
import axios from "axios"; // Importa axios para hacer la solicitud HTTP
import styles from "./Styles/TodoList.module.css";

function TodoList() {
  const { todos, setTodos } = useContext(TodoContext); // Usa el contexto para almacenar los todos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Llamada al backend para obtener los todos
    axios
      .get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }) // Agrega el token de autenticación si es necesario
      .then((response) => {
        setTodos(response.data); // Actualiza el estado de los todos
        setLoading(false); // Finaliza el estado de carga
      })
      .catch((error) => {
        console.error("Error al obtener los todos", error);
        setLoading(false); // Finaliza la carga en caso de error
      });
  }, [setTodos]); // Solo se ejecuta una vez, cuando el componente se monta

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga
  }

  return (
    <div className={styles.containerToDoList}>
      <ul className={styles.list}>
        {todos.length === 0 ? (
          <li className={styles.noTasksMessage}>No hay tareas disponibles</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id} // Usa el _id como clave única
              todo={todo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
