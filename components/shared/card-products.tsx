'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface ProductProps {
    product: {
        id: number;
        image: string[];
        name: string;
        price: number;
        description: string;
        rating: number;
        reviewCount: number;
        popular: boolean;
    };
}

export const CardProducts: React.FC<ProductProps> = ({ product }) => {
    return (
        <Link href={`/shop/products/${product.id}`}>
            <div className="card cursor-pointer">
                <div className="card-item">
                    <Image
                        src={product.image[0]}
                        alt={product.name}
                        width={280}
                        height={280}
                        className="card-item-image"
                    />
                    
                </div>
                <div className="card-item-info">
                    <div className="card-item-info-wrapp">
                        <h1 className="card-item-info-wrapp-title">{product.name}</h1>
                        <p className="card-item-info-wrapp-price">${product.price}</p>
                    </div>
                    <p className="card-item-info-description">{product.description}</p>
                    <div className="reviews">
                        <FaStar className="reviews-star" />
                        <span className="reviews-star-rating">{product.rating.toFixed(1)}</span>
                        <span className="reviews-star-rating-count">({product.reviewCount})</span>
                    </div>
                    {/* {product.popular && (
                        <span className="badge badge-popular">Popular</span>
                    )} */}
                </div>
            </div>
        </Link>
    );
};
