import { useAuthStore } from "../stores/auth.js";

export function redirectIfAuthenticated(to, from, next) {
  console.log(1);
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    console.log(2);
    next("/users");
  } else {
    console.log(3);
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
