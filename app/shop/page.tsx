'use client';

import { CardProducts } from '@/components/shared/card-products';
import { Filters } from '@/components/shared/filters';
import React, { useEffect, useState } from 'react';
import { Product } from '../types/types';
import { useSearchParams } from 'next/navigation';

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
                const response = await fetch('/mocks/products.json');
                if (!response.ok) {
                    throw new Error('Failed to load products');
                }

                const data = await response.json();
                const productList = data.products;

                if (Array.isArray(productList)) {
                    setProducts(productList);

                    if (category) {
                        const filtered = productList.filter((product: Product) => product.category === category);
                        setFilteredProducts(filtered);
                    } else {
                        setFilteredProducts(productList);
                    }
                } else {
                    throw new Error('The received data is not an array');
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleFilterChange = (newFilteredProducts: Product[]) => {
        setFilteredProducts(newFilteredProducts);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="shop container mx-auto">
            <div className="shop-filters">
                <Filters
                    products={products}
                    initialCategory={category ?? ''} // Передаємо початкову категорію у Filters
                    onFilterChange={handleFilterChange}
                />
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
