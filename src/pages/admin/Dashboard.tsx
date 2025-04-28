import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface Diagnostic {
  id: string;
  userId: string;
  vehicleInfo: string;
  problem: string;
  solution: string;
  createdAt: Date;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const diagnosticsSnapshot = await getDocs(collection(db, 'diagnostics'));

        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as User[];

        const diagnosticsData = diagnosticsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Diagnostic[];

        setUsers(usersData);
        setDiagnostics(diagnosticsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Usuarios Totales</p>
              <p className="text-2xl font-bold text-blue-600">{users.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Diagnósticos Realizados</p>
              <p className="text-2xl font-bold text-green-600">{diagnostics.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Gestionar Usuarios
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Ver Reportes
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Configuración del Sistema
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Usuarios Recientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.createdAt?.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Últimos Diagnósticos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehículo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problema</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {diagnostics.slice(0, 5).map((diagnostic) => (
                <tr key={diagnostic.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{diagnostic.vehicleInfo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{diagnostic.problem}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {diagnostic.createdAt?.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 