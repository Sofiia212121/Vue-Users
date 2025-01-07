import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(
    config => {
        const authStore = useAuthStore();
        // Додаємо заголовок Authorization тільки якщо токен існує
        if (authStore.isAuthenticated) {
            config.headers['Authorization'] = `Bearer ${authStore.getToken}`;
        }
        return config;
    }
);

// обробка загальних помилок і помилок валідації

// перехоплювач відповідей
// api.interceptors.response.use(response => {
//     return response;
// }, error => {
//     return Promise.reject(error);
// });

export default api;
