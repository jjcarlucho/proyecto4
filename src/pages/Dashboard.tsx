import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DiagnosticForm from '../components/dashboard/DiagnosticForm';
import MetricsPanel from '../components/dashboard/MetricsPanel';
import { Menu } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    document.title = 'Dashboard - AutoDiagnose AI';
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar on location change (mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location]);
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/history':
        return 'Diagnostic History';
      case '/dashboard/knowledge':
        return 'Knowledge Base';
      case '/dashboard/reports':
        return 'Reports';
      case '/dashboard/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 py-8 md:px-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
            <button 
              className="md:hidden p-2 rounded-lg bg-white shadow"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          <div className="mb-8">
            <MetricsPanel />
          </div>
          
          <Routes>
            <Route path="/" element={<DiagnosticForm />} />
            <Route 
              path="/history" 
              element={
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-gray-800">
                    Diagnostic History
                  </h2>
                  <p className="text-gray-600">Your past diagnostic sessions will appear here.</p>
                </div>
              } 
            />
            <Route 
              path="/knowledge" 
              element={
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-gray-800">
                    Knowledge Base
                  </h2>
                  <p className="text-gray-600">Access repair guides and technical information here.</p>
                </div>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-gray-800">
                    Reports
                  </h2>
                  <p className="text-gray-600">View analytics and performance reports here.</p>
                </div>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-gray-800">
                    Settings
                  </h2>
                  <p className="text-gray-600">Manage your account settings and preferences here.</p>
                </div>
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;