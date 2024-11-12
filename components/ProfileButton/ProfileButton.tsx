import { useState } from 'react';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import UserInfo from '@/components/ProfileButton/components/UserInfo';
import UserBalanceInfo from '@/components/ProfileButton/components/UserBalanceInfo';
import ProfileMenu from '@/components/ProfileButton/components/ProfileMenu';

const ProfileButton = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      {/* Кнопка для відкриття сайдбару */}
      <div onClick={toggleSidebar} className="group cursor-pointer px-3 py-2">
        <Image
          src="/profile-photo.png"
          alt="User Photo"
          width={36}
          height={36}
          className="rounded-[50%] min-w-9 min-h-9"
        />
      </div>

      {/* Сайдбар */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 w-[280px] h-full bg-white shadow-md z-50 p-6">
          <div className="flex flex-col gap-6">
            <UserInfo />
            <div className="h-[1px] bg-[#E4E9EE]" />
            <UserBalanceInfo />
            <div className="h-[1px] bg-[#E4E9EE]" />
            <ProfileMenu />
            <div className="h-[1px] bg-[#E4E9EE]" />
            <button
              type="button"
              className="flex items-center gap-3 text-[#E04124] hover:text-[#F37457]"
            >
              <LogOut size={24} color="#E04124" />
              Sign Out
            </button>
          </div>

          {/* Кнопка для закриття сайдбару */}
          <button
            className="absolute top-6 right-6 text-xl max-h-3 max-w-3 color-red"
            onClick={toggleSidebar}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
