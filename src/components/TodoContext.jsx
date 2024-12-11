// src/components/TodoContext.jsx

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

  // Crear una instancia de Axios
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });

  // Añadir el interceptor para incluir el token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Fetch inicial de todos desde el servidor
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get("/todos");
        dispatch({ type: SET_TODOS, payload: response.data });
        initialTodos.current = response.data; // Guardamos la lista inicial
      } catch (error) {
        console.error(
          "Error fetching todos:",
          error.response?.data || error.message
        );
      }
    };
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTodo = async (title) => {
    const newTodo = { title, completed: false };

    try {
      const response = await axiosInstance.post("/todos", newTodo);
      dispatch({ type: ADD_TODO, payload: response.data });
    } catch (error) {
      console.error(
        "Error adding todo:",
        error.response?.data || error.message
      );
    }
  };

  const toggleComplete = async (_id) => {
    const todo = todos.find((todo) => todo._id === _id);
    if (!todo) return;

    try {
      await axiosInstance.put(`/todos/${_id}`, {
        ...todo,
        completed: !todo.completed,
      });
      dispatch({ type: TOGGLE_COMPLETE, payload: _id });
    } catch (error) {
      console.error(
        "Error toggling todo:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTodo = async (_id) => {
    try {
      await axiosInstance.delete(`/todos/${_id}`);
      dispatch({ type: DELETE_TODO, payload: _id });
    } catch (error) {
      console.error(
        "Error deleting todo:",
        error.response?.data || error.message
      );
    }
  };

  const editTodo = async (_id, title) => {
    const updatedTodo = { ...todos.find((todo) => todo._id === _id), title };

    try {
      await axiosInstance.put(`/todos/${_id}`, updatedTodo);
      dispatch({ type: EDIT_TODO, payload: updatedTodo });
    } catch (error) {
      console.error(
        "Error editing todo:",
        error.response?.data || error.message
      );
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

// Validar las props
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
