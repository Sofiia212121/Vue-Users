import { useAuthStore } from "../stores/auth.js";

export function redirectIfAuthenticated(to, from, next) {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    next("/users");
  } else {
    next();
  }
}

export function requireAuth(to, from, next) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
}
