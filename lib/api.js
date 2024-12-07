import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const registerUser = async (email, password, role) => {
    const response = await api.post('/auth/register', { email, password, role });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};
