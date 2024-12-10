import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async () => {
    try {
        // Отримуємо продукти з усіма необхідними даними
        const products = await prisma.product.findMany({
            include: {
                Image: true,
                Color: true,
                Dimension: true,
                relatedProducts: {
                    include: {
                        product: true, // Пов'язані продукти також з даними
                    },
                },
            },
        });

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Could not fetch products");
    }
};
