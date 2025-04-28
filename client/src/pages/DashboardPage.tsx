import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>
              Resumen de actividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Próximamente: Estadísticas de uso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Tareas comunes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Próximamente: Acciones rápidas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 