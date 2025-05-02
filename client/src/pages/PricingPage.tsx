import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

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

const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Pricing - AutoDiagnose AI';
  }, []);

  return (
    <div className="pt-16 pb-20">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Plans and Pricing
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
              Choose the plan that best fits your needs and start taking care of your vehicle today.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Plans for Every Driver
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Premium diagnostics for your vehicle. Subscribe now to start protecting your investment.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 ring-1 ${
                  tier.mostPopular
                    ? 'ring-2 ring-blue-600 shadow-xl'
                    : 'ring-gray-200'
                } ${tier.mostPopular ? 'shadow-blue-900/10' : ''}`}
              >
                {tier.mostPopular && (
                  <div className="mb-6">
                    <span className="inline-flex rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {tier.description}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-8 block w-full rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    ${
                      tier.mostPopular
                        ? 'bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">How do your subscription plans work?</h3>
              <p className="mt-2 text-base text-gray-500">
                Our subscription plans are billed monthly. You will need to provide payment information to begin. You can cancel your subscription at any time from your account dashboard.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Can I change my plan?</h3>
              <p className="mt-2 text-base text-gray-500">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll adjust the cost proportionally for the remainder of your billing period.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-2 text-base text-gray-500">
                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for our premium plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;