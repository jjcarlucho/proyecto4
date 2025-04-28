import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { setUser, setError, setLoading } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    dispatch(setLoading(true));
    setFirebaseError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(setUser(userCredential.user));
      navigate('/diagnostics');
    } catch (error: any) {
      setFirebaseError(error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    setFirebaseError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result.user));
      navigate('/diagnostics');
    } catch (error: any) {
      setFirebaseError(error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            {...register('email', { required: 'El correo es obligatorio' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            {...register('password', { required: 'La contraseña es obligatoria' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        {firebaseError && <p className="text-red-600 text-sm">{firebaseError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.7 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.59C43.98 37.36 46.1 31.36 46.1 24.5z"/><path fill="#FBBC05" d="M10.67 28.29c-1.09-3.22-1.09-6.7 0-9.92l-7.98-6.2C.9 16.36 0 20.09 0 24c0 3.91.9 7.64 2.69 11.09l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.13 0 11.64-2.04 15.64-5.55l-7.18-5.59c-2.01 1.36-4.59 2.18-7.46 2.18-6.44 0-11.87-4.2-13.33-9.79l-7.98 6.2C6.73 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          Iniciar sesión con Google
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default Login; 