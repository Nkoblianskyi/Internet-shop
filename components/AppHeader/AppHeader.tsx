"use client";

import Link from 'next/link';
import SearchWithSelect from '@/components/AppHeader/components/SearchWithSelect';
import { ShoppingCart } from 'lucide-react';
import Auth from '@/app/(auth)/Auth';
import { mockedUser } from '@/mocks/user';
import ProfileButton from '@/components/ProfileButton/ProfileButton';

const AppHeader = () => {
  return (
    <header className="flex justify-center items-center py-3 pl-4 md:px-[80px] md:py-7 w-full">
      <nav className="flex justify-between items-center gap-2 w-full">
        <Link href="/" className="hidden sm:block">
          Logo
        </Link>

        <SearchWithSelect />

        <div className="flex items-center">
          <Link href="/cart" className="group px-3 py-2">
            <ShoppingCart
              size={28}
              color="#818B9C"
              className="group-hover:stroke-[#7B5E57] duration-200 ease-in-out"
            />
          </Link>

          <div className="w-[2px] h-7 bg-[#E4E9EE]"/>

          {mockedUser ? (
            <ProfileButton />
          ) : (
            <Auth />
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
