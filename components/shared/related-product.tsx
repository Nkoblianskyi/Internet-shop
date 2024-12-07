'use client'

import React, { useEffect, useState } from 'react';
import { CardProducts } from './card-products';

interface Product {
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
    color?: string[];
    specialOffer?: boolean;
    popular?: boolean;
    relatedProducts?: number[];
    category?: string;
}

// Функція для отримання продукту з сервера
async function fetchProduct(id: number) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product data');
    }
    return res.json();
}

// Функція для отримання всіх продуктів з сервера
async function fetchProducts() {
    const res = await fetch('http://localhost:5000/api/products');
    if (!res.ok) {
        throw new Error('Failed to fetch products data');
    }
    return res.json();
}

export const RelatedProduct: React.FC<{ id: number }> = ({ id }) => {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getRelatedProducts = async () => {
            try {
                // Отримуємо дані для поточного продукту
                const product = await fetchProduct(id);

                // Отримуємо всі продукти
                const products = await fetchProducts();

                // Фільтруємо за ID товарів, що мають відношення до поточного продукту
                const related = product.relatedProducts
                    ? products.filter((prod: Product) => product.relatedProducts?.includes(prod.id))
                    : [];

                // Додаємо fallback для width, height та color, щоб відповідати типу
                const relatedWithFallback = related.map((relatedProduct: Product) => ({
                    ...relatedProduct,
                    width: relatedProduct.width || [],  // Порожній масив, якщо width undefined
                    height: relatedProduct.height || [], // Порожній масив, якщо height undefined
                    color: relatedProduct.color || []    // Порожній масив, якщо color undefined
                }));

                setRelatedProducts(relatedWithFallback);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        getRelatedProducts();
    }, [id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="related-product container">
            <div className="related-product-title">
                <h1 className="related-product-title-text">Related Products</h1>
                <button className="related-product-title-button btn">View All</button>
            </div>
            <div className="related-product-card">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct: Product) => (
                        <CardProducts
                            key={relatedProduct.id}
                            product={{
                                ...relatedProduct,
                                popular: relatedProduct.popular ?? false,
                                category: relatedProduct.category ?? 'No category',
                            }}
                        />
                    ))
                ) : (
                    <p>No related products found.</p>
                )}
            </div>
        </div>
    );
};
