import { useContext, useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Styles/EditTodoForm.module.css";

function EditTodoForm() {
  const { todos, editTodo, loading } = useContext(TodoContext); // Accedemos a todos y loading
  const { _id } = useParams(); // Obtenemos el _id de los parámetros de la URL
  const navigate = useNavigate();

  const [name, setName] = useState(""); // Estado para el nombre de la tarea
  const [error, setError] = useState(""); // Estado para manejar errores

  // Encuentra la tarea asociada al _id cuando se cargue el componente
  useEffect(() => {
    if (!loading && todos.length > 0) {
      const todo = todos.find((todo) => todo._id === _id);
      if (todo) {
        setName(todo.title || ""); // Establece el nombre si se encuentra la tarea
      } else {
        setError("Tarea no encontrada."); // Muestra error si no se encuentra
      }
    }
  }, [_id, todos, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("El nombre de la tarea no puede estar vacío.");
      return;
    }

    editTodo(_id, name.trim()); // Actualiza la tarea en el contexto
    navigate("/todos"); // Redirige al listado de tareas
  };

  const handleChange = (e) => {
    setName(e.target.value); // Actualiza el estado del input
    if (error) setError(""); // Limpia el error si el usuario escribe
  };

  if (loading) {
    return <p>Cargando...</p>; // Indicador de carga mientras se obtienen los todos
  }

  return (
    <div className={styles.editFormContainer}>
      {error && <p className={styles.error}>{error}</p>}{" "}
      {/* Muestra mensaje de error */}
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputEdit}
          type="text"
          value={name} // Establece el valor del input
          onChange={handleChange} // Maneja cambios en el input
          placeholder="Editar la tarea" // Placeholder fijo si queda vacío
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
