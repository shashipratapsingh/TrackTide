const SESSION_KEY = "tracktide.session";
const DATA_KEY = "tracktide.mock.data";

const normalizeSession = (session) => {
  if (!session || typeof session !== "object") return null;

  const user = session.user && typeof session.user === "object" ? session.user : {};
  const normalizedUser = {
    ...user,
    id: user.id || session.userId || session.id || null,
    name: user.name || session.name || "User",
    email: user.email || session.email || "",
    role: user.role || session.role || "CUSTOMER"
  };

  return {
    ...session,
    accessToken: session.accessToken || session.token || null,
    user: normalizedUser,
    role: normalizedUser.role
  };
};

export const storageService = {
  getSession() {
    try {
      const session = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || "null");
      return normalizeSession(session);
    }
    catch { return null; }
  },
  setSession(session) {
    const normalized = normalizeSession(session);
    if (!normalized) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
  },
  clearSession() {
    window.sessionStorage.removeItem(SESSION_KEY);
  },
  getMockData() {
    try { return JSON.parse(localStorage.getItem(DATA_KEY) || "null"); }
    catch { return null; }
  },
  setMockData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }
};
