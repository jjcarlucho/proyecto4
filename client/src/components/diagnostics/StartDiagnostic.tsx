import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchVehicles } from '../../store/slices/vehicleSlice';
import { startNewDiagnostic } from '../../store/slices/diagnosticSlice';
import { AppDispatch, RootState } from '../../store';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
import { Vehicle } from '../../types/vehicle';

const StartDiagnostic: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { vehicles, loading: vehiclesLoading } = useSelector((state: RootState) => state.vehicle);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleStartDiagnostic = async () => {
    if (!selectedVehicleId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, selecciona un vehículo',
      });
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(startNewDiagnostic({ vehicleId: selectedVehicleId })).unwrap();
      toast({
        title: 'Diagnóstico iniciado',
        description: 'El diagnóstico se ha iniciado correctamente',
      });
      navigate('/dashboard/diagnostics');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al iniciar el diagnóstico',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Iniciar Nuevo Diagnóstico</CardTitle>
        <CardDescription>
          Selecciona un vehículo para comenzar un diagnóstico completo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {vehicles.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-2">No tienes vehículos registrados</p>
            <p className="text-sm text-gray-500">
              Debes registrar al menos un vehículo para poder realizar un diagnóstico
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Selecciona un Vehículo</label>
              <Select
                value={selectedVehicleId}
                onValueChange={setSelectedVehicleId}
                disabled={vehiclesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle: Vehicle) => (
                    <SelectItem key={vehicle._id} value={vehicle._id}>
                      {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.vin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">¿Cómo funciona el diagnóstico?</h3>
              <p className="text-sm text-blue-700">
                Nuestro sistema realizará un diagnóstico completo de tu vehículo utilizando
                algoritmos de inteligencia artificial para detectar posibles problemas.
                Este proceso puede tardar unos minutos en completarse.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/vehicles')}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleStartDiagnostic}
          disabled={!selectedVehicleId || isLoading || vehiclesLoading}
        >
          {isLoading ? 'Iniciando...' : 'Iniciar Diagnóstico'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StartDiagnostic;
