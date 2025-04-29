import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { setUser, setError, setLoading } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

interface RegisterFormInputs {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    dispatch(setLoading(true));
    setFirebaseError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      dispatch(setUser(userCredential.user));
      // Guardar usuario en Firestore con rol por defecto
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: data.email,
        role: 'user',
        createdAt: serverTimestamp(),
      });
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
      <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
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
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        {firebaseError && <p className="text-red-600 text-sm">{firebaseError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register; 