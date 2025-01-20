import axiosInstance from './axiosInstance';

export const addToCart = async (userId: string, productId: string, quantity: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('User is not authenticated');
    }

    const response = await axiosInstance.post('/api/cart', {
        userId,
        productId,
        quantity,
    });

    return response.data;
};
