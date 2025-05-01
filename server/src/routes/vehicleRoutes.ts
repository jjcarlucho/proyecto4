import express from 'express';
import { 
  getUserVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from '../controllers/vehicleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Apply auth middleware to all vehicle routes
router.use(authMiddleware);

// Vehicle routes
router.get('/', getUserVehicles);
router.get('/:id', getVehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;
