import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function InteractiveDemoSection() {
  const [vehicleData, setVehicleData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular un retraso
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Prueba AutoDiagnose AI
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Ingresa los datos de tu vehículo y obtén un diagnóstico instantáneo
          </p>
        </motion.div>

        <div className="mt-12">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="shadow-sm -space-y-px">
              <div>
                <label htmlFor="vehicle-data" className="sr-only">
                  Datos del vehículo
                </label>
                <Input
                  id="vehicle-data"
                  name="vehicle-data"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Ingresa los síntomas o problemas que presenta tu vehículo"
                  value={vehicleData}
                  onChange={(e) => setVehicleData(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                disabled={isLoading}
              >
                {isLoading ? 'Analizando...' : 'Analizar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}