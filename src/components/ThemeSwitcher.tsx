// src/components/ThemeSwitcher.tsx
import { Button, EButtonTheme, EButtonSize } from "@sberbusiness/triplex-next";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTheme } from "../store/themeSlice";
import "./styles.module.css";

export const ThemeSwitcher = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();
  const isLight = theme === "light";

  return (
    <div className="theme-switcher">
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
