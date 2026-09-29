import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLE_LABELS } from "../../constants/roles";
import { hasPermission, navigationItems } from "../../utils/accessControl";
import { BrandLogo } from "../../components/common/BrandLogo";

export function AppLayout() {
  const { user, logout } = useAuth();
  const visible = navigationItems.filter(({ permission }) => hasPermission(user?.role, permission));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <BrandLogo />
        <nav>{visible.map(({ path, label }) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav>
        <div className="sidebar-footer">
          <div className="user-mini"><div className="avatar">{user?.name?.[0] || "U"}</div><div><b>{user?.name}</b><small>{ROLE_LABELS[user?.role] || user?.role}</small></div></div>
          <button className="btn btn-ghost full" onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><span className="eyebrow">Operations</span><h1>Logistics Control Center</h1></div><div className="topbar-badge">● System Online</div></header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  );
}
