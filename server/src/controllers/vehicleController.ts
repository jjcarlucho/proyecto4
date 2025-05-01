import { Request, Response } from 'express';
import { Vehicle } from '../models/Vehicle';

// Get all vehicles for the logged in user
export const getUserVehicles = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const vehicles = await Vehicle.find({ userId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vehículos' });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    const vehicle = await Vehicle.findOne({ _id: id, userId });
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el vehículo' });
  }
};

// Create a new vehicle
export const createVehicle = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { make, model, year, vin, licensePlate, mileage } = req.body;
    
    // Check if vehicle with this VIN already exists
    const existingVehicle = await Vehicle.findOne({ vin });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Ya existe un vehículo con este VIN' });
    }
    
    const vehicle = new Vehicle({
      userId,
      make,
      model,
      year,
      vin,
      licensePlate,
      mileage
    });
    
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el vehículo' });
  }
};

// Update a vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const { make, model, year, vin, licensePlate, mileage } = req.body;
    
    // Check if the vehicle exists and belongs to the user
    const vehicle = await Vehicle.findOne({ _id: id, userId });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    
    // Check if trying to update to an existing VIN
    if (vin !== vehicle.vin) {
      const existingVehicle = await Vehicle.findOne({ vin });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Ya existe un vehículo con este VIN' });
      }
    }
    
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { make, model, year, vin, licensePlate, mileage },
      { new: true }
    );
    
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el vehículo' });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    // Check if the vehicle exists and belongs to the user
    const vehicle = await Vehicle.findOne({ _id: id, userId });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    
    await Vehicle.findByIdAndDelete(id);
    res.json({ message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vehículo' });
  }
};
