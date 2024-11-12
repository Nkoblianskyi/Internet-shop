import { Input as BaseInput } from '@/components/ui/input';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: UseFormRegister<T>;
  registerId: Path<T>;
}

const CustomInput = <T extends FieldValues>({ label, error, register, registerId, ...props }: Props<T>) => {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="font-semibold">
        {label}
      </span>
      <BaseInput
        {...register(registerId)}
        {...props}
        className="h-[46px] bg-[#F6F8FA] border-none rounded-md text-[1rem] font-medium placeholder:text-[#818B9C] placeholder:font-medium"
      />
      <span className="h-5 text-sm font-light text-rose-700">
        {error}
      </span>
    </label>
  );
};

export default CustomInput;
