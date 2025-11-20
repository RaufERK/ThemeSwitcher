// src/ThemeSync.tsx
import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";

const STORAGE_KEY = "triplex-theme-demo";

export const ThemeSync = () => {
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    const root = document.documentElement;

    // data-theme="light|dark"
    root.setAttribute("data-theme", theme);

    // классы для потенциальных css-правил
    root.classList.remove("triplex-theme-light", "triplex-theme-dark");
    root.classList.add(
      theme === "dark" ? "triplex-theme-dark" : "triplex-theme-light"
    );

    // localStorage
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return null;
};
