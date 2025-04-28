import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

interface PricingFeature {
  name: string;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;
}

const features: PricingFeature[] = [
  { name: "Basic diagnostics", starter: true, professional: true, enterprise: true },
  { name: "Vehicle history reports", starter: true, professional: true, enterprise: true },
  { name: "100 diagnostics/month", starter: true, professional: false, enterprise: false },
  { name: "Unlimited diagnostics", starter: false, professional: true, enterprise: true },
  { name: "Basic knowledge base", starter: true, professional: false, enterprise: false },
  { name: "Complete knowledge base", starter: false, professional: true, enterprise: true },
  { name: "Email support", starter: true, professional: true, enterprise: true },
  { name: "Priority 24/7 support", starter: false, professional: true, enterprise: true },
  { name: "Basic reports", starter: true, professional: false, enterprise: false },
  { name: "Advanced analytics", starter: false, professional: true, enterprise: true },
  { name: "Inventory integration", starter: false, professional: true, enterprise: true },
  { name: "API access", starter: false, professional: false, enterprise: true },
  { name: "Multi-user access", starter: false, professional: false, enterprise: true },
  { name: "Custom branding", starter: false, professional: false, enterprise: true },
  { name: "Dedicated support agent", starter: false, professional: false, enterprise: true },
];

const PricingPlans: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-primary-800 rounded-full font-medium text-sm mb-4">Pricing</span>
          <h2 className="heading-lg text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your repair shop's needs and budget. All plans include a 30-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="border border-gray-200 rounded-xl overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
            <div className="p-8 bg-white">
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-500 mb-6">Perfect for small repair shops</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$199</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {features.slice(0, 7).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.starter ? (
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.starter ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/demo" 
                className="btn btn-outline w-full block text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
          
          {/* Professional Plan */}
          <div className="border-2 border-primary-800 rounded-xl overflow-hidden shadow-xl transition-transform hover:-translate-y-1 relative">
            <div className="absolute top-0 inset-x-0 flex justify-center">
              <span className="bg-primary-800 text-white px-4 py-1 text-sm font-medium rounded-b-lg">
                Most Popular
              </span>
            </div>
            <div className="p-8 bg-white pt-12">
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-500 mb-6">Ideal for growing repair businesses</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$299</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {features.slice(0, 11).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.professional ? (
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.professional ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/demo" 
                className="btn btn-primary w-full block text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="border border-gray-200 rounded-xl overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
            <div className="p-8 bg-white">
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-6">For multi-location repair networks</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$499</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.enterprise ? (
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.enterprise ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/demo" 
                className="btn btn-outline w-full block text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-16 bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          <div className="md:w-3/4">
            <h3 className="font-heading font-bold text-2xl mb-3">Need a custom solution?</h3>
            <p className="text-gray-600">
              Contact our team for custom pricing for large enterprises and special requirements.
            </p>
          </div>
          <div className="md:w-1/4">
            <Link 
              to="/contact" 
              className="btn btn-primary whitespace-nowrap"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;