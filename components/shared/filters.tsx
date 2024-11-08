'use client';

import React, { useState, useEffect } from 'react';
import { RangeSlider } from './range-slider';
import { CheckboxGroup } from './checkbox-group';
import { Input } from '../ui/input';
import { Product } from '../../app/types/types';

interface FiltersProps {
    products: Product[];
    initialCategory: string; // Додаємо цей пропс
    onFilterChange: (filteredProducts: Product[]) => void;
}

export const Filters: React.FC<FiltersProps> = ({ products, initialCategory, onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isPopular, setIsPopular] = useState<boolean>(false);
    const [isSpecialOffer, setIsSpecialOffer] = useState<boolean>(false);

    useEffect(() => {
        applyFilters(selectedCategories, priceRange, isNew, isPopular, isSpecialOffer);
    }, [selectedCategories, priceRange, isNew, isPopular, isSpecialOffer, products]);

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategories([initialCategory]);
        }
    }, [initialCategory]);

    const applyFilters = (
        categories: string[],
        price: [number, number],
        newProduct: boolean,
        popular: boolean,
        specialOffer: boolean
    ) => {
        const filteredProducts = products.filter((product) => {
            const matchesCategory = categories.length === 0 || categories.includes(product.category);
            const matchesPrice = product.price >= price[0] && product.price <= price[1];
            const matchesNew = !newProduct || product.new === newProduct;
            const matchesPopular = !popular || product.popular === popular;
            const matchesSpecialOffer = !specialOffer || product.specialOffer === specialOffer;

            return matchesCategory && matchesPrice && matchesNew && matchesPopular && matchesSpecialOffer;
        });

        onFilterChange(filteredProducts);
    };

    const handleCategoryChange = (category: string, isChecked: boolean) => {
        const updatedCategories = isChecked
            ? [...selectedCategories, category]
            : selectedCategories.filter((c) => c !== category);
        setSelectedCategories(updatedCategories);
    };

    const handlePriceChange = (values: [number, number]) => {
        setPriceRange(values);
    };

    const handleNewChange = (checked: boolean) => {
        setIsNew(checked);
    };

    const handlePopularChange = (checked: boolean) => {
        setIsPopular(checked);
    };

    const handleSpecialOfferChange = (checked: boolean) => {
        setIsSpecialOffer(checked);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = Number(e.target.value);
        if (type === 'min' && value <= priceRange[1]) {
            setPriceRange([value, priceRange[1]]);
        } else if (type === 'max' && value >= priceRange[0]) {
            setPriceRange([priceRange[0], value]);
        }
    };

    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));

    return (
        <div className="filters">
            <h1 className='filters-title'>Filters</h1>

            <CheckboxGroup
                text="Categories"
                items={uniqueCategories.map((category) => ({
                    label: category,
                    value: category
                }))}
                selectedItems={selectedCategories}
                onCheckedChange={handleCategoryChange}
                className='filters-checkboxes'
            />

            <CheckboxGroup
                text="New"
                items={[{ label: 'New', value: 'new' }]}
                selectedItems={isNew ? ['new'] : []}
                onCheckedChange={(value, checked) => handleNewChange(checked)}
                className='filters-checkboxes'
            />
            <CheckboxGroup
                text="Popular"
                items={[{ label: 'Popular', value: 'popular' }]}
                selectedItems={isPopular ? ['popular'] : []}
                onCheckedChange={(value, checked) => handlePopularChange(checked)}
                className='filters-checkboxes'
            />
            <CheckboxGroup
                text="Special Offer"
                items={[{ label: 'Special Offer', value: 'specialOffer' }]}
                selectedItems={isSpecialOffer ? ['specialOffer'] : []}
                onCheckedChange={(value, checked) => handleSpecialOfferChange(checked)}
                className='filters-checkboxes'
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
