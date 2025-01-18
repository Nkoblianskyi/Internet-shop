import Image from 'next/image';
import { mockedUser } from '@/mocks/user';

const UserInfo = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/profile-photo.png"
        alt="User Photo"
        width={56}
        height={56}
        className="rounded-[50%]"
      />

      <div className="flex flex-col justify-between">
        <p className="font-bold text-[1.25rem]">
          {mockedUser.name}
        </p>
        <p className="text-[#818B9C]">
          {mockedUser.role}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
