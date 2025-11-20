// src/App.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

import {
  AlertProcess,
  Button,
  Caption,
  Text,
  TextField,
  Title,
  EAlertType,
  EButtonTheme,
  EFontType,
  ETextSize,
  ECaptionSize,
  ETitleSize,
  EButtonSize,
} from "@sberbusiness/triplex-next";

export default function App() {
  const [name, setName] = useState("Анна Смирнова");
  const [email, setEmail] = useState("");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(
      `Профиль обновлён: ${name || "—"}, ${email || "e-mail не задан"}.`
    );
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <Title size={ETitleSize.H2} tag="h1">
            Triplex Theme Demo
          </Title>
          <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
            Мини-пример: как компоненты Triplex реагируют на светлую и тёмную
            тему.
          </Text>
        </div>
        <ThemeSwitcher />
      </header>

      <main className="app-content">
        {/* Блок типографики */}
        <section className="app-section">
          <Title size={ETitleSize.H3} tag="h2">
            Типографика
          </Title>
          <div className="stack">
            <Text size={ETextSize.B1}>
              Основной текст B1 — ключевые сообщения интерфейса.
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
              B2 — дополнительная информация.
            </Text>
            <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY}>
              Caption C1 — служебные подписи и комментарии.
            </Caption>
          </div>
        </section>

        {/* Блок формы */}
        <section className="app-section">
          <Title size={ETitleSize.H3} tag="h2">
            Форма профиля
          </Title>
          <form className="stack stack--form" onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              inputProps={{
                value: name,
                placeholder: "Введите имя",
                onChange: handleNameChange,
              }}
            />
            <TextField
              label="E-mail"
              inputProps={{
                value: email,
                placeholder: "Введите e-mail",
                type: "email",
                onChange: handleEmailChange,
              }}
            />
            <div className="inline inline--wrap">
              <Button
                theme={EButtonTheme.GENERAL}
                type="submit"
                size={EButtonSize.MD}
              >
                Сохранить
              </Button>
              {formMessage && (
                <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS}>
                  {formMessage}
                </Caption>
              )}
            </div>
          </form>
        </section>

        {/* Блок уведомления */}
        <section className="app-section">
          <Title size={ETitleSize.H3} tag="h2">
            Системное уведомление
          </Title>
          <div className="stack">
            {alertVisible ? (
              <AlertProcess
                type={EAlertType.INFO}
                closable
                onClose={() => setAlertVisible(false)}
              >
                <Text size={ETextSize.B3}>Демо-уведомление Triplex.</Text>
                <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                  Переключи тему сверху и посмотри, как меняются цвета.
                </Caption>
              </AlertProcess>
            ) : (
              <Button
                theme={EButtonTheme.SECONDARY}
                size={EButtonSize.SM}
                onClick={() => setAlertVisible(true)}
              >
                Показать уведомление
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
