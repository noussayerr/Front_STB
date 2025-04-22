import { create } from 'zustand'
import axios from 'axios'
import Constants from 'expo-constants'

// point this wherever your API actually lives
const API_BASE = `https://backend-stb.onrender.com/api/accountroutes`

export type AccountType = {
  id: string
  name: string
  description: string
  features: string[]
  minDeposit: string       
  monthlyFee: string
  icon: string
}

interface AccountStoreState {
  accountTypes: AccountType[]
  selectedAccount: AccountType | null
  isLoading: boolean
  error: string | null

  fetchAccountTypes: () => Promise<void>
  fetchAccountById: (id: string) => Promise<void>
  clearSelectedAccount: () => void
}

export const useAccountStore = create<AccountStoreState>((set) => ({
  accountTypes: [],
  selectedAccount: null,
  isLoading: false,
  error: null,

  fetchAccountTypes: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get<
        Array<{
          _id: string
          name: string
          description: string
          features: string[]
          requirements: { minDeposit: number; minBalance?: number }
          fees: { monthly: number; transaction?: number; internationalTransfer?: number }
          icon: string
        }>
      >(`${API_BASE}/getaccounttypes`)

      const mapped = data.map((doc) => ({
        id: doc._id,
        name: doc.name,
        description: doc.description,
        features: doc.features,
        minDeposit: `${doc.requirements.minDeposit} DT`,
        monthlyFee: doc.fees.monthly > 0
          ? `${doc.fees.monthly} DT`
          : 'Free',
        icon: doc.icon,
      }))

      set({ accountTypes: mapped, isLoading: false })
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch accounts',
        isLoading: false,
      })
    }
  },

  fetchAccountById: async (id: string) => {
    set({ isLoading: true, error: null, selectedAccount: null })
    try {
      const { data } = await axios.get<{
        _id: string
        name: string
        description: string
        features: string[]
        requirements: { minDeposit: number; minBalance?: number }
        fees: { monthly: number; transaction?: number; internationalTransfer?: number }
        icon: string
      }>(`${API_BASE}/oneaccount/${id}`)

      set({
        selectedAccount: {
          id: data._id,
          name: data.name,
          description: data.description,
          features: data.features,
          minDeposit: `${data.requirements.minDeposit} DT`,
          monthlyFee: data.fees.monthly > 0
            ? `${data.fees.monthly} DT`
            : 'Free',
          icon: data.icon,
        },
        isLoading: false,
      })
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch account',
        isLoading: false,
      })
    }
  },

  clearSelectedAccount: () => set({ selectedAccount: null, error: null }),
}))
