// app/api/axios-interceptors.ts
import axios from 'axios';
import { store } from '../../store/store';
import { refreshToken } from '../../store/slices/auth-slice';

axios.defaults.baseURL = 'http://localhost:5000';

// Перехоплювач для автоматичного додавання токену
axios.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Перехоплювач для автоматичного оновлення токену
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await store.dispatch(refreshToken());
        }
        return Promise.reject(error);
    }
);
