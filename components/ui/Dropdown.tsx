"use client";

import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface Props<T> {
  items: T[];
  selectedItem: T | null;
  selectItem: (item: T) => void;
  placeholder?: string;
}

const Dropdown = <T extends string>({ items, selectedItem, selectItem, placeholder }: Props<T>) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <DropdownMenu onOpenChange={(isOpen) => setIsActive(isOpen)}>
      <DropdownMenuTrigger className="flex items-center px-4 gap-1 text-nowrap">
        {selectedItem || placeholder}
        <ChevronDown
          size={20}
          className={twMerge(
            'transition ease-in-out duration-200',
            isActive ? 'transform rotate-180' : 'transform rotate-0'
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1">
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            onSelect={() => selectItem(item)}
            className={twMerge(
              'hover:bg-[#7B5E57] hover:text-[#fff]',
              item === selectedItem ? 'bg-[#7B5E57] text-[#fff] ' : ''
            )}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
