import { useContext, useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Styles/EditTodoForm.module.css";

function EditTodoForm() {
  const { todos, editTodo, loading } = useContext(TodoContext); // Usamos el contexto para obtener todos y la función editTodo
  const { _id } = useParams(); // Obtenemos el _id de los parámetros de la URL
  const navigate = useNavigate();

  const [name, setName] = useState(""); // Estado para el nombre de la tarea
  const [error, setError] = useState(""); // Estado para manejar errores

  // Obtener la tarea correspondiente al _id cuando el componente se carga
  useEffect(() => {
    if (!loading && todos.length > 0) {
      const todo = todos.find((todo) => todo._id === _id);
      if (todo) {
        setName(todo.title || ""); // Establece el nombre de la tarea
      } else {
        setError("Tarea no encontrada."); // Error si no se encuentra la tarea
      }
    }
  }, [_id, todos, loading]);

  // Manejo del submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("El nombre de la tarea no puede estar vacío.");
      return;
    }

    editTodo(_id, name.trim()); // Edita la tarea en el contexto
    navigate("/todos"); // Redirige a la lista de tareas
  };

  // Manejo de cambios en el input
  const handleChange = (e) => {
    setName(e.target.value); // Actualiza el estado del input
    if (error) setError(""); // Limpia el error si el usuario escribe
  };

  // Si está cargando, mostramos un mensaje de carga
  if (loading) return <p>Cargando...</p>;

  return (
    <div className={styles.editFormContainer}>
      {error && <p className={styles.error}>{error}</p>}{" "}
      {/* Mensaje de error */}
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputEdit}
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Editar la tarea"
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
