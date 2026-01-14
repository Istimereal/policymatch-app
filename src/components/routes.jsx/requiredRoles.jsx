import { Navigate } from "react-router-dom";
import facade from "../../apiFacade";

export default function RequiredRole({ role, children }) {
  const roles = facade.getRolesFromToken();

  const accessAllowed =
    roles.includes(role[0]) || roles.includes(role[1]);

  if (!accessAllowed) {
    return <Navigate to="/" replace />;
  }
  return children;
}