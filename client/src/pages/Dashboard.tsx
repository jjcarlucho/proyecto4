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
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
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
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="mt-4">
            <p className="text-lg text-gray-700">
              Bienvenido, {user?.email}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
