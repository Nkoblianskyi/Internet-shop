import { FC } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/lib/zodSchemas/authSchema';
import CustomInput from '@/components/custom-ui/CustomInput';

interface Props {
  changeMode: () => void;
}

interface Inputs {
  email: string;
  phone: string;
  name: string;
  password: string;
}

const Registration: FC<Props> = ({ changeMode }) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<Inputs>({
    resolver: zodResolver(registrationSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">
          Sign Up
        </DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-2">
          <CustomInput
            label="Name"
            placeholder="John"
            error={errors.name?.message}
            register={register}
            registerId="name"
          />
          <CustomInput
            label="Phone Number"
            placeholder="8884328900"
            error={errors.phone?.message}
            register={register}
            registerId="phone"
          />
          <CustomInput
            type='email'
            label="Email"
            placeholder="johndoe@gmail.com"
            error={errors.email?.message}
            register={register}
            registerId="email"
          />
          <CustomInput
            type='password'
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
          Sign Up
        </button>
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

export default Registration;
