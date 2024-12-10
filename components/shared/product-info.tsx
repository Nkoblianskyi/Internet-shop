'use client'

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { BarVariantProduct } from '@/components/shared/bar-variant-product';
import { PiTrolleySuitcase } from 'react-icons/pi';

interface ProductInfoProps {
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    width: string[];
    height: string[];
    color: string[];
    depth: string[];
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
    name,
    price,
    description,
    rating,
    reviewCount,
    width,
    height,
    color,
    depth,
}) => {

    const handleVariant = (value: string[]) => {
        return value.length > 0 ? value : [];
    };

    return (
        <div className="product-info-card">
            <h1 className="product-info-card-title">{name}</h1>

            {/* Оцінки та відгуки */}
            <div className="product-info-card-reviews">
                <FaStar className="reviews-star" />
                <span className="reviews-star-rating">{rating.toFixed(1)}</span>
                <span className="reviews-star-rating-count">({reviewCount})</span>
            </div>

            {/* Ціна продукту */}
            <p className="product-info-card-price">${price}</p>

            {/* Опис продукту */}
            <p className="product-info-card-description">{description}</p>

            {/* Варіанти продукту */}
            <div className="product-info-card-variant">
                <p className="product-info-card-variant-title">Product Variants</p>
                <div className="product-info-card-variant-select">
                    {width && (
                        <BarVariantProduct
                            title="Width"
                            items={handleVariant(width)}
                        />
                    )}
                    {height && (
                        <BarVariantProduct
                            title="Height"
                            items={handleVariant(height)}
                        />
                    )}
                    {depth && (
                        <BarVariantProduct
                            title="Depth"
                            items={handleVariant(depth)}
                        />
                    )}
                    {color && (
                        <BarVariantProduct
                            title="Color"
                            items={handleVariant(color)}
                        />
                    )}
                </div>
            </div>

            {/* Кнопки для покупки */}
            <div className="product-info-card-button">
                <Button className="product-info-card-button-buy btn">Buy Now</Button>
                <Button className="product-info-card-button-chart btn">
                    <PiTrolleySuitcase className="product-info-card-button-chart-trolley" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};
