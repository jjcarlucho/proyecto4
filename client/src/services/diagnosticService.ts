import axios from 'axios';
import { Diagnostic, DiagnosticWithVehicle, StartDiagnosticRequest, StartDiagnosticResponse } from '../types/diagnostic';

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

// Obtener todos los diagnósticos del usuario
export const getUserDiagnostics = async (): Promise<DiagnosticWithVehicle[]> => {
  const response = await axios.get(`${API_URL}/diagnostics`);
  return response.data;
};

// Obtener un diagnóstico por ID
export const getDiagnosticById = async (id: string): Promise<DiagnosticWithVehicle> => {
  const response = await axios.get(`${API_URL}/diagnostics/${id}`);
  return response.data;
};

// Iniciar un nuevo diagnóstico
export const startDiagnostic = async (data: StartDiagnosticRequest): Promise<StartDiagnosticResponse> => {
  const response = await axios.post(`${API_URL}/diagnostics/start`, data);
  return response.data;
};

// Obtener diagnósticos para un vehículo específico
export const getVehicleDiagnostics = async (vehicleId: string): Promise<Diagnostic[]> => {
  const response = await axios.get(`${API_URL}/diagnostics/vehicle/${vehicleId}`);
  return response.data;
};
