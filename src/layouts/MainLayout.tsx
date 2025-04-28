import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import { auth } from '../services/firebase';
import { useAuthSync } from '../features/auth/useAuthSync';

const MainLayout: React.FC = () => {
  const { user, isAdmin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useAuthSync();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-blue-600">AutoDiagnose AI</span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link to="/diagnostics" className="inline-flex items-center px-1 pt-1 text-gray-900">
                  Diagnósticos
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-gray-900">
                    Panel Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 