'use client';

import React from 'react';
import productsData from '@/public/mocks/products.json'; // Adjusted import
import { ProductGallery } from '@/components/shared/product-gallery';
import { ProductInfo } from '@/components/shared/product-info';
import { RelatedProduct } from '@/components/shared/related-product';

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
    const products = productsData.products;
    const product: ProductType | undefined = products.find((p) => p.id === productId);

    if (!product) {
        return <p>Продукт не знайдено</p>;
    }

    return (
        <div className="product container">
            <div className='product-search'>
                <h1>Category</h1>
            </div>
            <div className='product-info'>
                <ProductGallery product={product} />
                <ProductInfo
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    width={product.width}
                    height={product.height}
                    color={product.color}
                />
            </div>
            <div>
                <RelatedProduct id={productId} />
            </div>
        </div>
    );
};

export default ProductPage;
