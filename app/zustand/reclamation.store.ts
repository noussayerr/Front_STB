// stores/reclamation.store.ts
import { create } from 'zustand';
import axios from 'axios';
import { zustandStorage } from '../utils/storage';

interface Reclamation {
  _id: string;
  subject: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  category: string;
  responseMessage?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReclamationSummary {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
}

interface ReclamationStoreState {
  reclamations: Reclamation[];
  selectedReclamation: Reclamation | null;
  isLoading: boolean;
  error: string | null;
  summary: ReclamationSummary;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string | null;
  submitReclamation: (data: {
    subject: string;
    description: string;
    category: string;
    email?: string;
  }) => Promise<{ success: boolean; message: string }>;
  fetchUserReclamations: () => Promise<void>;
  fetchReclamationById: (id: string) => Promise<void>;
  clearSelectedReclamation: () => void;
  resetStatus: () => void;
}

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api/reclamations';

export const useReclamationStore = create<ReclamationStoreState>((set) => ({
  reclamations: [],
  selectedReclamation: null,
  isLoading: false,
  error: null,
  summary: {
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  },
  status: 'idle',
  message: null,

  submitReclamation: async (data) => {
    set({ status: 'loading', error: null });
    try {
      const token = await zustandStorage.getItem('auth-storage');
      const parsedToken = token ? JSON.parse(token).token : null;

      const response = await axios.post(`${API_BASE}`, data, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          'Content-Type': 'application/json'
        }
      });

      set({ 
        status: 'success',
        message: response.data.message
      });
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit reclamation';
      set({ 
        status: 'error',
        error: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  },

  fetchUserReclamations: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = await zustandStorage.getItem('auth-storage');
      const parsedToken = token ? JSON.parse(token).token : null;

      const response = await axios.get(`${API_BASE}/user`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`
        }
      });

      const reclamations = response.data.reclamations || [];
      const summary = {
        total: reclamations.length,
        pending: reclamations.filter((r: Reclamation) => r.status === 'pending').length,
        inProgress: reclamations.filter((r: Reclamation) => r.status === 'in-progress').length,
        resolved: reclamations.filter((r: Reclamation) => r.status === 'resolved').length
      };

      set({
        reclamations,
        summary,
        isLoading: false
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch reclamations',
        isLoading: false
      });
    }
  },

  fetchReclamationById: async (id: string) => {
    set({ isLoading: true, error: null, selectedReclamation: null });
    try {
      const token = await zustandStorage.getItem('auth-storage');
      const parsedToken = token ? JSON.parse(token).token : null;

      const response = await axios.get(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`
        }
      });

      set({
        selectedReclamation: response.data.reclamation,
        isLoading: false
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch reclamation',
        isLoading: false
      });
    }
  },

  clearSelectedReclamation: () => set({ selectedReclamation: null, error: null }),
  resetStatus: () => set({ status: 'idle', message: null, error: null })
}));

// Axios interceptors for reclamation requests
axios.interceptors.request.use(async (config) => {
  if (config.url?.includes(API_BASE)) {
    const token = await zustandStorage.getItem('auth-storage');
    const parsedToken = token ? JSON.parse(token).token : null;
    if (parsedToken) {
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config.url?.includes(API_BASE)) {
      useReclamationStore.getState().resetStatus();
    }
    return Promise.reject(error);
  }
);