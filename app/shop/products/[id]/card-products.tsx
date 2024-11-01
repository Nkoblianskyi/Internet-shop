'use client';

import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ProductProps {
    product: {
        image: string;
        title: string;
        price: number;
        description: string;
        rating: number;
        reviewCount: number;
    };
}

export const CardProducts: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className='card'>
            <div className='card-item'>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={280}
                    height={280}
                    className='card-item-image'
                />
            </div>
            <div className='card-item-info'>
                <div className='card-item-info-wrapp'>
                    <h1 className='card-item-info-wrapp-title'>{product.title}</h1>
                    <p className='card-item-info-wrapp-price'>${product.price}</p>
                </div>
                <p className='card-item-info-description'>{product.description}</p>
                <div className='reviews'>
                    <FaStar className='reviews-star' />
                    <span className='reviews-star-rating'>{product.rating.toFixed(1)}</span>
                    <span className='reviews-star-rating-count'>({product.reviewCount})</span>
                </div>
            </div>
        </div>
    );
};
