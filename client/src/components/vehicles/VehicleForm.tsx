import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createVehicle, updateVehicle, fetchVehicleById, clearError } from '../../store/slices/vehicleSlice';
import { AppDispatch, RootState } from '../../store';
import { VehicleFormData } from '../../types/vehicle';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '@/hooks/use-toast';

const VehicleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { currentVehicle, loading, error } = useSelector((state: RootState) => state.vehicle);
  
  const [formData, setFormData] = useState<VehicleFormData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vin: '',
    licensePlate: '',
    mileage: 0
  });

  useEffect(() => {
    dispatch(clearError());
    
    if (isEditing && id) {
      dispatch(fetchVehicleById(id));
    }
  }, [dispatch, id, isEditing]);

  useEffect(() => {
    if (isEditing && currentVehicle) {
      setFormData({
        make: currentVehicle.make,
        model: currentVehicle.model,
        year: currentVehicle.year,
        vin: currentVehicle.vin,
        licensePlate: currentVehicle.licensePlate || '',
        mileage: currentVehicle.mileage
      });
    }
  }, [currentVehicle, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'mileage' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    try {
      if (isEditing && id) {
        await dispatch(updateVehicle({ id, data: formData })).unwrap();
        toast({
          title: 'Vehículo actualizado',
          description: 'El vehículo ha sido actualizado correctamente',
        });
      } else {
        await dispatch(createVehicle(formData)).unwrap();
        toast({
          title: 'Vehículo registrado',
          description: 'El vehículo ha sido registrado correctamente',
        });
      }
      navigate('/dashboard/vehicles');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al procesar el vehículo',
      });
    }
  };

  if (isEditing && loading && !currentVehicle) {
    return <div className="flex justify-center p-8">Cargando información del vehículo...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Editar Vehículo' : 'Registrar Nuevo Vehículo'}</CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Actualiza la información de tu vehículo' 
            : 'Ingresa los datos de tu vehículo para comenzar con los diagnósticos'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Marca</Label>
              <Input
                id="make"
                name="make"
                placeholder="Ej. Toyota"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                name="model"
                placeholder="Ej. Corolla"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vin">Número VIN</Label>
              <Input
                id="vin"
                name="vin"
                placeholder="Número de identificación del vehículo"
                value={formData.vin}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Placa (opcional)</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                placeholder="Ej. ABC-123"
                value={formData.licensePlate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mileage">Kilometraje</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                min="0"
                placeholder="Kilometraje actual"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/dashboard/vehicles')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Registrar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default VehicleForm;
