import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import ROICalculatorPage from './pages/ROICalculatorPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import DiagnosticDetailPage from './pages/DiagnosticDetailPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from './components/ui/toaster';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="roi-calculator" element={<ROICalculatorPage />} />

              {/* Protected routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="diagnostics"
                element={
                  <ProtectedRoute>
                    <DiagnosticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="diagnostics/:id"
                element={
                  <ProtectedRoute>
                    <DiagnosticDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </Provider>
  );
}

export default App;