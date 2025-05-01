import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchVehicleById, deleteVehicle } from '../../store/slices/vehicleSlice';
import { fetchVehicleDiagnostics } from '../../store/slices/diagnosticSlice';
import { AppDispatch, RootState } from '../../store';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useToast } from '@/hooks/use-toast';
import { Vehicle } from '../../types/vehicle';

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { currentVehicle, loading: vehicleLoading } = useSelector((state: RootState) => state.vehicle);
  const { vehicleDiagnostics, loading: diagnosticsLoading } = useSelector((state: RootState) => state.diagnostic);

  useEffect(() => {
    if (id) {
      dispatch(fetchVehicleById(id));
      dispatch(fetchVehicleDiagnostics(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await dispatch(deleteVehicle(id)).unwrap();
      toast({
        title: 'Vehículo eliminado',
        description: 'El vehículo ha sido eliminado correctamente',
      });
      navigate('/dashboard/vehicles');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al eliminar el vehículo',
      });
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'completed':
        return <Badge variant="success">Completado</Badge>;
      case 'failed':
        return <Badge variant="destructive">Fallido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (vehicleLoading) {
    return <div className="flex justify-center p-8">Cargando información del vehículo...</div>;
  }

  if (!currentVehicle) {
    return <div className="flex justify-center p-8">No se encontró el vehículo</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{currentVehicle.make} {currentVehicle.model} ({currentVehicle.year})</CardTitle>
              <CardDescription>
                VIN: {currentVehicle.vin}
              </CardDescription>
            </div>
            <div className="space-x-2">
              <Link to={`/dashboard/vehicles/edit/${currentVehicle._id}`}>
                <Button variant="outline">Editar</Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Eliminar</Button>
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
                    <AlertDialogAction onClick={handleDelete}>
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Información General</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Marca:</span>
                  <span className="font-medium">{currentVehicle.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Modelo:</span>
                  <span className="font-medium">{currentVehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Año:</span>
                  <span className="font-medium">{currentVehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">VIN:</span>
                  <span className="font-medium">{currentVehicle.vin}</span>
                </div>
                {currentVehicle.licensePlate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Placa:</span>
                    <span className="font-medium">{currentVehicle.licensePlate}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Estado del Vehículo</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Kilometraje:</span>
                  <span className="font-medium">{currentVehicle.mileage} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Último Diagnóstico:</span>
                  <span className="font-medium">
                    {currentVehicle.lastDiagnostic 
                      ? new Date(currentVehicle.lastDiagnostic).toLocaleDateString() 
                      : 'Nunca'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fecha de Registro:</span>
                  <span className="font-medium">
                    {new Date(currentVehicle.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Link to="/dashboard/diagnostics/new">
            <Button>Iniciar Diagnóstico</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Diagnósticos</CardTitle>
          <CardDescription>
            Resultados de diagnósticos previos para este vehículo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {diagnosticsLoading ? (
            <div className="text-center py-4">Cargando diagnósticos...</div>
          ) : vehicleDiagnostics.length === 0 ? (
            <div className="text-center py-8">
              <p className="mb-4">No hay diagnósticos previos para este vehículo</p>
              <Link to="/dashboard/diagnostics/new">
                <Button>Realizar Primer Diagnóstico</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableCaption>Historial completo de diagnósticos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Problemas</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleDiagnostics.map((diagnostic) => (
                  <TableRow key={diagnostic._id}>
                    <TableCell>{new Date(diagnostic.date).toLocaleDateString()}</TableCell>
                    <TableCell>{renderStatusBadge(diagnostic.status)}</TableCell>
                    <TableCell>
                      {diagnostic.issues && diagnostic.issues.length > 0 
                        ? `${diagnostic.issues.length} ${diagnostic.issues.length === 1 ? 'problema' : 'problemas'}`
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Link to={`/dashboard/diagnostics/${diagnostic._id}`}>
                        <Button variant="outline" size="sm">Ver Detalles</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleDetail;
