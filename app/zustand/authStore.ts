import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import { router } from 'expo-router';
import { zustandStorage } from '../utils/storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://backend-stb.onrender.com/api';

interface User {
  id: string;
  email: string;
  name: string;
  verified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  message: string | null;
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  findrrib: (rib: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: true,
      error: null,
      message: null,
      initializeAuth: async () => {
        try {
          const token = await zustandStorage.getItem('auth-storage');
          if (token) {
            const response = await axios.get(`${API_URL}/authroutes/check-auth`, {
              headers: { Authorization: `Bearer ${JSON.parse(token).token}` }
            });
            set({
              user: response.data.user,
              token: JSON.parse(token).token,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          set({ isCheckingAuth: false });
        }
      },
      findrrib: async (rib: String) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/authroutes/ribcheck`, { rib });
          set({
            message: response.data.message,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Request failed',
            
            isLoading: false,
          });
          
          throw error;
        }
      },
      login: async (email, password) => {
        
        set({ isLoading: true, error: null });
        try {
          
          const response = await axios.post(`${API_URL}/authroutes/login`, { email, password });
          
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
            isCheckingAuth: false,
            
          });
          
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
            isCheckingAuth: false,
          });
          throw error;
        }
      },
      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/authroutes/signup`, userData);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          router.push('/auth/register/verify');
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Signup failed',
            isLoading: false,
          });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await axios.post(`${API_URL}/authroutes/logout`, {}, {
            headers: { Authorization: `Bearer ${get().token}` }
          });
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          router.replace('/auth/login/Login');
        } catch (error) {
          set({ isLoading: false });
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/authroutes/verify-email`, { code }, {
            headers: { Authorization: `Bearer ${get().token}` }
          });
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          router.replace('/(tabs)');
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Verification failed',
            isLoading: false,
          });
          throw error;
        }
      },
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/authroutes/forgot-password`, { email });
          set({
            message: response.data.message,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Request failed',
            isLoading: false,
          });
          throw error;
        }
      },
      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/authroutes/reset-password/${token}`, { password });
          set({
            message: response.data.message,
            isLoading: false,
          });
          router.replace('/auth/login/Login');
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Password reset failed',
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  ));

// Axios interceptors
axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);