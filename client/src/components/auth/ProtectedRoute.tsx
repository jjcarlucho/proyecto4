import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loadUser } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Si hay un token pero el usuario no está autenticado, intentar cargar el usuario
    if (token && !isAuthenticated && !loading) {
      dispatch(loadUser());
    }
  }, [token, isAuthenticated, loading, dispatch]);

  // Si está cargando, mostrar un spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  // Si no está autenticado y no está cargando, redirigir al login
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar los children
  return <>{children}</>;
};
