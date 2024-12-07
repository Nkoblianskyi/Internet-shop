    /* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Використовуємо useParams для доступу до параметрів маршруту
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
    mainImage: string;
    width?: string[];
    height?: string[];
    depth?: string[];
    color?: string[];
}

const ProductPage = () => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Використовуємо useParams для доступу до params.id
    const params = useParams();
    
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Перевіряємо, чи є params.id і чи це не масив
                const productId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id || '', 10);

                if (isNaN(productId)) {
                    setError('Invalid product ID');
                    setLoading(false);
                    return;
                }

                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const productData = await res.json();
                setProduct(productData);
            } catch (error) {
                setError('Product not found or failed to load');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [params]); // Залежність від params

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product-page">
            <h1>{product.name}</h1>
            <div className="product-info">
                <ProductGallery productId={product.id} /> {/* Оновлено для правильного використання productId */}
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
                <RelatedProduct id={product.id} /> {/* Список схожих продуктів */}
            </div>
        </div>
    );
};

export default ProductPage;
