import axios, { AxiosError } from 'axios';

// Створюємо екземпляр Axios з базовим URL
export const api = axios.create({
    baseURL: 'http://localhost:5000', // Вказуємо API сервер
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (email: string, password: string, name: string, phone: string, role: string) => {
    try {
        const response = await api.post('/auth/register', { email, password, name, phone, role });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error registering user:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const token = response.data;
        if (token) {
            localStorage.setItem('authToken', token);
        }
        return token;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error logging in:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};
