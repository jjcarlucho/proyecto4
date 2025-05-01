import { 
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

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
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
