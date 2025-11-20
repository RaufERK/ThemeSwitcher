/* eslint-disable react-refresh/only-export-components */
// src/theme/ThemeContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readInitialTheme, persistTheme, type Theme } from "./theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => readInitialTheme());

  useEffect(() => {
    const root = document.documentElement;

    // data-theme="light" | "dark" для CSS-переменных
    root.setAttribute("data-theme", theme);

    // Если понадобятся классы:
    root.classList.remove("triplex-theme-light", "triplex-theme-dark");
    root.classList.add(
      theme === "dark" ? "triplex-theme-dark" : "triplex-theme-light"
    );

    persistTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
};
