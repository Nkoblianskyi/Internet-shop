
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string[];
    mainImage: string;
    width: string[];
    height: string[];
    depth: string[];
    color: string[];
    specialOffer?: boolean;
    popular?: boolean;
    new?: boolean;
    relatedProducts?: number[];
    rating?: number;
    reviewCount?: number;
    description?: string;
}
