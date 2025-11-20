// src/theme/theme.ts
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'triplex-theme-demo';

export const readInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return 'light';
};

export const persistTheme = (theme: Theme) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, theme);
};
