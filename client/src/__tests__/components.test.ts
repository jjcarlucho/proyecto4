import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock components para testing
const MockProvider = ({ children, initialState = {} }) => {
  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

// Import components
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { VehicleList } from '../components/vehicles/VehicleList';
import { DiagnosticList } from '../components/diagnostics/DiagnosticList';

describe('Auth Components', () => {
  it('should render the LoginForm correctly', () => {
    const initialState = {
      auth: {
        loading: false,
        error: null
      }
    };

    render(
      <MockProvider initialState={initialState}>
        <LoginForm />
      </MockProvider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
  });

  it('should handle login form submission', () => {
    const initialState = {
      auth: {
        loading: false,
        error: null
      }
    };

    const store = mockStore(initialState);
    store.dispatch = vi.fn().mockResolvedValue({});

    render(
      <MockProvider initialState={initialState} store={store}>
        <LoginForm />
      </MockProvider>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should render the RegisterForm correctly', () => {
    const initialState = {
      auth: {
        loading: false,
        error: null
      }
    };

    render(
      <MockProvider initialState={initialState}>
        <RegisterForm />
      </MockProvider>
    );

    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });
});

describe('Vehicle Components', () => {
  it('should render the vehicle list when vehicles exist', () => {
    const initialState = {
      vehicle: {
        vehicles: [
          {
            _id: '1',
            make: 'Toyota',
            model: 'Corolla',
            year: 2020,
            vin: 'ABC123XYZ',
            mileage: 15000
          },
          {
            _id: '2',
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            vin: 'DEF456UVW',
            mileage: 25000
          }
        ],
        loading: false,
        error: null
      }
    };

    render(
      <MockProvider initialState={initialState}>
        <VehicleList />
      </MockProvider>
    );

    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('Honda')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2019')).toBeInTheDocument();
  });

  it('should show empty state when no vehicles', () => {
    const initialState = {
      vehicle: {
        vehicles: [],
        loading: false,
        error: null
      }
    };

    render(
      <MockProvider initialState={initialState}>
        <VehicleList />
      </MockProvider>
    );

    expect(screen.getByText('No tienes vehículos registrados')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Registrar Vehículo' })).toBeInTheDocument();
  });
});

describe('Diagnostic Components', () => {
  it('should render the diagnostic list when diagnostics exist', () => {
    const initialState = {
      diagnostic: {
        diagnostics: [
          {
            _id: '1',
            vehicleId: {
              _id: '1',
              make: 'Toyota',
              model: 'Corolla',
              year: 2020
            },
            date: new Date().toISOString(),
            status: 'completed',
            issues: [{ code: 'P0300', description: 'Multiple Cylinder Misfire', severity: 'high', system: 'Engine' }]
          }
        ],
        loading: false,
        error: null
      }
    };

    render(
      <MockProvider initialState={initialState}>
        <DiagnosticList />
      </MockProvider>
    );

    expect(screen.getByText('Toyota Corolla (2020)')).toBeInTheDocument();
    expect(screen.getByText('Completado')).toBeInTheDocument();
    expect(screen.getByText('1 problema')).toBeInTheDocument();
  });

  it('should show empty state when no diagnostics', () => {
    const initialState = {
      diagnostic: {
        diagnostics: [],
        loading: false,
        error: null
      }
    };

    render(
      <MockProvider initialState={initialState}>
        <DiagnosticList />
      </MockProvider>
    );

    expect(screen.getByText('No tienes diagnósticos realizados')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Realizar un Diagnóstico' })).toBeInTheDocument();
  });
});
