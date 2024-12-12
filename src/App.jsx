// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TodoProvider } from "./components/TodoContext";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import EditTodoForm from "./components/EditTodoForm";
import styles from "./App.module.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";

// Componente para manejar el loading
function AppContent() {
  const { loading } = useAuth();
  console.log("Estado de carga:", loading);

  if (loading) {
    console.log("Mostrando estado de carga...");
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.PrincipalContenedor}>
      <div className={styles.App}>
        <h1 className={styles.title}>To Do List</h1>
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
