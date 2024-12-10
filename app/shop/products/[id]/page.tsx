'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios'; // Add axios for API calls
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
    mainImage: string;
    Image: { id: number; url: string }[]; // Array of images
    Dimension: { depth: string; height: string; width: string; value: string }[]; // Dimensions
    Color: { name: string }[]; // Array of colors
    relatedProducts: number[]; // Array of related product IDs
}

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                setError(null);

                const productId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id || '', 10);
                if (isNaN(productId)) {
                    throw new Error('Invalid product ID');
                }

                const res = await axios.get(`http://localhost:5000/api/products/${productId}`);

                if (res.status === 200) {
                    const productData: ProductType = res.data;
                    setProduct(productData);
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
                <ProductGallery productId={product.id} images={product.Image} />
                <ProductInfo
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    width={product.Dimension.map((dim) => dim.width)}
                    height={product.Dimension.map((dim) => dim.height)}
                    depth={product.Dimension.map((dim) => dim.depth)}
                    color={product.Color.map((col) => col.name)}
                />
            </div>

            <div className="related-products">
                <h3 className="related-products-title">Recommended Products</h3>
                <div className="related-products-list">
                    <RelatedProduct count={4} />
                </div>
            </div>
        </div>
    );
};


export default ProductPage;