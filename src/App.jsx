import { BrowserRouter as Router } from "react-router-dom";
import { TodoProvider } from "./components/TodoContext";
import { AuthProvider } from "./context/AuthContext";
import AppContent from "./components/AppContent";

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
