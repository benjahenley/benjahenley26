"use client";

import { createContext, useContext } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkmode";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  // Toggle function
  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = darkMode ? "light" : "dark";

    root.classList.remove(darkMode ? "dark" : "light");
    root.classList.add(newTheme);

    setDarkMode(!darkMode);
  };

  // Sync with document class on mount
  if (typeof window !== "undefined") {
    const root = document.documentElement;
    root.classList.add(darkMode ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: darkMode ? "dark" : "light",
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
