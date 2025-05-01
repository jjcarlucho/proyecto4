import React from 'react';

const Story: React.FC = () => {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tu vehículo merece lo mejor
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              AutoDiagnose nació de una idea simple: hacer que el diagnóstico de vehículos sea accesible para todos. Nuestra misión es prevenir problemas antes de que ocurran.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Diagnóstico preciso</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Utilizamos algoritmos de IA entrenados con millones de datos de vehículos para identificar problemas con precisión.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Ahorro de tiempo y dinero</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Evita costosas reparaciones detectando problemas a tiempo y recibiendo recomendaciones específicas.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Facilidad de uso</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Interfaz intuitiva diseñada para ser utilizada por cualquier persona, sin necesidad de conocimientos técnicos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="relative mx-auto aspect-w-5 aspect-h-3 overflow-hidden rounded-lg shadow-lg">
              <img 
                className="relative mx-auto w-full rounded-lg" 
                width="490" 
                src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Mecánico trabajando en un automóvil" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;