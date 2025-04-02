import { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";
import useThemeStore from "../zustand/themeStore";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemTheme = useColorScheme(); // Auto-detect system theme
  const { theme } = useThemeStore();

  const appTheme: Theme = theme === "system" as string
    ? systemTheme === "dark" ? "dark" : "light" 
    : theme as Theme;

  return (
    <ThemeContext.Provider value={{ theme: appTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
