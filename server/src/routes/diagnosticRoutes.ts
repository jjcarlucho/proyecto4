import express from 'express';
import { 
  getUserDiagnostics, 
  getDiagnosticById, 
  startDiagnostic,
  getVehicleDiagnostics
} from '../controllers/diagnosticController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Apply auth middleware to all diagnostic routes
router.use(authMiddleware);

// Diagnostic routes
router.get('/', getUserDiagnostics);
router.get('/:id', getDiagnosticById);
router.post('/start', startDiagnostic);
router.get('/vehicle/:vehicleId', getVehicleDiagnostics);

export default router;
