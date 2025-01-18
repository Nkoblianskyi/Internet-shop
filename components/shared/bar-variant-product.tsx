'use client';

import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BarVariantProductProps {
    title: string;
    items: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

export const BarVariantProduct: React.FC<BarVariantProductProps> = ({ title, items, selectedValue, onSelect }) => {
    return (
        <div className="variant-bar">
            <h3 className="variant-bar-title">{title}</h3>
            <div className="variant-bar-select">
                <Select value={selectedValue} onValueChange={onSelect}>
                    <SelectTrigger className="variant-select-trigger">
                        <SelectValue placeholder={`Select ${title.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent className="variant-select-content">
                        {items.map((item, index) => (
                            <SelectItem key={index} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
