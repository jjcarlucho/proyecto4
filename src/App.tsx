import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import AdminDashboard from './pages/admin/Dashboard';
import DiagnosticForm from './pages/diagnostics/DiagnosticForm';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useSelector((state: RootState) => state.auth);
  return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
};

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return !user ? <>{children}</> : <Navigate to="/diagnostics" />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <h1 className="text-5xl font-extrabold text-blue-900 mb-4">AutoDiagnose AI</h1>
                <p className="text-xl text-gray-700 mb-8 text-center max-w-xl">
                  La plataforma de IA de próxima generación para diagnóstico automotriz. Rápida, precisa y diseñada para talleres modernos.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">
                    Iniciar Sesión
                  </button>
                  <button className="px-6 py-2 bg-white border border-blue-700 text-blue-700 rounded-full font-semibold shadow hover:bg-blue-50 transition">
                    Registrarse
                  </button>
                </div>
              </div>
            } />
            <Route path="/diagnostics" element={
              <PrivateRoute>
                <DiagnosticForm />
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/login" element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } />
            <Route path="/register" element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;