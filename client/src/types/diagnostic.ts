export interface DiagnosticIssue {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  system: string;
}

export interface Diagnostic {
  _id: string;
  vehicleId: string;
  userId: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  issues: DiagnosticIssue[];
  recommendedActions: string[];
  summary: string;
  detailedReport?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosticWithVehicle extends Diagnostic {
  vehicleId: {
    _id: string;
    make: string;
    model: string;
    year: number;
    vin: string;
  };
}

export interface StartDiagnosticRequest {
  vehicleId: string;
}

export interface StartDiagnosticResponse {
  message: string;
  diagnostic: Diagnostic;
}
