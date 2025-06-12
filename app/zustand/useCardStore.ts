import { create } from 'zustand';
import axios from 'axios';

const API_BASE = `https://backend-stb.onrender.com/api/cartroutes`;

// Interfaces
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

export interface UserCard {
  _id: string;
  user: string;
  bankingAccount: {
    _id: string;
    accountNumber: string;
    // Add other banking account fields as needed
  };
  cardType: CardType;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  pin: string;
  status: 'active' | 'blocked';
  currentBalance: number;
  fees: {
    annual: number;
    withdrawal: number;
    replacement: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CardApplication {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  bankingAccount: {
    _id: string;
    accountNumber: string;
  };
  cardType: CardType;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  // Add other application fields as needed
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
  // Card Types
  cardTypes: CardType[];
  selectedCardType: CardType | null;
  
  // User Cards
  userCards: UserCard[];
  currentCard: UserCard | null;
  
  // Applications
  applications: CardApplication[];
  selectedApplication: CardApplication | null;
  
  // Loading states
  isLoading: boolean;
  cardsLoading: boolean;
  applicationsLoading: boolean;
  
  // Error states
  error: string | null;
  cardsError: string | null;
  applicationsError: string | null;
  
  // Application submission
  applicationStatus: 'idle' | 'loading' | 'success' | 'error';
  applicationError: string | null;

  // Methods
  // Card Types
  fetchCardTypes: () => Promise<void>;
  fetchCardTypeById: (id: string) => Promise<void>;
  clearSelectedCardType: () => void;
  
  // User Cards
  fetchUserCards: () => Promise<void>;
  fetchCardDetails: (id: string) => Promise<void>;
  toggleBlockCard: (id: string) => Promise<{ success: boolean; message: string }>;
  changeCardPin: (cardId: string, newPin: string) => Promise<{ success: boolean; message: string }>;
  clearCurrentCard: () => void;
  
  // Applications
  submitApplication: (data: ApplicationData) => Promise<{ success: boolean; message: string }>;
  fetchApplicationDetails: (id: string) => Promise<void>;
  resetApplicationStatus: () => void;
}

export const useCardStore = create<CardStoreState>((set) => ({
  // Initial state
  cardTypes: [],
  selectedCardType: null,
  userCards: [],
  currentCard: null,
  applications: [],
  selectedApplication: null,
  isLoading: false,
  cardsLoading: false,
  applicationsLoading: false,
  error: null,
  cardsError: null,
  applicationsError: null,
  applicationStatus: 'idle',
  applicationError: null,

  // Card Type Methods
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

  fetchCardTypeById: async (id: string) => {
    set({ isLoading: true, error: null, selectedCardType: null });
    try {
      const response = await axios.get<CardType>(`${API_BASE}/onecart/${id}`);
      set({ selectedCardType: response.data, isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message || 'Failed to fetch card type', 
        isLoading: false 
      });
    }
  },

  clearSelectedCardType: () => set({ selectedCardType: null, error: null }),

  // User Card Methods
  fetchUserCards: async () => {
    set({ cardsLoading: true, cardsError: null });
    try {
      const response = await axios.get<UserCard[]>(`http://localhost:5000/api/cartroutes/usercards`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ userCards: response.data, cardsLoading: false });
    } catch (err: any) {
      set({ 
        cardsError: err.response?.data?.message || err.message || 'Failed to fetch user cards', 
        cardsLoading: false 
      });
    }
  },

  fetchCardDetails: async (id: string) => {
    set({ cardsLoading: true, cardsError: null, currentCard: null });
    try {
      const response = await axios.get<UserCard>(`http://localhost:5000/api/cartroutes/getonecard/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ currentCard: response.data, cardsLoading: false });
    } catch (err: any) {
      set({ 
        cardsError: err.response?.data?.message || err.message || 'Failed to fetch card details', 
        cardsLoading: false 
      });
    }
  },

  toggleBlockCard: async (id: string) => {
    try {
      const response = await axios.put<UserCard>(`http://localhost:5000/api/cartroutes/toggleblock/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Update local state
      set(state => ({
        userCards: state.userCards.map(card => 
          card._id === id ? { ...card, status: response.data.status } : card
        ),
        currentCard: state.currentCard?._id === id ? 
          { ...state.currentCard, status: response.data.status } : 
          state.currentCard
      }));
      
      return { success: true, message: 'Card status updated successfully' };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || err.message || 'Failed to update card status' 
      };
    }
  },

  changeCardPin: async (cardId: string, newPin: string) => {
    try {
      await axios.put(`http://localhost:5000/api/cartroutes/changepin`, { cardId, newPin }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return { success: true, message: 'PIN changed successfully' };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || err.message || 'Failed to change PIN' 
      };
    }
  },

  clearCurrentCard: () => set({ currentCard: null, cardsError: null }),

  // Application Methods
  submitApplication: async (data: ApplicationData) => {
    set({ applicationStatus: 'loading', applicationError: null });
    try {
      const response = await axios.post(`${API_BASE}/submitapplication`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ applicationStatus: 'success' });
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit application';
      set({ applicationStatus: 'error', applicationError: errorMessage });
      return { success: false, message: errorMessage };
    }
  },
  fetchApplicationDetails: async (id: string) => {
    set({ applicationsLoading: true, applicationsError: null, selectedApplication: null });
    try {
      const response = await axios.get<CardApplication>(`${API_BASE}/getoneapplication/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ selectedApplication: response.data, applicationsLoading: false });
    } catch (err: any) {
      set({ 
        applicationsError: err.response?.data?.message || err.message || 'Failed to fetch application details', 
        applicationsLoading: false 
      });
    }
  },

  resetApplicationStatus: () => set({ applicationStatus: 'idle', applicationError: null }),
}));