import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import { Menu, X, Gauge, LogOut, User, Car, FileSpreadsheet } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const navigation: NavItem[] = [
  { name: 'Inicio', path: '/' },
  { name: 'Diagnósticos', path: '/diagnostics' },
  { name: 'Vehículos', path: '/vehicles' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente',
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrió un error al cerrar sesión',
      });
    }
  };
  
  // Links para usuarios no autenticados
  const publicLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Funcionalidades', path: '/features' },
    { name: 'Precios', path: '/pricing' },
    { name: 'Demo', path: '/demo' },
  ];
  
  // Links para usuarios autenticados
  const privateLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Gauge className="mr-2 h-4 w-4" /> },
    { name: 'Vehículos', path: '/dashboard/vehicles', icon: <Car className="mr-2 h-4 w-4" /> },
    { name: 'Diagnósticos', path: '/dashboard/diagnostics', icon: <FileSpreadsheet className="mr-2 h-4 w-4" /> },
  ];
  
  const navLinks = isAuthenticated ? privateLinks : publicLinks;
  
  const isPublicPage = ['/login', '/register', '/', '/features', '/pricing', '/demo'].includes(location.pathname);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isPublicPage ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Gauge className="h-8 w-8 text-primary-800" />
          <span className="font-heading font-bold text-xl md:text-2xl text-primary-800">
            AutoDiagnose AI
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-300 flex items-center ${
                location.pathname === link.path
                  ? 'text-primary-800'
                  : 'text-gray-600 hover:text-primary-800'
              }`}
            >
              {link.icon && link.icon}
              {link.name}
            </Link>
          ))}
          
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link to="/register">
                <Button>Registrarse</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Gauge className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white absolute top-full left-0 right-0 shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium py-2 flex items-center ${
                location.pathname === link.path
                  ? 'text-primary-800'
                  : 'text-gray-600'
              }`}
              onClick={closeMenu}
            >
              {link.icon && link.icon}
              {link.name}
            </Link>
          ))}
          
          {!isAuthenticated ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                className="btn btn-outline w-full text-center"
                onClick={closeMenu}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="btn btn-primary w-full text-center"
                onClick={closeMenu}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div className="border-t pt-4 mt-2">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-600 py-2"
                  onClick={closeMenu}
                >
                  <User className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="flex items-center gap-2 text-red-600 py-2 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;