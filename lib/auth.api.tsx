import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';
import { User } from '@/app/types/types';

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
        const response = await axiosInstance.post('/auth/register', {
            email,
            password,
            role,
            phone,
            name,
        });
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Registration Error:', err.response?.data || err.message);
            throw new Error(err.response?.data?.message || 'Failed to register user');
        } else {
            console.error('Unexpected Error:', err);
            throw new Error('Unexpected error occurred');
        }
    }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    try {
        const response = await axiosInstance.post('/auth/login', { email, password });
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Login Error:', err.response?.data || err.message);
            throw new Error(err.response?.data?.message || 'Failed to login');
        } else {
            console.error('Unexpected Error:', err);
            throw new Error('Unexpected error occurred');
        }
    }
};

export const fetchUser = async (): Promise<User> => {
    try {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Error fetching user:', err.response?.data || err.message);
            throw new Error(err.response?.data?.message || 'Failed to fetch user');
        } else {
            console.error('Unexpected Error:', err);
            throw new Error('Unexpected error occurred');
        }
    }
};
