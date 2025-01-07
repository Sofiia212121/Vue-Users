import api from './index';

export const getUsers = () => {
    return api.get('/users');
}

export const deleteUser = (userId) => {
    return api.delete(`/users/${userId}`);
}
