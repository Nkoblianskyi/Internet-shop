import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('http://localhost:5000/auth/users', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null as string | null, // Типізуємо error, щоб дозволити string або null
    },
    reducers: {}, // Додано порожній редуктор
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null; // Додано обробку error
            });
    },
});

export default usersSlice.reducer;
