import axios from 'axios';

export const fetchUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token not found');
    }

    console.log("Sending token:", token);

    try {
        const response = await axios.get('http://localhost:5000/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error fetching user data');
        }
        throw new Error('An unexpected error occurred');
    }
};
