'use client'
import React from 'react';

interface Review {
    id: number;
    productId: number;
    content: string;
    rating: number;
}

interface ReviewsProps {
    params: {
        id: string;
    };
}

export const Reviews: React.FC<ReviewsProps> = ({ params }) => {
    const productId = parseInt(params.id, 10);
    

    const reviews: Review[] = [
        { id: 1, productId: 1, content: "Чудовий продукт!", rating: 5 },
        { id: 2, productId: 1, content: "Мені подобається, але є нюанси.", rating: 4 },
        { id: 3, productId: 1, content: "Не відповідає опису.", rating: 2 },
    ];


    const productReviews = reviews.filter(review => review.productId === productId);

    return (
        <div>
            <h2>Відгуки</h2>
            {productReviews.length === 0 ? (
                <p>Відгуків ще немає.</p>
            ) : (
                <ul>
                    {productReviews.map(review => (
                        <li key={review.id}>
                            <p>Рейтинг: {review.rating} ⭐</p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};