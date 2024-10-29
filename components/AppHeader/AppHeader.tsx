"use client";

import Link from 'next/link';
import SearchWithSelect from '@/components/AppHeader/components/SearchWithSelect';

const AppHeader = () => {
  return (
    <header className="flex justify-center items-center px-[120] py-7">
      <nav className="flex justify-between items-center">
        <Link href="/" className="hidden sm:block">
          Logo
        </Link>
        <SearchWithSelect />
        <div>Buttons</div>
      </nav>
    </header>
  );
};

export default AppHeader;
