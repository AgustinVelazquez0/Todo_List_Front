import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import Loading from "./Loading";
import styles from "../App.module.css";

function AppContent() {
  const { loading } = useAuth();
  const location = useLocation(); // Obtener la ruta actual

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.PrincipalContenedor}>
      {/* Solo mostrar el Navbar si no estamos en la ruta /login */}
      {location.pathname !== "/login" && <Navbar />}

      <div className={styles.App}>
        {/* Solo mostrar el formulario de agregar tarea si no estamos en la ruta /login */}
        {location.pathname !== "/login" && <AddTodoForm />}

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
