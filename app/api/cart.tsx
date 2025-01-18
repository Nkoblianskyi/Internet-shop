import axios from 'axios';

export const fetchCart = async (userId: string) => {
    const { data } = await axios.get(`/api/cart/${userId}`);
    return data;
};

export const addToCart = async (userId: string, productId: string) => {
    await axios.post(`/api/cart`, { userId, productId });
};

export const removeFromCart = async (userId: string, productId: string) => {
    await axios.delete(`/api/cart/${userId}/${productId}`);
};
