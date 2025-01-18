'use client';

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
  selectItem: (item: T | null) => void;
  placeholder?: string;
  hideOnSmallScreen?: boolean;
}

const Dropdown = <T extends string>({ items, selectedItem, selectItem, placeholder, hideOnSmallScreen = false }: Props<T>) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <DropdownMenu onOpenChange={(isOpen) => setIsActive(isOpen)}>
      <DropdownMenuTrigger
        className={twMerge(
          hideOnSmallScreen ? 'hidden sm:flex' : '',
            "items-center px-4 gap-1 font-medium text-nowrap",
        )}
      >
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
            onSelect={() => {
              if (item === selectedItem) selectItem(null);
              else selectItem(item);
            }}
            isActive={item === selectedItem}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
