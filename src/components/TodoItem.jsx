import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./Styles/TodoItem.module.css";
import { Link } from "react-router-dom";

function TodoItem({
  todo = { title: "Tarea sin nombre", completed: false },
  toggleComplete,
  deleteTodo,
}) {
  const { _id, title, completed } = todo;

  return (
    <div className={styles.containerText}>
      <li className={styles.todoItem}>
        <span
          className={`${styles.tareaTexto} ${
            completed ? styles.completed : ""
          }`}
        >
          {title}
        </span>
        <div className={styles.botonesJuntos}>
          <button
            className={`${styles.botonCompletar} ${
              completed ? styles.activo : styles.incompleto
            }`}
            onClick={() => toggleComplete(_id)}
            aria-label={`Marcar como ${completed ? "incompleto" : "completo"}`}
          >
            <FaCheck />
          </button>
          <Link to={`/edit/${_id}`} aria-label="Editar tarea">
            <button className={styles.botonEditar}>
              <FaEdit />
            </button>
          </Link>
          <button
            className={styles.botonEliminar}
            onClick={() => deleteTodo(_id)}
            aria-label="Eliminar tarea"
          >
            <FaTrash />
          </button>
        </div>
      </li>
    </div>
  );
}

// Validación de propiedades con PropTypes
TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
