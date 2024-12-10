'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ProductProps {
    id: number;
    name: string;
    price: number;
    description?: string;
    rating?: number;
    reviewCount?: number;
    image: string[]; // Масив для зображень продукту
    mainImage?: string; // Основне зображення
    specialOffer?: boolean;
    popular?: boolean;
    new?: boolean;
    category: string;
    width: string[];
    height: string[];
    color: string[];
    relatedProducts?: number[];
}

interface CardProductsProps {
    product: ProductProps;
}

export const CardProducts: React.FC<CardProductsProps> = ({ product }) => {
    const { name, price, description, rating, reviewCount, image, mainImage } = product;

    return (
        <div className="card cursor-pointer">
            <Link href={`/shop/products/${product.id}`} aria-label={`View details for ${name}`}>
                <div className="card-item">
                    <Image
                        src={mainImage || image[0] || '/images/default-image.png'}
                        alt={`${name} product image`}
                        width={280}
                        height={280}
                        className="card-item-image"
                    />
                </div>
                <div className="card-item-info">
                    <div className="card-item-info-wrapp">
                        <h1 className="card-item-info-wrapp-title">{name}</h1>
                        <p className="card-item-info-wrapp-price">${price}</p>
                    </div>
                    <p className="card-item-info-description">{description || 'No description available'}</p>
                    <div className="reviews">
                        <FaStar className="reviews-star" />
                        <span className="reviews-star-rating">
                            {rating ? rating.toFixed(1) : 'N/A'}
                        </span>
                        <span className="reviews-star-rating-count">({reviewCount ?? 0})</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};
