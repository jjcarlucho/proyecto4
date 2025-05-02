import { 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createUserProfile, getUserProfile } from './userService';

// Registrar un nuevo usuario
export const register = async (email: string, password: string): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user.uid, {
      email: result.user.email || '',
      displayName: result.user.displayName
    });
    return result.user;
  } catch (error: any) {
    console.error('Error in register:', error);
    throw error;
  }
};

// Iniciar sesión
export const login = async (credentials: { email: string; password: string }): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return result.user;
  } catch (error: any) {
    console.error('Error in login:', error);
    throw error;
  }
};

// Solicitar restablecimiento de contraseña
export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error in forgotPassword:', error);
    throw error;
  }
};

// Restablecer contraseña
export const resetPassword = async (oobCode: string, newPassword: string): Promise<void> => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (error: any) {
    console.error('Error in resetPassword:', error);
    throw error;
  }
};

// Iniciar sesión con Google
export const loginWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const userProfile = await getUserProfile(result.user.uid);
    if (!userProfile) {
      await createUserProfile(result.user.uid, {
        email: result.user.email || '',
        displayName: result.user.displayName
      });
    }
    return result.user;
  } catch (error: any) {
    console.error('Error in loginWithGoogle:', error);
    throw error;
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error in logout:', error);
    throw error;
  }
};
