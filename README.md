# 🎛 Triplex Theme Switcher (Redux)

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)]()
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)]()
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State_Management-764ABC?logo=redux&logoColor=white)]()
[![Triplex Next](https://img.shields.io/badge/Triplex_Next-UI_Kit-00A19A)]()
[![License](https://img.shields.io/badge/License-Free-green.svg)]()

Демо-проект на **React + Vite + TypeScript + Redux Toolkit**, который показывает, как реализовать **переключение светлой/тёмной темы** в приложении с компонентами **@sberbusiness/triplex-next**.

Репозиторий можно использовать как **эталонный пример** для боевых проектов (например, SC): здесь есть и Redux, и синхронизация с DOM/localStorage, и работа с CSS-переменными Triplex.

---

## ✨ Что демонстрирует проект

- 🌓 Переключение тем **light / dark**  
- 🔁 Хранение темы в **Redux store**  
- 🧠 Использование **Redux Toolkit** (`createSlice`, типизированные хуки)  
- 🎯 Синхронизация темы с:
  - `html[data-theme]`
  - CSS-токенами Triplex
  - `localStorage`
- 🎛 UI-переключатель на компонентах **Triplex Next** (`Button`, `EButtonTheme`, `EButtonSize`)
- 🎨 Пример **CSS Modules** для локальных стилей компонента

---

## 📦 Стек

- **React 18**
- **Vite**
- **TypeScript**
- **Redux Toolkit + react-redux**
- **@sberbusiness/triplex-next@1.1.1**
- **CSS Custom Properties (CSS-переменные)**
- **CSS Modules**

---

## 📁 Структура проекта

```txt
src/
  App.tsx                    # Основной экран с демо-компонентами
  main.tsx                   # Точка входа, подключение Provider и ThemeSync
  ThemeSync.tsx              # Синхронизация Redux-темы с DOM и localStorage

  styles/
    index.css                # Токены и CSS-переменные для тем (light/dark)
    globals.css              # Базовые глобальные стили
    fonts.css                # Подключение шрифтов

  components/
    ThemeSwitcher.tsx        # Переключатель темы на Triplex-кнопках
    ThemeSwitcher.module.css # Локальные стили для переключателя

  store/
    index.ts                 # Конфигурация Redux store
    hooks.ts                 # Типизированные хуки useAppDispatch/useAppSelector
    themeSlice.ts            # Slice с состоянием темы (light/dark)
```

---

## 🧩 Архитектура темизации

Темизация разбита на три слоя:

### 1. Redux slice (`themeSlice.ts`)

```ts
// src/store/themeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export type ThemeState = {
  value: Theme;
};

const initialState: ThemeState = {
  value: "light", // значение по умолчанию
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
```

> Здесь нет работы с DOM или localStorage — только **чистое состояние** и экшены.

---

### 2. Сайд-эффекты (`ThemeSync.tsx`)

```tsx
// src/ThemeSync.tsx
import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";

const STORAGE_KEY = "triplex-theme-demo";

export const ThemeSync = () => {
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    const root = document.documentElement;

    // <html data-theme="light|dark">
    root.setAttribute("data-theme", theme);

    // Дополнительные классы, если нужны
    root.classList.remove("triplex-theme-light", "triplex-theme-dark");
    root.classList.add(
      theme === "dark" ? "triplex-theme-dark" : "triplex-theme-light"
    );

    // Сохранение выбора пользователя
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return null;
};
```

Этот компонент:

- слушает состояние `theme` в Redux;
- обновляет атрибут и классы на `<html>`;
- сохраняет тему в `localStorage`.

---

### 3. CSS-переменные (`styles/index.css`)

```css
:root[data-theme='light'] {
  --triplex-next-ColorDarkNeutral-50-1-1-1: #2d2d30;
  --triplex-next-ColorNeutral-90-1-1-1: #f2f4f7;
}

:root[data-theme='dark'] {
  --triplex-next-ColorDarkNeutral-50-1-1-1: #f5f5f6;
  --triplex-next-ColorNeutral-90-1-1-1: #18181a;
}

body {
  margin: 0;
  color: var(--triplex-next-ColorDarkNeutral-50-1-1-1, #2d2d30);
  background-color: var(--triplex-next-ColorNeutral-90-1-1-1, #f2f4f7);
}
```

Компоненты Triplex Next используют эти CSS-переменные как токены — поэтому при смене `data-theme` вся палитра автоматически подстраивается.

---

## 🎛 Компонент ThemeSwitcher

```tsx
// src/components/ThemeSwitcher.tsx
import { Button, EButtonTheme, EButtonSize } from "@sberbusiness/triplex-next";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTheme } from "../store/themeSlice";
import styles from "./ThemeSwitcher.module.css";

export const ThemeSwitcher = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();
  const isLight = theme === "light";

  return (
    <div className={styles.themeSwitcher}>
      <span>Тема:</span>

      <Button
        theme={isLight ? EButtonTheme.GENERAL : EButtonTheme.SECONDARY}
        size={EButtonSize.MD}
        type="button"
        onClick={() => dispatch(setTheme("light"))}
      >
        Светлая
      </Button>

      <Button
        theme={!isLight ? EButtonTheme.GENERAL : EButtonTheme.SECONDARY}
        size={EButtonSize.MD}
        type="button"
        onClick={() => dispatch(setTheme("dark"))}
      >
        Тёмная
      </Button>
    </div>
  );
};
```

```css
/* src/components/ThemeSwitcher.module.css */
.themeSwitcher {
  display: flex;
  gap: 8px;
  align-items: center;
}
```

> Пример показывает **правильное использование CSS Modules** с Triplex-компонентами.

---

## 🔗 Подключение Redux и ThemeSync

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { ThemeSync } from "./ThemeSync";

import "./styles/fonts.css";
import "./styles/globals.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeSync />
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## ▶️ Запуск проекта

```bash
npm install
npm run dev
```

После этого открой:

```txt
http://localhost:5173
```

---

## 🤝 Совместимость с Triplex Next

Демо протестировано с:

- `@sberbusiness/triplex-next@1.1.1`

В этой версии доступны:

- `Button`
- `EButtonTheme`
- `EButtonSize`

Если будете обновлять до более новых версий Triplex Next, можно использовать строковые размеры:

```tsx
size="md"
```

---

## 🖼 Рекомендуется добавить позже

В репозиторий можно добавить:

```txt
docs/
  light.png   # скриншот светлой темы
  dark.png    # скриншот тёмной темы
```

и вставить в README, например:

```md
![Light theme](docs/light.png)
![Dark theme](docs/dark.png)
```

---

## 📄 Лицензия

Свободное использование для внутренних демо, обучения и примеров интеграции Triplex в проекты.

---

## ⭐ Если этот пример полезен

Если используете этот репозиторий в команде — можно:

- добавить ссылку на него в внутреннюю Wiki,
- оформить как «рекомендованный шаблон» переключения темы,
- расширить демо компонентами (`CardStatic`, `Island`, `AlertProcess` и т.д.).
