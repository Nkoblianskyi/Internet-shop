
export interface Image {
    id: number;
    url: string;
    productId: number;
}

export interface Dimension {
    id: number;
    width: number;
    height: number;
    depth: number;
    value: string;
    type: string;
    productId: number;
}

export interface Color {
    id: number;
    name: string;
    productId: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    category: string;
    mainImage: string;
    specialOffer: boolean;
    popular: boolean;
    image: Image[];
    dimension: Dimension[];
    color: Color[];
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
    name: string;
    phone: string;
}