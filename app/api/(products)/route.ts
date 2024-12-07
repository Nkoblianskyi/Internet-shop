// app/api/products/route.ts (Next.js)
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Робимо запит до локального бекенду
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products from backend');
        }

        // Отримуємо продукти
        const products = await response.json();

        // Повертаємо продукти як JSON
        return NextResponse.json(products);
    } catch (error) {
        // Логування помилки та повернення статусу 500
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
    }
}
