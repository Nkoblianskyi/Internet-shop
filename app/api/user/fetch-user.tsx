import axios from 'axios';

export const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found');
    }

    const response = await axios.get('http://localhost:5000/auth/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
