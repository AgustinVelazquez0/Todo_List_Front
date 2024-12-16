import { useTodo } from "../hooks/useTodo";
import TodoItem from "./TodoItem";
import styles from "./Styles/TodoList.module.css";

function TodoList() {
  const { todos, loading, toggleComplete, deleteTodo } = useTodo(); // Usar el hook useTodo para obtener todos y funciones

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div> {/* Spinner aquí */}
        <span className={styles.loadingMessage}>Cargando tareas...</span>
      </div>
    ); // Mostrar el spinner mientras `loading` es true
  }

  return (
    <div className={styles.containerToDoList}>
      <ul className={styles.list}>
        {todos.length === 0 ? (
          <li className={styles.noTasksMessage}>No hay tareas disponibles</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
