import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchDiagnosticById } from '../../store/slices/diagnosticSlice';
import { AppDispatch, RootState } from '../../store';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const DiagnosticDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentDiagnostic, loading, error } = useSelector((state: RootState) => state.diagnostic);

  useEffect(() => {
    if (id) {
      dispatch(fetchDiagnosticById(id));
    }
  }, [dispatch, id]);

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

  // Función para renderizar el badge de severidad
  const renderSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge className="bg-blue-500">Baja</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Media</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">Alta</Badge>;
      case 'critical':
        return <Badge className="bg-red-600">Crítica</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Cargando detalles del diagnóstico...</div>;
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

  if (!currentDiagnostic) {
    return <div className="flex justify-center p-8">No se encontró el diagnóstico</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Diagnóstico #{currentDiagnostic._id.substring(0, 8)}</CardTitle>
              <CardDescription>
                {new Date(currentDiagnostic.date).toLocaleString()}
              </CardDescription>
            </div>
            {renderStatusBadge(currentDiagnostic.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Información del Vehículo</h3>
              {typeof currentDiagnostic.vehicleId === 'object' ? (
                <div className="mt-2">
                  <p className="text-lg font-semibold">
                    {currentDiagnostic.vehicleId.make} {currentDiagnostic.vehicleId.model} ({currentDiagnostic.vehicleId.year})
                  </p>
                  <p className="text-sm text-gray-500">VIN: {currentDiagnostic.vehicleId.vin}</p>
                </div>
              ) : (
                <p className="mt-2">Información del vehículo no disponible</p>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Resumen</h3>
              <p className="mt-2">{currentDiagnostic.summary || 'No hay resumen disponible'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentDiagnostic.status === 'completed' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Problemas Detectados</CardTitle>
              <CardDescription>
                Se encontraron {currentDiagnostic.issues.length} problemas en el vehículo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentDiagnostic.issues.length === 0 ? (
                <p>No se detectaron problemas</p>
              ) : (
                <div className="space-y-4">
                  {currentDiagnostic.issues.map((issue, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{issue.code}: {issue.description}</h3>
                          <p className="text-sm text-gray-500">Sistema: {issue.system}</p>
                        </div>
                        {renderSeverityBadge(issue.severity)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              {currentDiagnostic.recommendedActions.length === 0 ? (
                <p>No hay acciones recomendadas</p>
              ) : (
                <ul className="list-disc pl-5 space-y-2">
                  {currentDiagnostic.recommendedActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {currentDiagnostic.detailedReport && (
            <Card>
              <CardHeader>
                <CardTitle>Reporte Detallado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap">
                  {currentDiagnostic.detailedReport}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <CardFooter className="justify-center pb-6">
        <div className="space-x-4">
          <Link to="/dashboard/diagnostics">
            <Button variant="outline">Volver a Diagnósticos</Button>
          </Link>
          {typeof currentDiagnostic.vehicleId === 'object' && (
            <Link to={`/dashboard/vehicles/${currentDiagnostic.vehicleId._id}`}>
              <Button>Ver Vehículo</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </div>
  );
};

export default DiagnosticDetail;
