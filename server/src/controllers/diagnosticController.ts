import { Request, Response } from 'express';
import { Diagnostic } from '../models/Diagnostic';
import { Vehicle } from '../models/Vehicle';

// Get all diagnostics for the logged in user
export const getUserDiagnostics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const diagnostics = await Diagnostic.find({ userId }).populate('vehicleId');
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener diagnósticos' });
  }
};

// Get diagnostic by ID
export const getDiagnosticById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    const diagnostic = await Diagnostic.findOne({ _id: id, userId }).populate('vehicleId');
    
    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnóstico no encontrado' });
    }
    
    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el diagnóstico' });
  }
};

// Start a new diagnostic
export const startDiagnostic = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { vehicleId } = req.body;
    
    // Check if vehicle exists and belongs to the user
    const vehicle = await Vehicle.findOne({ _id: vehicleId, userId });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    
    // Create new diagnostic
    const diagnostic = new Diagnostic({
      vehicleId,
      userId,
      date: new Date(),
      status: 'pending'
    });
    
    await diagnostic.save();
    
    // Simulate diagnostic process (in a real app, this would be more complex)
    setTimeout(async () => {
      try {
        // Example diagnostic result
        const mockIssues = [
          {
            code: 'P0300',
            description: 'Multiple Cylinder Misfire Detected',
            severity: 'high',
            system: 'Engine'
          },
          {
            code: 'P0420',
            description: 'Catalyst System Efficiency Below Threshold',
            severity: 'medium',
            system: 'Emissions'
          }
        ];
        
        const recommendedActions = [
          'Inspect spark plugs and replace if necessary',
          'Check ignition coils',
          'Inspect catalytic converter'
        ];
        
        await Diagnostic.findByIdAndUpdate(diagnostic._id, {
          status: 'completed',
          issues: mockIssues,
          recommendedActions,
          summary: 'Se detectaron problemas en el sistema de encendido y en el catalizador.',
          detailedReport: 'Reporte detallado del diagnóstico del vehículo...'
        });
        
        // Update vehicle's last diagnostic date
        await Vehicle.findByIdAndUpdate(vehicleId, {
          lastDiagnostic: new Date()
        });
      } catch (err) {
        console.error('Error updating diagnostic:', err);
        await Diagnostic.findByIdAndUpdate(diagnostic._id, {
          status: 'failed'
        });
      }
    }, 5000); // Simulate 5-second diagnostic process
    
    res.status(201).json({
      message: 'Diagnóstico iniciado correctamente',
      diagnostic
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar el diagnóstico' });
  }
};

// Get diagnostics for a specific vehicle
export const getVehicleDiagnostics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { vehicleId } = req.params;
    
    // Check if vehicle exists and belongs to the user
    const vehicle = await Vehicle.findOne({ _id: vehicleId, userId });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    
    const diagnostics = await Diagnostic.find({ vehicleId }).sort({ date: -1 });
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener diagnósticos del vehículo' });
  }
};
