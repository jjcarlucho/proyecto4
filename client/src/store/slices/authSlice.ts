import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as authService from '../../services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  resetPasswordSuccess: boolean;
  forgotPasswordSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
  resetPasswordSuccess: false,
  forgotPasswordSuccess: false,
};

// Thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al registrar usuario');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar usuario');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await authService.forgotPassword(email);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al procesar la solicitud');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authService.resetPassword(token, password);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al restablecer la contraseña');
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (tokenId: string, { rejectWithValue }) => {
    try {
      const data = await authService.loginWithGoogle(tokenId);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al iniciar sesión con Google');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResetSuccess: (state) => {
      state.resetPasswordSuccess = false;
    },
    clearForgotSuccess: (state) => {
      state.forgotPasswordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login with Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearResetSuccess, clearForgotSuccess } = authSlice.actions;
export default authSlice.reducer;