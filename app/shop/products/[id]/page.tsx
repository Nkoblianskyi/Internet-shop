'use client'

import React from 'react';
import products from '@/public/mocks/products.json';
import { ProductGallery } from '@/components/shared/product-gallery';
import { BarVariantProduct } from '@/components/shared/bar-variant-product';

interface ProductType {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string[];
    width?: string[];
    height?: string[];
    color?: string[];
}

const ProductPage = ({ params }: { params: { id: string } }) => {
    const productId = parseInt(params.id, 10);
    const product: ProductType | undefined = products.find((p) => p.id === productId);

    if (!product) {
        return <p>Продукт не знайдено</p>;
    }

    return (
        <>
            <div className="product">
                <div className='product-search'>
                    <h1>Category</h1>
                </div>
                <div className='product-info'>
                    <ProductGallery product={product} />
                    <div className="product-info-card">
                        <h1 className="product-info-card-title">{product.name}</h1>
                        <p className="product-info-card-price">${product.price}</p>
                        <p className="product-info-card-description">{product.description}</p>
                        <div>
                            <p className="product-info-card-variant">Product Variants</p>
                            {product.width && (
                                <BarVariantProduct title="Width" items={product.width} />
                            )}
                            {product.height && (
                                <BarVariantProduct title="Height" items={product.height} />
                            )}
                            {product.color && (
                                <BarVariantProduct title="Color" items={product.color} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews" style={{ marginTop: '20px' }}>
                <span>Рейтинг: {product.rating.toFixed(1)}</span>
                <span> ({product.reviewCount} відгуків)</span>
            </div>
        </>
    );
};

export default ProductPage;
