import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, requiredRole, children }) => {
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "teacher" ? "/dashboard" : "/home"} />;
  }
  return children;
};

export default ProtectedRoute;
