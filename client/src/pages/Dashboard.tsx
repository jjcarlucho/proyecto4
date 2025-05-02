import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../store/slices/vehicleSlice';
import { fetchDiagnostics } from '../store/slices/diagnosticSlice';
import { AppDispatch, RootState } from '../store';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  
  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchDiagnostics());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="mt-4">
            <p className="text-lg text-gray-700">
              Welcome, {user?.email}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;