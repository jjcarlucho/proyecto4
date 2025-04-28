import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Diagnostic {
  id: string;
  userId: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    vin: string;
    mileage: number;
    engine: string;
  };
  symptoms: string[];
  dtcCodes: string[];
  diagnosis: {
    problems: {
      title: string;
      description: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      probability: number;
      partsNeeded: {
        name: string;
        partNumber: string;
        estimatedCost: number;
      }[];
      laborTime: number;
      laborCost: number;
      totalCost: number;
    }[];
    aiConfidence: number;
    recommendations: string[];
  };
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  report?: {
    generatedAt?: string;
    pdfUrl?: string;
    customerNotes?: string;
  };
}

interface DiagnosticState {
  diagnostics: Diagnostic[];
  currentDiagnostic: Diagnostic | null;
  loading: boolean;
  error: string | null;
}

const initialState: DiagnosticState = {
  diagnostics: [],
  currentDiagnostic: null,
  loading: false,
  error: null,
};

// Async thunks
export const createDiagnostic = createAsyncThunk(
  'diagnostic/create',
  async (data: {
    vehicleInfo: Diagnostic['vehicleInfo'];
    symptoms: string[];
    dtcCodes: string[];
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/diagnostics', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create diagnostic');
    }
  }
);

export const getDiagnostics = createAsyncThunk(
  'diagnostic/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/diagnostics');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch diagnostics');
    }
  }
);

export const getDiagnosticById = createAsyncThunk(
  'diagnostic/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/diagnostics/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch diagnostic');
    }
  }
);

const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDiagnostic: (state) => {
      state.currentDiagnostic = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Diagnostic
      .addCase(createDiagnostic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiagnostic.fulfilled, (state, action) => {
        state.loading = false;
        state.diagnostics.unshift(action.payload);
        state.currentDiagnostic = action.payload;
      })
      .addCase(createDiagnostic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All Diagnostics
      .addCase(getDiagnostics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiagnostics.fulfilled, (state, action) => {
        state.loading = false;
        state.diagnostics = action.payload;
      })
      .addCase(getDiagnostics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Diagnostic by ID
      .addCase(getDiagnosticById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiagnosticById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDiagnostic = action.payload;
      })
      .addCase(getDiagnosticById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentDiagnostic } = diagnosticSlice.actions;
export default diagnosticSlice.reducer; 