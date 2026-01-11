import { Navigate } from "react-router-dom";
import facade from "../../apiFacade";

export default function RequiredRole({ role, children }) {
  const roles = facade.getRolesFromToken();

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}