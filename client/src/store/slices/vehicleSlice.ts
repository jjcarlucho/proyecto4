import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, VehicleFormData } from '../../types/vehicle';
import * as vehicleService from '../../services/vehicleService';

interface VehicleState {
  vehicles: Vehicle[];
  currentVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  currentVehicle: null,
  loading: false,
  error: null
};

// Thunks
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await vehicleService.getUserVehicles();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener vehículos');
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  'vehicles/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      return await vehicleService.getVehicleById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener el vehículo');
    }
  }
);

export const createVehicle = createAsyncThunk(
  'vehicles/create',
  async (vehicleData: VehicleFormData, { rejectWithValue }) => {
    try {
      return await vehicleService.createVehicle(vehicleData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear el vehículo');
    }
  }
);

export const updateVehicle = createAsyncThunk(
  'vehicles/update',
  async ({ id, data }: { id: string; data: VehicleFormData }, { rejectWithValue }) => {
    try {
      return await vehicleService.updateVehicle(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar el vehículo');
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  'vehicles/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await vehicleService.deleteVehicle(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar el vehículo');
    }
  }
);

// Slice
const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    clearCurrentVehicle: (state) => {
      state.currentVehicle = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all vehicles
    builder.addCase(fetchVehicles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVehicles.fulfilled, (state, action: PayloadAction<Vehicle[]>) => {
      state.loading = false;
      state.vehicles = action.payload;
    });
    builder.addCase(fetchVehicles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch one vehicle
    builder.addCase(fetchVehicleById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVehicleById.fulfilled, (state, action: PayloadAction<Vehicle>) => {
      state.loading = false;
      state.currentVehicle = action.payload;
    });
    builder.addCase(fetchVehicleById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create vehicle
    builder.addCase(createVehicle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createVehicle.fulfilled, (state, action: PayloadAction<Vehicle>) => {
      state.loading = false;
      state.vehicles.push(action.payload);
      state.currentVehicle = action.payload;
    });
    builder.addCase(createVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update vehicle
    builder.addCase(updateVehicle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateVehicle.fulfilled, (state, action: PayloadAction<Vehicle>) => {
      state.loading = false;
      const index = state.vehicles.findIndex(v => v._id === action.payload._id);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
      state.currentVehicle = action.payload;
    });
    builder.addCase(updateVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete vehicle
    builder.addCase(deleteVehicle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteVehicle.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.vehicles = state.vehicles.filter(v => v._id !== action.payload);
      if (state.currentVehicle && state.currentVehicle._id === action.payload) {
        state.currentVehicle = null;
      }
    });
    builder.addCase(deleteVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearCurrentVehicle, clearError } = vehicleSlice.actions;
export default vehicleSlice.reducer;
