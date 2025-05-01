import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Diagnostic, DiagnosticWithVehicle, StartDiagnosticRequest } from '../../types/diagnostic';
import * as diagnosticService from '../../services/diagnosticService';

interface DiagnosticState {
  diagnostics: DiagnosticWithVehicle[];
  currentDiagnostic: DiagnosticWithVehicle | null;
  vehicleDiagnostics: Diagnostic[];
  loading: boolean;
  error: string | null;
}

const initialState: DiagnosticState = {
  diagnostics: [],
  currentDiagnostic: null,
  vehicleDiagnostics: [],
  loading: false,
  error: null
};

// Thunks
export const fetchDiagnostics = createAsyncThunk(
  'diagnostics/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await diagnosticService.getUserDiagnostics();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener diagnósticos');
    }
  }
);

export const fetchDiagnosticById = createAsyncThunk(
  'diagnostics/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      return await diagnosticService.getDiagnosticById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener el diagnóstico');
    }
  }
);

export const startNewDiagnostic = createAsyncThunk(
  'diagnostics/startNew',
  async (data: StartDiagnosticRequest, { rejectWithValue }) => {
    try {
      return await diagnosticService.startDiagnostic(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al iniciar el diagnóstico');
    }
  }
);

export const fetchVehicleDiagnostics = createAsyncThunk(
  'diagnostics/fetchByVehicle',
  async (vehicleId: string, { rejectWithValue }) => {
    try {
      return await diagnosticService.getVehicleDiagnostics(vehicleId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener diagnósticos del vehículo');
    }
  }
);

// Slice
const diagnosticSlice = createSlice({
  name: 'diagnostics',
  initialState,
  reducers: {
    setDiagnostics: (state, action: PayloadAction<DiagnosticWithVehicle[]>) => {
      state.diagnostics = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentDiagnostic: (state, action: PayloadAction<DiagnosticWithVehicle | null>) => {
      state.currentDiagnostic = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCurrentDiagnostic: (state) => {
      state.currentDiagnostic = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all diagnostics
    builder.addCase(fetchDiagnostics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDiagnostics.fulfilled, (state, action: PayloadAction<DiagnosticWithVehicle[]>) => {
      state.loading = false;
      state.diagnostics = action.payload;
    });
    builder.addCase(fetchDiagnostics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch one diagnostic
    builder.addCase(fetchDiagnosticById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDiagnosticById.fulfilled, (state, action: PayloadAction<DiagnosticWithVehicle>) => {
      state.loading = false;
      state.currentDiagnostic = action.payload;
    });
    builder.addCase(fetchDiagnosticById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Start new diagnostic
    builder.addCase(startNewDiagnostic.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(startNewDiagnostic.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(startNewDiagnostic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch diagnostics by vehicle
    builder.addCase(fetchVehicleDiagnostics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVehicleDiagnostics.fulfilled, (state, action: PayloadAction<Diagnostic[]>) => {
      state.loading = false;
      state.vehicleDiagnostics = action.payload;
    });
    builder.addCase(fetchVehicleDiagnostics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const {
  setDiagnostics,
  setCurrentDiagnostic,
  setLoading,
  setError,
  clearCurrentDiagnostic,
  clearError
} = diagnosticSlice.actions;

export default diagnosticSlice.reducer;
