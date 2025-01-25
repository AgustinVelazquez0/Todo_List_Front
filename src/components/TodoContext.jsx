import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { authenticated } = useAuth(); // Obtenemos el estado de autenticación desde el hook useAuth
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar los todos cuando el estado de autenticación cambie
  useEffect(() => {
    if (!authenticated) {
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
      return;
    }

    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:5000/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error.response || error.message);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [authenticated]);

  const addTodo = async (title) => {
    const newTodo = {
      title,
      completed: false,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "http://localhost:5000/todos",
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error.response || error.message);
    }
  };

  const toggleComplete = async (_id) => {
    const todo = todos.find((todo) => todo._id === _id);
    if (!todo) return; // Verifica que el todo exista

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(
        `http://localhost:5000/todos/${_id}`,
        { ...todo, completed: !todo.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error.response || error.message);
    }
  };

  const deleteTodo = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:5000/todos/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Error deleting todo:", error.response || error.message);
    }
  };

  const editTodo = async (_id, title) => {
    const updatedTodo = { ...todos.find((todo) => todo._id === _id), title };
    if (!updatedTodo) return; // Verifica que el todo exista

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === _id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error editing todo:", error.response || error.message);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
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

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TodoContext };
