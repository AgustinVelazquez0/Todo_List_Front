import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import styles from "../App.module.css";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.PrincipalContenedor}>
      <Navbar />
      <div className={styles.App}>
        <AddTodoForm />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:_id"
            element={
              <ProtectedRoute>
                <EditTodoForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AppContent;
