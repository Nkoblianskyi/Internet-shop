'use client';

import { CardProducts } from '@/components/shared/card-products';
import { Filters } from '@/components/shared/filters';
import React, { useEffect, useState } from 'react';
import { Product } from '../types/types';

const Shop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/mocks/products.json');
                if (!response.ok) {
                    throw new Error('Failed to load products');
                }

                const data = await response.json();
                const productList = data.products;

                if (Array.isArray(productList)) {
                    setProducts(productList);
                    setFilteredProducts(productList);
                } else {
                    throw new Error('The received data is not an array');
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (newFilteredProducts: Product[]) => {
        setFilteredProducts(newFilteredProducts);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="shop container mx-auto">
            <div className="shop-filters">
                <Filters products={products} onFilterChange={handleFilterChange} />
            </div>
            <div className="shop-product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="shop-product-list-item">
                        <CardProducts product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
