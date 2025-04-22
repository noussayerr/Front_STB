// components/AuthWrapper.tsx

import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../zustand/authStore';
import { router } from 'expo-router';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    router.replace('/auth/login/Login');
    return null;
  }

  return <>{children}</>;
}

export function GuestWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated) {
    router.replace('/(tabs)');
    return null;
  }

  return <>{children}</>;
}