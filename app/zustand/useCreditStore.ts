import { create } from 'zustand';
import axios from 'axios';

const API_BASE = 'https://backend-stb.onrender.com/api/creditroutes';

export interface CreditType {
  _id: string;
  title: string;
  description: string;
  interestRate: number;
  duration: string;
  eligibility: string;
  icon?: string;
  color?: string;
  features?: string[];
}

export interface CreditApplication {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  creditType: {
    _id: string;
    title: string;
  };
  amountRequested: number;
  duration: number;
  monthlyPayment: number;
  createdAt: string;
}

export interface Credit {
  _id: string;
  user: string;
  bankingAccount: {
    _id: string;
    accountNumber: string;
  };
  creditType: {
    _id: string;
    title: string;
    interestRate: number;
  };
  amount: number;
  remainingBalance: number;
  interestRate: number;
  term: number;
  monthlyPayment: number;
  startDate: Date | string;
  endDate: Date | string;
  status: string;
  fees?: {
    origination: number;
    latePayment: number;
    prepayment: number;
  };
  latePayments?: number;
  paymentHistory?: any[];
}

interface CreditSummary {
  totalBalance: number;
  totalMonthlyPayment: number;
  nextPayment: number;
  nextPaymentDate: Date | string | null;
  activeCredits: number;
}

interface CreditStoreState {
  creditTypes: CreditType[];
  selectedCredit: CreditType | null;
  isLoading: boolean;
  error: string | null;
  applicationStatus: 'idle' | 'loading' | 'success' | 'error';
  applicationError: string | null;
  applications: CreditApplication[];
  userCredits: Credit[];
  creditSummary: CreditSummary;
  currentCreditDetails: Credit | null;
  fetchCreditTypes: () => Promise<void>;
  fetchCreditById: (id: string) => Promise<void>;
  clearSelectedCredit: () => void;
  submitCreditApplication: (data: any) => Promise<{ success: boolean; message: string }>;
  resetApplicationStatus: () => void;
  fetchUserApplications: () => Promise<void>;
  fetchUserCredits: () => Promise<void>;
  fetchCreditDetails: (creditId: string) => Promise<void>;
}

export const useCreditStore = create<CreditStoreState>((set) => ({
  creditTypes: [],
  selectedCredit: null,
  isLoading: false,
  error: null,
  applicationStatus: 'idle',
  applicationError: null,
  applications: [],
  userCredits: [],
  creditSummary: {
    totalBalance: 0,
    totalMonthlyPayment: 0,
    nextPayment: 0,
    nextPaymentDate: null,
    activeCredits: 0
  },
  currentCreditDetails: null,

  fetchCreditTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_BASE}/credittypes`);
      set({ creditTypes: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credit types',
        isLoading: false,
      });
    }
  },

  fetchCreditById: async (id: string) => {
    set({ isLoading: true, error: null, selectedCredit: null });
    try {
      const { data } = await axios.get(`${API_BASE}/credittypes/${id}`);
      set({ selectedCredit: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credit',
        isLoading: false,
      });
    }
  },

  submitCreditApplication: async (data) => {
    set({ applicationStatus: 'loading', applicationError: null });
    try {
      const response = await axios.post(`${API_BASE}/submitapplication`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      set({ applicationStatus: 'success' });
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit application';
      set({ applicationStatus: 'error', applicationError: errorMessage });
      return { success: false, message: errorMessage };
    }
  },

  fetchUserApplications: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_BASE}/myapplications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      set({ applications: data.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch applications',
        isLoading: false,
      });
    }
  },

  fetchUserCredits: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/usercredits`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched user credits:', response.data);
      const { credits, summary } = response.data.data;

      set({
        userCredits: credits.map((credit: any) => ({
          ...credit,
          startDate: new Date(credit.startDate),
          endDate: new Date(credit.endDate)
        })),
        creditSummary: {
          totalBalance: summary.totalBalance || 0,
          totalMonthlyPayment: summary.totalMonthlyPayment || 0,
          nextPayment: summary.nextPayment || 0,
          nextPaymentDate: summary.nextPaymentDate ? new Date(summary.nextPaymentDate) : null,
          activeCredits: summary.activeCredits || 0
        },
        isLoading: false
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credits',
        isLoading: false
      });
    }
  },

  fetchCreditDetails: async (creditId: string) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/credits/${creditId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const creditData = response.data.data;
      
      set({
        currentCreditDetails: {
          ...creditData,
          startDate: new Date(creditData.startDate),
          endDate: new Date(creditData.endDate)
        },
        isLoading: false
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credit details',
        isLoading: false
      });
    }
  },

  clearSelectedCredit: () => set({ selectedCredit: null, error: null }),
  resetApplicationStatus: () => set({ applicationStatus: 'idle', applicationError: null }),
}));