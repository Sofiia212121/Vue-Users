import api from "./index";

export const getUsers = () => {
  return api.get("/users");
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};

export const updateUser = (userId, data) => {
  return api.patch(`/users/${userId}`, data);
};

export const updateUserPassword = (userId, data) => {
  return api.patch(`/users/update-password/${userId}`, data);
};
