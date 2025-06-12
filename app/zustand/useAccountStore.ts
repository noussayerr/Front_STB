import { create } from 'zustand';
import axios from 'axios';

const API_BASE = `https://backend-stb.onrender.com/api/accountroutes`;

export type AccountType = {
  id: string;
  name: string;
  description: string;
  features: string[];
  minDeposit: string;       
  monthlyFee: string;
  icon: string;
}

export type Account = {
  id: string;
  accountNumber: string;
  balance: number;
  currency: string;
  type: string;
  accountType: {
    name: string;
    description: string;
    icon?: string;
  };
  status: string;
};


interface AccountStoreState {
  accountTypes: AccountType[];
  selectedAccount: AccountType | null;
  isLoading: boolean;
  error: string | null;
  applicationStatus: 'idle' | 'loading' | 'success' | 'error';
  applicationError: string | null;
  accounts: Account[];
  fetchUserAccounts: () => Promise<void>;
  fetchAccountTypes: () => Promise<void>;
  fetchAccountById: (id: string) => Promise<void>;
  clearSelectedAccount: () => void;
  submitApplication: (data: any) => Promise<{ success: boolean; message: string }>;
  resetApplicationStatus: () => void;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
  accountTypes: [],
  selectedAccount: null,
  isLoading: false,
  error: null,
  applicationStatus: 'idle',
  applicationError: null,
  accounts: [],
  fetchAccountTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_BASE}/getaccounttypes`);
      
      const mapped = data.map((doc: any) => ({
        id: doc._id,
        name: doc.name,
        description: doc.description,
        features: doc.features,
        minDeposit: `${doc.requirements.minDeposit} DT`,
        monthlyFee: doc.fees.monthly > 0 ? `${doc.fees.monthly} DT` : 'Free',
        icon: doc.icon,
      }));

      set({ accountTypes: mapped, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch accounts',
        isLoading: false,
      });
    }
  },
  fetchUserAccounts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`http://localhost:5000/api/accountroutes/myaccounts`, {
       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const mappedAccounts = data.data.map((account: any) => ({
        id: account._id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        currency: 'DT', // Assuming Tunisian Dinar
        type: account.accountType?.name.toLowerCase() || 'current',
        accountType: {
          name: account.accountType?.name || 'Bank Account',
          description: account.accountType?.description || '',
          icon: account.accountType?.icon
        },
        status: account.status
      }));

      set({ accounts: mappedAccounts, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch user accounts',
        isLoading: false,
      });
    }
  },
  fetchAccountById: async (id: string) => {
    set({ isLoading: true, error: null, selectedAccount: null });
    try {
      const { data } = await axios.get(`${API_BASE}/oneaccount/${id}`);
      
      set({
        selectedAccount: {
          id: data._id,
          name: data.name,
          description: data.description,
          features: data.features,
          minDeposit: `${data.requirements.minDeposit} DT`,
          monthlyFee: data.fees.monthly > 0 ? `${data.fees.monthly} DT` : 'Free',
          icon: data.icon,
        },
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch account',
        isLoading: false,
      });
    }
  },

  submitApplication: async (data) => {
    set({ applicationStatus: 'loading', applicationError: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/accountroutes/submitapplication`, data);
      set({ applicationStatus: 'success' });
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit application';
      set({ applicationStatus: 'error', applicationError: errorMessage });
      return { success: false, message: errorMessage };
    }
  },

  clearSelectedAccount: () => set({ selectedAccount: null, error: null }),
  resetApplicationStatus: () => set({ applicationStatus: 'idle', applicationError: null }),
}));