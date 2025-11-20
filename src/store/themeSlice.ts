// src/store/themeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export type ThemeState = {
  value: Theme;
};

const initialState: ThemeState = {
  value: "light", // по умолчанию
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.value = action.payload;
    },
    toggleTheme(state) {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
