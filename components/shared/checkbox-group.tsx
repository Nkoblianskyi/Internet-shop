import React, { useCallback } from 'react';
import { FilterCheckbox } from './filter-checkbox';

interface CheckboxGroupProps {
    text: string;
    items: { label: string; value: string }[]; // Массив об'єктів з лейблами та значеннями
    selectedItems: string[]; // Масив обраних елементів
    onCheckedChange: (value: string, checked: boolean) => void; // Функція для зміни стану
    className?: string; // Додаткові класи для стилізації
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    text,
    items,
    selectedItems,
    onCheckedChange,
    className,
}) => {
    // Використовуємо useCallback для оптимізації
    const handleCheckedChange = useCallback(
        (value: string, checked: boolean) => {
            if (checked && !selectedItems.includes(value)) {
                // Якщо елемент не обраний, додаємо до списку обраних
                onCheckedChange(value, true);
            } else if (!checked && selectedItems.includes(value)) {
                // Якщо елемент вже обраний, видаляємо його зі списку
                onCheckedChange(value, false);
            }
        },
        [onCheckedChange, selectedItems] // Додаємо залежності
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
                    onCheckedChange={(checked) => handleCheckedChange(item.value, checked)} // Викликаємо оптимізований обробник
                />
            ))}
        </div>
    );
};
