import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase';

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: { email: string }) => {
    setMessage(null);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage('¡Correo de recuperación enviado! Revisa tu bandeja de entrada.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
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
        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Enviar correo de recuperación
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword; 