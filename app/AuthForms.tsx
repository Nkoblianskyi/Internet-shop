import { useState } from 'react';
import Login from '@/app/(auth)/login/login';
import Registration from '@/app/(auth)/registration/registration';

enum Mode {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

const AuthForms = () => {
  const [mode, setMode] = useState<Mode>(Mode.SIGN_IN);

  return mode === Mode.SIGN_IN ? (
    <Login
      changeMode={() => setMode(Mode.SIGN_UP)}
    />
  ) : (
    <Registration
      changeMode={() => setMode(Mode.SIGN_IN)}
    />
  );
};

export default AuthForms;
