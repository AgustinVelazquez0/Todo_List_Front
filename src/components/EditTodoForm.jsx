import { useContext, useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Styles/EditTodoForm.module.css";

function EditTodoForm() {
  const { todos, editTodo } = useContext(TodoContext);
  const { _id } = useParams(); // Captura el _id de la URL
  const navigate = useNavigate();

  const [name, setName] = useState(""); // Estado para el nombre de la tarea
  const [error, setError] = useState(""); // Estado para mensajes de error

  // Encuentra la tarea asociada al _id
  useEffect(() => {
    const todo = todos.find((todo) => todo._id === _id);
    if (todo) {
      setName(todo.name || ""); // Si se encuentra, establece el estado inicial con un valor seguro
    } else {
      setError("Tarea no encontrada."); // Muestra un error si no se encuentra la tarea
    }
  }, [_id, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("El nombre de la tarea no puede estar vacío.");
      return;
    }

    editTodo(_id, name.trim()); // Actualiza la tarea usando _id
    navigate("/"); // Redirige a la lista principal
  };

  const handleChange = (e) => {
    setName(e.target.value); // Actualiza el estado del input
    if (error) setError(""); // Limpia el mensaje de error si el usuario escribe
  };

  return (
    <div className={styles.editFormContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputEdit}
          type="text"
          value={name || ""} // Garantiza que el input siempre sea controlado
          onChange={handleChange} // Manejo del cambio en el input
          placeholder={name || "Editar tarea"} // Muestra dinámicamente el nombre de la tarea
          required
        />
        <button className={styles.saveButton} type="submit">
          Editar tarea ✅
        </button>
      </form>
    </div>
  );
}

export default EditTodoForm;
