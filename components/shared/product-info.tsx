'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cart-slice';
import { RootState, AppDispatch } from '@/store/store';
import { FaStar } from 'react-icons/fa';
import { PiTrolleySuitcase } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Product, Dimension, Color } from '@/app/types/types';
import { BarVariantProduct } from './bar-variant-product';

interface ProductInfoProps {
    product: Product;
}

interface CartProduct extends Product {
    quantity: number;
    selectedWidth: string;
    selectedHeight: string;
    selectedDepth: string;
    selectedColor: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const dispatch: AppDispatch = useDispatch(); // Використовуємо тип AppDispatch для dispatch
    const userId = useSelector((state: RootState) => state.auth.user?.id); // Отримуємо userId з Redux

    const [selectedWidth, setSelectedWidth] = useState<string>('');
    const [selectedHeight, setSelectedHeight] = useState<string>('');
    const [selectedDepth, setSelectedDepth] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    const handleAddToCart = () => {
        if (userId) {
            const productToAdd: CartProduct = {
                ...product, // всі властивості продукту
                quantity: 1, // додаємо кількість
                selectedWidth,
                selectedHeight,
                selectedDepth,
                selectedColor,
            };

            dispatch(addToCart(productToAdd));
        } else {
            console.log('User is not logged in');
        }
    };

    return (
        <div className="product-info-card">
            <h1 className="product-info-card-title">{product.name}</h1>
            <div className="product-info-card-reviews">
                <FaStar className="reviews-star" />
                <span className="reviews-star-rating">{product.rating.toFixed(1)}</span>
                <span className="reviews-star-rating-count">({product.reviewCount})</span>
            </div>
            <p className="product-info-card-price">${product.price}</p>
            <p className="product-info-card-description">{product.description}</p>

            <div className="product-info-card-variant">
                <p className="product-info-card-variant-title">Product Variants</p>
                <div className="product-info-card-variant-select">
                    {product.dimension && product.dimension.length > 0 && (
                        <BarVariantProduct
                            title="Width"
                            items={product.dimension.map((dimension: Dimension) => String(dimension.width))}
                            selectedValue={selectedWidth}
                            onSelect={setSelectedWidth}
                        />
                    )}

                    {product.dimension && product.dimension.length > 0 && (
                        <BarVariantProduct
                            title="Height"
                            items={product.dimension.map((dimension: Dimension) => String(dimension.height))}
                            selectedValue={selectedHeight}
                            onSelect={setSelectedHeight}
                        />
                    )}

                    {product.dimension && product.dimension.length > 0 && (
                        <BarVariantProduct
                            title="Depth"
                            items={product.dimension.map((dimension: Dimension) => String(dimension.depth))}
                            selectedValue={selectedDepth}
                            onSelect={setSelectedDepth}
                        />
                    )}

                    {product.color && product.color.length > 0 && (
                        <BarVariantProduct
                            title="Color"
                            items={product.color.map((color: Color) => color.name)}
                            selectedValue={selectedColor}
                            onSelect={setSelectedColor}
                        />
                    )}
                </div>
            </div>

            <div className="product-info-card-button">
                <Button className="product-info-card-button-buy btn">Buy Now</Button>
                <Button className="product-info-card-button-chart btn" onClick={handleAddToCart}>
                    <PiTrolleySuitcase className="product-info-card-button-chart-trolley" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};
