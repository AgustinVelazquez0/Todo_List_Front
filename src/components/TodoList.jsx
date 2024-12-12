// src/components/TodoList.jsx
import { useTodo } from "../hooks/useTodo"; // Importa el hook useTodo desde su archivo
import TodoItem from "./TodoItem";
import styles from "./Styles/TodoList.module.css"; // Asegúrate de que la ruta sea correcta

function TodoList() {
  const { todos, loading } = useTodo(); // Usar el hook useTodo para obtener todos y loading

  if (loading) {
    return <div>Loading...</div>; // Mostrar el mensaje de carga si `loading` es true
  }

  return (
    <div className={styles.containerToDoList}>
      <ul className={styles.list}>
        {todos.length === 0 ? (
          <li className={styles.noTasksMessage}>No hay tareas disponibles</li>
        ) : (
          todos.map((todo) => <TodoItem key={todo._id} todo={todo} />) // Asegúrate de que `todo._id` sea único
        )}
      </ul>
    </div>
  );
}

export default TodoList;
