import axios from 'axios';
import { LoginResponse } from '@/app/types/types';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post('/api/login', { email, password });

    const token = response.data.token;
    if (token) {
        localStorage.setItem('authToken', token);
    }

    return response.data;
};
