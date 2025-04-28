import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.error = null;
    },
  },
});

export const { setUser, setAdmin, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer; 