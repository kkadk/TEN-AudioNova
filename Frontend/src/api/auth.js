import api from '../utils/axios';

export const login = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  return response.data;
};

export const register = async (username, email, password) => {
    const response = await api.post('/auth/register/', { username, email, password });
  return response.data;
}

export const verifyEmail = async (token) => {
    const response = await api.get(`/auth/verify-email/${token}/`);
    return response.data;
};

export const refreshToken = async (refresh) => {
    const response = await api.post('/auth/token/refresh/', { refresh });
    return response.data;
};