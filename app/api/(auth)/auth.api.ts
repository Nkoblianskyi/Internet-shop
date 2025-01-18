import axios from 'axios';

axios.interceptors.request.use((config) => {

    const token = localStorage.getItem('authToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/auth/login', { email, password });

        const token = response.data.token;
        if (token) {
            localStorage.setItem('authToken', token);
        }

        return response.data;
    } catch (error) {
        console.error('Login error', error);
        throw new Error('Login failed');
    }
};
