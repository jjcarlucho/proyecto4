import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import * as authService from '../../services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const user = await authService.loginWithEmailAndPassword(credentials.email, credentials.password);
    return user;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }) => {
    const user = await authService.register(credentials.email, credentials.password);
    return user;
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async () => {
    const user = await authService.loginWithGoogle();
    return user;
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string) => {
    await authService.forgotPassword(email);
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ oobCode, newPassword }: { oobCode: string; newPassword: string }) => {
    await authService.resetPassword(oobCode, newPassword);
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearForgotSuccess: (state) => {
      state.forgotPasswordSuccess = false;
    },
    clearResetSuccess: (state) => {
      state.resetPasswordSuccess = false;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al iniciar sesión';
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al registrar usuario';
    });

    // Google Login
    builder.addCase(loginWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al iniciar sesión con Google';
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.forgotPasswordSuccess = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
      state.forgotPasswordSuccess = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al enviar el correo de recuperación';
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.resetPasswordSuccess = false;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.resetPasswordSuccess = true;
      state.error = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al restablecer la contraseña';
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al cerrar sesión';
    });
  }
});

export const { clearError, clearForgotSuccess, clearResetSuccess } = authSlice.actions;
export default authSlice.reducer;