import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlusCircle, 
  History, 
  BookOpen, 
  BarChart2, 
  Settings, 
  LogOut, 
  Gauge 
} from 'lucide-react';

const menuItems = [
  { 
    name: 'New Diagnostic', 
    path: '/dashboard', 
    icon: <PlusCircle className="w-5 h-5" /> 
  },
  { 
    name: 'Diagnostic History', 
    path: '/dashboard/history', 
    icon: <History className="w-5 h-5" /> 
  },
  { 
    name: 'Knowledge Base', 
    path: '/dashboard/knowledge', 
    icon: <BookOpen className="w-5 h-5" /> 
  },
  { 
    name: 'Reports', 
    path: '/dashboard/reports', 
    icon: <BarChart2 className="w-5 h-5" /> 
  },
  { 
    name: 'Settings', 
    path: '/dashboard/settings', 
    icon: <Settings className="w-5 h-5" /> 
  },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <div 
      className={`fixed md:static inset-y-0 left-0 z-40 bg-primary-900 text-white transition-all duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } md:w-64 md:flex-shrink-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-blue-800">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Gauge className="h-8 w-8 text-secondary-500" />
            <span className="font-heading font-bold text-xl">AutoDiagnose AI</span>
          </Link>
        </div>
        
        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-800 text-white'
                      : 'text-blue-300 hover:bg-primary-800/70 hover:text-white'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-blue-800">
          <Link 
            to="/login" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-300 hover:bg-primary-800/70 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;