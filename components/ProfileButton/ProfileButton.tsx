import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UserInfo from '@/components/ProfileButton/components/UserInfo';
import UserBalanceInfo from '@/components/ProfileButton/components/UserBalanceInfo';
import ProfileMenu from '@/components/ProfileButton/components/ProfileMenu';
import { LogOut } from 'lucide-react';

const ProfileButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group px-3 py-2">
        <Image
          src="/profile-photo.png"
          alt="User Photo"
          width={36}
          height={36}
          className="rounded-[50%] min-w-9 min-h-9"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex flex-col gap-6 p-6 min-w-[280px]">
          <UserInfo/>
          <div className="h-[1px] bg-[#E4E9EE]"/>
          <UserBalanceInfo/>
          <div className="h-[1px] bg-[#E4E9EE]"/>
          <ProfileMenu/>
          <div className="h-[1px] bg-[#E4E9EE]"/>
          <button
            type="button"
            className="flex items-center gap-3 text-[#E04124] hover:text-[#F37457]"
          >
            <LogOut size={24} color="#E04124" />
            Sign Out
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
