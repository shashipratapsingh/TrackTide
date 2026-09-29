import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ROLES, ROLE_LABELS } from "../../../constants/roles";
import { defaultRouteForRole } from "../../../utils/accessControl";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "admin", password: "admin123", role: ROLES.ADMIN });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setError("");
    try {
      const session = await login(form);
      navigate(defaultRouteForRole(session?.user?.role || form.role));
    }
    catch (err) { setError(err.message || "Login failed"); }
  }

  return <div className="auth-page"><div className="auth-card">
    <div className="brand auth-brand"><span className="brand-mark">T</span><div><b>TrackTide</b><small>Logistics Platform</small></div></div>
    <h1>Welcome back</h1><p className="muted">Sign in to manage your logistics operations.</p>
    {error && <div className="alert error">{error}</div>}
    <form onSubmit={submit}>
      <label>Username<input value={form.username} onChange={e => setForm({...form, username:e.target.value})} /></label>
      <label>Password<input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} /></label>
      <label>Role<select value={form.role} onChange={e => setForm({...form, role:e.target.value})}>{Object.entries(ROLE_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
      <button className="btn btn-primary full">Sign in</button>
    </form>
    <div className="demo-note">Development mode: mock authentication is enabled.</div>
  </div></div>;
}
