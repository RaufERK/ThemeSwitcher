// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";

import "./styles/fonts.css";
import "./styles/globals.css";
import "./styles/index.css";

import { store } from "./store";
import { ThemeSync } from "./ThemeSync";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeSync />
      <App />
    </Provider>
  </StrictMode>
);