import axios from 'axios';

export const addToCart = async (productId: number, quantity: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('User is not authenticated');
    }

    const response = await axios.post(
        '/api/cart',
        { productId, quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const removeFromCart = async (productId: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('User is not authenticated');
    }

    const response = await axios.delete(
        `/api/cart/${productId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
