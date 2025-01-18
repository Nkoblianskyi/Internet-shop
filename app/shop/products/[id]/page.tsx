'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ProductGallery } from '@/components/shared/product-gallery';
import { ProductInfo } from '@/components/shared/product-info';
import { RelatedProduct } from '@/components/shared/related-product';
import { Product } from '@/app/types/types';

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                setError(null);

                const productId = Array.isArray(params.id)
                    ? parseInt(params.id[0], 10)
                    : parseInt(params.id || '', 10);
                if (isNaN(productId)) {
                    throw new Error('Invalid product ID');
                }

                const res = await axios.get(`http://localhost:5000/api/products/${productId}`);

                if (res.status === 200) {
                    const productData = res.data;

                    // Нормалізуємо ключі відповідно до інтерфейсу Product
                    const normalizedProduct: Product = {
                        ...productData,
                        image: productData.Image,
                        dimension: productData.Dimension,
                        color: productData.Color,
                    };

                    setProduct(normalizedProduct);
                } else {
                    throw new Error('Failed to fetch product data');
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

        fetchProductData();
    }, [params]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product container">
            <h1>{product.name}</h1>
            <div className="product-info">
                <ProductGallery images={product.image} />
                <ProductInfo product={product} />
            </div>

            <RelatedProduct count={5} />
        </div>
    );
};

export default ProductPage;
