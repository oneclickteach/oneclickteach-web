import { api } from './api';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string) => {
    const response = await api.post('/api/auth/signup', { email, password });
    return response.data;
  },

  getUserProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },
};
