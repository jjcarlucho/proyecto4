import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import DemoPage from './pages/DemoPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from './components/ui/toaster';

// Importar componentes de vehículos
import VehicleList from './components/vehicles/VehicleList';
import VehicleForm from './components/vehicles/VehicleForm';
import VehicleDetail from './components/vehicles/VehicleDetail';

// Importar componentes de diagnósticos
import DiagnosticList from './components/diagnostics/DiagnosticList';
import DiagnosticDetail from './components/diagnostics/DiagnosticDetail';
import StartDiagnostic from './components/diagnostics/StartDiagnostic';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Rutas de vehículos */}
            <Route path="/dashboard/vehicles" element={<ProtectedRoute><VehicleList /></ProtectedRoute>} />
            <Route path="/dashboard/vehicles/new" element={<ProtectedRoute><VehicleForm /></ProtectedRoute>} />
            <Route path="/dashboard/vehicles/edit/:id" element={<ProtectedRoute><VehicleForm /></ProtectedRoute>} />
            <Route path="/dashboard/vehicles/:id" element={<ProtectedRoute><VehicleDetail /></ProtectedRoute>} />
            
            {/* Rutas de diagnósticos */}
            <Route path="/dashboard/diagnostics" element={<ProtectedRoute><DiagnosticList /></ProtectedRoute>} />
            <Route path="/dashboard/diagnostics/new" element={<ProtectedRoute><StartDiagnostic /></ProtectedRoute>} />
            <Route path="/dashboard/diagnostics/:id" element={<ProtectedRoute><DiagnosticDetail /></ProtectedRoute>} />
            
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;