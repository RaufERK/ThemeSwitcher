// src/components/ThemeSwitcher.tsx
import { useTheme } from '../theme/ThemeContext';
import { Button, EButtonTheme ,EButtonSize} from '@sberbusiness/triplex-next';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span>Тема:</span>

      <Button
        theme={isLight ? EButtonTheme.GENERAL : EButtonTheme.SECONDARY}
        size={EButtonSize.MD}
        type="button"
        onClick={() => setTheme('light')}
      >
        Светлая
      </Button>

      <Button
        theme={!isLight ? EButtonTheme.GENERAL : EButtonTheme.SECONDARY}
          size={EButtonSize.MD}
        type="button"
        onClick={() => setTheme('dark')}
      >
        Тёмная
      </Button>
    </div>
  );
};
