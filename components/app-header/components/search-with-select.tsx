"use client";

import { FormEvent, useState } from 'react';
import mockedCategories from '@/mocks/categories'; // імпортуємо масив категорій
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

const SearchWithSelect = () => {
  // Ініціалізуємо як порожній рядок замість null
  const [selectedItem, setSelectedItem] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Логіка відправлення
    console.log('Selected category:', selectedItem);
  };

  return (
    <form
      className="flex flex-col w-full h-22 rounded-md bg-[#F6F8FA] sm:flex-row sm:items-center sm:h-11"
      onSubmit={onSubmit}
    >
      {/* Випадаючий список */}
      <div className="relative w-full sm:w-auto">
        <select
          value={selectedItem} // Тепер тип string, сумісний із value
          onChange={(e) => setSelectedItem(e.target.value)} // Оновлення стану
          className="w-full sm:w-auto rounded-md border-none bg-[#F6F8FA] pl-4 pr-8 py-2 appearance-none"
        >
          <option value="" disabled>
            All Categories
          </option>
          {mockedCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block mr-[.5rem] w-[2px] h-5 bg-[#E4E9EE]" />

      {/* Поле пошуку */}
      <div className="relative w-full">
        <Input
          placeholder="Search on Lenny..."
          className="border-none shadow-none pr-6"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 translate-y-[-50%]"
        >
          <SearchIcon color="#C4C8CC" />
        </button>
      </div>
    </form>
  );
};

export default SearchWithSelect;