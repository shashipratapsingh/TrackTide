import { apiClient } from "../api/apiClient";
import { env } from "../../config/env";
import { mockApi } from "../api/mockApi";
import { storageService } from "../storage/storageService";

export const authService = {
  async login(credentials) {
    const result = env.dataSource === "mock"
      ? await mockApi.login(credentials)
      : (await apiClient.post("/auth/login", credentials)).data;

    const session = {
      ...result,
      user: {
        ...(result?.user || {}),
        role: result?.user?.role || result?.role || credentials?.role || "CUSTOMER"
      },
      role: result?.user?.role || result?.role || credentials?.role || "CUSTOMER"
    };

    storageService.setSession(session);
    return storageService.getSession();
  },
  logout() {
    storageService.clearSession();
  },
  getSession() {
    return storageService.getSession();
  }
};
