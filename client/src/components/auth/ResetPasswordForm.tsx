import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword, clearError, clearResetSuccess } from '../../store/slices/authSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AppDispatch, RootState } from '../../store';
import { useToast } from '@/hooks/use-toast';

export function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { loading, error, resetPasswordSuccess } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearResetSuccess());
    };
  }, [dispatch]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      // Redirigir al usuario a la página de inicio de sesión después de unos segundos
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [resetPasswordSuccess, navigate]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (!validatePasswords()) {
      return;
    }
    
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Token inválido o faltante',
      });
      return;
    }
    
    try {
      await dispatch(resetPassword({ token, password })).unwrap();
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña ha sido restablecida exitosamente',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al restablecer la contraseña',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Restablecer Contraseña</CardTitle>
        <CardDescription>
          Crea una nueva contraseña para tu cuenta.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {resetPasswordSuccess && (
            <Alert>
              <AlertDescription>
                Tu contraseña ha sido restablecida exitosamente. Serás redirigido a la página de inicio de sesión en unos segundos.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || resetPasswordSuccess}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading || resetPasswordSuccess}
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || resetPasswordSuccess}
          >
            {loading ? 'Procesando...' : 'Restablecer Contraseña'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}