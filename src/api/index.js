import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useValidationStore } from "@/stores/validation";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const validationStore = useValidationStore();
  validationStore.clearErrors();
  if (authStore.isAuthenticated) {
    config.headers["Authorization"] = `Bearer ${authStore.getToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    alert(error?.response?.data?.errorMessage);

    if (error?.response?.data?.validationErrors) {
      const validationStore = useValidationStore();
      validationStore.setErrors(error.response.data.validationErrors);
    }

    if (error.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default api;
