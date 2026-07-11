import { fetchService } from "../lib/fetcher";

export const authService = {
  signInWithRut({ rut, password }) {
    return fetchService.post("/api/auth/sign-in/rut", {
      rut,
      password,
    });
  },

  getSession() {
    return fetchService.get("/api/auth/get-session");
  },

  signOut() {
    return fetchService.request("/api/auth/sign-out", {
      method: "POST",
    });
  },
};
