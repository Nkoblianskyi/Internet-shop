import axios from 'axios';

export const addToCart = async (userId: string, productId: string, quantity: number) => {
    if (!userId) {
        throw new Error('User is not authenticated');
    }

    const response = await axios.post(
        '/api/cart',
        { userId, productId, quantity },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );

    return response.data;
};
