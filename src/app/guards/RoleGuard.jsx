import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { defaultRouteForRole } from "../../utils/accessControl";

export function RoleGuard({ roles = [] }) {
  const { user, session } = useAuth();
  const role = user?.role || session?.role || user?.user?.role;

  if (!Array.isArray(roles) || roles.length === 0) return <Outlet />;
  if (!role || !roles.includes(role)) return <Navigate to={defaultRouteForRole(role)} replace />;

  return <Outlet />;
}
