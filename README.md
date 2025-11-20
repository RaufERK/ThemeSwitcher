# 📘 Triplex Theme Demo

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)]()
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)]()
[![Triplex Next](https://img.shields.io/badge/Triplex%20Next-UI%20Kit-00A19A)]()
[![License](https://img.shields.io/badge/License-Free-green.svg)]()

Мини-проект на **React + Vite + Triplex Next**, демонстрирующий, как правильно реализовать **переключение светлой и тёмной темы** в приложении с UI-библиотекой **@sberbusiness/triplex-next**.

---

## ✨ Возможности

- 🌓 Светлая и тёмная тема (light / dark)  
- 💾 Сохранение выбранной темы в `localStorage`  
- ⚛️ ThemeProvider на основе React Context  
- 🎛 Переключатель темы на компонентах Triplex  
- 🎨 Компоненты Triplex автоматически реагируют на тему  
- 📦 Простая структура, без лишнего кода  
- 🔧 Поддержка версий Triplex Next `1.1.1` — `1.3.0`

---

## 📦 Стек технологий

- **React 18**
- **Vite**
- **TypeScript**
- **Triplex Next (`@sberbusiness/triplex-next`)**
- **CSS Custom Properties**
- **Context API**

---

## 📁 Структура проекта

```
src/
  components/
    ThemeSwitcher.tsx        # Переключатель темы
  theme/
    ThemeContext.tsx         # Провайдер темы
    theme.ts                 # localStorage + типы
  styles/
    index.css                # CSS-переменные тем
    globals.css
    fonts.css
  App.tsx                    # Демо-интерфейс
  main.tsx                   # Точка входа
```

---

## 🌓 Как работает тема

### 1. **ThemeProvider**

Создаёт контекст, переключает тему и назначает атрибут на `<html>`:

```ts
document.documentElement.setAttribute("data-theme", theme);
```

### 2. **CSS-переменные**

В файле `index.css`:

```css
:root[data-theme='light'] { ... }
:root[data-theme='dark'] { ... }
```

### 3. **ThemeSwitcher**

Простые кнопки Triplex:

```tsx
<Button theme={EButtonTheme.GENERAL} size="md">Светлая</Button>
<Button theme={EButtonTheme.SECONDARY} size="md">Тёмная</Button>
```

---

## ▶️ Запуск проекта

```bash
npm install
npm run dev
```

---

## 🤝 Совместимость Triplex Next

Совместим с версиями:

✔ `@sberbusiness/triplex-next@1.1.1`  
✔ `@sberbusiness/triplex-next@1.3.0`

**Важно:** некоторые enum'ы могут отсутствовать → используйте строковые размеры:  
```tsx
size="md"
```

---

## 🖼 Screenshots (рекомендуется вставить позже)

Добавь сюда скриншоты:

```
docs/
  light.png
  dark.png
```

---

## 📄 Лицензия

Свободно для обучения, демо и внутренних экспериментов.

---

## ⭐ Если проект полезен — поставь звёздочку!
