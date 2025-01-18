'use client';

import React, { useState, useEffect } from 'react';
import { CardProducts } from './card-products';
import { Product } from '@/app/types/types';

interface RelatedProductProps {
    count: number;
    product?: Product[];
}

export const RelatedProduct: React.FC<RelatedProductProps> = ({ count }) => {
    const [randomProducts, setRandomProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch('http://localhost:5000/api/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data: Product[] = await res.json();

                const shuffled = data.sort(() => 0.5 - Math.random());
                setRandomProducts(shuffled.slice(0, count));
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [count]);

    if (loading) {
        return <p>Loading recommended products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (randomProducts.length === 0) {
        return <p>No recommended products available.</p>;
    }

    return (
        <div className="related-products">
            <div className="related-products-title">
                <h1 className="related-products-title-text">Recommended products</h1>
                <button className="related-products-title-button btn">View All</button>
            </div>
            <div className="related-products-list">
                {randomProducts.map((product) => (
                    <CardProducts key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
