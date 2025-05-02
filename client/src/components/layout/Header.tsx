import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Gauge, Car, FileSpreadsheet, User, LogOut, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Links for unauthenticated users
  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'ROI Calculator', path: '/roi-calculator' },
  ];

  // Links for authenticated users
  const privateLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Gauge className="mr-2 h-4 w-4" /> },
    { name: 'Vehicles', path: '/dashboard/vehicles', icon: <Car className="mr-2 h-4 w-4" /> },
    { name: 'Diagnostics', path: '/dashboard/diagnostics', icon: <FileSpreadsheet className="mr-2 h-4 w-4" /> },
    { name: 'ROI Calculator', path: '/roi-calculator', icon: <Calculator className="mr-2 h-4 w-4" /> },
  ];

  // Close the mobile menu when changing pages
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isPublicPage = ['/login', '/register', '/', '/features', '/pricing', '/roi-calculator'].includes(location.pathname);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl md:text-2xl text-primary-800">
                  AutoDiagnose AI
                </span>
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-4 items-center">
              {user
                ? privateLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        location.pathname === link.path
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))
                : publicLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        location.pathname === link.path
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => navigate('/dashboard')}
                    >
                      <Gauge className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => navigate('/dashboard/profile')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {user
              ? privateLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {link.icon}
                      {link.name}
                    </div>
                  </Link>
                ))
              : publicLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-2 space-y-1">
                <div className="block px-3 py-2 text-base font-medium text-gray-500">
                  {user.email}
                </div>
                <Link
                  to="/dashboard/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 rounded-md text-center text-base font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-3 py-2 rounded-md text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;