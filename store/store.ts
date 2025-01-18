import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart-slice';
import authReducer from './slices/auth-slice';
import usersReducer from './slices/users-slice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
