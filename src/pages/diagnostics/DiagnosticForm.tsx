import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface DiagnosticFormData {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  problemDescription: string;
  symptoms: string;
  errorCodes: string;
}

const DiagnosticForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DiagnosticFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const onSubmit = async (data: DiagnosticFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Simulación de diagnóstico con IA (aquí iría la integración real con la IA)
      const possibleSolutions = [
        "Revisar el sensor de oxígeno",
        "Cambiar el filtro de aceite",
        "Revisar el sistema de frenos",
        "Verificar la presión de los neumáticos",
        "Revisar el sistema de refrigeración"
      ];
      
      const randomSolution = possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)];

      // Guardar el diagnóstico en Firestore
      await addDoc(collection(db, 'diagnostics'), {
        userId: user.uid,
        vehicleInfo: `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`,
        problem: data.problemDescription,
        symptoms: data.symptoms,
        errorCodes: data.errorCodes,
        solution: randomSolution,
        createdAt: new Date(),
      });

      setDiagnosticResult(randomSolution);
    } catch (error) {
      console.error('Error al guardar el diagnóstico:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Diagnóstico de Vehículo</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              {...register('vehicleMake', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.vehicleMake && (
              <p className="mt-1 text-sm text-red-600">{errors.vehicleMake.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              {...register('vehicleModel', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.vehicleModel && (
              <p className="mt-1 text-sm text-red-600">{errors.vehicleModel.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Año</label>
            <input
              type="text"
              {...register('vehicleYear', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.vehicleYear && (
              <p className="mt-1 text-sm text-red-600">{errors.vehicleYear.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción del Problema</label>
          <textarea
            {...register('problemDescription', { required: 'Este campo es requerido' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.problemDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.problemDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Síntomas</label>
          <textarea
            {...register('symptoms', { required: 'Este campo es requerido' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.symptoms && (
            <p className="mt-1 text-sm text-red-600">{errors.symptoms.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Códigos de Error (si aplica)</label>
          <input
            type="text"
            {...register('errorCodes')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Analizando...' : 'Realizar Diagnóstico'}
        </button>
      </form>

      {diagnosticResult && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="text-lg font-semibold text-green-800">Resultado del Diagnóstico</h3>
          <p className="mt-2 text-green-700">{diagnosticResult}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticForm; 