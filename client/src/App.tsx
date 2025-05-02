import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ROICalculatorPage from './pages/ROICalculatorPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from './components/ui/toaster';

// Import vehicle components
import VehicleList from './components/vehicles/VehicleList';
import VehicleForm from './components/vehicles/VehicleForm';
import VehicleDetail from './components/vehicles/VehicleDetail';

// Import diagnostic components
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
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Vehicle routes */}
            <Route path="/dashboard/vehicles" element={<ProtectedRoute><VehicleList /></ProtectedRoute>} />
            <Route path="/dashboard/vehicles/new" element={<ProtectedRoute><VehicleForm /></ProtectedRoute>} />
            <Route path="/dashboard/vehicles/edit/:id" element={<ProtectedRoute><VehicleForm /></ProtectedRoute>} />
            <Route path="/dashboard/vehicles/:id" element={<ProtectedRoute><VehicleDetail /></ProtectedRoute>} />
            
            {/* Diagnostic routes */}
            <Route path="/dashboard/diagnostics" element={<ProtectedRoute><DiagnosticList /></ProtectedRoute>} />
            <Route path="/dashboard/diagnostics/new" element={<ProtectedRoute><StartDiagnostic /></ProtectedRoute>} />
            <Route path="/dashboard/diagnostics/:id" element={<ProtectedRoute><DiagnosticDetail /></ProtectedRoute>} />
            
            {/* Default route */}
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