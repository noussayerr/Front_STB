// utils/storage.ts
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For web and basic mobile storage (non-sensitive)
const asyncStorage = {
  getItem: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

// For sensitive data (uses SecureStore on mobile, AsyncStorage on web)
export const secureStorage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') {
      return await asyncStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      await asyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (Platform.OS === 'web') {
      await asyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

// Zustand compatible storage
export const zustandStorage = {
  setItem: (name: string, value: string) => {
    return secureStorage.setItem(name, value);
  },
  getItem: (name: string) => {
    return secureStorage.getItem(name);
  },
  removeItem: (name: string) => {
    return secureStorage.removeItem(name);
  },
};