'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ProductProps {
    id: number;
    name: string;
    category?: string;
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
}

interface CardProductsProps {
    product: ProductProps;
}

export const CardProducts: React.FC<CardProductsProps> = ({ product }) => {
    return (
        <div className="card cursor-pointer">
            <Link href={`/shop/products/${product.id}`}>
                <div className="card-item">
                    <Image
                        src={product.mainImage ? product.mainImage : '/images/default-image.png'}
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
                    <p className="card-item-info-description">{product.description || 'No description available'}</p>
                    <div className="reviews">
                        <FaStar className="reviews-star" />
                        <span className="reviews-star-rating">{product.rating?.toFixed(1)}</span>
                        <span className="reviews-star-rating-count">({product.reviewCount})</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};
