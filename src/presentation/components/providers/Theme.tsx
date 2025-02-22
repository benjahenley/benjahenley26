"use client";

import { createContext, useContext, useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkmode";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = darkMode ? "light" : "dark";

    root.classList.remove(darkMode ? "dark" : "light");
    root.classList.add(newTheme);

    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

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
