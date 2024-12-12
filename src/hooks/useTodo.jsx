// src/hooks/useTodo.jsx
import { useContext } from "react";
import { TodoContext } from "../components/TodoContext";

export const useTodo = () => {
  return useContext(TodoContext); // Usamos el contexto para acceder a los todos
};
