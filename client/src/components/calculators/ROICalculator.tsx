import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, DollarSign, Car, Clock, User, Wrench, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface CostData {
  name: string;
  diagnosticCosts: number;
  repairCosts: number;
  laborCosts: number;
  subscriptionCosts?: number;
}

export function ROICalculator() {
  const [vehicleCount, setVehicleCount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<CostData[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const count = parseInt(vehicleCount);
    if (isNaN(count)) return;

    calculateROI(count);
    setShowResults(true);
  };

  const calculateROI = (count: number) => {
    // Traditional costs
    const traditionalCosts: CostData = {
      name: 'Método Tradicional',
      diagnosticCosts: count * 150,
      repairCosts: count * 500,
      laborCosts: count * 200
    };

    // AutoDiagnose costs
    const autoDiagnoseCosts: CostData = {
      name: 'Con AutoDiagnose',
      diagnosticCosts: count * 50,
      repairCosts: count * 400,
      laborCosts: count * 150,
      subscriptionCosts: count * 20
    };

    setResults([traditionalCosts, autoDiagnoseCosts]);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Calculadora de ROI</CardTitle>
        <CardDescription>
          Calcula cuánto puedes ahorrar usando AutoDiagnose
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Número de vehículos
            </label>
            <Input
              type="number"
              value={vehicleCount}
              onChange={(e) => setVehicleCount(e.target.value)}
              placeholder="Ej: 10"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Plan de suscripción
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              required
            >
              <option value="">Selecciona un plan</option>
              <option value="basic">Básico</option>
              <option value="pro">Profesional</option>
              <option value="enterprise">Empresa</option>
            </select>
          </div>
          <Button type="submit">Calcular Ahorro</Button>
        </form>

        {showResults && results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Resultados</h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 border rounded">
                  <h4 className="font-medium">{result.name}</h4>
                  <div className="mt-2 space-y-1">
                    <p>Costos de diagnóstico: ${result.diagnosticCosts}</p>
                    <p>Costos de reparación: ${result.repairCosts}</p>
                    <p>Costos de mano de obra: ${result.laborCosts}</p>
                    {result.subscriptionCosts && (
                      <p>Costos de suscripción: ${result.subscriptionCosts}</p>
                    )}
                    <p className="font-semibold mt-2">
                      Total: $
                      {result.diagnosticCosts +
                        result.repairCosts +
                        result.laborCosts +
                        (result.subscriptionCosts || 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          * Los cálculos son estimados basados en promedios de la industria
        </p>
      </CardFooter>
    </Card>
  );
}