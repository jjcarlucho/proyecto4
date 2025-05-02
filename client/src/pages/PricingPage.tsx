import { useEffect } from 'react';
import { PricingPlans } from '../components/pricing/PricingPlans';

export default function PricingPage() {
  useEffect(() => {
    document.title = 'Pricing - AutoDiagnose AI';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your repair shop's needs. All plans include a 14-day free trial.
          </p>
        </div>
        <PricingPlans />
      </div>
    </div>
  );
}