import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_super_seguro';

// Nota: Esta es una implementación simplificada para la demo
// En una implementación real, se verificaría el token de Google utilizando
// la biblioteca 'google-auth-library'

export const googleLogin = async (req: Request, res: Response) => {
  try {
    // En una implementación real, aquí verificaríamos el tokenId con Google
    const { tokenId } = req.body;
    
    // Simular información del usuario extraída del token de Google
    // En una implementación real, estos datos vendrían de la verificación del token
    const googleUser = {
      email: 'usuario@gmail.com', // En una implementación real, se extraería del token
      name: 'Usuario de Google', // En una implementación real, se extraería del token
      googleId: 'google-id-123' // En una implementación real, se extraería del token
    };
    
    // Buscar si el usuario ya existe
    let user = await User.findOne({ email: googleUser.email });
    
    // Si no existe, crearlo
    if (!user) {
      // Crear un password aleatorio para usuarios de Google
      const randomPassword = Math.random().toString(36).slice(-8);
      
      user = new User({
        email: googleUser.email,
        name: googleUser.name,
        password: randomPassword,
        // Opcionalmente, agregar campo googleId al modelo de usuario
      });
      
      await user.save();
    }
    
    // Generar token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en googleLogin:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};