import React, { useEffect } from 'react';
import PricingPlans from '../components/pricing/PricingPlans';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Pricing - AutoDiagnose AI';
  }, []);

  const features = [
    'AI-powered diagnostic tools with 97% accuracy',
    'Comprehensive vehicle database covering 60+ brands',
    'Step-by-step repair guides with images',
    'Customer report generation',
    '30-day money-back guarantee',
    'Free updates and new features'
  ];

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-primary-800 rounded-full font-medium text-sm mb-4">Pricing Plans</span>
          <h1 className="heading-xl text-gray-900 mb-6">
            Select the Plan That's Right for Your Repair Shop
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All plans include a 30-day free trial. No credit card required to start.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <Check className="w-4 h-4 text-primary-800" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <PricingPlans />
        
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-bold text-lg mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and ACH payments for US customers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-bold text-lg mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading font-bold text-lg mb-2">How many users can access the account?</h3>
              <p className="text-gray-600">The Starter and Professional plans include 3 user accounts. The Enterprise plan offers unlimited users.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions about our pricing or features?
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact our Sales Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;