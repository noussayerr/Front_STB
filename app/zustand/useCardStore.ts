import { create } from 'zustand';
import axios from 'axios';
import Constants from 'expo-constants';
const API_BASE = `https://backend-stb.onrender.com/api/cartroutes`;

export interface CardType {
  _id: string;
  name: string;
  description: string;
  tag: string;
  imageUrl: string;
  features: string[];
  fees: {
    annual: number;
    withdrawal: number;
    replacement: number;
  };
  requirements: {
    minIncome?: number;
    employmentStatus?: string[];
  };
  benefits: Array<{ text: string; icon: string }>;
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardType: string;
  cardHolderName: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPostalCode: string;
  employmentStatus: string;
  employerName: string;
  monthlyIncome: string;
  termsAgreed: boolean;
  bankingAccount: string;
}

interface CardStoreState {
  cardTypes: CardType[];
  selectedCard: CardType | null;
  isLoading: boolean;
  error: string | null;
  applicationStatus: 'idle' | 'loading' | 'success' | 'error';
  applicationError: string | null;

  fetchCardTypes: () => Promise<void>;
  fetchCardById: (id: string) => Promise<void>;
  clearSelectedCard: () => void;
  submitApplication: (data: ApplicationData) => Promise<{ success: boolean; message: string }>;
  resetApplicationStatus: () => void;
}

export const useCardStore = create<CardStoreState>((set) => ({
  cardTypes: [],
  selectedCard: null,
  isLoading: false,
  error: null,
  applicationStatus: 'idle',
  applicationError: null,

  fetchCardTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<CardType[]>(`${API_BASE}/getcardtypes`);
      set({ cardTypes: response.data, isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message || 'Failed to fetch card types', 
        isLoading: false 
      });
    }
  },

  fetchCardById: async (id: string) => {
    set({ isLoading: true, error: null, selectedCard: null });
    try {
      const response = await axios.get<CardType>(`${API_BASE}/onecart/${id}`);
      set({ selectedCard: response.data, isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message || 'Failed to fetch card', 
        isLoading: false 
      });
    }
  },

  clearSelectedCard: () => set({ selectedCard: null, error: null }),

  submitApplication: async (data) => {
    set({ applicationStatus: 'loading', applicationError: null });
    try {
      
      const response = await axios.post("http://localhost:5000/api/cartroutes/submitapplication", data);
      set({ applicationStatus: 'success' });
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit application';
      set({ applicationStatus: 'error', applicationError: errorMessage });
      return { success: false, message: errorMessage };
    }
  },
  resetApplicationStatus: () => set({ applicationStatus: 'idle', applicationError: null }),
}));