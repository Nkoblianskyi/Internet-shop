'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';

// components/shared/card-products.tsx

interface ProductProps {
    product: {
        id: number;
        name: string;
        category: string;
        description?: string;
        price: number;
        rating?: number;
        reviewCount?: number;
        image: string[];
        mainImage: string;
        width: string[];
        height: string[];
        color: string[];
        specialOffer?: boolean;
        popular?: boolean;
        new?: boolean;
        relatedProducts?: number[];
    };
}

export const CardProducts: React.FC<ProductProps> = ({ product }) => {
    const description = product.description || "No description available";  // Default value if description is undefined
    const productImage = product.image?.length > 0 ? product.image[0] : '/images/default-image.png'; // Default image

    return (
        <Link href={`/shop/products/${product.id}`}>
            <div className="card cursor-pointer">
                <div className="card-item">
                    <Image
                        src={productImage} // Use verified image
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
                    <p className="card-item-info-description">{description}</p>
                    <div className="reviews">
                        <FaStar className="reviews-star" />
                        <span className="reviews-star-rating">{product.rating?.toFixed(1)}</span>
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
