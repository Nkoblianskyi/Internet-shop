/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to login');
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/refresh');
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to refresh token');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = null;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.token = action.payload.token;
            });
    },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
