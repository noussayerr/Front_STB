import { create } from 'zustand'
import axios from 'axios'
import Constants from 'expo-constants'

const API_BASE = `http://localhost:5000/api/creditroutes`

export type CreditType = {
  id: string
  title: string
  description: string
  interestRate: string
  duration: string
  eligibility: string
  icon: string
  color: string
}

interface CreditStoreState {
  credits: CreditType[]
  selectedCredit: CreditType | null
  isLoading: boolean
  error: string | null

  fetchCredits: () => Promise<void>
  fetchCreditById: (id: string) => Promise<void>
  clearSelectedCredit: () => void
}

export const useCreditStore = create<CreditStoreState>((set) => ({
  credits: [],
  selectedCredit: null,
  isLoading: false,
  error: null,

  fetchCredits: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await axios.get(`${API_BASE}/credittypes`)
      
      const mappedCredits = data.map((credit: any) => ({
        id: credit._id,
        title: credit.title,
        description: credit.description,
        interestRate: credit.interestRate,
        duration: credit.duration,
        eligibility: credit.eligibility,
        icon: credit.icon,
        color: credit.color || '#2563eb' // default color if not provided
      }))

      set({ credits: mappedCredits, isLoading: false })
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credits',
        isLoading: false,
      })
    }
  },

  fetchCreditById: async (id: string) => {
    set({ isLoading: true, error: null, selectedCredit: null })
    try {
      const { data } = await axios.get(`${API_BASE}/credittypes/${id}`)
      
      set({
        selectedCredit: {
          id: data._id,
          title: data.title,
          description: data.description,
          interestRate: data.interestRate,
          duration: data.duration,
          eligibility: data.eligibility,
          icon: data.icon,
          color: data.color || '#2563eb'
        },
        isLoading: false,
      })
    } catch (err: any) {
      set({
        error: err.response?.data?.message ?? err.message ?? 'Failed to fetch credit',
        isLoading: false,
      })
    }
  },

  clearSelectedCredit: () => set({ selectedCredit: null, error: null }),
}))