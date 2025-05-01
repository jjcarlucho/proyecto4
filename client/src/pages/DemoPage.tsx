import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const carMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'BMW', 'Mercedes-Benz',
  'Audi', 'Nissan', 'Hyundai', 'Kia', 'Subaru', 'Mazda', 'Lexus', 'Tesla'
];

const DemoPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Demo - AutoDiagnose AI';
  }, []);

  const [step, setStep] = useState(1);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | boolean>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      // Simulamos el diagnóstico
      setTimeout(() => {
        setLoading(false);
        setResults(true);
        setStep(3);
      }, 3000);
    }
  };

  return (
    <div className="pt-16 pb-20">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Demo Interactiva
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
              Experimenta cómo funciona AutoDiagnose AI con esta demostración interactiva.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-blue-600' : 'bg-gray-300'
              } text-white`}>
                1
              </div>
              <div className={`ml-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-500'} font-medium`}>
                Vehículo
              </div>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
              } text-white`}>
                2
              </div>
              <div className={`ml-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-500'} font-medium`}>
                Diagnóstico
              </div>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-blue-600' : 'bg-gray-300'
              } text-white`}>
                3
              </div>
              <div className={`ml-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-500'} font-medium`}>
                Resultados
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Información del Vehículo</CardTitle>
              <CardDescription>
                Introduce los datos de tu vehículo para comenzar el diagnóstico.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Marca</Label>
                  <Select value={make} onValueChange={setMake} required>
                    <SelectTrigger id="make">
                      <SelectValue placeholder="Selecciona una marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {carMakes.map((carMake) => (
                        <SelectItem key={carMake} value={carMake}>{carMake}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input 
                    id="model" 
                    placeholder="Ej. Corolla" 
                    value={model} 
                    onChange={(e) => setModel(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input 
                    id="year" 
                    placeholder="Ej. 2020" 
                    type="number" 
                    min="1900" 
                    max={new Date().getFullYear()} 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)} 
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Continuar</Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Iniciar Diagnóstico</CardTitle>
              <CardDescription>
                Conecta tu vehículo para comenzar el diagnóstico inteligente.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="text-center py-6">
                  <div className="mb-6">
                    <div className="inline-block p-4 rounded-full bg-blue-100">
                      <svg className="h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Vehículo: {make} {model} ({year})
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Para un diagnóstico real, conectarías un dispositivo al puerto OBD-II de tu vehículo. Para esta demo, simplemente haz clic en "Iniciar Diagnóstico".
                  </p>
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Conexión</span>
                      <span className="text-sm font-medium text-green-600">Listo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Datos del vehículo</span>
                      <span className="text-sm font-medium text-green-600">Verificado</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Sistema de diagnóstico</span>
                      <span className="text-sm font-medium text-green-600">Preparado</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analizando...
                    </>
                  ) : 'Iniciar Diagnóstico'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Resultados del Diagnóstico</CardTitle>
              <CardDescription>
                Análisis completo para {make} {model} ({year})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">Estado General</h3>
                  <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Atención requerida
                  </div>
                </div>
                <p className="text-gray-500 mb-4">
                  Se han detectado algunos problemas que requieren atención para mantener tu vehículo en óptimas condiciones.
                </p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Sistema de encendido</h4>
                      <p className="text-sm text-gray-500">Bujías desgastadas</p>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Alta
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Las bujías muestran signos de desgaste significativo. Recomendamos su reemplazo para evitar problemas de arranque y rendimiento deficiente.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Sistema de emisiones</h4>
                      <p className="text-sm text-gray-500">Eficiencia del catalizador reducida</p>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Media
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    El catalizador muestra una eficiencia por debajo del umbral óptimo. Recomendamos una inspección para determinar si necesita limpieza o reemplazo.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Frenos</h4>
                      <p className="text-sm text-gray-500">Desgaste de pastillas</p>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Baja
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Las pastillas de freno delanteras muestran desgaste normal pero se acercan al punto de reemplazo recomendado. Considere su cambio en los próximos 5,000 km.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-sm text-gray-500 mb-2">
                En un diagnóstico completo, recibirías recomendaciones detalladas, costos estimados y podrías programar servicios directamente desde la aplicación.
              </p>
              <div className="flex space-x-4 w-full">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Reiniciar Demo
                </Button>
                <Link to="/register" className="flex-1">
                  <Button className="w-full">Registrarse Ahora</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DemoPage;