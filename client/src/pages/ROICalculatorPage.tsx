import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

interface ROICalculation {
  monthlyRevenue: number;
  annualSavings: number;
  paybackPeriod: number;
  roi: number;
}

export default function ROICalculatorPage() {
  const [formData, setFormData] = useState({
    vehiclesPerMonth: '',
    averageRepairCost: '',
    laborRate: '',
    technicianCount: '',
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicles = Number(formData.vehiclesPerMonth);
    const repairCost = Number(formData.averageRepairCost);
    const laborRate = Number(formData.laborRate);
    const technicians = Number(formData.technicianCount);

    // Calculate potential revenue increase (assuming 10% more efficient diagnostics)
    const timePerDiagnostic = 1; // hour
    const diagnosticsPerMonth = vehicles;
    const currentRevenue = (diagnosticsPerMonth * timePerDiagnostic * laborRate * technicians) + (diagnosticsPerMonth * repairCost);
    const improvedRevenue = currentRevenue * 1.1; // 10% improvement
    const monthlyRevenue = improvedRevenue - currentRevenue;

    // Calculate annual savings
    const monthlyDiagnosticCost = 79; // Professional plan cost
    const annualSubscriptionCost = monthlyDiagnosticCost * 12;
    const annualLaborSavings = monthlyRevenue * 12;
    const annualSavings = annualLaborSavings - annualSubscriptionCost;

    // Calculate payback period in months
    const paybackPeriod = (annualSubscriptionCost / monthlyRevenue);

    // Calculate ROI percentage
    const roi = ((annualSavings / annualSubscriptionCost) * 100);

    setCalculation({
      monthlyRevenue,
      annualSavings,
      paybackPeriod,
      roi
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">ROI Calculator</h1>
          <p className="mt-4 text-xl text-gray-600">
            Calculate your potential return on investment with AutoDiagnose AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={calculateROI} className="space-y-6">
              <div>
                <Label htmlFor="vehiclesPerMonth">Vehicles Serviced per Month</Label>
                <Input
                  id="vehiclesPerMonth"
                  name="vehiclesPerMonth"
                  type="number"
                  required
                  value={formData.vehiclesPerMonth}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="averageRepairCost">Average Repair Cost ($)</Label>
                <Input
                  id="averageRepairCost"
                  name="averageRepairCost"
                  type="number"
                  required
                  value={formData.averageRepairCost}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="laborRate">Labor Rate per Hour ($)</Label>
                <Input
                  id="laborRate"
                  name="laborRate"
                  type="number"
                  required
                  value={formData.laborRate}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="technicianCount">Number of Technicians</Label>
                <Input
                  id="technicianCount"
                  name="technicianCount"
                  type="number"
                  required
                  value={formData.technicianCount}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full">
                Calculate ROI
              </Button>
            </form>
          </div>

          <div>
            {calculation && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue Increase</CardTitle>
                    <CardDescription>
                      Additional revenue from improved efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-600">
                      ${calculation.monthlyRevenue.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Annual Savings</CardTitle>
                    <CardDescription>
                      Net savings after subscription costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-600">
                      ${calculation.annualSavings.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payback Period</CardTitle>
                    <CardDescription>
                      Time to recover investment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-600">
                      {calculation.paybackPeriod.toFixed(1)} months
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Return on Investment</CardTitle>
                    <CardDescription>
                      Annual ROI percentage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-600">
                      {calculation.roi.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {!calculation && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg">
                    Fill out the form to see your potential return on investment
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}