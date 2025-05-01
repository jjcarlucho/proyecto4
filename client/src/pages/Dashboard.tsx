import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVehicles } from '../store/slices/vehicleSlice';
import { fetchDiagnostics } from '../store/slices/diagnosticSlice';
import { AppDispatch, RootState } from '../store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { DiagnosticWithVehicle } from '../types/diagnostic';
import { Vehicle } from '../types/vehicle';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { vehicles, loading: vehiclesLoading } = useSelector((state: RootState) => state.vehicle);
  const { diagnostics, loading: diagnosticsLoading } = useSelector((state: RootState) => state.diagnostic);

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchDiagnostics());
  }, [dispatch]);

  // Obtener los últimos diagnósticos
  const recentDiagnostics = [...diagnostics]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Contar problemas críticos
  const criticalIssuesCount = diagnostics.reduce((count, diagnostic) => {
    const criticalIssues = diagnostic.issues.filter(issue => issue.severity === 'critical');
    return count + criticalIssues.length;
  }, 0);

  // Encontrar vehículos que necesitan atención (con problemas críticos o de alta severidad)
  const vehiclesNeedingAttention = diagnostics.reduce((vehicles: string[], diagnostic) => {
    if (diagnostic.issues.some(issue => ['critical', 'high'].includes(issue.severity))) {
      const vehicleId = typeof diagnostic.vehicleId === 'object' 
        ? diagnostic.vehicleId._id 
        : diagnostic.vehicleId;
      
      if (!vehicles.includes(vehicleId)) {
        vehicles.push(vehicleId);
      }
    }
    return vehicles;
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {user?.name}</CardTitle>
            <CardDescription>
              Panel de control de AutoDiagnose
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Email: {user?.email}
            </p>
            <p className="text-sm text-gray-500">
              Rol: {user?.role}
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/profile">
              <Button variant="outline" size="sm">Ver Perfil</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>
              Resumen de actividad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Vehículos Registrados</p>
              <p className="text-2xl font-bold">{vehiclesLoading ? '...' : vehicles.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Diagnósticos Realizados</p>
              <p className="text-2xl font-bold">{diagnosticsLoading ? '...' : diagnostics.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Problemas Críticos</p>
              <p className="text-2xl font-bold text-red-600">{diagnosticsLoading ? '...' : criticalIssuesCount}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/diagnostics">
              <Button variant="outline" size="sm">Ver Historial</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Tareas comunes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/dashboard/diagnostics/new">
              <Button className="w-full">Nuevo Diagnóstico</Button>
            </Link>
            <Link to="/dashboard/vehicles/new">
              <Button variant="outline" className="w-full">Registrar Vehículo</Button>
            </Link>
            <Link to="/dashboard/vehicles">
              <Button variant="outline" className="w-full">Mis Vehículos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Diagnósticos Recientes</CardTitle>
            <CardDescription>
              Últimos resultados de diagnóstico
            </CardDescription>
          </CardHeader>
          <CardContent>
            {diagnosticsLoading ? (
              <p>Cargando diagnósticos...</p>
            ) : recentDiagnostics.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No hay diagnósticos recientes</p>
            ) : (
              <div className="space-y-4">
                {recentDiagnostics.map((diagnostic: DiagnosticWithVehicle) => (
                  <div key={diagnostic._id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {typeof diagnostic.vehicleId === 'object' 
                            ? `${diagnostic.vehicleId.make} ${diagnostic.vehicleId.model}` 
                            : 'Vehículo desconocido'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(diagnostic.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        diagnostic.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : diagnostic.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {diagnostic.status === 'completed' 
                          ? 'Completado' 
                          : diagnostic.status === 'pending' 
                            ? 'Pendiente' 
                            : 'Fallido'}
                      </div>
                    </div>
                    {diagnostic.issues && diagnostic.issues.length > 0 ? (
                      <p className="mt-2 text-sm">
                        {diagnostic.issues.length} {diagnostic.issues.length === 1 ? 'problema' : 'problemas'} detectados
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">No se detectaron problemas</p>
                    )}
                    <div className="mt-3">
                      <Link to={`/dashboard/diagnostics/${diagnostic._id}`}>
                        <Button variant="link" size="sm" className="p-0 h-auto">Ver Detalles</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/diagnostics">
              <Button variant="outline" size="sm">Ver Todos</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehículos que Necesitan Atención</CardTitle>
            <CardDescription>
              Vehículos con problemas críticos o de alta severidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            {vehiclesLoading || diagnosticsLoading ? (
              <p>Cargando información...</p>
            ) : vehiclesNeedingAttention.length === 0 ? (
              <p className="text-center py-4 text-gray-500">Todos tus vehículos están en buen estado</p>
            ) : (
              <div className="space-y-4">
                {vehicles
                  .filter((vehicle: Vehicle) => vehiclesNeedingAttention.includes(vehicle._id))
                  .map((vehicle: Vehicle) => (
                    <div key={vehicle._id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                          <p className="text-sm text-gray-500">VIN: {vehicle.vin}</p>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Atención requerida
                        </div>
                      </div>
                      <div className="mt-3">
                        <Link to={`/dashboard/vehicles/${vehicle._id}`}>
                          <Button variant="link" size="sm" className="p-0 h-auto">Ver Vehículo</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/vehicles">
              <Button variant="outline" size="sm">Ver Todos mis Vehículos</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
