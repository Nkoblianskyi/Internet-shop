'use client'

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        if (req.method === 'GET') {
            const { data } = await axios.get(`${API_BASE_URL}/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            const { productId } = req.body;

            if (!productId) {
                return res.status(400).json({ error: 'productId is required' });
            }

            await axios.post(`${API_BASE_URL}/cart`, { userId: id, productId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status(201).end();
        }

        if (req.method === 'DELETE') {
            await axios.delete(`${API_BASE_URL}/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.status(200).end();
        }

        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
