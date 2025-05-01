import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Registrar un nuevo usuario
export const register = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Iniciar sesión
export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Solicitar restablecimiento de contraseña
export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

// Restablecer contraseña
export const resetPassword = async (token: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
  return response.data;
};

// Iniciar sesión con Google
export const loginWithGoogle = async (tokenId: string) => {
  const response = await axios.post(`${API_URL}/auth/google`, { tokenId });
  return response.data;
};
