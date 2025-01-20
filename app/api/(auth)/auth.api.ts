import { api } from "@/lib/auth.api";


export const getMe = async (token: string) => {
    try {
        const response = await api.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get user data', error);
        throw error;
    }
};
