'use client';

import { FC, useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomInput from '@/components/shared/custom-ui/custom-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginUser } from '@/lib/auth.api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

interface Props {
  changeMode: () => void;
}

interface Inputs {
  email: string;
  password: string;
}

export const Login: FC<Props> = ({ changeMode }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const token = await loginUser(data.email, data.password);
      localStorage.setItem('token', token);
      changeMode();
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Sign In</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
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
        <button
          type="submit"
          className="rounded w-full h-12 bg-[#7B5E57] duration-200 hover:bg-[#8C6F68] text-white"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Sign In'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
