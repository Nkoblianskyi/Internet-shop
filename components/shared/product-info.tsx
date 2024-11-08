// ProductInfo.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { BarVariantProduct } from '@/components/shared/bar-variant-product';
import { PiTrolleySuitcase } from "react-icons/pi";

interface ProductInfoProps {
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    width?: string[];
    height?: string[];
    color?: string[];
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
    name,
    price,
    description,
    rating,
    reviewCount,
    width,
    height,
    color
}) => (
    <div className="product-info-card">
        <h1 className="product-info-card-title">{name}</h1>
        <div className="product-info-card-reviews">
            <FaStar className="reviews-star" />
            <span className="reviews-star-rating">{rating.toFixed(1)}</span>
            <span className="reviews-star-rating-count">({reviewCount})</span>
        </div>
        <p className="product-info-card-price">${price}</p>
        <p className="product-info-card-description">{description}</p>
        <div className="product-info-card-variant">
            <p className="product-info-card-variant-title">Product Variants</p>
            <div className="product-info-card-variant-select"> 
                {width && <BarVariantProduct title="Width" items={width} />}
                {height && <BarVariantProduct title="Height" items={height} />}
                {color && <BarVariantProduct title="Color" items={color} />}
            </div>
        </div>
        <div className="product-info-card-button">
            <Button className="product-info-card-button-buy btn">Buy Now</Button>
            <Button className="product-info-card-button-chart btn">
                <PiTrolleySuitcase className="product-info-card-button-chart-trolley" />
                Add to Chart
            </Button>
        </div>
    </div>
);
