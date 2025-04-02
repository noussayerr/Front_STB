import { ThemeProvider } from "./providers/ThemeProvider";
import { Stack } from "expo-router/stack";
import "../global.css";

export default function App() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="auth/register/register"
          options={{ title: "Register", headerShown: false }}
        />
        <Stack.Screen
          name="auth/register/verify"
          options={{ title: "verify", headerShown: false }}
        />
        <Stack.Screen
          name="auth/login_signup"
          options={{ title: "login_signup", headerShown: false }}
        />
        <Stack.Screen
          name="auth/login/Login"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen 
          name="View/(Carts)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/(verify)"
          options={{ title: "verify", headerShown: false }} 
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
