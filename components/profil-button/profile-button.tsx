'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import UserInfo from '@/components/profil-button/components/user-info';
import UserBalanceInfo from '@/components/profil-button/components/user-balance-info';
import ProfileMenu from '@/components/profil-button/components/profile-menu';

const ProfileButton = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/user';
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      {/* Button to open the sidebar */}
      <div onClick={toggleSidebar} className="group cursor-pointer px-3 py-2">
        <Image
          src="/profile-photo.png"
          alt="User Photo"
          width={36}
          height={36}
          className="rounded-[50%] min-w-9 min-h-9"
        />
      </div>

      {/* Sidebar */}
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
              onClick={handleLogout}
            >
              <LogOut size={24} color="#E04124" />
              Sign Out
            </button>
          </div>

          {/* Button to close the sidebar */}
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
