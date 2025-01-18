'use client';

import React, { useCallback } from 'react';
import { FilterCheckbox } from './filter-checkbox';

interface CheckboxGroupProps {
    text: string;
    items: { label: string; value: string }[]; 
    selectedItems: string[];
    onCheckedChange: (value: string, checked: boolean) => void;
    className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    text,
    items,
    selectedItems,
    onCheckedChange,
    className,
}) => {

    const handleCheckedChange = useCallback(
        (value: string, checked: boolean) => {
            if (checked && !selectedItems.includes(value)) {

                onCheckedChange(value, true);
            } else if (!checked && selectedItems.includes(value)) {

                onCheckedChange(value, false);
            }
        },
        [onCheckedChange, selectedItems]
    );

    return (
        <div className={`checkbox-group ${className || ''}`}>
            <p>{text}</p>
            {items.map((item) => (
                <FilterCheckbox
                    key={item.value}
                    text={item.label}
                    value={item.value}
                    checked={selectedItems.includes(item.value)}
                    onCheckedChange={(checked) => handleCheckedChange(item.value, checked)}
                />
            ))}
        </div>
    );
};
