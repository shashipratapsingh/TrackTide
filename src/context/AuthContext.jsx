import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/auth/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());

  useEffect(() => {
    const syncSession = () => setSession(authService.getSession());
    const onUnauthorized = () => setSession(null);
    const handleStorage = (event) => {
      if (event.key === "tracktide.session" && event.storageArea === window.sessionStorage) syncSession();
    };

    window.addEventListener("auth:unauthorized", onUnauthorized);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("auth:unauthorized", onUnauthorized);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    isAuthenticated: Boolean(session?.accessToken),
    async login(credentials) {
      const next = await authService.login(credentials);
      setSession(authService.getSession());
      return next;
    },
    logout() {
      authService.logout();
      setSession(null);
    }
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
