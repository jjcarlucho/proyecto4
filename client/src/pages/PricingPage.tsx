import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PricingPlans } from '../components/pricing/PricingPlans';

const tiers = [
  {
    name: 'Basic',
    price: '19.99',
    description: 'Essential diagnostics for your personal vehicle.',
    features: [
      '3 diagnostics per month',
      'Basic maintenance alerts',
      'Register 1 vehicle',
      'Diagnostic history',
      'Email support',
    ],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    name: 'Standard',
    price: '59.99',
    description: 'Comprehensive diagnostics for multiple vehicles.',
    features: [
      '15 diagnostics per month',
      'Real-time alerts',
      'Register up to 3 vehicles',
      'Detailed diagnostic history',
      'Personalized recommendations',
      'Priority support',
    ],
    cta: 'Get Started',
    mostPopular: true,
  },
  {
    name: 'Premium',
    price: '99.99',
    description: 'Unlimited diagnostics for serious vehicle owners.',
    features: [
      'Unlimited diagnostics',
      'Advanced vehicle monitoring',
      'Unlimited vehicle registration',
      'Advanced reports',
      'API integration',
      '24/7 technical support',
    ],
    cta: 'Early Access Pricing',
    mostPopular: false,
  },
];

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