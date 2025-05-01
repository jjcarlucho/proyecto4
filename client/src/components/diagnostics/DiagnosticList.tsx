import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDiagnostics } from '../../store/slices/diagnosticSlice';
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
import { Badge } from '../ui/badge';

const DiagnosticList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { diagnostics, loading, error } = useSelector((state: RootState) => state.diagnostic);

  useEffect(() => {
    dispatch(fetchDiagnostics());
  }, [dispatch]);

  // Función para renderizar el badge de status
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

  if (loading) {
    return <div className="flex justify-center p-8">Cargando diagnósticos...</div>;
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
        <CardTitle>Mis Diagnósticos</CardTitle>
        <CardDescription>
          Historial de diagnósticos de tus vehículos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {diagnostics.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">No tienes diagnósticos realizados</p>
            <Link to="/dashboard/vehicles">
              <Button>Realizar un Diagnóstico</Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableCaption>Historial de diagnósticos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Vehículo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Problemas</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diagnostics.map((diagnostic) => (
                <TableRow key={diagnostic._id}>
                  <TableCell>{new Date(diagnostic.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {typeof diagnostic.vehicleId === 'object' 
                      ? `${diagnostic.vehicleId.make} ${diagnostic.vehicleId.model} (${diagnostic.vehicleId.year})` 
                      : 'Vehículo no disponible'}
                  </TableCell>
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
      <CardFooter>
        <Link to="/dashboard/vehicles">
          <Button>Nuevo Diagnóstico</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DiagnosticList;
