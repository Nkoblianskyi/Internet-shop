'use client';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface BarVariantProductProps {
    title: string;
    items: string[];
}

export const BarVariantProduct: React.FC<BarVariantProductProps> = ({ title, items }) => {
    return (
        <div className="variant-bar">
            <h3 className="variant-bar-title">{title}</h3>
            <div className="variant-bar-select">
                <Select defaultValue={items[0]}>
                    <SelectTrigger className="variant-select-trigger">
                        <SelectValue placeholder={`Select ${title.toLowerCase()}`}/>
                    </SelectTrigger>
                    <SelectContent className="variant-select-content">
                        {items.map((item, index) => (
                            <SelectItem key={index} value={item} >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
