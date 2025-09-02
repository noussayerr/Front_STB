import { ThemeProvider } from "./providers/ThemeProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "./zustand/authStore";
import { useState } from "react";
import "../global.css";

export default function RootLayout() {
  const { token, isCheckingAuth, initializeAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);
  

  return (
    <ThemeProvider>
      <Stack>
        {/* Public routes - accessible to all */}
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }}/>
        {/* Auth routes - only for unauthenticated users */}
        <Stack.Screen name="auth/login_signup" options={{ title: "Login/Signup", headerShown: false }}/>
        <Stack.Screen name="auth/login/Login" options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="auth/register/register" options={{ title: "Register", headerShown: false }}/>
        <Stack.Screen name="auth/register/verify" options={{ title: "Verify Email", headerShown: false }}/>
        <Stack.Screen name="auth/(verify)" options={{ title: "Verify", headerShown: false }}/>


        {/* Protected routes - only for authenticated users */}
        <Stack.Screen name="View/pack" options={{ headerShown: false }}/>
        <Stack.Screen name="View/ReclamationCenter" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="View/settings" options={{ headerShown: false }} />
        <Stack.Screen name="auth/forgotpassword" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}