import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
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
    try {

        if (!email || !password || !phone || !name) {
            throw new Error('All fields are required');
        }

        const response = await api.post('/auth/register', { email, password, role, phone, name });

        return response.data;
    } catch (err) {
        console.error("Registration Error: ", err);
        throw err;
    }
};

export const loginUser = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (err) {
        console.error("Login Error: ", err);
        throw err;
    }
};
