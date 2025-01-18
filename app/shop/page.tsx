'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { CardProducts } from '@/components/shared/card-products';
import { Filters } from '@/components/shared/filters';
import { Product } from '../types/types';

const Shop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Failed to load products');
                const data: Product[] = await response.json();
                setProducts(data);
                setFilteredProducts(
                    category
                        ? data.filter((product) => product.category === category)
                        : data
                );
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleFilterChange = useCallback((newFilteredProducts: Product[]) => {
        setFilteredProducts(newFilteredProducts);
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="shop container mx-auto">
            <div className="shop-filters">
                <Filters
                    products={products}
                    initialCategory={category ?? ''}
                    onFilterChange={handleFilterChange}
                />
            </div>
            <div className="shop-product-list grid grid-cols-3 gap-4">
                {filteredProducts.map((product: Product) => (
                    <div key={product.id} className="shop-product-list-item">
                        <CardProducts product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
