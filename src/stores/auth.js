import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: Cookies.get('authToken') || null,
    }),

    actions: {
        setToken(token) {
            this.token = token;
            Cookies.set('authToken', token, { expires: 8 / 24 });
        },

        logout() {
            this.token = null;
            Cookies.remove('authToken');
        },
    },

    getters: {
        getToken(state) {
            return state.token;
        },

        isAuthenticated(state) {
            return !!state.token;
        },
    },
});
