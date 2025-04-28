import { Router } from 'express';
import User from '../models/User';

const router = Router();

// Endpoint para listar todos los usuarios (protegido, solo admin)
router.get('/', async (req, res) => {
  try {
    // Aquí podrías agregar lógica para verificar si el usuario es admin
    const users = await User.find().select('-password'); // No enviar contraseñas
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

export default router;