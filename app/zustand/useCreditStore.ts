import { create } from 'zustand';
import axios from 'axios';

const API_BASE = `https://backend-stb.onrender.com/api/creditroutes`;

export type CreditType = {
  id: string;
  title: string;
  description: string;
  interestRate: string;
  duration: string;
  eligibility: string;
  icon: string;
  color: string;
  maxAmount: string;
}

interface CreditStoreState {
  credits: CreditType[];
  selectedCredit: CreditType | null;
  isLoading: boolean;
  error: string | null;
  applicationStatus: 'idle' | 'loading' | 'success' | 'error';
  applicationError: string | null;

  fetchCredits: () => Promise<void>;
  fetchCreditById: (id: string) => Promise<void>;
  clearSelectedCredit: () => void;
  submitApplication: (data: any, file?: File) => Promise<{ success: boolean; message: string }>;
  resetApplicationStatus: () => void;
}

export const useCreditStore = create<CreditStoreState>((set) => ({
  credits: [],
  selectedCredit: null,
  isLoading: false,
  error: null,
  applicationStatus: 'idle',
  applicationError: null,

  fetchCredits: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_BASE}/credittypes`);
      
      const mappedCredits = data.map((credit: any) => ({
        id: credit._id,
        title: credit.title,
        description: credit.description,
        interestRate: credit.interestRate,
        duration: credit.duration,
        eligibility: credit.eligibility,
        icon: credit.icon,
        color: credit.color || '#2563eb',
        maxAmount: `${credit.maxAmount} DT`,
      }));

      set({ credits: mappedCredits, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credits',
        isLoading: false,
      });
    }
  },

  fetchCreditById: async (id: string) => {
    set({ isLoading: true, error: null, selectedCredit: null });
    try {
      const { data } = await axios.get(`${API_BASE}/credittypes/${id}`);
      
      set({
        selectedCredit: {
          id: data._id,
          title: data.title,
          description: data.description,
          interestRate: data.interestRate,
          duration: data.duration,
          eligibility: data.eligibility,
          icon: data.icon,
          color: data.color || '#2563eb',
          maxAmount: `${data.maxAmount} DT`,
        },
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credit',
        isLoading: false,
      });
    }
  },

  submitApplication: async (data, file) => {
    set({ applicationStatus: 'loading', applicationError: null });
    try {
      const formData = new FormData();
      
      // Append all form data
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      
      // Append file if exists
      if (file) {
        formData.append('bankStatement', file);
      }

      const response = await axios.post(`${API_BASE}/submitapplication`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      set({ applicationStatus: 'success' });
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit application';
      set({ applicationStatus: 'error', applicationError: errorMessage });
      return { success: false, message: errorMessage };
    }
  },

  clearSelectedCredit: () => set({ selectedCredit: null, error: null }),
  resetApplicationStatus: () => set({ applicationStatus: 'idle', applicationError: null }),
}));