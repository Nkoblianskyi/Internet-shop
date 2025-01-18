'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RangeSlider } from './range-slider';
import { CheckboxGroup } from './checkbox-group';
import { Input } from '../ui/input';
import { Product } from '../../app/types/types';

interface FiltersProps {
    products: Product[];
    initialCategory: string;
    onFilterChange: (filteredProducts: Product[]) => void;
}

export const Filters: React.FC<FiltersProps> = ({ products, initialCategory, onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isPopular, setIsPopular] = useState<boolean>(false);
    const [isSpecialOffer, setIsSpecialOffer] = useState<boolean>(false);

    const applyFilters = useCallback(() => {
        const filteredProducts = products.filter((product) => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesNew = !isNew || product.isNew === isNew;
            const matchesPopular = !isPopular || product.popular === isPopular;
            const matchesSpecialOffer = !isSpecialOffer || product.specialOffer === isSpecialOffer;

            return matchesCategory && matchesPrice && matchesNew && matchesPopular && matchesSpecialOffer;
        });

        onFilterChange(filteredProducts);
    }, [products, selectedCategories, priceRange, isNew, isPopular, isSpecialOffer, onFilterChange]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategories([initialCategory]);
        }
    }, [initialCategory]);

    const handleCategoryChange = useCallback((category: string, isChecked: boolean) => {
        setSelectedCategories((prevCategories) =>
            isChecked ? [...prevCategories, category] : prevCategories.filter((c) => c !== category)
        );
    }, []);

    const handlePriceChange = useCallback((values: [number, number]) => {
        setPriceRange(values);
    }, []);

    const handleNewChange = useCallback((checked: boolean) => {
        setIsNew(checked);
    }, []);

    const handlePopularChange = useCallback((checked: boolean) => {
        setIsPopular(checked);
    }, []);

    const handleSpecialOfferChange = useCallback((checked: boolean) => {
        setIsSpecialOffer(checked);
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
            const value = Number(e.target.value);
            if (type === 'min' && value <= priceRange[1]) {
                setPriceRange([value, priceRange[1]]);
            } else if (type === 'max' && value >= priceRange[0]) {
                setPriceRange([priceRange[0], value]);
            }
        },
        [priceRange]
    );

    const categories = ['Bedroom', 'Office', 'Bathroom', 'Nursery', 'Lounge', 'Hallways'];

    return (
        <div className="filters">
            <h1 className="filters-title">Filters</h1>

            <CheckboxGroup
                text="Categories"
                items={categories.map((category) => ({
                    label: category,
                    value: category,
                }))}
                selectedItems={selectedCategories}
                onCheckedChange={handleCategoryChange}
                className="filters-checkboxes"
            />

            <CheckboxGroup
                text="New"
                items={[{ label: 'New', value: 'new' }]}
                selectedItems={isNew ? ['new'] : []}
                onCheckedChange={(value, checked) => handleNewChange(checked)}
                className="filters-checkboxes"
            />

            <CheckboxGroup
                text="Popular"
                items={[{ label: 'Popular', value: 'popular' }]}
                selectedItems={isPopular ? ['popular'] : []}
                onCheckedChange={(value, checked) => handlePopularChange(checked)}
                className="filters-checkboxes"
            />

            <CheckboxGroup
                text="Special Offer"
                items={[{ label: 'Special Offer', value: 'specialOffer' }]}
                selectedItems={isSpecialOffer ? ['specialOffer'] : []}
                onCheckedChange={(value, checked) => handleSpecialOfferChange(checked)}
                className="filters-checkboxes"
            />

            <div className="filters-price-range">
                <h3>Prices from and to</h3>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    formatLabel={(value) => `$${value}`}
                />
                <div className="filters-price-inputs">
                    <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handleInputChange(e, 'min')}
                        min={0}
                        max={priceRange[1]}
                    />
                    <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handleInputChange(e, 'max')}
                        min={priceRange[0]}
                        max={1000}
                    />
                </div>
            </div>
        </div>
    );
};
