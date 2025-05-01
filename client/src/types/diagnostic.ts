export interface DiagnosticIssue {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  system: string;
}

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
}

export interface Diagnostic {
  _id: string;
  vehicleId: string;
  userId: string;
  date: string;
  status: 'pending' | 'in_progress' | 'completed';
  issues: DiagnosticIssue[];
  recommendedActions: string[];
  summary: string;
  detailedReport?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosticWithVehicle extends Omit<Diagnostic, 'vehicleId'> {
  vehicleId: Vehicle;
}

export interface StartDiagnosticRequest {
  vehicleId: string;
}

export interface StartDiagnosticResponse {
  message: string;
  diagnostic: Diagnostic;
}
