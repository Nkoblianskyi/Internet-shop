'use client';

import { useEffect, useState } from 'react';
import { User } from '@/app/types/types';
import { fetchUser } from '@/app/api/user/fetch-user';

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const userData = await fetchUser();
                setUser(userData);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to fetch user');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, []);

    return { user, loading, error };
};
