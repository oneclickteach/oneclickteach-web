import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, api } from '@/services/auth';

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  // Delete cookie from current path
  document.cookie = `${name}=; Max-Age=0; path=/`;
  // Delete cookie from root path
  document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
};

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const response = await authApi.login(email, password);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
          set({
            user: response.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false, error: 'Failed to login' });
          throw error;
        }
      },

      signup: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          await authApi.signup(email, password);
          await get().login(email, password);
        } catch (error) {
          set({ loading: false, error: 'Failed to create account' });
          throw error;
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true, error: null });
          const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('Authentication='))
            ?.split('=')[1];
          
          if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const user = await authApi.getUserProfile();
            set({
              user,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({ loading: false, isAuthenticated: false });
          }
        } catch (error) {
          set({ loading: false, error: 'Failed to check authentication' });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Call backend logout endpoint
          await authApi.logout();

          // Delete authentication cookie
          deleteCookie('Authentication');
          
          // Clear API headers
          delete api.defaults.headers.common['Authorization'];
          
          // Clear auth store state
          set({ 
            user: null, 
            isAuthenticated: false,
            loading: false,
            error: null 
          });

          // Redirect to login page
          // window.location.href = '/login';
        } catch (error) {
          console.error('Failed to logout:', error);
          // Even if backend logout fails, we still clear local state
          deleteCookie('Authentication');
          delete api.defaults.headers.common['Authorization'];
          set({ 
            user: null, 
            isAuthenticated: false,
            loading: false,
            error: 'Failed to logout' 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
