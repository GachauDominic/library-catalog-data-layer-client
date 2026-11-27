import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = window.localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
