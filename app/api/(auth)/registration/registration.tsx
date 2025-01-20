import { FC, useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomInput from '@/components/shared/custom-ui/custom-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationSchema } from '@/lib/zodSchemas/authSchema';
import { registerUser } from '@/lib/auth.api';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  changeMode: () => void;
}

interface Inputs {
  email: string;
  phone: string;
  name: string;
  password: string;
}

export const Registration: FC<Props> = ({ changeMode }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      setError(''); 
      const role = "user";
      await registerUser(data.email, data.password, data.name, data.phone, role);
      setSuccess('Registration successful!');
      changeMode();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError('Error during registration');
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Sign Up</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <CustomInput label="Name" placeholder="John" error={errors.name?.message} register={register} registerId="name" />
        <CustomInput label="Phone Number" placeholder="8884328900" error={errors.phone?.message} register={register} registerId="phone" />
        <CustomInput type="email" label="Email" placeholder="johndoe@gmail.com" error={errors.email?.message} register={register} registerId="email" />
        <CustomInput type="password" label="Password" placeholder="Password" error={errors.password?.message} register={register} registerId="password" />
        <button
          type="submit"
          className="rounded w-full h-12 bg-[#7B5E57] duration-200 hover:bg-[#8C6F68] text-white"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
      <p className="text-[14px] text-[#666]">
        Already have an account? Please{' '}
        <span
          onClick={changeMode}
          className="text-[14px] font-medium text-[#0000ff] cursor-pointer underline hover:text-[#3333ff]"
        >
          Sign In
        </span>
      </p>
    </>
  );
};
