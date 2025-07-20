import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, api } from '@/services';
import { UserInterface } from '../interfaces';

// Delete Auth cookie
const deleteAuthCookie = () => {
  try {
    // Delete cookie from current path
    document.cookie = `Authentication=; Max-Age=0; path=/`;
    // Delete cookie from root path
    document.cookie = `Authentication=; Max-Age=0; path=/; domain=${window.location.hostname}`;

  } catch (error) {
    console.log(error)
  }
};

// Delete Auth API headers
const deleteAuthApiHeaders = () => {
  try {
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.log(error)
  }
};

// Set Auth API headers
const setAuthApiHeaders = (token: string) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.log(error)
  }
};

// Call backend logout endpoint
const callBackendLogout = async () => {
  try {
    await authApi.logout();
  } catch (error) {
    console.log(error)
  }
};

export interface AuthState {
  user: UserInterface | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, first_name: string, last_name: string) => Promise<void>;
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
          setAuthApiHeaders(response.access_token);
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

      signup: async (email: string, password: string, first_name: string, last_name: string) => {
        try {
          set({ loading: true, error: null });
          await authApi.signup(email, password, first_name, last_name);
          await get().login(email, password);
        } catch (error) {
          set({ loading: false, error: 'Failed to create account' });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Delete authentication cookie
          deleteAuthCookie();

          // Clear API headers
          deleteAuthApiHeaders();

          // Clear auth store state
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null
          });

          // Call backend logout endpoint
          await callBackendLogout();

          // Redirect to login page
          window.location.href = '/login';

          // Return a promise that resolves after redirect
          return new Promise((resolve) => {
            setTimeout(resolve, 0);
          });
        } catch (error) {
          console.error('Failed to logout:', error);
          // Even if backend logout fails, we still clear local state
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
