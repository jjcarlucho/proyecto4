import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_super_seguro';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Generar token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
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
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Solicitud de restablecimiento de contraseña
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      // Por seguridad, no revelamos si el correo existe o no
      return res.status(200).json({ message: 'Si existe una cuenta con ese correo, recibirás instrucciones para restablecer tu contraseña.' });
    }

    // Generar token de restablecimiento
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await user.save();

    // En una implementación real, aquí enviaríamos un email
    // Por ahora, solo devolvemos el token en la respuesta para pruebas
    res.status(200).json({
      message: 'Se han enviado instrucciones a tu correo electrónico',
      // Solo para propósitos de desarrollo/testing:
      resetToken: resetToken,
      resetUrl: `http://localhost:5173/reset-password/${resetToken}`
    });
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Restablecer contraseña
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    // Buscar usuario con token válido
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'El token es inválido o ha expirado' });
    }

    // Actualizar contraseña
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error en resetPassword:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
