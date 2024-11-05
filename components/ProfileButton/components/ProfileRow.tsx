import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props<T> {
  icon: ReactNode;
  name: string;
  value?: T;
  linkTo?: string;
}

const ProfileRow = <T extends string | number>({ icon, name, value, linkTo }: Props<T>) => {
  const content = (
    <>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold text-[#818B9C] group-hover:text-[#404758]">
          {name}
        </span>
      </div>
      <span className="text-[#0B0F0E]">
        {value}
      </span>
    </>
  );

  return linkTo ? (
    <Link
      href={linkTo}
      className="flex items-center justify-between group"
    >
      {content}
    </Link>
  ) : (
    <div className="flex items-center justify-between">
      {content}
    </div>
  );
};

export default ProfileRow;
