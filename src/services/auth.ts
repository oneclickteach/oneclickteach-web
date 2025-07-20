import { api } from './api';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string, first_name: string, last_name: string) => {
    const response = await api.post('/auth/signup', { email, password, first_name, last_name });
    return response.data;
  },

  getUserProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
