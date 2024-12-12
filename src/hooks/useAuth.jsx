// src/hooks/useAuth.js

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Importamos el contexto

export const useAuth = () => {
  return useContext(AuthContext); // Usamos y devolvemos el contexto
};
