'use client';

import React from 'react';
import { Checkbox } from '../ui/checkbox';

export interface FilterCheckboxProps {
    text: string;
    value: string | number;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked = false,
    name = '',
}) => {
    const handleCheckedChange = (checked: boolean) => {
        if (onCheckedChange) {
            onCheckedChange(checked);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={`checkbox-${name}-${String(value)}`}
                checked={checked}
                onCheckedChange={(checked: boolean) => handleCheckedChange(checked)}
                className="rounded-[8px] w-6 h-6 text-color"
            />
            <label
                htmlFor={`checkbox-${name}-${String(value)}`}
                className="leading-none cursor-pointer flex-1">
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
