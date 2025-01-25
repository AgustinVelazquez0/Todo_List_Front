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
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  // Verificar si estamos en la ruta de editar
  const isEditRoute = location.pathname.startsWith("/edit");
  const isLoginRoute = location.pathname === "/login"; // Verificar si estamos en la ruta de login

  return (
    <div className={styles.PrincipalContenedor}>
      <Navbar />
      <div className={styles.App}>
        {/* Solo mostrar AddTodoForm si no estamos en la ruta de editar o login */}
        {!isEditRoute && !isLoginRoute && <AddTodoForm />}

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/todos" replace />} />

          {/* Rutas protegidas para /todos */}
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />

          {/* Ruta para editar, solo muestra el formulario de edición */}
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
