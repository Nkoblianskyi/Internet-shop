'use client';

import { useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const UserPage = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                const data: User = await response.json();
                setUser(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Unknown error');
                }
            }
        };

        fetchUser();
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
        </div>
    );
};

export default UserPage;
