import { User } from '@/app/types/types';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:5000',
});

interface RegisterResponse {
    id: number;
    email: string;
    role: 'user' | 'admin';
    phone: string;
    name: string;
}

interface LoginResponse {
    token: string;
}

export const registerUser = async (
    email: string,
    password: string,
    role: 'user' | 'admin',
    phone: string,
    name: string
): Promise<RegisterResponse> => {
    if (!email || !password || !phone || !name) {
        throw new Error('All fields are required');
    }

    try {
        const response = await api.post('/auth/register', { email, password, role, phone, name });
        return response.data;
    } catch (err: any) {
        console.error('Registration Error:', err.response?.data || err.message);
        throw new Error(err.response?.data?.message || 'Failed to register user');
    }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (err: any) {
        console.error('Login Error:', err.response?.data || err.message);
        throw new Error(err.response?.data?.message || 'Failed to login');
    }
};

export const fetchUser = async (): Promise<User> => {
    try {
        const response = await api.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (err: any) {
        console.error('Error fetching user:', err.response?.data || err.message);
        throw new Error(err.response?.data?.message || 'Failed to fetch user');
    }
};