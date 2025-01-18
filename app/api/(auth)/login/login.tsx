'use client';

import { FC, useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomInput from '@/components/shared/custom-ui/custom-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/zodSchemas/authSchema';
import { loginUser } from '@/lib/auth.api';
import { AxiosError } from 'axios';

interface Props {
  changeMode: () => void;
}

interface Inputs {
  email: string;
  password: string;
}

export const Login: FC<Props> = ({ changeMode }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);
      setSuccess('Login successful!');
      console.log('Logged in successfully:', response);

      localStorage.setItem('token', response.token);

      window.location.href = 'http://localhost:3000/';
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error('Login error:', err.response?.data || err.message);
        setError('Failed to log in. Please check your credentials.');
      } else {
        console.error('An unexpected error occurred:', err);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Sign In</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <CustomInput
            type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            error={errors.email?.message}
            register={register}
            registerId="email"
          />
          <CustomInput
            type="password"
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
            register={register}
            registerId="password"
          />
        </div>
        <button
          type="submit"
          className="rounded w-full h-12 bg-[#7B5E57] duration-200 hover:bg-[#8C6F68] text-white"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
      <p className="text-[14px] text-[#666]">
        Don&#39;t have an account yet? Please{' '}
        <span
          onClick={changeMode}
          className="text-[14px] font-medium text-[#0000ff] cursor-pointer underline hover:text-[#3333ff]"
        >
          Sign Up
        </span>
      </p>
    </>
  );
};
