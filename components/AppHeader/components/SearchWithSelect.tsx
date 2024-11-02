"use client";

import Dropdown from '@/components/custom-ui/Dropdown';
import { FormEvent, useState } from 'react';
import mockedCategories from '@/mocks/categories';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

type Category = typeof mockedCategories[number];

const SearchWithSelect = () => {
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex items-center h-11 rounded-md bg-[#F6F8FA]" onSubmit={onSubmit}>
      <Dropdown
        items={mockedCategories}
        selectedItem={selectedItem}
        selectItem={setSelectedItem}
        placeholder="All Categories"
      />

      <div className="mr-[.5rem] w-[2px] h-5 bg-[#E4E9EE]"/>

      <div className="relative">
        <Input
          placeholder="Search on Lenny..."
          className="border-none shadow-none pr-6"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 translate-y-[-50%]"
        >
          <SearchIcon
            color="#C4C8CC"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchWithSelect;
