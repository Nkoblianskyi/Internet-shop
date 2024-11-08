import React from 'react';
import { FilterCheckbox } from './filter-checkbox';

interface CheckboxGroupProps {
    text: string;
    items: { label: string; value: string }[];
    selectedItems: string[];
    onCheckedChange: (value: string, checked: boolean) => void;
    className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ text, items, selectedItems, onCheckedChange, className }) => {
    return (
        <div className={`checkbox-group ${className || ''}`}>
            <p>{text}</p>
            {items.map((item) => (
                <FilterCheckbox
                    key={item.value}
                    text={item.label}
                    value={item.value}
                    checked={selectedItems.includes(item.value)}
                    onCheckedChange={(checked) => onCheckedChange(item.value, checked)}
                />
            ))}
        </div>
    );
};
