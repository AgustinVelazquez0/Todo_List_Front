import { useContext, useState, useRef } from "react";
import { TodoContext } from "./TodoContext";
import styles from "./Styles/AddTodo.module.css";

function AddTodoForm() {
  const { addTodo } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const inputRef = useRef(null);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() === "") {
      setErrorMessage("Por favor, ingresa una tarea.");
      return;
    }
    addTodo(inputValue);
    setInputValue("");
    setErrorMessage(""); // Limpiar mensaje de error cuando la tarea es válida
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Agregar nueva tarea"
        className={styles.input}
        ref={inputRef}
      />
      <button type="submit" className={styles.button}>
        Agregar
      </button>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}{" "}
      {/* Mostrar el error si existe */}
    </form>
  );
}

export default AddTodoForm;
