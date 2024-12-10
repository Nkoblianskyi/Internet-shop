import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        // Отримуємо продукт по ID
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(params.id),
            },
            include: {
                Image: true, // зображення
                Dimension: true, // розміри
                Color: true, // кольори
                relatedProducts: true, // пов'язані продукти
            },
        });

        if (product) {
            return new Response(JSON.stringify(product), {
                status: 200,
            });
        } else {
            return new Response('Product not found', { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        return new Response('Error fetching product', { status: 500 });
    }
}
