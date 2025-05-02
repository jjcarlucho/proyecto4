import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

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
} 