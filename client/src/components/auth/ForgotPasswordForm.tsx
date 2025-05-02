import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError, clearForgotSuccess } from '../../store/slices/authSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AppDispatch, RootState } from '../../store';
import { useToast } from '@/hooks/use-toast';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, forgotPasswordSuccess } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearForgotSuccess());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    try {
      await dispatch(forgotPassword(email)).unwrap();
      toast({
        title: 'Solicitud enviada',
        description: 'Se han enviado instrucciones a tu correo electrónico',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al procesar la solicitud',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Recuperar Contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {forgotPasswordSuccess && (
            <Alert>
              <AlertDescription>
                Se han enviado instrucciones a tu correo electrónico. Por favor, revisa tu bandeja de entrada.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || forgotPasswordSuccess}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || forgotPasswordSuccess}
          >
            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
          </Button>
          
          <Button 
            type="button" 
            variant="link" 
            className="w-full" 
            onClick={() => window.history.back()}
          >
            Volver al inicio de sesión
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}