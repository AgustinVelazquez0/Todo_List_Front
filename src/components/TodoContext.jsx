import { createContext, useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// 1. Crear el contexto
export const TodoContext = createContext();

// 2. Definir acciones
const ADD_TODO = "ADD_TODO";
const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
const DELETE_TODO = "DELETE_TODO";
const SET_TODOS = "SET_TODOS";
const EDIT_TODO = "EDIT_TODO";

// Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          _id: action.payload._id,
          title: action.payload.title,
          completed: false,
        },
      ];
    case TOGGLE_COMPLETE:
      return state.map((todo) =>
        todo._id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case DELETE_TODO:
      return state.filter((todo) => todo._id !== action.payload);
    case SET_TODOS:
      return action.payload;
    case EDIT_TODO:
      return state.map((todo) =>
        todo._id === action.payload._id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    default:
      return state;
  }
}

// 4. Crear el proveedor del contexto con useReducer
export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const initialTodos = useRef([]); // Guardamos los datos originales

  // Fetch inicial de todos desde el servidor
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        dispatch({ type: SET_TODOS, payload: response.data });
        initialTodos.current = response.data; // Guardamos la lista inicial
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    const newTodo = {
      title,
      completed: false,
    };

    try {
      // Envia la tarea al backend
      const response = await axios.post("http://localhost:5000/todos", newTodo);

      // Inmediatamente actualizamos el estado con la nueva tarea
      dispatch({ type: ADD_TODO, payload: response.data });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Función para cambiar el estado de completado
  const toggleComplete = async (_id) => {
    // Cambio de id a _id
    const todo = todos.find((todo) => todo._id === _id);
    try {
      await axios.put(`http://localhost:5000/todos/${_id}`, {
        ...todo,
        completed: !todo.completed,
      });
      dispatch({ type: TOGGLE_COMPLETE, payload: _id });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTodo = async (_id) => {
    // Cambio de id a _id
    console.log("Eliminando todo con ID:", _id);
    try {
      await axios.delete(`http://localhost:5000/todos/${_id}`);
      dispatch({ type: DELETE_TODO, payload: _id });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Función para editar una tarea
  const editTodo = async (_id, title) => {
    const updatedTodo = { ...todos.find((todo) => todo._id === _id), title };
    try {
      await axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo);
      dispatch({ type: EDIT_TODO, payload: updatedTodo });
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleComplete,
        deleteTodo,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Valida las props
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
