import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, DollarSign, Car, Clock, User, Wrench, TrendingUp, AlertCircle } from 'lucide-react';

const ROICalculator: React.FC = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    vehicleCount: 10,
    monthlyDiagnostics: 30,
    averageRepairCost: 500,
    mechanicHourlyRate: 60,
    incorrectDiagnosisRate: 25,
    planType: 'standard'
  });

  // Results state
  const [results, setResults] = useState({
    monthlySubscriptionCost: 0,
    monthlySavings: 0,
    yearlyROI: 0,
    diagnosticAccuracyImprovement: 0,
    timeToPayoff: 0,
    preventedBreakdowns: 0
  });

  // Chart data
  const [chartData, setChartData] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseFloat(value) || 0
    });
  };

  // Handle plan selection
  const handlePlanChange = (plan) => {
    setFormValues({
      ...formValues,
      planType: plan
    });
  };

  // Calculate ROI based on form inputs
  useEffect(() => {
    const calculateROI = () => {
      // Calculate subscription cost based on plan
      let monthlyRate = 0;
      let vehicleCap = 0;
      
      switch(formValues.planType) {
        case 'basic':
          monthlyRate = 19.99;
          vehicleCap = 1;
          break;
        case 'standard':
          monthlyRate = 59.99;
          vehicleCap = 3;
          break;
        case 'premium':
          monthlyRate = 99.99;
          vehicleCap = Number.POSITIVE_INFINITY;
          break;
      }
      
      // Calculate how many subscriptions needed based on vehicle count and plan capacity
      const subscriptionsNeeded = formValues.planType === 'premium' 
        ? 1 
        : Math.ceil(formValues.vehicleCount / vehicleCap);
      
      const monthlySubscriptionCost = monthlyRate * subscriptionsNeeded;
      
      // Calculate savings from reduced incorrect diagnoses
      const monthlyDiagnostics = formValues.vehicleCount * formValues.monthlyDiagnostics / 10;
      const incorrectDiagnosesWithoutSystem = monthlyDiagnostics * (formValues.incorrectDiagnosisRate / 100);
      const incorrectDiagnosesWithSystem = monthlyDiagnostics * ((formValues.incorrectDiagnosisRate / 100) * 0.3); // Assuming 70% reduction in incorrect diagnoses
      const diagnosisErrorReduction = incorrectDiagnosesWithoutSystem - incorrectDiagnosesWithSystem;
      
      // Calculate cost savings
      const costSavingsFromReducedErrors = diagnosisErrorReduction * formValues.averageRepairCost * 0.3; // Assuming 30% of repair cost is wasted on incorrect diagnosis
      
      // Calculate time savings
      const timeHoursSavedPerMonth = diagnosisErrorReduction * 1.5; // Assuming 1.5 hours saved per corrected diagnosis
      const moneySavedFromTimeSavings = timeHoursSavedPerMonth * formValues.mechanicHourlyRate;
      
      // Calculate preventive maintenance benefits
      const preventiveMaintenanceSavings = monthlyDiagnostics * 0.15 * formValues.averageRepairCost * 0.5; // Assuming 15% of potential issues caught early, saving 50% of repair costs
      
      // Calculate total monthly savings
      const monthlySavings = costSavingsFromReducedErrors + moneySavedFromTimeSavings + preventiveMaintenanceSavings;
      
      // Calculate ROI
      const yearlySubscriptionCost = monthlySubscriptionCost * 12;
      const yearlySavings = monthlySavings * 12;
      const yearlyROI = ((yearlySavings - yearlySubscriptionCost) / yearlySubscriptionCost) * 100;
      
      // Calculate time to payoff
      const timeToPayoff = monthlySubscriptionCost > 0 ? monthlySubscriptionCost / monthlySavings : 0;
      
      // Set results
      setResults({
        monthlySubscriptionCost,
        monthlySavings,
        yearlyROI,
        diagnosticAccuracyImprovement: 70, // 70% reduction in incorrect diagnoses
        timeToPayoff,
        preventedBreakdowns: Math.floor(monthlyDiagnostics * 0.15 * 12) // Yearly prevented breakdowns
      });
      
      // Update chart data
      setChartData([
        {
          name: 'Without AutoDiagnose',
          diagnosticCosts: Math.round(incorrectDiagnosesWithoutSystem * formValues.averageRepairCost * 0.3 * 12),
          repairCosts: Math.round(monthlyDiagnostics * formValues.averageRepairCost * 12),
          laborCosts: Math.round(monthlyDiagnostics * 1.5 * formValues.mechanicHourlyRate * 12)
        },
        {
          name: 'With AutoDiagnose',
          diagnosticCosts: Math.round(incorrectDiagnosesWithSystem * formValues.averageRepairCost * 0.3 * 12),
          repairCosts: Math.round(monthlyDiagnostics * formValues.averageRepairCost * 12 * 0.85),
          laborCosts: Math.round((monthlyDiagnostics * 1.5 - timeHoursSavedPerMonth) * formValues.mechanicHourlyRate * 12),
          subscriptionCosts: Math.round(monthlySubscriptionCost * 12)
        }
      ]);
    };
    
    calculateROI();
  }, [formValues]);

  return (
    <section className="py-20 bg-gray-50" id="roi-calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            ROI Calculator
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your potential savings and return on investment when implementing AutoDiagnose AI in your automotive business.
          </p>
        </motion.div>

        <div className="mt-12 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Form section */}
            <div className="p-6 bg-blue-700">
              <h3 className="text-xl font-semibold text-white mb-6">
                <Calculator className="inline-block mr-2 h-6 w-6" />
                Input Your Business Data
              </h3>
              
              <div className="space-y-6">
                {/* Plan selection */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Subscription Plan</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        formValues.planType === 'basic' 
                          ? 'bg-white text-blue-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                      onClick={() => handlePlanChange('basic')}
                    >
                      Basic
                    </button>
                    <button
                      className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        formValues.planType === 'standard' 
                          ? 'bg-white text-blue-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                      onClick={() => handlePlanChange('standard')}
                    >
                      Standard
                    </button>
                    <button
                      className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        formValues.planType === 'premium' 
                          ? 'bg-white text-blue-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                      onClick={() => handlePlanChange('premium')}
                    >
                      Premium
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-blue-100">
                    {formValues.planType === 'basic' && 'Basic: $19.99/mo, 1 vehicle'}
                    {formValues.planType === 'standard' && 'Standard: $59.99/mo, up to 3 vehicles'}
                    {formValues.planType === 'premium' && 'Premium: $99.99/mo, unlimited vehicles'}
                  </div>
                </div>
                
                {/* Vehicle count input */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    <Car className="inline-block mr-2 h-4 w-4" />
                    Number of Vehicles
                  </label>
                  <input
                    type="number"
                    name="vehicleCount"
                    value={formValues.vehicleCount}
                    onChange={handleInputChange}
                    min="1"
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  />
                </div>
                
                {/* Monthly diagnostics input */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    <Clock className="inline-block mr-2 h-4 w-4" />
                    Monthly Diagnostics per 10 Vehicles
                  </label>
                  <input
                    type="number"
                    name="monthlyDiagnostics"
                    value={formValues.monthlyDiagnostics}
                    onChange={handleInputChange}
                    min="1"
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  />
                </div>
                
                {/* Average repair cost input */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    <DollarSign className="inline-block mr-2 h-4 w-4" />
                    Average Repair Cost ($)
                  </label>
                  <input
                    type="number"
                    name="averageRepairCost"
                    value={formValues.averageRepairCost}
                    onChange={handleInputChange}
                    min="0"
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  />
                </div>
                
                {/* Mechanic hourly rate input */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    <Wrench className="inline-block mr-2 h-4 w-4" />
                    Mechanic Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="mechanicHourlyRate"
                    value={formValues.mechanicHourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  />
                </div>
                
                {/* Incorrect diagnosis rate input */}
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    <AlertCircle className="inline-block mr-2 h-4 w-4" />
                    Current Incorrect Diagnosis Rate (%)
                  </label>
                  <input
                    type="number"
                    name="incorrectDiagnosisRate"
                    value={formValues.incorrectDiagnosisRate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>
            
            {/* Results section */}
            <div className="col-span-2 p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                <TrendingUp className="inline-block mr-2 h-6 w-6" />
                Your Estimated Return on Investment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* ROI card */}
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Annual ROI</div>
                  <div className="text-3xl font-bold text-blue-700">{results.yearlyROI.toFixed(0)}%</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Return on your investment in the first year
                  </div>
                </div>
                
                {/* Monthly savings card */}
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Monthly Savings</div>
                  <div className="text-3xl font-bold text-blue-700">${results.monthlySavings.toFixed(0)}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Average monthly cost reduction
                  </div>
                </div>
                
                {/* Time to pay off card */}
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Time to Pay Off</div>
                  <div className="text-3xl font-bold text-blue-700">{results.timeToPayoff.toFixed(1)} months</div>
                  <div className="text-sm text-gray-500 mt-2">
                    When investment becomes profitable
                  </div>
                </div>
                
                {/* Subscription cost card */}
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Monthly Subscription</div>
                  <div className="text-3xl font-bold text-blue-700">${results.monthlySubscriptionCost.toFixed(2)}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Total monthly cost for {formValues.vehicleCount} vehicles
                  </div>
                </div>
                
                {/* Prevented breakdowns card */}
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Prevented Breakdowns</div>
                  <div className="text-3xl font-bold text-blue-700">{results.preventedBreakdowns}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Estimated annual prevented issues
                  </div>
                </div>
                
                {/* Diagnostic accuracy card */}
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Accuracy Improvement</div>
                  <div className="text-3xl font-bold text-blue-700">{results.diagnosticAccuracyImprovement}%</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Reduction in incorrect diagnoses
                  </div>
                </div>
              </div>
              
              {/* Chart section */}
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Cost Comparison</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => ['$' + value, '']} />
                      <Legend />
                      <Bar dataKey="diagnosticCosts" name="Diagnostic Costs" fill="#f97316" />
                      <Bar dataKey="repairCosts" name="Repair Costs" fill="#ef4444" />
                      <Bar dataKey="laborCosts" name="Labor Costs" fill="#8b5cf6" />
                      <Bar dataKey="subscriptionCosts" name="Subscription Costs" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Notes section */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-2">Calculation Notes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All calculations are estimates based on industry averages and your inputs</li>
                  <li>AutoDiagnose AI typically reduces incorrect diagnoses by 70%</li>
                  <li>Early problem detection saves an average of 50% on repair costs</li>
                  <li>Time savings per correctly diagnosed issue average 1.5 mechanic hours</li>
                  <li>Contact us for a detailed custom analysis for your specific business</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;