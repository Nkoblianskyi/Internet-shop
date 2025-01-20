'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Product } from '@/app/types/types';

interface CardProductsProps {
    product: Product;
}

export const CardProducts: React.FC<CardProductsProps> = ({ product }) => {
    const { name, price, description, rating, reviewCount, image, mainImage } = product;

    return (
        <div className="card cursor-pointer">
            <Link href={`/shop/products/${product.id}`} aria-label={`View details for ${name}`}>
                <div className="card-item">
                    <Image
                        src={mainImage || (image[0]?.url) || '/images/default-image.png'}
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
                    <p className="card-item-info-description">{description || 'There is no description'}</p>
                    <div className="reviews">
                        <FaStar className="reviews-star" />
                        <span className="reviews-star-rating">
                            {rating ? rating.toFixed(1) : 'Н/А'}
                        </span>
                        <span className="reviews-star-rating-count">({reviewCount ?? 0})</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};
