import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    description: 'Perfect for small workshops',
    features: [
      'Up to 10 vehicles per month',
      'Basic diagnostic reports',
      'Email support',
      '1 user account',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 79,
    description: 'Best for growing businesses',
    features: [
      'Up to 50 vehicles per month',
      'Advanced diagnostic reports',
      'Priority email & chat support',
      'Up to 3 user accounts',
      'Custom branding',
      'API access',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    description: 'For large scale operations',
    features: [
      'Unlimited vehicles',
      'Advanced diagnostic reports',
      '24/7 priority support',
      'Unlimited user accounts',
      'Custom branding',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
];

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    navigate('/register', { state: { selectedPlan } });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose your plan</h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 shadow-sm ${
                selectedPlan === plan.id
                  ? 'border-blue-600 ring-2 ring-blue-600'
                  : 'border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">/month</span>
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${
                  selectedPlan === plan.id
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-white text-blue-600 hover:bg-gray-50 border border-blue-600'
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue with {plans.find(p => p.id === selectedPlan)?.name} Plan
          </Button>
        </div>
      </div>
    </div>
  );
}