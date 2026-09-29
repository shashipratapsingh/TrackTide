import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { defaultRouteForRole, hasPermission } from "../../utils/accessControl";

export function PermissionGuard({ permission }) {
  const { user, session } = useAuth();
  const role = user?.role || session?.role;

  if (!hasPermission(role, permission)) {
    return <Navigate to={defaultRouteForRole(role)} replace />;
  }

  return <Outlet />;
}
