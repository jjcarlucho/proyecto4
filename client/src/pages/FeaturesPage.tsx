import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Features from '../components/home/Features';

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Funcionalidades - AutoDiagnose AI';
  }, []);

  return (
    <div className="pt-16 pb-20">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Funcionalidades
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
              Descubre todas las herramientas avanzadas que AutoDiagnose AI ofrece para mantener tu vehículo en óptimas condiciones.
            </p>
          </div>
        </div>
      </div>

      <Features />

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tecnología de vanguardia
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Nuestro sistema de diagnóstico utiliza inteligencia artificial avanzada para identificar problemas con precisión.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Algoritmos de IA</h3>
                <p className="mt-2 text-base text-gray-500">
                  Utilizamos modelos de aprendizaje automático entrenados con millones de datos para un diagnóstico preciso.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Base de datos extensa</h3>
                <p className="mt-2 text-base text-gray-500">
                  Nuestra base de datos incluye información técnica de miles de modelos de vehículos de todas las marcas.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Actualizaciones constantes</h3>
                <p className="mt-2 text-base text-gray-500">
                  Nuestro sistema se actualiza continuamente con los datos más recientes para mejorar su precisión.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;