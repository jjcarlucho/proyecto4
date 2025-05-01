import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVehicles, deleteVehicle } from '../../store/slices/vehicleSlice';
import { AppDispatch, RootState } from '../../store';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '../ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const VehicleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicles, loading, error } = useSelector((state: RootState) => state.vehicle);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteVehicle(id)).unwrap();
      toast({
        title: 'Vehículo eliminado',
        description: 'El vehículo ha sido eliminado correctamente',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al eliminar el vehículo',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Cargando vehículos...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mis Vehículos</CardTitle>
        <CardDescription>
          Gestiona tus vehículos registrados para diagnóstico
        </CardDescription>
      </CardHeader>
      <CardContent>
        {vehicles.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">No tienes vehículos registrados</p>
            <Link to="/dashboard/vehicles/new">
              <Button>Registrar Vehículo</Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableCaption>Lista de vehículos registrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Último Diagnóstico</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle._id}>
                  <TableCell>{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.vin}</TableCell>
                  <TableCell>
                    {vehicle.lastDiagnostic 
                      ? new Date(vehicle.lastDiagnostic).toLocaleDateString() 
                      : 'Nunca'}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Link to={`/dashboard/vehicles/${vehicle._id}`}>
                      <Button variant="outline" size="sm">Ver</Button>
                    </Link>
                    <Link to={`/dashboard/vehicles/edit/${vehicle._id}`}>
                      <Button variant="outline" size="sm">Editar</Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Eliminar</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente este vehículo
                            y todos sus diagnósticos asociados.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(vehicle._id)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <Link to="/dashboard/vehicles/new">
          <Button>Agregar Vehículo</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VehicleList;
