import { useState } from 'react';
import { Registration } from './(auth)/registration/registration';
import { Login } from './(auth)/login/login';

enum Mode {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

export const AuthForms = () => {
  const [mode, setMode] = useState<Mode>(Mode.SIGN_IN);

  // Функція для зміни режиму
  const changeMode = () => {
    setMode((prevMode) =>
      prevMode === Mode.SIGN_IN ? Mode.SIGN_UP : Mode.SIGN_IN
    );
  };

  return mode === Mode.SIGN_IN ? (
    <Login changeMode={changeMode} />
  ) : (
    <Registration changeMode={changeMode} />
  );
};