import { useState } from 'react';
import { Login } from '../../../app/api/(auth)/login/login';
import { Registration } from '../../../app/api/(auth)/registration/registration';

enum Mode {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

export const AuthForms = () => {
  const [mode, setMode] = useState<Mode>(Mode.SIGN_IN);

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
