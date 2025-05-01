import axios from 'axios';
import { Vehicle, VehicleFormData } from '../types/vehicle';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Configurar el interceptor para incluir el token en cada solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Obtener todos los vehículos del usuario
export const getUserVehicles = async (): Promise<Vehicle[]> => {
  const response = await axios.get(`${API_URL}/vehicles`);
  return response.data;
};

// Obtener un vehículo por ID
export const getVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await axios.get(`${API_URL}/vehicles/${id}`);
  return response.data;
};

// Crear un nuevo vehículo
export const createVehicle = async (vehicleData: VehicleFormData): Promise<Vehicle> => {
  const response = await axios.post(`${API_URL}/vehicles`, vehicleData);
  return response.data;
};

// Actualizar un vehículo existente
export const updateVehicle = async (id: string, vehicleData: VehicleFormData): Promise<Vehicle> => {
  const response = await axios.put(`${API_URL}/vehicles/${id}`, vehicleData);
  return response.data;
};

// Eliminar un vehículo
export const deleteVehicle = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/vehicles/${id}`);
};
