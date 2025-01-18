
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../app/types/types';


export interface CartItem extends Product {
    quantity: number;
    selectedWidth: string;
    selectedHeight: string;
    selectedDepth: string;
    selectedColor: string;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingProduct = state.items.find(item => item.id === action.payload.id);

            if (existingProduct) {
                // Якщо продукт вже є в кошику, збільшуємо його кількість
                existingProduct.quantity += 1;
            } else {
                // Якщо продукт ще не додано в кошик, додаємо його з кількістю 1
                state.items.push(action.payload);
            }

            // Оновлюємо загальну кількість товарів і ціну
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                const product = state.items[index];
                state.totalQuantity -= product.quantity;
                state.totalPrice -= product.price * product.quantity;
                state.items.splice(index, 1);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
