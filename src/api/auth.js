import api from './index';

export const login = (credentials) => {
    return api.post('/login', credentials);
};

export const register = (userData) => {
    return api.post('/register', userData);
};
