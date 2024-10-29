"use client";

import Dropdown from '@/components/ui/Dropdown';
import { useState } from 'react';
import mockedCategories from '@/mocks/categories';
import { Input } from '@/components/ui/input';

type Category = typeof mockedCategories[number];

const SearchWithSelect = () => {
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);

  return (
    <div className="flex items-center h-11 rounded-md bg-[#F6F8FA]">
      <Dropdown
        items={mockedCategories}
        selectedItem={selectedItem}
        selectItem={setSelectedItem}
        placeholder="All Categories"
      />

      <div className="mr-[.5rem] w-[2px] h-5 bg-[#E4E9EE]"/>

      <Input
        placeholder="Search on Lenny..."
        className="border-none shadow-none"
      />
    </div>
  );
};

export default SearchWithSelect;
