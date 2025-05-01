import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { loginWithEmailAndPassword, loginWithGoogle } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="w-5 h-5" />
          Continuar con Google
        </Button>
      </CardFooter>
    </Card>
  );
}